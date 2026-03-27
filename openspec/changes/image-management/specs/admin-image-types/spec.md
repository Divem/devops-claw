## ADDED Requirements

### Requirement: 镜像状态类型
系统 SHALL 定义 `ImageStatus` 类型，取值为 `'available' | 'unavailable' | 'building'`。

#### Scenario: 类型定义验证
- **WHEN** 使用 ImageStatus 类型
- **THEN** 仅允许 available、unavailable、building 三个值

### Requirement: 镜像接口类型
系统 SHALL 定义 `Image` 接口，包含字段：id（string）、name（string）、tag（string）、version（string）、size（number，单位 MB）、status（ImageStatus）、description（string）、createdAt（string）、updatedAt（string）。

#### Scenario: 接口字段完整性
- **WHEN** 创建 Image 对象
- **THEN** 必须包含 id、name、tag、version、size、status、description、createdAt、updatedAt 字段

### Requirement: 镜像筛选条件类型
系统 SHALL 定义 `ImageFilters` 接口，包含字段：search（string）、status（ImageStatus[]）、sort（'createdAt' | 'name'）、order（'asc' | 'desc'）。

#### Scenario: 筛选条件结构
- **WHEN** 创建 ImageFilters 对象
- **THEN** 包含 search、status 数组、sort、order 字段

### Requirement: 镜像列表响应类型
系统 SHALL 定义 `ImageListResponse` 接口，包含字段：items（Image[]）、total（number）、page（number）、pageSize（number）。

#### Scenario: 分页响应结构
- **WHEN** 创建 ImageListResponse 对象
- **THEN** 包含 items 数组、total、page、pageSize 字段

### Requirement: 创建镜像请求类型
系统 SHALL 定义 `CreateImageRequest` 接口，包含字段：name（string）、tag（string）、version（string）、description（string，可选）、size（number，可选）。

#### Scenario: 创建请求结构
- **WHEN** 创建 CreateImageRequest 对象
- **THEN** name、tag、version 为必填，description 和 size 为可选

### Requirement: 更新镜像请求类型
系统 SHALL 定义 `UpdateImageRequest` 接口，包含字段：name（string）、description（string）。标签和版本不可更新。

#### Scenario: 更新请求仅包含可修改字段
- **WHEN** 创建 UpdateImageRequest 对象
- **THEN** 仅包含 name 和 description 字段
