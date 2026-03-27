import type { AuthUser, AuthTokens, LoginPayload } from '@/types/auth'

export async function login(payload: LoginPayload): Promise<{ user: AuthUser; tokens: AuthTokens }> {
  const res = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  if (!res.ok) {
    throw new Error('用户名或密码错误')
  }
  return res.json()
}

export async function refreshToken(token: string): Promise<AuthTokens> {
  const res = await fetch('/api/auth/refresh', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refreshToken: token }),
  })
  if (!res.ok) {
    throw new Error('Token 刷新失败')
  }
  return res.json()
}

export async function logout(accessToken: string): Promise<void> {
  await fetch('/api/auth/logout', {
    method: 'POST',
    headers: { Authorization: `Bearer ${accessToken}` },
  })
}

export async function getCurrentUser(accessToken: string): Promise<AuthUser> {
  const res = await fetch('/api/auth/me', {
    headers: { Authorization: `Bearer ${accessToken}` },
  })
  if (!res.ok) {
    throw new Error('获取用户信息失败')
  }
  return res.json()
}
