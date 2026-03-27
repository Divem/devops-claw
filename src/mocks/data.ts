import type { Project, MockUser, ProgressStep, StepStatus } from '@/types/project'
import type { AuthUser, AuthTokens } from '@/types/auth'

export const mockUser: MockUser = {
  id: 'user-001',
  name: '达尔文',
  avatarUrl: '/avatars/default-user.svg',
  role: 'admin',
}

export const avatarList = Array.from(
  { length: 12 },
  (_, i) => `/avatars/avatar-${i + 1}.svg`,
)

let currentProject: Project | null = null
let progressCallCount = 0

function generateProjectId(): string {
  return 'proj_' + Date.now().toString(36) + '_' + Math.random().toString(36).substring(2, 11)
}

export function getProject(): Project | null {
  return currentProject
}

export function createProject(name: string, avatarUrl: string, botName?: string): Project {
  progressCallCount = 0
  currentProject = {
    id: generateProjectId(),
    name,
    botName,
    avatarUrl,
    status: 'creating',
    gatewayUrl: 'https://gateway.example.com/dashboard',
    feishuChatUrl: 'https://www.feishu.cn/invitation/page/add_contact/?token=5a6r88f7-ecea-41fc-8b04-83c9e0c97240&unique_id=ziH9F8eSCNUbK0VkAMJEOg==',
    createdAt: new Date().toISOString(),
    botConfigured: !!botName,
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

export function updateBotConfig(appId: string, _appSecret: string): Project | null {
  if (!currentProject) return null
  currentProject.appId = appId
  return currentProject
}

// ==================== Auth Mock ====================

const mockAuthUser: AuthUser = {
  id: 'user-001',
  name: '达尔文',
  avatarUrl: '/avatars/default-user.svg',
}

function makeMockTokens(): AuthTokens {
  return {
    accessToken: 'mock-access-token-' + Date.now(),
    refreshToken: 'mock-refresh-token-' + Date.now(),
    expiresAt: Date.now() + 2 * 60 * 60 * 1000, // 2 hours
  }
}

export function mockAuthLogin(
  username: string,
  password: string,
): { user: AuthUser; tokens: AuthTokens } | null {
  // 任意非空用户名/密码均视为成功（demo 模式）
  if (!username || !password) return null
  return { user: mockAuthUser, tokens: makeMockTokens() }
}

export function mockAuthRefresh(refreshToken: string): AuthTokens | null {
  if (!refreshToken) return null
  return makeMockTokens()
}

export function mockAuthMe(authHeader: string | null): AuthUser | null {
  if (!authHeader?.startsWith('Bearer ')) return null
  return mockAuthUser
}

// Gateway 反向代理 mock 响应
export function getGatewayProxyResponse(): { status: number; body: string } {
  return {
    status: 200,
    body: `<!DOCTYPE html>
<html>
<head><title>OpenClaw Gateway</title></head>
<body style="display:flex;align-items:center;justify-content:center;height:100vh;font-family:sans-serif;color:#606266;background:#f7f7f7">
  <div style="text-align:center">
    <div style="font-size:64px;margin-bottom:16px">🤖</div>
    <h1 style="color:#30363e;font-size:20px">OpenClaw Gateway Dashboard</h1>
    <p style="margin-top:8px">iframe 嵌入模式 — 实际部署时将代理至虚拟机 Gateway 服务</p>
  </div>
</body>
</html>`,
  }
}

// 存储生成的趋势数据，确保多次调用返回一致数据
let generatedTrendData: Array<{ date: string; count: number }> | null = null

// 生成趋势数据（内部使用，生成90天数据）
function generateTrendData(): Array<{ date: string; count: number }> {
  if (generatedTrendData) {
    return generatedTrendData
  }

  const data: Array<{ date: string; count: number }> = []

  for (let i = 89; i >= 0; i--) {
    const date = new Date()
    date.setDate(date.getDate() - i)
    const dateStr = date.toISOString().split('T')[0]
    // 模拟真实数据：工作日创建较多，周末较少
    const dayOfWeek = date.getDay()
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6
    const baseCount = isWeekend ? 0 : Math.floor(Math.random() * 3) + 1
    const randomFactor = Math.random() > 0.8 ? Math.floor(Math.random() * 3) : 0
    data.push({
      date: dateStr,
      count: baseCount + randomFactor,
    })
  }

  generatedTrendData = data
  return data
}

// 管理后台仪表盘数据
export function getDashboardData(days?: number) {
  const dayCount = days || 90
  const allData = generateTrendData()
  const trendData = allData.slice(-dayCount)

  return {
    stats: {
      totalInstances: 12,
      runningInstances: 8,
      stoppedInstances: 2,
      errorInstances: 1,
    },
    resources: {
      cpu: 45,
      memory: 62,
      storage: 38,
      network: 27,
    },
    trend: trendData,
    todos: [
      {
        id: 'todo-1',
        type: 'approval',
        icon: '⏳',
        title: '实例审批：销售部 OpenClaw',
        description: '申请人：张三，申请时间：2026-03-27',
        action: '去审批',
      },
      {
        id: 'todo-2',
        type: 'error',
        icon: '⚠️',
        title: '实例异常：技术部 Gateway',
        description: '错误：无法连接飞书长连接',
        action: '查看',
      },
    ] as Array<{ id: string; type: 'approval' | 'error' | 'info'; icon: string; title: string; description: string; action?: string }>,
  }
}
