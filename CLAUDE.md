# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

DevOps OpenClaw — 企业内部的 OpenClaw（开源 AI 助手平台）托管服务，模仿飞书 OpenClaw 的产品体验，让员工一键创建专属 AI 助手。项目当前处于规划设计阶段。

产品关系：OpenClaw（开源项目）→ 飞书 OpenClaw（飞书托管服务）→ DevOps OpenClaw（本项目，企业内部自建）

## Key Documentation

- `docs/devops-claw-prd.md` — 完整产品需求文档（信息架构、流程图、功能需求）
- `docs/devops-claw-readme.md` — 部署时序图和背景说明
- `docs/design-token.md` — MTP Web 设计令牌规范（颜色、字号、间距、阴影、动画、断点）
- `docs/permission.json` — 飞书机器人权限清单（tenant + user 级别）
- `docs/images/` — 飞书 OpenClaw UI 截图（设计参考）

## Architecture

三层架构：

- **员工端前台** — 一键创建 OpenClaw、项目管理、跳转 Gateway Dashboard / 飞书聊天
- **管理端后台** — 实例监控、凭证池管理、长连接审批、资源配额
- **后端服务** — 编排引擎（VM 生命周期）、飞书集成服务（OAuth/WebSocket）、监控服务、API Gateway

核心部署流程分三阶段：管理员准备凭证 → 员工一键创建（自动化 VM + OpenClaw 安装 + Gateway 启动）→ 管理员配置飞书长连接

## Design System

使用 MTP Web 设计令牌体系，品牌主色 `#006eff`，基于 Less 变量 + Tailwind CSS。详见 `docs/design-token.md`。

## OpenSpec Workflow

项目使用 OpenSpec 进行规范驱动的变更管理，配置在 `openspec/config.yaml`。

- `/opsx:propose` — 创建变更提案
- `/opsx:apply` — 实施变更
- `/opsx:archive` — 归档变更
- `/opsx:explore` — 探索思考模式
