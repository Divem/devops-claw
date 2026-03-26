import type { Project, MockUser, ProgressStep, StepStatus } from '@/types/project'

export const mockUser: MockUser = {
  id: 'user-001',
  name: '达尔文',
  avatarUrl: '/avatars/default-user.svg',
}

export const avatarList = Array.from(
  { length: 12 },
  (_, i) => `/avatars/avatar-${i + 1}.svg`,
)

let currentProject: Project | null = null
let progressCallCount = 0

export function getProject(): Project | null {
  return currentProject
}

export function createProject(name: string, botName: string, avatarUrl: string): Project {
  progressCallCount = 0
  currentProject = {
    id: crypto.randomUUID(),
    name,
    botName,
    avatarUrl,
    status: 'creating',
    gatewayUrl: 'https://gateway.example.com/dashboard',
    feishuChatUrl: 'https://applink.feishu.cn/client/chat/open',
    createdAt: new Date().toISOString(),
  }
  return currentProject
}

export function getProgress() {
  progressCallCount++

  const steps: Array<{ key: ProgressStep; status: StepStatus; elapsed: number | undefined }> = [
    { key: 'vm', status: 'pending', elapsed: undefined },
    { key: 'openclaw', status: 'pending', elapsed: undefined },
    { key: 'feishu', status: 'pending', elapsed: undefined },
  ]

  if (progressCallCount >= 1) {
    steps[0] = { key: 'vm', status: progressCallCount >= 2 ? 'done' : 'running', elapsed: progressCallCount >= 2 ? 2 : undefined }
  }
  if (progressCallCount >= 2) {
    steps[1] = { key: 'openclaw', status: progressCallCount >= 3 ? 'done' : 'running', elapsed: progressCallCount >= 3 ? 3 : undefined }
  }
  if (progressCallCount >= 3) {
    steps[2] = { key: 'feishu', status: progressCallCount >= 4 ? 'done' : 'running', elapsed: progressCallCount >= 4 ? 1 : undefined }
  }

  const done = progressCallCount >= 4

  if (done && currentProject) {
    currentProject.status = 'pending_approval'
  }

  return { steps, done }
}

export function deleteProject(): void {
  currentProject = null
  progressCallCount = 0
}
