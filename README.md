# 🎮 抓娃娃

> 基于 LayaAir 引擎开发的移动端抓娃娃机游戏，支持多平台发布

---

## 📋 项目概览

| 属性 | 详情 |
|:---:|:---|
| 项目名称 | 抓娃娃 (Zhuawawa) |
| 游戏类型 | 休闲益智 / 抓娃娃模拟器 |
| 开发引擎 | LayaAir |
| 开发语言 | TypeScript |
| 支持平台 | Web / Android / iOS |

---

## 🛠️ 技术架构

| 层级 | 技术/工具 | 说明 |
|:---:|:---|:---|
| 游戏引擎 | LayaAir | 轻量级 HTML5 游戏引擎 |
| 开发语言 | TypeScript | 类型安全的 JavaScript 超集 |
| 物理引擎 | Matter.js | 2D 物理引擎 |
| UI 系统 | LayaUI | 内置 UI 框架 |
| 资源管理 | LayaAir IDE | 可视化资源管理 |

---

## 📸 游戏截图

| 游戏界面 | 游戏画面 | 操作演示 |
|:---:|:---:|:---:|
| <img src="https://img.layabox.com/questions/20170807/a419b0e8ea0891137c49dc650362e8c1.png" width="250"> | <img src="https://img.layabox.com/questions/20170807/5cba9f737d5464a185f7308a8e19dbb9.png" width="250"> | <img src="https://img.layabox.com/questions/20170807/7bb6438898529483a70d7c41a8228ad9.png" width="250"> |
| **开始界面** | **抓取过程** | **抓取结果** |

---

## 📁 项目结构

```
zhuawawa/
├── src/                     # TypeScript 源代码
│   ├── common/              # 公共工具类
│   │   ├── Action.ts        # 动作控制
│   │   └── Tool.ts          # 工具函数
│   ├── model/               # 数据模型
│   │   ├── DollModel.ts     # 娃娃模型
│   │   ├── GameModel.ts     # 游戏模型
│   │   └── HandModel.ts     # 抓手模型
│   ├── view/                # 视图层
│   │   ├── GameView.ts      # 游戏主视图
│   │   └── PacketView.ts    # 红包视图
│   └── LayaSample.ts        # 入口文件
├── bin/                     # 编译输出
│   ├── js/                  # 编译后的 JS
│   ├── libs/                # 引擎库文件
│   ├── res/                 # 游戏资源
│   └── index.html           # 游戏入口
├── laya/                    # LayaAir IDE 资源
│   ├── assets/              # 图片素材
│   └── pages/               # UI 页面配置
├── release/                 # 发布版本
└── tsconfig.json            # TypeScript 配置
```

---

## 🎯 核心功能

| 功能模块 | 描述 |
|:---:|:---|
| 🕹️ **抓手控制** | 精准控制抓手移动、下降、抓取 |
| 🎲 **娃娃系统** | 多种娃娃类型，随机位置生成 |
| 🧧 **红包功能** | 游戏内红包奖励机制 |
| 🎨 **动画效果** | 抓取动画、粒子特效、物理碰撞 |
| 📱 **多平台适配** | 支持手机、平板、PC 访问 |

---

## 🚀 快速开始

### 环境要求

| 组件 | 版本 |
|:---:|:---|
| Node.js | 12+ |
| LayaAir IDE | 2.0+ |
| TypeScript | 4.0+ |

### 运行方式

1. **直接运行**
   ```bash
   # 打开 bin/index.html 即可在浏览器中运行
   ```

2. **开发模式**
   ```bash
   # 使用 LayaAir IDE 打开项目
   # 修改 src/ 目录下的 TypeScript 文件
   # IDE 会自动编译到 bin/ 目录
   ```

3. **发布**
   ```bash
   # 使用 LayaAir IDE 的发布功能
   # 可选择发布为 Web / Android / iOS
   ```

---

## 📦 核心文件说明

| 文件路径 | 功能说明 |
|:---|:---|
| `src/view/GameView.ts` | 游戏主界面，处理用户交互和游戏逻辑 |
| `src/model/DollModel.ts` | 娃娃数据模型，管理娃娃属性和状态 |
| `src/model/HandModel.ts` | 抓手模型，控制抓手移动和抓取逻辑 |
| `src/common/Action.ts` | 动作控制器，管理动画序列 |
| `bin/index.html` | 游戏入口页面 |

---

## 📚 技术栈详情

| 类别 | 技术 |
|:---:|:---|
| 渲染引擎 | Laya.core / Laya.webgl |
| 动画系统 | Laya.ani |
| UI 框架 | Laya.ui |
| 物理引擎 | Matter.js |
| 网络通信 | Protobuf |

---

## 📄 许可证

MIT License

---

<p align="center">Made with ❤️ using LayaAir Engine</p>
