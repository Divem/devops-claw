## ADDED Requirements

### Requirement: Store 状态管理
系统 SHALL 提供 `useImageStore` Pinia store，使用 setup store 模式。Store SHALL 管理以下状态：镜像列表（items）、总数（total）、当前页码（page）、每页条数（pageSize）、筛选条件（filters）、加载状态（isLoading）、详情项（selectedImage）。

#### Scenario: 初始状态
- **WHEN** store 初始化
- **THEN** items 为空数组，total 为 0，page 为 1，pageSize 为 10，isLoading 为 false，selectedImage 为 null

### Requirement: 获取镜像列表
Store SHALL 提供 `fetchImages()` 方法，调用 `GET /api/admin/images` 并传入搜索、状态筛选、分页、排序参数。成功后 SHALL 更新 items、total、page 状态。失败时 SHALL 静默处理错误。

#### Scenario: 成功获取列表
- **WHEN** 调用 fetchImages()
- **THEN** items 更新为返回数据，total 更新为总数

#### Scenario: 请求失败
- **WHEN** API 请求失败
- **THEN** 静默捕获错误，不抛出异常

### Requirement: 创建镜像
Store SHALL 提供 `createImage(data)` 方法，调用 `POST /api/admin/images` 传入镜像数据。成功后 SHALL 调用 fetchImages() 刷新列表。

#### Scenario: 成功创建
- **WHEN** 调用 createImage() 且请求成功
- **THEN** 自动刷新镜像列表

### Requirement: 更新镜像
Store SHALL 提供 `updateImage(id, data)` 方法，调用 `PUT /api/admin/images/:id` 传入更新数据。成功后 SHALL 调用 fetchImages() 刷新列表。

#### Scenario: 成功更新
- **WHEN** 调用 updateImage() 且请求成功
- **THEN** 自动刷新镜像列表

### Requirement: 删除镜像
Store SHALL 提供 `deleteImage(id)` 方法，调用 `DELETE /api/admin/images/:id`。成功后 SHALL 调用 fetchImages() 刷新列表。

#### Scenario: 成功删除
- **WHEN** 调用 deleteImage() 且请求成功
- **THEN** 自动刷新镜像列表

### Requirement: 筛选条件管理
Store SHALL 维护 filters 响应式对象，包含 search（字符串）、status（数组）、sort（排序字段）、order（排序方向）。SHALL 提供 `resetFilters()` 方法重置所有筛选条件。

#### Scenario: 重置筛选条件
- **WHEN** 调用 resetFilters()
- **THEN** search 为空字符串，status 为空数组，sort 为 createdAt，order 为 desc
