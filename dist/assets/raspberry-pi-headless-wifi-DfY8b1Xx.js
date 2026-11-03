var e=`<h2 id="1-安装无桌面版本的树莓派连接wifi" tabindex="-1">1. 安装无桌面版本的树莓派连接WIFI <a class="heading-anchor" href="#1-安装无桌面版本的树莓派连接wifi" aria-hidden="true"><svg class="heading-anchor__icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M6.5 9.5a2.5 2.5 0 0 0 3.54 0l2-2a2.5 2.5 0 0 0-3.54-3.54l-.7.7"/><path d="M9.5 6.5a2.5 2.5 0 0 0-3.54 0l-2 2a2.5 2.5 0 0 0 3.54 3.54l.7-.7"/></svg></a></h2>
<h3 id="11-环境准备" tabindex="-1">1.1. 环境准备 <a class="heading-anchor" href="#11-环境准备" aria-hidden="true"><svg class="heading-anchor__icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M6.5 9.5a2.5 2.5 0 0 0 3.54 0l2-2a2.5 2.5 0 0 0-3.54-3.54l-.7.7"/><path d="M9.5 6.5a2.5 2.5 0 0 0-3.54 0l-2 2a2.5 2.5 0 0 0 3.54 3.54l.7-.7"/></svg></a></h3>
<p>树莓派4b、烧录好系统的内存卡、显示器、miniHdmi、鼠标、键盘</p>
<h3 id="12-那么开始" tabindex="-1">1.2. 那么开始 <a class="heading-anchor" href="#12-那么开始" aria-hidden="true"><svg class="heading-anchor__icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M6.5 9.5a2.5 2.5 0 0 0 3.54 0l2-2a2.5 2.5 0 0 0-3.54-3.54l-.7.7"/><path d="M9.5 6.5a2.5 2.5 0 0 0-3.54 0l-2 2a2.5 2.5 0 0 0 3.54 3.54l.7-.7"/></svg></a></h3>
<p>进入树莓派，可以看到下面的界面</p>
<p><img src="/assets/image-20221214215639256.png" alt="image-20221214215639256" loading="lazy"></p>
<p>然后输入命令：</p>
<div class="code-block"><pre class="hljs"><code>sudo raspi-config
</code></pre></div><p>显示如下：</p>
<p><img src="/assets/image-20221214215732876.png" alt="image-20221214215732876" loading="lazy"></p>
<p>Tab键切换选项，回车键进入选项，咱们直接回车，进入“1 System Options”选项</p>
<p><img src="/assets/image-20221214215849416.png" alt="image-20221214215849416" loading="lazy"></p>
<p>然后继续回车：</p>
<p><img src="/assets/image-20221214215913892.png" alt="image-20221214215913892" loading="lazy"></p>
<p>这里就是让你输入wifi名称，输入完成后，按tab键，切换到“Ok”选项，再回车。显示如下界面。</p>
<p><img src="/assets/image-20221214220019221.png" alt="image-20221214220019221" loading="lazy"></p>
<p>输入wifi密码后，按tab键，切换到“Ok”选项，再回车</p>
<p>最后,重启树莓派就可以连上服务器了</p>
<div class="code-block"><pre class="hljs"><code>sudo reboot
</code></pre></div>`,t=[{id:`1-安装无桌面版本的树莓派连接wifi`,text:`1. 安装无桌面版本的树莓派连接WIFI`,level:2,children:[{id:`11-环境准备`,text:`1.1. 环境准备`,level:3,children:[]},{id:`12-那么开始`,text:`1.2. 那么开始`,level:3,children:[]}]}],n={html:e,toc:t};export{n as default,e as html,t as toc};