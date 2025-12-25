---
title: '第 2 章：安装与配置——打造你的兵器库'
createTime: 2025/12/25 10:05:00
permalink: /essential/git-usage/2-install-config/
---

# 第 2 章：安装与配置——打造你的兵器库

::: tip 本章目标
在你的电脑上安装 Git，并配置好你的“身份信息”。
:::

## 一、 📥 安装 Git

### 1.1 Windows 用户
1.  访问 [Git 官网下载页面](https://git-scm.com/download/win)。
2.  下载 **"64-bit Git for Windows Setup"**。
3.  **安装过程中的选项**：
    - 大部分情况**一路点击 "Next"** 即可。
    - **注意**：在选择编辑器时，如果你安装了 VS Code，建议选择 "Use Visual Studio Code as Git's default editor"。
    - 安装完成后，在桌面或任意文件夹右键，如果看到 **"Git Bash Here"**，说明安装成功！🎉

### 1.2 macOS 用户
1.  打开终端（Terminal）。
2.  输入 `git --version`。
3.  如果没有安装，系统通常会弹窗提示你安装 "Xcode Command Line Tools"，点击安装即可。
4.  或者使用 Homebrew 安装：`brew install git`。

## 二、 ⚙️ 第一次配置：自报家门

安装好 Git 后，你必须做的第一件事就是告诉 Git **你是谁**。

因为 Git 的每一次提交（存档）都会记录是谁做的。这就像你在公司打卡一样，必须得有你的名字。

打开终端（Windows 用户请右键选择 "Git Bash Here"），输入以下两行命令：

```bash
# 1. 设置你的名字（建议用英文名或拼音）
git config --global user.name "Your Name"

# 2. 设置你的邮箱（建议用真实邮箱，GitHub 会用到）
git config --global user.email "your_email@example.com"
```

::: info 历史冷知识：为什么必须配置邮箱？
你可能会觉得：“我就在本地写代码，为什么要填邮箱？”

这其实是 Git 的核心设计之一。Git 的每一次提交（Commit）都会生成一个唯一的 ID（哈希值）。这个 ID 是怎么算出来的呢？它包含了：
1. 你的代码内容
2. 提交时间
3. **你的名字和邮箱**

这意味着，**如果你改了你的邮箱，哪怕代码一个字都没动，生成的 Commit ID 也会完全不同！** 这保证了历史记录的绝对严谨性——在 Git 的世界里，身份信息是历史的一部分，不可篡改。
:::

::: warning 注意
- `git config` 是命令。
- `--global` 表示这台电脑上所有的 Git 仓库都默认使用这个身份。
- 把 `"Your Name"` 和 `"your_email@example.com"` 替换成你自己的信息，**保留双引号**。
:::

### 检查配置是否成功

输入以下命令查看配置信息：

```bash
git config --list
```

如果你在输出中看到了 `user.name` 和 `user.email`，恭喜你，配置完成！你已经准备好开始 Git 之旅了。

## 三、 🔧 推荐工具

虽然 Git 自带命令行，但对于新手来说，配合图形化工具会更容易理解。

- **VS Code（强烈推荐）**：自带了非常强大的 Git 支持，我们后续的教程也会结合 VS Code 来演示。
- **Git Bash（Windows）**：模拟了 Linux 的命令行环境，比 Windows 自带的 CMD 好用得多。

::: tip 准备好了吗？
下一章，我们将开始真正的实操，创建你的第一个 Git 仓库！
:::
