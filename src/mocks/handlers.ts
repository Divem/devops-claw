import { http, HttpResponse, delay } from 'msw'
import {
  getProject,
  createProject,
  getProgress,
  deleteProject,
  updateBotConfig,
  avatarList,
  getDashboardData,
} from './data'
import { getGatewayProxyResponse } from './data'
import {
  getInstances,
  getInstanceDetail,
  executeInstanceAction,
  createInstance,
  getInstanceCreateProgress,
  searchUsers,
  getApprovals,
  approveApproval,
  getProjectById,
} from './adminData'

export const handlers = [
  http.get('/api/project', async () => {
    await delay(300)
    const project = getProject()
    if (!project) {
      return new HttpResponse(null, { status: 404 })
    }
    return HttpResponse.json(project)
  }),

  http.post('/api/project', async ({ request }) => {
    await delay(500)
    const body = (await request.json()) as {
      name: string
      botName?: string
      avatarUrl: string
      appId?: string
      appSecret?: string
    }
    const project = createProject(body.name, body.avatarUrl, body.botName)
    return HttpResponse.json(project, { status: 201 })
  }),

  http.get('/api/project/:id/progress', async () => {
    await delay(1500)
    const progress = getProgress()
    return HttpResponse.json(progress)
  }),

  http.delete('/api/project/:id', async () => {
    await delay(300)
    deleteProject()
    return new HttpResponse(null, { status: 204 })
  }),

  http.put('/api/project/:id/bot-config', async ({ request }) => {
    await delay(300)
    const body = (await request.json()) as { appId: string; appSecret: string }
    const project = updateBotConfig(body.appId, body.appSecret)
    return HttpResponse.json(project)
  }),

  http.get('/api/avatars', async () => {
    await delay(200)
    return HttpResponse.json(avatarList)
  }),

  // Gateway 反向代理
  http.get('/api/projects/:id/gateway/*', async () => {
    await delay(300)
    const project = getProject()
    // 权限校验：mock 下仅检查项目是否存在
    if (!project) {
      return new HttpResponse(null, { status: 404 })
    }
    // 实际项目中还需校验当前用户是否为项目所有者
    const response = getGatewayProxyResponse()
    return new HttpResponse(response.body, {
      status: response.status,
      headers: { 'Content-Type': 'text/html' },
    })
  }),

  http.head('/api/projects/:id/gateway/*', async () => {
    await delay(100)
    const project = getProject()
    if (!project) {
      return new HttpResponse(null, { status: 404 })
    }
    return new HttpResponse(null, { status: 200 })
  }),

  // 管理后台仪表盘数据
  http.get('/api/admin/dashboard', async ({ request }) => {
    await delay(300)
    const url = new URL(request.url)
    const daysParam = url.searchParams.get('days')
    const days = daysParam ? Number.parseInt(daysParam, 10) : 30
    const data = getDashboardData(days)
    return HttpResponse.json(data)
  }),

  // 管理后台 - 实例列表
  http.get('/api/admin/instances', async ({ request }) => {
    await delay(300)
    const url = new URL(request.url)
    const result = getInstances({
      search: url.searchParams.get('search') || undefined,
      status: url.searchParams.get('status') || undefined,
      sort: url.searchParams.get('sort') || undefined,
      order: url.searchParams.get('order') || undefined,
      page: Number(url.searchParams.get('page')) || undefined,
      pageSize: Number(url.searchParams.get('pageSize')) || undefined,
    })
    return HttpResponse.json(result)
  }),

  // 管理后台 - 实例详情
  http.get('/api/admin/instances/:id', async ({ params }) => {
    await delay(200)
    const detail = getInstanceDetail(params.id as string)
    if (!detail) {
      return new HttpResponse(null, { status: 404 })
    }
    return HttpResponse.json(detail)
  }),

  // 管理后台 - 实例操作
  http.post('/api/admin/instances/:id/action', async ({ params, request }) => {
    await delay(500)
    const body = (await request.json()) as { action: string }
    const result = executeInstanceAction(params.id as string, body.action)
    if (!result) {
      return new HttpResponse(null, { status: 404 })
    }
    return HttpResponse.json(result)
  }),

  // 管理后台 - 创建实例
  http.post('/api/admin/instances', async ({ request }) => {
    await delay(800)
    const body = (await request.json()) as { name: string; ownerId: string; appId?: string; appSecret?: string }
    if (!body.name || !body.ownerId) {
      return HttpResponse.json({ message: '参数缺失' }, { status: 400 })
    }
    const inst = createInstance(body.name, body.ownerId, body.appId, body.appSecret)
    return HttpResponse.json(inst, { status: 201 })
  }),

  // 管理后台 - 创建实例进度
  http.get('/api/admin/instances/:id/progress', async ({ params, request }) => {
    await delay(200)
    const url = new URL(request.url)
    const hasAppId = url.searchParams.get('hasAppId') === 'true'
    const progress = getInstanceCreateProgress(params.id as string, hasAppId)
    return HttpResponse.json(progress)
  }),

  // 用户搜索
  http.get('/api/users/search', async ({ request }) => {
    await delay(300)
    const url = new URL(request.url)
    const q = url.searchParams.get('q') || ''
    const users = searchUsers(q)
    return HttpResponse.json(users)
  }),

  // 管理后台 - 审批列表
  http.get('/api/admin/approvals', async ({ request }) => {
    await delay(300)
    const url = new URL(request.url)
    const status = url.searchParams.get('status') || undefined
    const result = getApprovals(status)
    return HttpResponse.json(result)
  }),

  // 管理后台 - 标记审批完成
  http.post('/api/admin/approvals/:id/approve', async ({ params }) => {
    await delay(500)
    const result = approveApproval(params.id as string)
    if (!result) {
      return new HttpResponse(null, { status: 404 })
    }
    return HttpResponse.json(result)
  }),

  // 根据 projectId 获取项目详情（管理员查看实例配置）
  http.get('/api/projects/:id', async ({ params }) => {
    await delay(300)
    const project = getProjectById(params.id as string)
    if (!project) {
      return new HttpResponse(null, { status: 404 })
    }
    return HttpResponse.json(project)
  }),
]
