# 节奏伙伴 · Rhythm Buddy

**一个双击就能打开的浏览器鼓机 / 伴奏机。单文件、零依赖、可离线。**

不用装软件，不用注册，不用联网。下载一个 `index.html`，双击，就开始。

<p align="center">
  <img src="assets/screenshot-desktop.png" alt="桌面版界面" width="880">
</p>

---

## 这是什么

练琴、弹唱、写歌的时候，很多时候只需要一个**能随手打开的节拍和伴奏**，而不是装一套 DAW。

市面上的在线鼓机大多要联网、要登录、手机上排版全是横向滚动的表格。这个项目的目标很简单：**一个文件，手机和电脑都能用，断网也能用。**

它有 9 层 13 轨鼓组 + 贝斯 + 和声垫，16 套风格预设，8 个打击垫可以实时敲。
还能导入自己的伴奏（mp3/wav），做**变速不变调**，或者反过来**变调不变速**——用不同调的歌配同一套鼓。

## 在线使用

直接打开：**https://lunanami1987.github.io/rhythm-buddy/**

手机浏览器也建议用这个链接。iOS 上 Safari 可以直接「添加到主屏幕」，打开后是全屏的，和 App 差不多。

## 本地使用

三种方式，任选：

```bash
# 1. 最简单：浏览器打开在线链接，右键"另存为"得到一个 html
# 2. 或者克隆一份
git clone https://github.com/lunanami1987/rhythm-buddy.git
# 然后双击 index.html
```

**不需要服务器，不需要 npm，不需要构建。** 文件里所有音色、代码、样式都是内联的。

## 功能

| | |
|---|---|
| **鼓组** | 9 层、13 轨：沙铃、铃鼓、拍手、康加（2 轨）、箱鼓（2 轨）、鼓组（底鼓/军鼓/闭镲/开镲/强音镲/叮叮镲）。另有独立节拍器层 |
| **音色** | 31 档可切换音色，覆盖 9 个部件（沙铃可换沙锤/卡巴萨，军鼓可换邦哥/响指…） |
| **风格预设** | 16 套：民谣、弹唱、慢歌、华尔兹、6/8 民歌、放克、摇摆、雷鬼、City、电子、波萨、拉丁、桑巴、进行曲、三拍爵士 |
| **打法** | 每层多种节奏型（八分/十六分/反拍/切分/四踩…），也可自己在网格上点 |
| **贝斯** | 7 个调 × 6 种和弦进行（1564/1645/1451/6415/m1637/m1451）× 6 种演奏型 × 4 种音色 |
| **和声垫** | 按和弦进行铺底，适合一个人弹唱时补声部 |
| **打击垫** | 8 个可实时敲击的垫子，键盘 `A S D F G H J K`，带力度感应，可写入步进 |
| **配乐** | 导入 mp3/wav/m4a，可变速不变调 / 变调不变速（±6 半音），可跟随鼓机 BPM |
| **导出** | 导出当前编曲为 WAV（1/2/4/8/16 小节），也可导出/导入 JSON 存档 |
| **其它** | 单步撤销、每轨一键清空、收藏夹、节拍器、预备拍、淡出、混响 |

## 手机上怎么用

<p align="center">
  <img src="assets/screenshot-mobile.png" alt="手机版界面" width="240">
</p>

**⚠️ 建议戴耳机。** 手机上外放听不见底鼓和贝斯的低频，你会以为鼓机坏了。

几点实际会遇到的：

- **iPhone 没声音**：先检查侧边的**静音开关**。iOS 上网页音频会被物理静音键掐掉，这个和网页无关
- **打击垫**：手指按在垫子上不动，会按落点高度给不同力度（靠下更响）
- **移调要等**：一首 4 分钟的歌，电脑上约 8 秒，手机上可能要 20–40 秒。处理期间原调会继续播，算完自动无缝切过去，不会静音卡住
- **导出 WAV**：手机上会走系统分享面板，存到「文件」App

## 键盘快捷键

| 键 | 作用 |
|---|---|
| `空格` | 播放 / 停止 |
| `A S D F G H J K` | 8 个打击垫 |
| `Ctrl+Z` | 撤销上一次改动 |
| `Esc` | 关闭弹出的音色/风格菜单 |

## 已知限制

这些是明确的取舍，不是 bug：

- **移调范围 ±6 半音**。到 ±6 时音色会明显发闷（界面上会提示）——这是相位声码器的固有代价。要大幅变调，建议直接找个对应调的伴奏版本
- **导出只有 WAV**，没有 MP3。加编码器会破坏「单文件零依赖」，所以不做
- **长音频吃内存**。一首 4 分钟的歌在 48kHz 立体声下，原始 + 移调后两份约 180MB，处理峰值可能到 300MB。低端手机上（3GB 内存）会比较吃力
- **不做多轨录音**，不做 song mode（整曲编排）。这是节拍器/伴奏工具，不是 DAW
- **测试覆盖有限**：主要在 Chromium 上开发和验证；iOS Safari 做了针对性适配（系统分享导出、静音键提示、全屏），但没有在全部机型上逐一实测。Firefox 理论上可用，未专门适配

## 项目状态

**会持续更新，但更新时间不保证。**

作者有本职工作，这个项目是业余做的。所以：

- 修 bug 和新功能的优先级，基本取决于**我自己用不用得上**
- issue 和 PR 都欢迎，但**不承诺响应时间**，可能躺很久
- 如果你提的建议正好撞上我的需求，大概率很快就能做；否则可能一直挂着

提前说清楚，免得你等了半天。

这个项目由 AI 深度参与开发（架构、算法、调优都是结对做的），作者负责需求、判断和验收。所以代码风格上可能有些地方不太"人味"，见谅。

## 技术实现

如果你想看某个具体部分怎么做的：

- **音频引擎**：Web Audio API，25ms 调度器 + 120ms lookahead 预排程，避开 `setInterval` 抖动
- **音色合成**：全部程序化合成，不依赖采样库。鼓组部分额外内嵌了 14 件 CC0 采样，按前 150ms RMS 逐件配平响度
- **移调**：**相位声码器**（STFT，2048 点窗 / hop 512 / Hann 窗，逐频点独立推进相位）+ 带限重采样。跑在 Blob Worker 里，主线程全程不阻塞

> 为什么不用 WSOLA：时间伸缩时相邻帧必须错开 `HS×(1/ratio−1)` 个采样，这个错位对不同频率造成的相位偏移量不同，高频累积到接近一整周就会相干抵消。实测高频衰减 −3.4dB、低频堆积 +3.4dB（抖动 12dB），听感就是"滋滋啦啦"。调参数救不回来，这是算法本质。

- **导出**：`OfflineAudioContext` 离线渲染，比实时快得多
- **单文件**：六千多行里的所有音色、样式、逻辑全部内联，零外部请求

## 素材与致谢

鼓组采样来自 [SFXMint — Acoustic Drum Kit](https://sfxmint.com/sets/acoustic-drum-kit)，授权 **CC0-1.0**（公有领域，允许再分发，无需署名）。详细取证见 [docs/SAMPLE-SOURCES.md](docs/SAMPLE-SOURCES.md)。

其余所有音色均为代码实时合成，无外部素材。

## 许可

[MIT](LICENSE) —— 随便用，改，拿去改成你自己的。

<br>

---

<details>
<summary><b>English</b></summary>

A single-file browser drum machine / backing-track player. No install, no build, no network — just open `index.html`.

9 layers / 13 tracks, 8 velocity-sensitive pads, 16 style presets, bass and chord pads, plus an imported-audio player with independent tempo and pitch control (phase vocoder).

Works on desktop and mobile. Everything is inlined: zero external requests, fully offline.

**Status:** maintained on a best-effort basis. Issues and PRs are welcome but response time is not guaranteed.

**License:** MIT. Drum samples are CC0 from SFXMint.

</details>
