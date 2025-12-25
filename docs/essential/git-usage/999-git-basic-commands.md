---
title: Git 基础命令使用指南（全到爆炸版）
createTime: 2025-12-20
permalink: /essential/git-usage/999-git-basic-commands/
---

# Git 基础命令使用指南

Git 是目前最流行的分布式版本控制系统，掌握 Git 的基本命令是每个开发者的必备技能。本文将带你了解 Git 的核心概念和常用命令。

## Git 基础概念

在开始学习命令之前，先了解几个重要概念：

- **工作区 (Workspace)**：你在电脑上看到的目录
- **暂存区 (Staging Area)**：通过 `git add` 添加的文件区域
- **本地仓库 (Local Repository)**：通过 `git commit` 提交到的本地版本库
- **远程仓库 (Remote Repository)**：托管在服务器上的版本库

## 初始化和配置

### 初始化仓库
```bash
# 在当前目录初始化 Git 仓库
git init

# 克隆远程仓库
git clone <repository-url>
git clone https://github.com/user/repo.git
```

### 配置 Git
```bash
# 设置用户名
git config --global user.name "Your Name"

# 设置邮箱
git config --global user.email "your.email@example.com"

# 查看配置
git config --list

# 设置默认编辑器
git config --global core.editor "code --wait"
```

## 基础工作流程

### 1. 查看仓库状态
```bash
# 查看工作区状态
git status

# 查看简短状态
git status -s

# 查看分支信息
git branch
git branch -a  # 显示所有分支（包含远程）
```

### 2. 添加文件到暂存区
```bash
# 添加指定文件
git add filename.js

# 添加所有修改的文件
git add .

# 添加所有变化（包括删除）
git add -A

# 添加所有修改但不包括新文件
git add -u
```

### 3. 提交更改
```bash
# 提交并添加描述
git commit -m "添加用户登录功能"

# 跳过暂存区直接提交（只对已跟踪文件有效）
git commit -am "修复bug"

# 修改上次提交
git commit --amend

# 查看提交历史
git log

# 简洁的提交历史
git log --oneline --graph --all
```

## 分支管理

### 创建和切换分支
```bash
# 创建新分支
git branch feature/login

# 切换到指定分支
git checkout feature/login

# 创建并切换
git checkout -b feature/signup

# 使用新命令
git switch -c feature/api
```

### 合并分支
```bash
# 合并 feature 分支到当前分支
git merge feature/login

# 合并时使用快进模式
git merge --ff-only feature/login

# 禁用快进模式合并
git merge --no-ff feature/login
```

### 删除分支
```bash
# 删除已合并的分支
git branch -d feature/login

# 强制删除未合并的分支
git branch -D feature/login

# 删除远程分支
git push origin --delete feature/login
```

## 远程操作

### 查看远程仓库
```bash
# 查看远程仓库配置
git remote -v

# 添加远程仓库
git remote add origin <url>

# 修改远程仓库地址
git remote set-url origin <new-url>
```

### 拉取和推送
```bash
# 拉取远程更新并合并
git pull

# 拉取但不合并
git fetch

# 推送到远程仓库
git push

# 推送并设置上游分支
git push -u origin main

# 推送所有分支
git push --all
```

## 撤销和回滚

### 撤销工作区修改
```bash
# 撤销指定文件的修改
git checkout -- filename.js

# 撤销所有修改
git checkout -- .
```

### 从暂存区撤回
```bash
# 将文件从暂存区移回工作区
git reset HEAD filename.js

# 取消所有暂存
git reset
```

### 回滚提交
```bash
# 回滚到指定提交（保留工作区内容）
git reset <commit-hash>

# 回滚到上次提交（保留工作区）
git reset HEAD~1

# 彻底回滚（工作区也会被重置）
git reset --hard <commit-hash>

# 创建一个新的提交来撤销之前的提交
git revert <commit-hash>
```

## 查看差异和状态

### 查看文件修改
```bash
# 查看工作区与暂存区的差异
git diff

# 查看暂存区与上次提交的差异
git diff --cached

# 查看工作区与上次提交的差异
git diff HEAD

# 查看指定文件的修改
git diff filename.js
```

### 查看提交信息
```bash
# 查看指定提交的详细信息
git show <commit-hash>

# 查看文件的提交历史
git log -- filename.js

# 查看所有提交统计
git log --stat
```

## 标签管理

### 创建标签
```bash
# 创建轻量标签
git tag v1.0.0

# 创建附注标签
git tag -a v1.0.0 -m "第一个正式版本"

# 查看标签
git tag

# 查看标签详情
git show v1.0.0
```

### 推送和删除标签
```bash
# 推送指定标签
git push origin v1.0.0

# 推送所有标签
git push --tags

# 删除本地标签
git tag -d v1.0.0

# 删除远程标签
git push origin --delete v1.0.0
```

## 常用工作流程

### 日常开发流程
```bash
# 1. 开始新功能前，确保主分支是最新的
git checkout main
git pull

# 2. 创建功能分支
git checkout -b feature/user-profile

# 3. 开发和提交
git add .
git commit -m "完成用户资料页面"

# 4. 推送分支
git push -u origin feature/user-profile

# 5. 创建 Pull Request 并等待代码审查
```

### 修复 bug 流程
```bash
# 1. 从主分支创建修复分支
git checkout -b hotfix/critical-bug

# 2. 修复问题并提交
git add .
git commit -m "修复关键bug"

# 3. 合并回主分支
git checkout main
git merge hotfix/critical-bug

# 4. 删除修复分支
git branch -d hotfix/critical-bug
```

## 高级但常用的命令

### 储藏更改
```bash
# 临时保存当前工作区更改
git stash

# 带消息储藏
git stash save "暂存用户模块开发"

# 查看储藏列表
git stash list

# 恢复最近的储藏
git stash pop

# 恢复指定储藏
git stash apply stash@{1}
```

### 变基 (Rebase)
```bash
# 将当前分支变基到指定分支
git rebase main

# 交互式变基（可用于修改提交历史）
git rebase -i HEAD~3
```

### 清理无用文件
```bash
# 查看需要清理的文件
git clean -n

# 清理未跟踪的文件
git clean -f

# 清理未跟踪的目录
git clean -fd

# 清理被忽略的文件
git clean -fx
```

## .gitignore 文件配置

创建 `.gitignore` 文件来忽略不需要版本控制的文件：

```gitignore
# 忽略依赖目录
node_modules/
dist/
build/

# 忽略环境变量
.env
.env.local

# 忽略 IDE 配置
.vscode/
.idea/

# 忽略系统文件
.DS_Store
Thumbs.db

# 忽略日志文件
*.log

# 忽略临时文件
*.tmp
*.temp
```

## 最佳实践建议

1. **提交频率**：小步提交，频繁提交，每个提交只做一件事
2. **提交信息**：使用清晰、简洁的提交信息，最好使用英文
3. **分支策略**：使用功能分支开发，保护主分支
4. **定期同步**：经常从主分支拉取最新代码
5. **代码审查**：通过 Pull Request 进行代码审查
6. **备份重要**：重要操作前先备份

## 总结

掌握这些 Git 基础命令后，你已经能够应对 90% 的日常开发场景。记住：

- `git status` 是你最好的朋友，不确定时先看状态
- 小步提交，写好提交信息
- 使用分支进行功能开发
- 经常与远程仓库同步

Git 的功能远不止这些，但这些基础命令已经足够支撑你的日常工作。随着经验积累，你会逐渐掌握更多高级用法！
