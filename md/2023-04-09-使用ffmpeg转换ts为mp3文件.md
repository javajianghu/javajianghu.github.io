# 1. 使用ffmpeg转换ts文件为mp3

## 1.1. 安装

首先下载安装包，下载地址如下：
> <https://github.com/BtbN/FFmpeg-Builds/releases>

或者

> <https://www.gyan.dev/ffmpeg/builds/>
选择： ffmpeg-git-full.7z 下载

下载完成后解压，并设置环境变量，在命令行使用 ffmpeg 显示如下内容表示成功。

```
ffmpeg version 2023-04-06-git-b564ad8eac-full_build-www.gyan.dev Copyright (c) 2000-2023 the FFmpeg developers
```

## 1.2. 开始转换

假如源文件路径为：d:\\1.ts,目标mp3文件路径为：d:\\1.mp3,使用如下命令进行转换

```
ffmpeg -i d:\\1.ts -f mp3 d:\\1.mp3
```

如果觉得转换速度太慢，可以使用多线程的方式,如下使用10个线程同时处理：

```
ffmpeg -i d:\\1.ts -threads 10 -preset ultrafast -f mp3 d:\\1.mp3
```
