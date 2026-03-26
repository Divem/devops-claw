import { http } from 'msw'

export const handlers = [
  http.get('/api/project', () => {
    return new Response(null, { status: 404 })
  }),
]
