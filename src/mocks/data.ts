import type { Project, MockUser, ProgressStep, StepStatus } from '@/types/project'

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

export function updateBotConfig(appId: string, _appSecret: string): Project | null {
  if (!currentProject) return null
  currentProject.appId = appId
  return currentProject
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

// 管理后台仪表盘数据
export function getDashboardData() {
  // 生成近7天的日期标签
  const days: string[] = []
  const counts: number[] = []
  const dayNames = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']

  for (let i = 6; i >= 0; i--) {
    const date = new Date()
    date.setDate(date.getDate() - i)
    days.push(i === 0 ? '今天' : dayNames[date.getDay()])
    counts.push(Math.floor(Math.random() * 5))
  }

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
    trend: days.map((day, i) => ({ day, count: counts[i] })),
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
