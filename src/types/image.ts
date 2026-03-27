/** 镜像类型 */
export type ImageType = 'vm' | 'openclaw'

/** 镜像状态 */
export type ImageStatus = 'available' | 'unavailable' | 'building'

/** 镜像信息 */
export interface Image {
  id: string
  type: ImageType
  name: string
  imageUrl: string
  version: string
  size: number
  status: ImageStatus
  description: string
  createdAt: string
  updatedAt: string
}

/** 镜像筛选条件 */
export interface ImageFilters {
  search: string
  status: ImageStatus[]
  type: ImageType[]
  sort: 'createdAt' | 'name'
  order: 'asc' | 'desc'
}

/** 镜像列表分页响应 */
export interface ImageListResponse {
  items: Image[]
  total: number
  page: number
  pageSize: number
}

/** 创建镜像请求 */
export interface CreateImageRequest {
  type: ImageType
  name: string
  imageUrl: string
  version: string
  description?: string
  size?: number
}

/** 更新镜像请求 */
export interface UpdateImageRequest {
  name: string
  description: string
}
