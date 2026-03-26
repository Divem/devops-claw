export type PageState = 'loading' | 'empty' | 'has_project'

export type ModalState = 'none' | 'create' | 'progress' | 'complete' | 'delete'

export type ProgressStep = 'vm' | 'openclaw' | 'feishu'

export type StepStatus = 'pending' | 'running' | 'done' | 'error'

export interface StepInfo {
  key: ProgressStep
  label: string
  status: StepStatus
  elapsed?: number
}

export type ProjectStatus = 'creating' | 'deployed' | 'pending_approval' | 'error'

export interface Project {
  id: string
  name: string
  botName: string
  avatarUrl: string
  status: ProjectStatus
  gatewayUrl?: string
  feishuChatUrl?: string
  createdAt: string
}

export interface CreateProjectPayload {
  name: string
  botName: string
  avatarUrl: string
}

export interface ProgressResponse {
  steps: Array<{
    key: ProgressStep
    status: StepStatus
    elapsed?: number
  }>
  done: boolean
}

export interface MockUser {
  id: string
  name: string
  avatarUrl: string
}
