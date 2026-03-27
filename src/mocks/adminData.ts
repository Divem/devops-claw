import type {
  Instance,
  InstanceDetail,
  VmStatus,
  FeishuConnectionStatus,
  Approval,
  OperationLog,
} from '@/types/admin'

const vmStatuses: VmStatus[] = ['running', 'running', 'running', 'running', 'running', 'stopped', 'stopped', 'error', 'error', 'running']
const feishuStatuses: FeishuConnectionStatus[] = ['connected', 'connected', 'connected', 'pending', 'connected', 'disconnected', 'disconnected', 'disconnected', 'pending', 'connected']

const owners = [
  { id: 'u-001', name: '张三' },
  { id: 'u-002', name: '李四' },
  { id: 'u-003', name: '王五' },
  { id: 'u-004', name: '赵六' },
  { id: 'u-005', name: '孙七' },
  { id: 'u-006', name: '周八' },
  { id: 'u-007', name: '吴九' },
  { id: 'u-008', name: '郑十' },
  { id: 'u-009', name: '陈十一' },
  { id: 'u-010', name: '刘十二' },
]

const instanceNames = [
  '销售部 AI 助手',
  '技术部代码审查',
  '产品部需求分析',
  '设计部灵感助手',
  'HR 面试助手',
  '市场部内容生成',
  '财务部报表助手',
  '运维部监控助手',
  '客服部智能回复',
  '研发部文档助手',
]

function generateInstances(): Instance[] {
  return instanceNames.map((name, i) => {
    const daysAgo = Math.floor(Math.random() * 30)
    const createdAt = new Date()
    createdAt.setDate(createdAt.getDate() - daysAgo)

    const minutesAgo = vmStatuses[i] === 'running' ? Math.floor(Math.random() * 60) : Math.floor(Math.random() * 1440) + 60
    const lastActive = new Date()
    lastActive.setMinutes(lastActive.getMinutes() - minutesAgo)

    return {
      id: `inst-${String(i + 1).padStart(3, '0')}`,
      name,
      avatarUrl: `/avatars/avatar-${(i % 12) + 1}.svg`,
      ownerName: owners[i].name,
      ownerId: owners[i].id,
      vmStatus: vmStatuses[i],
      feishuStatus: feishuStatuses[i],
      createdAt: createdAt.toISOString(),
      lastActiveAt: lastActive.toISOString(),
      appId: `cli_a${String(i + 1).padStart(4, '0')}`,
    }
  })
}

let instances = generateInstances()

function generateLogs(instanceId: string): OperationLog[] {
  const actions = ['创建实例', '启动服务', '重启 Gateway', '更新配置', '连接飞书']
  const logs: OperationLog[] = []
  const count = 3 + Math.floor(Math.random() * 5)

  for (let i = 0; i < count; i++) {
    const ts = new Date()
    ts.setHours(ts.getHours() - i * 6)
    logs.push({
      id: `log-${instanceId}-${i}`,
      action: actions[i % actions.length],
      operator: owners[Math.floor(Math.random() * owners.length)].name,
      timestamp: ts.toISOString(),
      detail: i === 0 ? '操作成功' : undefined,
    })
  }
  return logs
}

export function getInstances(params: {
  search?: string
  status?: string
  sort?: string
  order?: string
  page?: number
  pageSize?: number
}): { items: Instance[]; total: number; page: number; pageSize: number } {
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

export function getInstanceDetail(id: string): InstanceDetail | null {
  const inst = instances.find((i) => i.id === id)
  if (!inst) return null

  return {
    ...inst,
    ip: `10.0.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
    cpuSpec: '4 核',
    memorySpec: '8 GB',
    uptime: inst.vmStatus === 'running' ? Math.floor(Math.random() * 86400 * 7) : 0,
    gatewayHealthy: inst.vmStatus === 'running',
    openclawVersion: '1.4.2',
    logs: generateLogs(id),
  }
}

export function executeInstanceAction(id: string, action: string): Instance | null {
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
    case 'delete':
      instances = instances.filter((i) => i.id !== id)
      return inst
  }
  return inst
}

// --- 审批数据 ---

const approvals: Approval[] = [
  {
    id: 'apr-001',
    instanceId: 'inst-004',
    instanceName: '设计部灵感助手',
    instanceAvatarUrl: '/avatars/avatar-4.svg',
    ownerName: '赵六',
    ownerAvatarUrl: '/avatars/default-user.svg',
    appId: 'cli_a0004',
    status: 'pending',
    submittedAt: new Date(Date.now() - 2 * 3600 * 1000).toISOString(),
    feishuStatus: 'pending',
  },
  {
    id: 'apr-002',
    instanceId: 'inst-009',
    instanceName: '客服部智能回复',
    instanceAvatarUrl: '/avatars/avatar-9.svg',
    ownerName: '陈十一',
    ownerAvatarUrl: '/avatars/default-user.svg',
    appId: 'cli_a0009',
    status: 'pending',
    submittedAt: new Date(Date.now() - 5 * 3600 * 1000).toISOString(),
    feishuStatus: 'pending',
  },
  {
    id: 'apr-003',
    instanceId: 'inst-new-1',
    instanceName: '法务部合同审查',
    instanceAvatarUrl: '/avatars/avatar-7.svg',
    ownerName: '钱十三',
    ownerAvatarUrl: '/avatars/default-user.svg',
    appId: 'cli_a0013',
    status: 'pending',
    submittedAt: new Date(Date.now() - 24 * 3600 * 1000).toISOString(),
    feishuStatus: 'pending',
  },
  {
    id: 'apr-004',
    instanceId: 'inst-001',
    instanceName: '销售部 AI 助手',
    instanceAvatarUrl: '/avatars/avatar-1.svg',
    ownerName: '张三',
    ownerAvatarUrl: '/avatars/default-user.svg',
    appId: 'cli_a0001',
    status: 'approved',
    submittedAt: new Date(Date.now() - 7 * 24 * 3600 * 1000).toISOString(),
    approvedAt: new Date(Date.now() - 6 * 24 * 3600 * 1000).toISOString(),
    feishuStatus: 'connected',
  },
  {
    id: 'apr-005',
    instanceId: 'inst-002',
    instanceName: '技术部代码审查',
    instanceAvatarUrl: '/avatars/avatar-2.svg',
    ownerName: '李四',
    ownerAvatarUrl: '/avatars/default-user.svg',
    appId: 'cli_a0002',
    status: 'approved',
    submittedAt: new Date(Date.now() - 14 * 24 * 3600 * 1000).toISOString(),
    approvedAt: new Date(Date.now() - 13 * 24 * 3600 * 1000).toISOString(),
    feishuStatus: 'connected',
  },
]

export function getApprovals(status?: string): Approval[] {
  if (status) {
    return approvals.filter((a) => a.status === status)
  }
  return approvals
}

export function approveApproval(id: string): Approval | null {
  const approval = approvals.find((a) => a.id === id)
  if (!approval) return null

  approval.status = 'approved'
  approval.approvedAt = new Date().toISOString()
  approval.feishuStatus = 'connected'
  return approval
}
