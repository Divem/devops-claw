/** 虚拟机状态 */
export type VmStatus = 'running' | 'stopped' | 'error'

/** 飞书连接状态 */
export type FeishuConnectionStatus = 'connected' | 'pending' | 'disconnected'

/** 实例操作类型 */
export type InstanceAction = 'start' | 'stop' | 'restart' | 'delete'

/** 操作日志条目 */
export interface OperationLog {
  id: string
  action: string
  operator: string
  timestamp: string
  detail?: string
}

/** 实例基本信息（列表用） */
export interface Instance {
  id: string
  name: string
  avatarUrl: string
  ownerName: string
  ownerId: string
  vmStatus: VmStatus
  feishuStatus: FeishuConnectionStatus
  createdAt: string
  lastActiveAt: string
  appId?: string
}

/** 实例详情（抽屉用） */
export interface InstanceDetail extends Instance {
  ip: string
  cpuSpec: string
  memorySpec: string
  uptime: number
  gatewayHealthy: boolean
  openclawVersion: string
  logs: OperationLog[]
}

/** 实例列表筛选条件 */
export interface InstanceFilters {
  search: string
  status: VmStatus[]
  sort: 'createdAt' | 'lastActiveAt'
  order: 'asc' | 'desc'
}

/** 实例列表分页响应 */
export interface InstanceListResponse {
  items: Instance[]
  total: number
  page: number
  pageSize: number
}

/** 审批状态 */
export type ApprovalStatus = 'all' | 'pending' | 'approved'

/** 审批记录 */
export interface Approval {
  id: string
  instanceId: string
  instanceName: string
  instanceAvatarUrl: string
  ownerName: string
  ownerAvatarUrl: string
  appId: string
  status: ApprovalStatus
  submittedAt: string
  approvedAt?: string
  feishuStatus: FeishuConnectionStatus
}

/** 审批视图模式 */
export type ApprovalViewMode = 'card' | 'compact' | 'list'

/** 飞书开放平台基础 URL */
export const FEISHU_OPEN_PLATFORM_URL = 'https://open.feishu.cn'

/** 仪表盘统计 */
export interface DashboardStats {
  totalInstances: number
  runningInstances: number
  stoppedInstances: number
  errorInstances: number
}

/** 仪表盘资源使用 */
export interface DashboardResources {
  cpu: number
  memory: number
  storage: number
  network: number
}
