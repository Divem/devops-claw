import type {
  HermesProject,
  HermesProgressStep,
  HermesStepStatus,
  HermesInstance,
  HermesInstanceDetail,
  HermesVmStatus,
  HermesFeishuConnectionStatus,
  HermesGlobalConfigStatus,
  HermesOperationLog,
  HermesInstanceCreateProgress,
} from '@/types/hermes'

// ==================== 用户端 Hermes Mock ====================

let currentHermesProject: HermesProject | null = null
let hermesProgressCallCount = 0

function generateHermesProjectId(): string {
  return 'hermes_' + Date.now().toString(36) + '_' + Math.random().toString(36).substring(2, 11)
}

export function getHermesProject(): HermesProject | null {
  return currentHermesProject
}

export function createHermesProject(name: string, avatarUrl: string, botName?: string): HermesProject {
  hermesProgressCallCount = 0
  currentHermesProject = {
    id: generateHermesProjectId(),
    name,
    botName,
    avatarUrl,
    status: 'creating',
    gatewayUrl: 'https://gateway.example.com/hermes',
    feishuChatUrl: 'https://www.feishu.cn/invitation/page/add_contact/?token=5a6r88f7-ecea-41fc-8b04-83c9e0c97240&unique_id=ziH9F8eSCNUbK0VkAMJEOg==',
    createdAt: new Date().toISOString(),
    botConfigured: !!botName,
  }
  return currentHermesProject
}

export function getHermesProgress() {
  hermesProgressCallCount++

  const steps: Array<{ key: HermesProgressStep; status: HermesStepStatus; elapsed: number | undefined }> = [
    { key: 'vm', status: 'pending', elapsed: undefined },
    { key: 'hermes', status: 'pending', elapsed: undefined },
    { key: 'feishu', status: 'pending', elapsed: undefined },
  ]

  if (hermesProgressCallCount >= 1) {
    steps[0] = { key: 'vm', status: hermesProgressCallCount >= 2 ? 'done' : 'running', elapsed: hermesProgressCallCount >= 2 ? 2 : undefined }
  }
  if (hermesProgressCallCount >= 2) {
    steps[1] = { key: 'hermes', status: hermesProgressCallCount >= 3 ? 'done' : 'running', elapsed: hermesProgressCallCount >= 3 ? 3 : undefined }
  }
  if (hermesProgressCallCount >= 3) {
    steps[2] = { key: 'feishu', status: hermesProgressCallCount >= 4 ? 'done' : 'running', elapsed: hermesProgressCallCount >= 4 ? 1 : undefined }
  }

  const done = hermesProgressCallCount >= 4

  if (done && currentHermesProject) {
    currentHermesProject.status = 'pending_approval'
  }

  return { steps, done }
}

export function deleteHermesProject(): void {
  currentHermesProject = null
  hermesProgressCallCount = 0
}

export function updateHermesBotConfig(appId: string, _appSecret: string): HermesProject | null {
  if (!currentHermesProject) return null
  currentHermesProject.appId = appId
  return currentHermesProject
}

// ==================== 管理端 Hermes 实例 Mock ====================

const vmStatuses: HermesVmStatus[] = ['running', 'running', 'running', 'running', 'stopped', 'stopped', 'error', 'running']
const feishuStatuses: HermesFeishuConnectionStatus[] = ['connected', 'connected', 'pending', 'connected', 'disconnected', 'disconnected', 'pending', 'connected']
const globalConfigStatuses: HermesGlobalConfigStatus[] = ['synced', 'outdated', 'synced', 'pending', 'synced', 'outdated', 'pending', 'synced']

const owners = [
  { id: 'u-h01', name: '柳晨' },
  { id: 'u-h02', name: '沈青' },
  { id: 'u-h03', name: '宋雨' },
  { id: 'u-h04', name: '秦岚' },
  { id: 'u-h05', name: '许峰' },
  { id: 'u-h06', name: '韩铭' },
  { id: 'u-h07', name: '曹阳' },
  { id: 'u-h08', name: '冯悦' },
]

const instanceNames = [
  '柳晨 的 Hermes',
  '沈青 的 Hermes',
  '宋雨 的 Hermes',
  '秦岚 的 Hermes',
  '许峰 的 Hermes',
  '韩铭 的 Hermes',
  '曹阳 的 Hermes',
  '冯悦 的 Hermes',
]

function generateInstances(): HermesInstance[] {
  return instanceNames.map((name, i) => {
    const daysAgo = Math.floor(Math.random() * 30)
    const createdAt = new Date()
    createdAt.setDate(createdAt.getDate() - daysAgo)

    const minutesAgo = vmStatuses[i] === 'running' ? Math.floor(Math.random() * 60) : Math.floor(Math.random() * 1440) + 60
    const lastActive = new Date()
    lastActive.setMinutes(lastActive.getMinutes() - minutesAgo)

    return {
      id: `hermes-${String(i + 1).padStart(3, '0')}`,
      name,
      avatarUrl: `/avatars/avatar-${(i % 12) + 1}.svg`,
      ownerName: owners[i].name,
      ownerId: owners[i].id,
      vmStatus: vmStatuses[i],
      feishuStatus: feishuStatuses[i],
      createdAt: createdAt.toISOString(),
      lastActiveAt: lastActive.toISOString(),
      appId: `cli_h${String(i + 1).padStart(4, '0')}`,
      projectId: `hermes-proj-${String(i + 1).padStart(3, '0')}`,
      globalConfigStatus: globalConfigStatuses[i],
      lastConfigSyncAt: globalConfigStatuses[i] === 'synced'
        ? new Date(Date.now() - Math.random() * 86400000).toISOString()
        : undefined,
    }
  })
}

let instances = generateInstances()

function generateLogs(instanceId: string): HermesOperationLog[] {
  const actions = ['创建实例', '启动服务', '重启 Gateway', '更新配置', '连接飞书']
  const logs: HermesOperationLog[] = []
  const count = 3 + Math.floor(Math.random() * 5)

  for (let i = 0; i < count; i++) {
    const ts = new Date()
    ts.setHours(ts.getHours() - i * 6)
    logs.push({
      id: `hermes-log-${instanceId}-${i}`,
      action: actions[i % actions.length],
      operator: owners[Math.floor(Math.random() * owners.length)].name,
      timestamp: ts.toISOString(),
      detail: i === 0 ? '操作成功' : undefined,
    })
  }
  return logs
}

export function getHermesInstances(params: {
  search?: string
  status?: string
  sort?: string
  order?: string
  page?: number
  pageSize?: number
}): { items: HermesInstance[]; total: number; page: number; pageSize: number } {
  let filtered = [...instances]

  if (params.search) {
    const q = params.search.toLowerCase()
    filtered = filtered.filter(
      (inst) => inst.name.toLowerCase().includes(q) || inst.ownerName.toLowerCase().includes(q),
    )
  }

  if (params.status) {
    const statuses = params.status.split(',')
    filtered = filtered.filter((inst) => statuses.includes(inst.vmStatus))
  }

  const sort = params.sort || 'createdAt'
  const order = params.order || 'desc'
  filtered.sort((a, b) => {
    const aVal = sort === 'lastActiveAt' ? a.lastActiveAt : a.createdAt
    const bVal = sort === 'lastActiveAt' ? b.lastActiveAt : b.createdAt
    return order === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal)
  })

  const page = params.page || 1
  const pageSize = params.pageSize || 10
  const start = (page - 1) * pageSize
  const items = filtered.slice(start, start + pageSize)

  return { items, total: filtered.length, page, pageSize }
}

export function getHermesInstanceDetail(id: string): HermesInstanceDetail | null {
  const inst = instances.find((i) => i.id === id)
  if (!inst) return null

  return {
    ...inst,
    ip: `10.1.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
    cpuSpec: '4 核',
    memorySpec: '8 GB',
    uptime: inst.vmStatus === 'running' ? Math.floor(Math.random() * 86400 * 7) : 0,
    gatewayHealthy: inst.vmStatus === 'running',
    hermesVersion: '0.9.1',
    logs: generateLogs(id),
  }
}

export function executeHermesInstanceAction(id: string, action: string): HermesInstance | null {
  const inst = instances.find((i) => i.id === id)
  if (!inst) return null

  switch (action) {
    case 'start':
      inst.vmStatus = 'running'
      inst.lastActiveAt = new Date().toISOString()
      break
    case 'stop':
      inst.vmStatus = 'stopped'
      break
    case 'restart':
      inst.vmStatus = 'running'
      inst.lastActiveAt = new Date().toISOString()
      break
    case 'restart-gateway':
      inst.lastActiveAt = new Date().toISOString()
      break
    case 'repair-config':
      break
    case 'reset-instance':
      inst.vmStatus = 'running'
      inst.lastActiveAt = new Date().toISOString()
      break
    case 'delete':
      instances = instances.filter((i) => i.id !== id)
      return inst
  }
  return inst
}

export function createHermesInstance(name: string, avatarUrl: string, appId?: string, appSecret?: string): HermesInstance {
  const adminOwner = owners[0]
  const idx = instances.length
  const newInst: HermesInstance = {
    id: `hermes-${String(idx + 1).padStart(3, '0')}-${Date.now()}`,
    name,
    avatarUrl,
    ownerName: adminOwner.name,
    ownerId: adminOwner.id,
    vmStatus: 'running',
    feishuStatus: appId && appSecret ? 'connected' : 'pending',
    createdAt: new Date().toISOString(),
    lastActiveAt: new Date().toISOString(),
    appId,
    projectId: `hermes-proj-${String(idx + 1).padStart(3, '0')}-${Date.now()}`,
  }
  instances.push(newInst)
  return newInst
}

const progressState: Record<string, { callCount: number; hasAppId: boolean }> = {}

export function getHermesInstanceCreateProgress(
  id: string,
  hasAppId: boolean,
): HermesInstanceCreateProgress {
  if (!progressState[id]) {
    progressState[id] = { callCount: 0, hasAppId }
  }
  const state = progressState[id]
  state.callCount++
  const n = state.callCount

  const vmStatus = n >= 2 ? 'done' : 'running'
  const vmElapsed = n >= 2 ? 8 : undefined

  const hermesStatus = n >= 4 ? 'done' : n >= 2 ? 'running' : 'pending'
  const hermesElapsed = n >= 4 ? 22 : undefined

  const feishuDone = state.hasAppId ? n >= 5 : n >= 4
  const feishuRunning = n === 4 && state.hasAppId
  const feishuStatus = feishuDone ? 'done' : feishuRunning ? 'running' : 'pending'
  const feishuElapsed = feishuDone ? (state.hasAppId ? 6 : 1) : undefined
  const feishuNote = feishuDone && !state.hasAppId ? '待配置' : undefined

  const done = feishuDone

  return {
    steps: [
      { key: 'vm', label: '启动云端电脑', status: vmStatus, elapsed: vmElapsed },
      { key: 'hermes', label: '部署 Hermes', status: hermesStatus, elapsed: hermesElapsed },
      { key: 'feishu', label: '配置飞书连接', status: feishuStatus, elapsed: feishuElapsed, note: feishuNote },
    ],
    done,
  }
}

export function resetHermesInstanceCreateProgress(id: string) {
  delete progressState[id]
}

// 根据 projectId 获取 Hermes 项目信息（用于管理员查看实例配置）
export function getHermesProjectById(projectId: string): HermesProject | null {
  const instance = instances.find((i) => i.projectId === projectId)
  if (!instance) return null

  return {
    id: projectId,
    name: instance.name,
    botName: instance.name.replace(' 的 Hermes', ''),
    avatarUrl: instance.avatarUrl,
    status: instance.vmStatus === 'running' ? 'deployed' : 'error',
    gatewayUrl: 'https://gateway.example.com/hermes',
    feishuChatUrl: 'https://www.feishu.cn/invitation/page/add_contact/?token=5a6r88f7-ecea-41fc-8b04-83c9e0c97240&unique_id=ziH9F8eSCNUbK0VkAMJEOg==',
    createdAt: instance.createdAt,
    botConfigured: instance.feishuStatus === 'connected',
    appId: instance.appId,
  }
}

// 仪表盘 Hermes 统计
export function getHermesDashboardStats() {
  return {
    totalInstances: instances.length,
    runningInstances: instances.filter((i) => i.vmStatus === 'running').length,
    stoppedInstances: instances.filter((i) => i.vmStatus === 'stopped').length,
    errorInstances: instances.filter((i) => i.vmStatus === 'error').length,
  }
}
