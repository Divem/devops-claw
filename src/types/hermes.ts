// ==================== 用户端 Hermes 类型 ====================

export type HermesPageState = 'loading' | 'empty' | 'has_project' | 'admin'

export type HermesModalState = 'none' | 'create' | 'progress' | 'complete' | 'delete'

export type HermesProgressStep = 'vm' | 'hermes' | 'feishu'

export type HermesStepStatus = 'pending' | 'running' | 'done' | 'error'

export interface HermesStepInfo {
  key: HermesProgressStep
  label: string
  status: HermesStepStatus
  elapsed?: number
}

export type HermesProjectStatus = 'creating' | 'deployed' | 'pending_approval' | 'error'

export interface HermesProject {
  id: string
  name: string
  botName?: string
  avatarUrl: string
  status: HermesProjectStatus
  appId?: string
  appSecret?: string
  gatewayUrl?: string
  feishuChatUrl?: string
  createdAt: string
  botConfigured: boolean
}

export interface CreateHermesProjectPayload {
  name: string
  botName?: string
  avatarUrl: string
  appId?: string
  appSecret?: string
}

export interface UpdateHermesBotConfigPayload {
  appId: string
  appSecret: string
}

export interface HermesProgressResponse {
  steps: Array<{
    key: HermesProgressStep
    status: HermesStepStatus
    elapsed?: number
  }>
  done: boolean
}

// ==================== 管理端 Hermes 类型 ====================

export type HermesVmStatus = 'running' | 'stopped' | 'error'

export type HermesFeishuConnectionStatus = 'connected' | 'pending' | 'disconnected'

export type HermesInstanceAction =
  | 'start'
  | 'stop'
  | 'restart'
  | 'restart-gateway'
  | 'repair-config'
  | 'reset-instance'
  | 'delete'

export type HermesGlobalConfigStatus = 'synced' | 'pending' | 'outdated'

export interface HermesOperationLog {
  id: string
  action: string
  operator: string
  timestamp: string
  detail?: string
}

export interface HermesInstance {
  id: string
  name: string
  avatarUrl: string
  ownerName: string
  ownerId: string
  vmStatus: HermesVmStatus
  feishuStatus: HermesFeishuConnectionStatus
  createdAt: string
  lastActiveAt: string
  appId?: string
  projectId?: string
  globalConfigStatus?: HermesGlobalConfigStatus
  lastConfigSyncAt?: string
}

export interface HermesInstanceDetail extends HermesInstance {
  ip: string
  cpuSpec: string
  memorySpec: string
  uptime: number
  gatewayHealthy: boolean
  hermesVersion: string
  logs: HermesOperationLog[]
}

export interface HermesInstanceFilters {
  search: string
  status: HermesVmStatus[]
  sort: 'createdAt' | 'lastActiveAt'
  order: 'asc' | 'desc'
}

export interface HermesInstanceListResponse {
  items: HermesInstance[]
  total: number
  page: number
  pageSize: number
}

export interface CreateHermesInstanceRequest {
  name: string
  avatarUrl: string
  appId?: string
  appSecret?: string
}

export interface HermesInstanceCreateStep {
  key: 'vm' | 'hermes' | 'feishu'
  label: string
  status: 'pending' | 'running' | 'done' | 'error'
  elapsed?: number
  note?: string
}

export interface HermesInstanceCreateProgress {
  steps: HermesInstanceCreateStep[]
  done: boolean
}
