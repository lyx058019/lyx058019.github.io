---
title: "3分钟迁移 OpenClaw 环境：openclaw-deploy 实战"
date: "2026-03-22"
description: "换服务器、重装系统、不想从头配置？用 openclaw-deploy 一键把整个 OpenClaw 环境打包带走，到新机器解压就能跑。"
tags: ["OpenClaw", "DevOps", "自动化", "工具推荐"]
---

# 3分钟迁移 OpenClaw 环境：openclaw-deploy 实战

换服务器、重装系统、想在新设备上快速恢复 OpenClaw——这些问题你一定遇到过。

今天介绍一个我自己一直在用的工具：`openclaw-deploy`，专门解决 OpenClaw 环境打包和迁移的问题。

---

## 痛点

我之前每次换机器都要做这几件事：

1. 重新装 Node.js、npm、全局包
2. 手动迁移 `~/.openclaw` 配置
3. 重建 Agent 工作区、记忆文件
4. 重新配置 skills 和插件
5. 一个细节漏了就要花半小时排查

**整个过程通常要 1-2 小时。**

---

## 解决思路

`openclaw-deploy` 把这个过程压缩成两步：

```
旧机器 → 一条命令打包 → 传一个 tar.gz 文件 → 新机器 → 一条命令部署
```

实际耗时：**3 分钟以内**（网络传输时间另计）。

---

## 完整操作流程

### 第一步：在旧机器上打包

```bash
# 克隆工具（如果你还没有）
git clone https://github.com/lyx058019/openclaw-deploy.git
cd openclaw-deploy

# 完整打包（包含配置、工作区、skills、Docker 文件）
./build/full/full_builder.sh \
  --output ~/openclaw-backup-$(date +%Y%m%d).tar.gz
```

打包过程会自动：

- 扫描 `~/.openclaw` 所有文件
- **自动清除敏感信息**（API keys、tokens、密码）
- 生成 SHA256 校验文件
- 输出完整压缩包

### 第二步：在新机器上部署

```bash
# 上传打包文件
scp ~/openclaw-backup-20260322.tar.gz user@new-server:~/

# SSH 进去
ssh user@new-server

# 解压 + 部署（一条命令）
tar -xzf openclaw-backup-20260322.tar.gz
cd openclaw-deploy
./scripts/deploy.sh
```

`deploy.sh` 会自动：

1. 检测目标环境（系统版本、Docker、端口占用）
2. 识别冲突文件，按策略处理（默认：先备份旧文件）
3. 还原所有文件到 `~/.openclaw`
4. 验证部署结果（容器健康检查）

---

## 进阶用法

### 自定义打包（只打包指定内容）

不想打包整个环境？可以用自定义模式，只打包你需要的内容：

```bash
./build/custom/custom_builder.sh \
  --output ~/openclaw-config-only.tar.gz \
  --exclude "memory/*.md" \
  --exclude "workspace/memory/*"
```

这样可以排除日志、临时记忆文件，大幅缩小包体积。

### 冲突处理策略

部署时如果遇到同名文件冲突，可以指定处理策略：

| 参数 | 行为 |
|------|------|
| `--conflict backup`（默认） | 先备份旧文件，再覆盖 |
| `--conflict cover` | 直接覆盖，不保留旧文件 |
| `--conflict update` | 只更新插件/配置，不动核心文件 |
| `--conflict parallel` | 安装到独立目录，多版本共存 |

```bash
./scripts/deploy.sh --conflict update
```

### 远程部署（不需要手动传文件）

如果你 SSH key 已经配置好了，可以直接从本机部署到远程：

```bash
./build/remote/remote_deploy.sh \
  --host 192.168.1.100 \
  --user root \
  --key ~/.ssh/id_rsa \
  --package ~/openclaw-backup-20260322.tar.gz
```

一条命令完成：上传 → 解压 → 部署全部自动完成。

---

## Docker 环境也能用

如果你的 OpenClaw 是跑在 Docker 里的，打包文件里已经包含了完整的 `docker-compose.yml` 和 `Dockerfile`：

```bash
# 在新服务器上
cd openclaw-deploy/docker
cp .env.example .env
# 编辑 .env，填入你的 API Keys
docker-compose up -d
```

完整的容器化部署，不需要在主机上安装 Node.js。

---

## 安全性

`openclaw-deploy` 在打包阶段会自动处理敏感信息：

- **排除敏感字段**：API keys、tokens、passwords 不会写入 tar.gz
- **部署后手动填入**：Keys 通过 `docker/.env` 注入，不落地在配置文件中
- **SHA256 校验**：传输前后完整性验证，防止文件被篡改

---

## 效果对比

| 操作 | 手动操作 | 用 openclaw-deploy |
|------|---------|-------------------|
| 打包时间 | 30-60 分钟 | **30 秒** |
| 迁移时间 | 1-2 小时 | **1-3 分钟** |
| 遗漏配置风险 | 高 | **极低** |
| 跨版本兼容 | 手动处理 | 自动适配 |

---

## 适合谁用

- **有多个 OpenClaw 实例**需要管理的用户
- **经常换设备**（换电脑、重装系统）的 OpenClaw 重度用户
- **团队协作**：标准化团队成员的 OpenClaw 环境配置
- **服务器部署**：想把开发环境配置快速部署到生产服务器

---

## 安装方式

**方式一：从 GitHub 克隆**

```bash
git clone https://github.com/lyx058019/openclaw-deploy.git
cd openclaw-deploy
```

**方式二：从 ClawHub 安装**

如果你使用 OpenClaw，可以直接用 [ClawHub](https://clawhub.com/s/lyx-openclaw-deploy) 安装：

```bash
clawhub install lyx-openclaw-deploy
```

---

## 写在最后

工具的价值不在于"功能多"，而在于解决真实痛点。

`openclaw-deploy` 解决的就是一个很具体的问题：**每次换环境都要重复劳动**。这个问题不大，但频率高了之后，时间成本很可观。

花 3 分钟打包，到新机器 1 分钟跑起来——省下来的时间做别的事，不香吗？

---

*项目地址：https://github.com/lyx058019/openclaw-deploy*  
*ClawHub：https://clawhub.com/s/lyx-openclaw-deploy*
