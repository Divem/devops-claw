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
import { getImages, createImage, updateImage, deleteImage } from './imageData'
import { mockAuthLogin, mockAuthRefresh, mockAuthMe } from './data'
import {
  getHermesProject,
  createHermesProject,
  getHermesProgress,
  deleteHermesProject,
  updateHermesBotConfig,
  getHermesInstances,
  getHermesInstanceDetail,
  executeHermesInstanceAction,
  createHermesInstance,
  getHermesInstanceCreateProgress,
  getHermesProjectById,
} from './hermesData'

export const handlers = [
  // 认证接口
  http.post('/api/auth/login', async ({ request }) => {
    await delay(500)
    const body = (await request.json()) as { username: string; password: string }
    const result = mockAuthLogin(body.username, body.password)
    if (!result) {
      return HttpResponse.json({ message: '用户名或密码错误' }, { status: 401 })
    }
    return HttpResponse.json(result)
  }),

  http.post('/api/auth/refresh', async ({ request }) => {
    await delay(300)
    const body = (await request.json()) as { refreshToken: string }
    const tokens = mockAuthRefresh(body.refreshToken)
    if (!tokens) {
      return HttpResponse.json({ message: 'Token 无效' }, { status: 401 })
    }
    return HttpResponse.json(tokens)
  }),

  http.post('/api/auth/logout', async () => {
    await delay(200)
    return new HttpResponse(null, { status: 204 })
  }),

  http.get('/api/auth/me', async ({ request }) => {
    await delay(200)
    const auth = request.headers.get('Authorization')
    const user = mockAuthMe(auth)
    if (!user) {
      return HttpResponse.json({ message: '未授权' }, { status: 401 })
    }
    return HttpResponse.json(user)
  }),

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
    const body = (await request.json()) as { name: string; avatarUrl: string; appId?: string; appSecret?: string }
    if (!body.name || !body.avatarUrl) {
      return HttpResponse.json({ message: '参数缺失' }, { status: 400 })
    }
    const inst = createInstance(body.name, body.avatarUrl, body.appId, body.appSecret)
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

  // 项目配置接口
  http.get('/api/projects/:id/config', async () => {
    await delay(200)
    return HttpResponse.json({
      model: { provider: 'anthropic', defaultModel: 'claude-sonnet-4-20250514' },
      gateway: { url: 'https://gateway.example.com', status: 'running' },
    })
  }),

  // 管理后台 - 镜像列表
  http.get('/api/admin/images', async ({ request }) => {
    await delay(300)
    const url = new URL(request.url)
    const result = getImages({
      search: url.searchParams.get('search') || undefined,
      status: url.searchParams.get('status') || undefined,
      type: url.searchParams.get('type') || undefined,
      sort: url.searchParams.get('sort') || undefined,
      order: url.searchParams.get('order') || undefined,
      page: Number(url.searchParams.get('page')) || undefined,
      pageSize: Number(url.searchParams.get('pageSize')) || undefined,
    })
    return HttpResponse.json(result)
  }),

  // 管理后台 - 创建镜像
  http.post('/api/admin/images', async ({ request }) => {
    await delay(500)
    const body = (await request.json()) as { type: string; name: string; version: string; description?: string; size?: number }
    if (!body.type || !body.name || !body.version) {
      return HttpResponse.json({ message: '参数缺失' }, { status: 400 })
    }
    const img = createImage({ ...body, type: body.type as 'vm' | 'openclaw', imageUrl: `https://example.com/${body.name}-${body.version}.qcow2` })
    return HttpResponse.json(img, { status: 201 })
  }),

  // 管理后台 - 更新镜像
  http.put('/api/admin/images/:id', async ({ params, request }) => {
    await delay(300)
    const body = (await request.json()) as { name: string; description: string }
    const result = updateImage(params.id as string, body)
    if (!result) {
      return new HttpResponse(null, { status: 404 })
    }
    return HttpResponse.json(result)
  }),

  // 管理后台 - 删除镜像
  http.delete('/api/admin/images/:id', async ({ params }) => {
    await delay(300)
    const ok = deleteImage(params.id as string)
    if (!ok) {
      return new HttpResponse(null, { status: 404 })
    }
    return new HttpResponse(null, { status: 204 })
  }),

  // ==================== Hermes 用户端接口 ====================

  http.get('/api/hermes/project', async () => {
    await delay(300)
    const project = getHermesProject()
    if (!project) {
      return new HttpResponse(null, { status: 404 })
    }
    return HttpResponse.json(project)
  }),

  http.post('/api/hermes/project', async ({ request }) => {
    await delay(500)
    const body = (await request.json()) as {
      name: string
      botName?: string
      avatarUrl: string
      appId?: string
      appSecret?: string
    }
    const project = createHermesProject(body.name, body.avatarUrl, body.botName)
    return HttpResponse.json(project, { status: 201 })
  }),

  http.get('/api/hermes/project/:id/progress', async () => {
    await delay(1500)
    const progress = getHermesProgress()
    return HttpResponse.json(progress)
  }),

  http.delete('/api/hermes/project/:id', async () => {
    await delay(300)
    deleteHermesProject()
    return new HttpResponse(null, { status: 204 })
  }),

  http.put('/api/hermes/project/:id/bot-config', async ({ request }) => {
    await delay(300)
    const body = (await request.json()) as { appId: string; appSecret: string }
    const project = updateHermesBotConfig(body.appId, body.appSecret)
    return HttpResponse.json(project)
  }),

  // ==================== Hermes 管理端接口 ====================

  http.get('/api/admin/hermes-instances', async ({ request }) => {
    await delay(300)
    const url = new URL(request.url)
    const result = getHermesInstances({
      search: url.searchParams.get('search') || undefined,
      status: url.searchParams.get('status') || undefined,
      sort: url.searchParams.get('sort') || undefined,
      order: url.searchParams.get('order') || undefined,
      page: Number(url.searchParams.get('page')) || undefined,
      pageSize: Number(url.searchParams.get('pageSize')) || undefined,
    })
    return HttpResponse.json(result)
  }),

  http.get('/api/admin/hermes-instances/:id', async ({ params }) => {
    await delay(200)
    const detail = getHermesInstanceDetail(params.id as string)
    if (!detail) {
      return new HttpResponse(null, { status: 404 })
    }
    return HttpResponse.json(detail)
  }),

  http.post('/api/admin/hermes-instances/:id/action', async ({ params, request }) => {
    await delay(500)
    const body = (await request.json()) as { action: string }
    const result = executeHermesInstanceAction(params.id as string, body.action)
    if (!result) {
      return new HttpResponse(null, { status: 404 })
    }
    return HttpResponse.json(result)
  }),

  http.post('/api/admin/hermes-instances', async ({ request }) => {
    await delay(800)
    const body = (await request.json()) as { name: string; avatarUrl: string; appId?: string; appSecret?: string }
    if (!body.name || !body.avatarUrl) {
      return HttpResponse.json({ message: '参数缺失' }, { status: 400 })
    }
    const inst = createHermesInstance(body.name, body.avatarUrl, body.appId, body.appSecret)
    return HttpResponse.json(inst, { status: 201 })
  }),

  http.get('/api/admin/hermes-instances/:id/progress', async ({ params, request }) => {
    await delay(200)
    const url = new URL(request.url)
    const hasAppId = url.searchParams.get('hasAppId') === 'true'
    const progress = getHermesInstanceCreateProgress(params.id as string, hasAppId)
    return HttpResponse.json(progress)
  }),

  http.get('/api/hermes-projects/:id', async ({ params }) => {
    await delay(300)
    const project = getHermesProjectById(params.id as string)
    if (!project) {
      return new HttpResponse(null, { status: 404 })
    }
    return HttpResponse.json(project)
  }),
]
