## Context

平台管理后台目前有仪表盘、实例管理、全局配置、审批管理四个模块。当前创建实例时，镜像信息由用户手动填写，没有统一的镜像资产管理能力。需要新增镜像管理模块，让管理员维护可用镜像列表，员工创建实例时可直接选择。

技术栈：Vue 3 + TypeScript + Pinia + Naive UI + MSW mock。数据层使用 fetch + MSW mock handlers，遵循项目现有的 store 模式。

## Goals / Non-Goals

**Goals:**
- 提供镜像 CRUD 管理能力（列表、搜索、筛选、新增、编辑、删除）
- 管理后台侧边栏集成镜像管理入口
- 定义完整的类型体系和 Mock API
- 遵循现有实例管理的交互模式（表格 + 抽屉 + 弹窗）

**Non-Goals:**
- 镜像构建/推送等 CI/CD 流程（仅管理元数据）
- 镜像仓库对接（暂不对接 Harbor/Docker Registry）
- 实例创建流程改造（后续独立变更）
- 镜像版本历史管理

## Decisions

### 1. 镜像数据模型

选择轻量级元数据模型，包含名称、标签（tag）、版本、大小、状态、描述、创建时间等字段。

**备选方案：**
- A) 完整 OCI 镜像模型（manifest、digest、layer） → 过重，当前阶段不需要
- B) 轻量元数据模型 → 选定，满足管理需求且易于实现

### 2. 组件结构

遵循现有实例管理模式：`ImageList.vue`（页面）→ `ImageTable.vue`（表格）+ `ImageCreateModal.vue`（创建/编辑弹窗）+ `ImageDetailDrawer.vue`（详情抽屉）。

### 3. Store 设计

独立 `useImageStore`，遵循 setup store 模式。包含列表状态、筛选条件、分页信息、CRUD 方法。与 `adminStore` 解耦，避免单文件过大。

### 4. Mock 数据

独立 `imageData.ts` 文件，与 `adminData.ts` 平行。handler 注册在 `handlers.ts` 中，遵循 `/api/admin/images` 前缀。

## Risks / Trade-offs

- **[与实例创建流程的衔接]** → 当前仅建设管理端，实例创建时选择镜像的能力留待后续变更
- **[Mock 数据的真实性]** → 镜像大小、版本号等数据为模拟数据，后端对接时需调整
