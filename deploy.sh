#!/usr/bin/env bash
#
# 目标 shell：bash（脚本使用了进程替换等 bash 特性）
# shellcheck shell=bash
#
# 一键发布脚本：构建站点，并把 dist/ 的全部产物提交到发布分支（默认 for-pages）后推送。
#
# 用法：
#   ./deploy.sh                # 构建 + 发布（最常用）
#   ./deploy.sh --skip-build   # 跳过构建，直接发布现有 dist/
#   ./deploy.sh --dry-run      # 只在本地生成发布提交，不推送远端
#
# 可用环境变量：
#   DEPLOY_BRANCH=for-pages    # 发布分支名
#   DEPLOY_REMOTE=origin       # 远端名

# 本脚本依赖 bash 特性（进程替换、数组、BASH_SOURCE 等），用其他解释器执行时行为不一致：
# macOS 自带的 /bin/sh 虽然也是 bash 编译版，却裁掉了进程替换，用它执行会在解析到
# `done < <(...)` 时直接报「syntax error near unexpected token '<'」并退出；
# zsh 则没有 BASH_SOURCE 数组，在 set -u 下同样会报错。
# 这里统一以 bash 重新执行，保证 `./deploy.sh`、`sh deploy.sh`、`zsh deploy.sh` 行为完全一致。
# 通过环境变量标记避免重复 exec（重新执行后 Bash 会带上该标记）。
if [ -z "${_DEPLOY_RUNNING_IN_BASH:-}" ]; then
  export _DEPLOY_RUNNING_IN_BASH=1
  exec bash "$0" "$@"
fi

set -euo pipefail

# 无论从哪个目录调用，都切到脚本所在的项目根目录
SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

BRANCH="${DEPLOY_BRANCH:-for-pages}"
REMOTE="${DEPLOY_REMOTE:-origin}"
SKIP_BUILD=0
DRY_RUN=0

usage() {
  cat <<'EOF'
用法：./deploy.sh [选项]
  --skip-build   跳过 npm run build，直接发布现有 dist/
  --dry-run      只生成发布提交并输出，不推送远端
  -h, --help     显示帮助
EOF
}

for arg in "$@"; do
  case "$arg" in
    --skip-build) SKIP_BUILD=1 ;;
    --dry-run) DRY_RUN=1 ;;
    -h | --help) usage; exit 0 ;;
    *) echo "未知参数：$arg" >&2; usage >&2; exit 1 ;;
  esac
done

# 发布分支若正好是当前检出的分支，临时索引生成的提交会让工作区与分支状态不一致，直接拒绝执行
current_branch="$(git rev-parse --abbrev-ref HEAD)"
if [ "$current_branch" = "$BRANCH" ]; then
  echo "错误：当前已在 $BRANCH 分支上，请先切回源码分支再执行发布" >&2
  exit 1
fi

if [ "$SKIP_BUILD" -eq 1 ]; then
  echo "==> 跳过构建，使用现有 dist/"
else
  echo "==> 构建站点（npm run build）"
  npm run build
fi

# 构建产物缺失时直接失败，避免把空分支推上去导致线上白屏
if [ ! -f dist/index.html ]; then
  echo "错误：dist/index.html 不存在，构建产物不完整，已终止发布" >&2
  exit 1
fi

# 远端分支不存在时创建新分支；这里必须区分「远端没有该分支」和「网络/鉴权失败」
ls_remote_out="$(mktemp)"
ls_remote_err="$(mktemp)"
set +e
git ls-remote --exit-code --heads "$REMOTE" "refs/heads/$BRANCH" >"$ls_remote_out" 2>"$ls_remote_err"
ls_remote_code=$?
set -e

remote_exists=0
case "$ls_remote_code" in
  0) remote_exists=1 ;;
  2) echo "==> 远端尚无 $BRANCH 分支，本次将创建" ;;
  *)
    echo "错误：无法访问远端 $REMOTE" >&2
    cat "$ls_remote_err" >&2
    rm -f "$ls_remote_out" "$ls_remote_err"
    exit 1
    ;;
esac
rm -f "$ls_remote_out" "$ls_remote_err"

# 父提交取远端分支最新提交，保证推送始终是快进，不会出现非快进被拒
parent=""
if [ "$remote_exists" -eq 1 ]; then
  echo "==> 同步远端 $BRANCH 分支"
  git fetch --quiet "$REMOTE" "$BRANCH"
  parent="$(git rev-parse FETCH_HEAD)"
  echo "    父提交：$parent"
fi

# 用临时索引把 dist/ 组装成一棵树：不切换分支、不改动工作区与暂存区
index_file="$(mktemp)"
rm -f "$index_file"
export GIT_INDEX_FILE="$index_file"
git read-tree --empty

file_count=0
while IFS= read -r -d '' file; do
  file_path="${file#dist/}"
  blob="$(git hash-object -w -- "$file")"
  git update-index --add --cacheinfo "100644,$blob,$file_path"
  file_count=$((file_count + 1))
done < <(find dist -type f -print0)

# .nojekyll 让 GitHub Pages 跳过 Jekyll 处理，保证产物原样发布
git update-index --add --cacheinfo "100644,$(git hash-object -w -- /dev/null),.nojekyll"
# CNAME 绑定自定义域名，缺失时跳过（不影响产物发布）
if [ -f CNAME ]; then
  git update-index --add --cacheinfo "100644,$(git hash-object -w -- CNAME),CNAME"
fi

tree="$(git write-tree)"
unset GIT_INDEX_FILE
rm -f "$index_file"

echo "==> 组装发布提交（$file_count 个产物文件）"
bullets="$(printf -- '- 同步 dist/ 全部构建产物（共 %s 个文件）\n- 附带 .nojekyll 与 CNAME' "$file_count")"

if [ -n "$parent" ]; then
  commit="$(git commit-tree "$tree" -p "$parent" \
    -m "build(deploy): 发布站点构建产物" -m "$bullets")"
else
  commit="$(git commit-tree "$tree" \
    -m "build(deploy): 发布站点构建产物" -m "$bullets")"
fi

if [ "$DRY_RUN" -eq 1 ]; then
  echo "==> dry-run：已生成分支内容，未推送"
  git ls-tree -r --name-only "$commit" | head -20
  echo "提交：$commit"
  exit 0
fi

# 同步本地分支引用，便于本地查看发布内容（不影响工作区）
git update-ref "refs/heads/$BRANCH" "$commit"

echo "==> 推送到 $REMOTE/$BRANCH"
git push "$REMOTE" "$commit:refs/heads/$BRANCH"

echo "==> 发布完成：$REMOTE/$BRANCH -> $commit"
