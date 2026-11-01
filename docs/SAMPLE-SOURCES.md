# 采样来源与授权

本项目会在网页中**随代码一起分发采样音频文件**（base64 内联）。

因此筛选标准是：只接受允许**再分发音频文件本身**的授权（CC0 / CC-BY / MIT 等），
不接受仅授权"用于音乐作品"的免版税素材包——那类授权不允许把采样打包进开源代码里。

最后核对：2026-11-01

---

## 已采用的素材

### SFXMint — Acoustic Drum Kit

| 项目 | 内容 |
|---|---|
| 来源页 | https://sfxmint.com/sets/acoustic-drum-kit |
| 授权 | **CC0-1.0**（公有领域） |
| 内容 | 13 个原声鼓单次击打：kick、snare、cross-stick、rimshot、3 个嗵鼓、3 个踩镲、crash、2 个 ride |
| 原始格式 | WAV / MP3 / OGG |
| 再分发 | **允许**。CC0 不保留任何权利，无需署名 |
| 取证依据 | 来源页明示 "WAV & MP3 · CC0"；元数据接口见下方 |
| 本项目用法 | 选取其中 14 个击打，裁掉尾部静音、统一转 32kHz 单声道 MP3、base64 内联进 `index.html` |

元数据接口（可用于日后复核授权状态）：

```
https://sfxmint.com/api/v1/sets/acoustic-drum-kit?format=mp3
```

原始直链清单：

```
kick        https://sfxmint.com/dl/acoustic-drum-kit-kick-01.mp3
snare       https://sfxmint.com/dl/acoustic-drum-kit-snare-01.mp3
high-tom    https://sfxmint.com/dl/acoustic-drum-kit-high-tom-01.mp3
mid-tom     https://sfxmint.com/dl/acoustic-drum-kit-mid-tom-01.mp3
floor-tom   https://sfxmint.com/dl/acoustic-drum-kit-floor-tom-01.mp3
closed-hat  https://sfxmint.com/dl/acoustic-drum-kit-closed-hat-01.mp3
open-hat    https://sfxmint.com/dl/acoustic-drum-kit-open-hat-01.mp3
pedal-hat   https://sfxmint.com/dl/acoustic-drum-kit-pedal-hat-01.mp3
crash       https://sfxmint.com/dl/acoustic-drum-kit-crash-01.mp3
ride        https://sfxmint.com/dl/acoustic-drum-kit-ride-01.mp3
ride-bell   https://sfxmint.com/dl/acoustic-drum-kit-ride-bell-01.mp3
rimshot     https://sfxmint.com/dl/acoustic-drum-kit-snare-rimshot-01.mp3
cross-stick https://sfxmint.com/dl/acoustic-drum-kit-snare-cross-stick-01.mp3
```

> 直链依赖对方站点持续可用。本项目已将文件内联，运行时不发起任何网络请求。

---

## 除此之外的全部音色

鼓组以外的所有音色（沙铃、铃鼓、拍手、康加、箱鼓、贝斯、和声垫、节拍器，以及全部合成鼓）
都是**代码实时合成**的，不包含任何第三方录音素材：

- 振荡器（sine / triangle / sawtooth / square）
- 滤波（biquad lowpass / highpass / bandpass）
- 噪声 + 包络整形
- `WaveShaper` 过载（oversample 2x）
- 卷积混响（程序生成的脉冲响应）

---

## 如果你要基于本项目二次开发

`index.html` 里的采样是 CC0，可以随意替换和再分发，不需要署名，也不受本项目 MIT 许可的约束。

但**不建议直接沿用这套采样去做商业音源库**——不是因为授权问题，而是它们经过 32kHz 单声道的
压缩处理，动态和频响都做了取舍，作为独立音源使用时品质不够。
