/**
 * Unified API client with automatic Authorization header injection and 401 token refresh.
 * Uses native fetch under the hood; no external HTTP library needed.
 */

import { useAuthStore } from '@/stores/auth'

type FetchInput = Parameters<typeof fetch>[0]
type FetchInit = Parameters<typeof fetch>[1]

async function apiFetch(input: FetchInput, init: FetchInit = {}): Promise<Response> {
  const authStore = useAuthStore()
  const accessToken = authStore.getAccessToken()

  const headers = new Headers(init.headers)
  if (accessToken) {
    headers.set('Authorization', `Bearer ${accessToken}`)
  }

  const res = await fetch(input, { ...init, headers })

  if (res.status === 401 && accessToken) {
    // Try to refresh token once
    await authStore.refreshToken()
    const newToken = authStore.getAccessToken()
    if (newToken) {
      headers.set('Authorization', `Bearer ${newToken}`)
      return fetch(input, { ...init, headers })
    }
  }

  return res
}

export default apiFetch
