## Why

当前平台在创建实例时，员工需要手动输入镜像包信息，缺乏统一管理。需要一个镜像管理功能，让管理员集中维护可用镜像，员工在创建实例时可以直接选择，提升效率和规范性。

## What Changes

- 新增管理后台「镜像管理」页面，支持镜像的增删改查
- 镜像列表展示：名称、标签、版本、大小、状态、创建时间等
- 支持镜像的搜索、筛选（按状态）、排序
- 支持新增镜像、编辑镜像信息、删除镜像
- 管理后台侧边栏新增「镜像管理」导航项
- 新增镜像管理的 Pinia store、类型定义和 Mock API

## Capabilities

### New Capabilities
- `admin-image-management`: 管理后台镜像列表页面，包含搜索、筛选、排序、CRUD 操作、详情抽屉
- `admin-image-store`: 镜像管理的 Pinia store，封装镜像列表获取、创建、更新、删除等数据操作
- `admin-image-types`: 镜像相关的 TypeScript 类型定义

### Modified Capabilities
- `admin-layout`: 侧边栏新增「镜像管理」导航菜单项

## Impact

- **路由**: 新增 `/admin/images` 路由
- **侧边栏**: `AdminLayout.vue` 的 `menuItems` 新增一项
- **新增文件**: `src/views/admin/ImageList.vue`、`src/components/admin/ImageTable.vue`、`src/components/admin/ImageDetailDrawer.vue`、`src/components/admin/ImageCreateModal.vue`、`src/stores/image.ts`、`src/types/image.ts`、`src/mocks/imageData.ts`
- **修改文件**: `src/router/index.ts`、`src/components/admin/AdminLayout.vue`、`src/mocks/handlers.ts`
- **依赖**: 无新增第三方依赖，使用已有的 Naive UI 组件
