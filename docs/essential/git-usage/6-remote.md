---
title: '第 6 章：社交编程Git 与 GitHub'
createTime: 2025/12/25 10:25:00
permalink: /essential/git-usage/6-remote/
---

# 第 6 章：社交编程Git 与 GitHub

::: tip 本章目标
学会将本地代码推送到云端（GitHub），并了解如何下载别人的代码。
:::

## 一、  Git vs GitHub

很多新手分不清这两个：
- **Git**：是一个工具（像 Photoshop）。
- **GitHub**：是一个网站（像 Instagram）。
- 你用 Git（工具）处理代码，然后传到 GitHub（网站）上展示和备份。

::: info 商业传奇：GitHub 的崛起
2008 年，三个年轻人觉得 Git 虽然好用，但太难在网上分享代码了。于是他们在一个周末写出了 GitHub 的原型。

他们发明了 **Pull Request (PR)** 这个功能。在此之前，给开源项目贡献代码非常麻烦（需要发邮件贴补丁）。有了 PR，任何人都可以 Fork（复制）一份代码，改完后点一下“请求合并”，原作者就能看到并一键合并。

这个功能彻底改变了开源世界。如今，GitHub 已经被微软以 75 亿美元收购，成为了全球最大的开发者社区（也被戏称为“全球最大的同性交友网站”）。
:::

## 二、  推送代码（Push）

假设你已经在 GitHub 上注册了账号。

### 2.1 创建远程仓库
1.  登录 GitHub，点击右上角的 `+` -> `New repository`。
2.  起个名字，比如 `my-first-repo`。
3.  点击 `Create repository`。

### 2.2 关联远程仓库
GitHub 会给你一串命令，找到 **"or push an existing repository from the command line"** 那一栏。

在你的本地项目终端里输入：

```bash
# 添加远程仓库地址（origin 是给远程仓库起的别名）
git remote add origin https://github.com/你的用户名/my-first-repo.git

# 把本地的 main 分支推送到 origin 的 main 分支
git push -u origin main
```

- 第一次推送可能需要输入 GitHub 账号密码（现在通常是用 Token 或浏览器授权）。
- `-u` 的意思是记住这个对应关系，以后只需要输 `git push` 就行了。

刷新 GitHub 页面，你的代码是不是已经在上面了？

## 三、  克隆代码（Clone）

如果你想下载别人的开源项目（比如 Vue.js），或者换了台电脑想下载自己的代码。

1.  在 GitHub 项目页面点击绿色的 `Code` 按钮，复制 URL。
2.  在终端输入：

```bash
git clone https://github.com/vuejs/core.git
```

Git 会自动把整个项目下载下来，并且自带完整的版本历史。

## 四、  拉取更新（Pull）

如果你和队友一起开发，队友推送了新代码到 GitHub，你需要把它同步到你本地。

```bash
git pull
```

这相当于下载 + 合并。

## 五、  结语

恭喜你！你已经掌握了 Git 的核心用法：
1.  **`git init`**：初始化
2.  **`git add` / `git commit`**：日常存档
3.  **`git status` / `git log`**：查看状态和历史
4.  **`git branch` / `git merge`**：分支管理
5.  **`git push` / `git pull`**：云端同步

如果你还想更深入了解 Git 和 GitHub，可以参考官方文档和更多高级教程。

现在的你，已经不再是那个只会复制粘贴备份的小白了。去 GitHub 上探索广阔的开源世界吧！
