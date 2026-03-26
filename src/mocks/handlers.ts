import { http, HttpResponse, delay } from 'msw'
import {
  getProject,
  createProject,
  getProgress,
  deleteProject,
  avatarList,
} from './data'

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
      botName: string
      avatarUrl: string
    }
    const project = createProject(body.name, body.botName, body.avatarUrl)
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

  http.get('/api/avatars', async () => {
    await delay(200)
    return HttpResponse.json(avatarList)
  }),
]
