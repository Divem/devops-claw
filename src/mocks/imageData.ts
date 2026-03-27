import type { Image, ImageType, ImageStatus, ImageListResponse, CreateImageRequest, UpdateImageRequest } from '@/types/image'

const imageStatuses: ImageStatus[] = ['available', 'available', 'available', 'available', 'unavailable', 'available', 'building', 'available', 'available', 'unavailable']

const imageSeeds: { type: ImageType; name: string; imageUrl: string; version: string; size: number; description: string }[] = [
  { type: 'vm', name: 'Ubuntu 22.04 LTS', imageUrl: 'registry.internal.com/vm/ubuntu-22.04:v2024.03', version: 'v2024.03', size: 2048, description: 'Ubuntu 22.04 长期支持版本，预装基础开发工具' },
  { type: 'openclaw', name: 'OpenClaw v1.4.2', imageUrl: 'registry.internal.com/openclaw/openclaw:v1.4.2', version: 'v1.4.2', size: 512, description: 'OpenClaw 最新稳定版本，含飞书连接支持' },
  { type: 'vm', name: 'Ubuntu 20.04 LTS', imageUrl: 'registry.internal.com/vm/ubuntu-20.04:v2024.02', version: 'v2024.02', size: 1890, description: 'Ubuntu 20.04 长期支持版本，兼容旧版运行环境' },
  { type: 'openclaw', name: 'OpenClaw v1.3.0', imageUrl: 'registry.internal.com/openclaw/openclaw:v1.3.0', version: 'v1.3.0', size: 480, description: 'OpenClaw v1.3.0 稳定版本' },
  { type: 'vm', name: 'CentOS 7', imageUrl: 'registry.internal.com/vm/centos-7:v2024.01', version: 'v2024.01', size: 1750, description: 'CentOS 7 企业级服务器镜像' },
  { type: 'vm', name: 'Windows Server 2022', imageUrl: 'registry.internal.com/vm/windows-server-2022:v2024.03', version: 'v2024.03', size: 5120, description: 'Windows Server 2022 数据中心版' },
  { type: 'openclaw', name: 'OpenClaw v1.5.0-beta', imageUrl: 'registry.internal.com/openclaw/openclaw:v1.5.0-beta.1', version: 'v1.5.0-beta.1', size: 530, description: 'OpenClaw v1.5.0 测试版本，新增插件系统' },
  { type: 'vm', name: 'Debian 12', imageUrl: 'registry.internal.com/vm/debian-12:v2024.02', version: 'v2024.02', size: 1620, description: 'Debian 12 Bookworm 精简版' },
  { type: 'openclaw', name: 'OpenClaw v1.4.0', imageUrl: 'registry.internal.com/openclaw/openclaw:v1.4.0', version: 'v1.4.0', size: 505, description: 'OpenClaw v1.4.0 稳定版本' },
  { type: 'vm', name: 'Rocky Linux 9', imageUrl: 'registry.internal.com/vm/rocky-linux-9:v2024.01', version: 'v2024.01', size: 1840, description: 'Rocky Linux 9，CentOS 替代方案' },
]

function generateImages(): Image[] {
  return imageSeeds.map((seed, i) => {
    const daysAgo = Math.floor(Math.random() * 60)
    const createdAt = new Date()
    createdAt.setDate(createdAt.getDate() - daysAgo)

    const updateHoursAgo = Math.floor(Math.random() * daysAgo * 24)
    const updatedAt = new Date()
    updatedAt.setHours(updatedAt.getHours() - updateHoursAgo)

    return {
      id: `img-${String(i + 1).padStart(3, '0')}`,
      type: seed.type,
      name: seed.name,
      imageUrl: seed.imageUrl,
      version: seed.version,
      size: seed.size,
      status: imageStatuses[i],
      description: seed.description,
      createdAt: createdAt.toISOString(),
      updatedAt: updatedAt.toISOString(),
    }
  })
}

let images = generateImages()

export function getImages(params: {
  search?: string
  status?: string
  type?: string
  sort?: string
  order?: string
  page?: number
  pageSize?: number
}): ImageListResponse {
  let filtered = [...images]

  if (params.search) {
    const q = params.search.toLowerCase()
    filtered = filtered.filter(
      (img) => img.name.toLowerCase().includes(q),
    )
  }

  if (params.status) {
    const statuses = params.status.split(',')
    filtered = filtered.filter((img) => statuses.includes(img.status))
  }

  if (params.type) {
    const types = params.type.split(',')
    filtered = filtered.filter((img) => types.includes(img.type))
  }

  const sort = params.sort || 'createdAt'
  const order = params.order || 'desc'
  filtered.sort((a, b) => {
    const aVal = sort === 'name' ? a.name : a.createdAt
    const bVal = sort === 'name' ? b.name : b.createdAt
    return order === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal)
  })

  const page = params.page || 1
  const pageSize = params.pageSize || 10
  const start = (page - 1) * pageSize
  const items = filtered.slice(start, start + pageSize)

  return { items, total: filtered.length, page, pageSize }
}

export function createImage(data: CreateImageRequest): Image {
  const newImage: Image = {
    id: `img-${String(images.length + 1).padStart(3, '0')}-${Date.now()}`,
    type: data.type,
    name: data.name,
    imageUrl: data.imageUrl,
    version: data.version,
    size: data.size ?? 0,
    status: 'available',
    description: data.description ?? '',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
  images.unshift(newImage)
  return newImage
}

export function updateImage(id: string, data: UpdateImageRequest): Image | null {
  const img = images.find((i) => i.id === id)
  if (!img) return null

  img.name = data.name
  img.description = data.description
  img.updatedAt = new Date().toISOString()
  return img
}

export function deleteImage(id: string): boolean {
  const idx = images.findIndex((i) => i.id === id)
  if (idx === -1) return false
  images.splice(idx, 1)
  return true
}
