## 1. 类型定义

- [x] 1.1 创建 `src/types/image.ts`，定义 ImageStatus、Image、ImageFilters、ImageListResponse、CreateImageRequest、UpdateImageRequest 类型

## 2. Mock 数据与 API

- [x] 2.1 创建 `src/mocks/imageData.ts`，包含镜像 mock 数据和 CRUD 纯函数
- [x] 2.2 在 `src/mocks/handlers.ts` 中注册镜像相关 API handlers（GET 列表、POST 创建、PUT 更新、DELETE 删除）

## 3. Store

- [x] 3.1 创建 `src/stores/image.ts`，实现 useImageStore（fetchImages、createImage、updateImage、deleteImage、resetFilters）

## 4. 路由与导航

- [x] 4.1 在 `src/router/index.ts` 中添加 `/admin/images` 路由，指向 ImageList.vue
- [x] 4.2 在 `src/components/admin/AdminLayout.vue` 的 menuItems 中添加镜像管理菜单项

## 5. 组件实现

- [x] 5.1 创建 `src/components/admin/ImageTable.vue`，实现镜像列表表格（列：名称、标签、版本、大小、状态、描述、创建时间）
- [x] 5.2 创建 `src/components/admin/ImageDetailDrawer.vue`，实现镜像详情抽屉
- [x] 5.3 创建 `src/components/admin/ImageCreateModal.vue`，实现新增/编辑镜像弹窗（含表单校验）
- [x] 5.4 创建 `src/components/admin/ImageDeleteConfirmModal.vue`，实现删除确认弹窗

## 6. 页面集成

- [x] 6.1 创建 `src/views/admin/ImageList.vue`，集成搜索、筛选、排序、表格、弹窗、抽屉
