import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useAuthStore } from '@/stores/auth'
import * as authApi from '@/api/auth'

vi.mock('@/api/auth')

const mockUser = { id: 'u1', name: '张三', avatarUrl: '/avatars/default.svg' }
const mockTokens = {
  accessToken: 'access-token-123',
  refreshToken: 'refresh-token-456',
  expiresAt: Date.now() + 60 * 60 * 1000, // 1 hour from now
}

describe('useAuthStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    localStorage.clear()
    vi.clearAllMocks()
  })

  afterEach(() => {
    localStorage.clear()
  })

  it('初始状态正确', () => {
    const store = useAuthStore()
    expect(store.user).toBeNull()
    expect(store.isAuthenticated).toBe(false)
    expect(store.showLogin).toBe(false)
    expect(store.isLoading).toBe(false)
  })

  it('login 成功后设置用户状态和 token', async () => {
    vi.mocked(authApi.login).mockResolvedValue({ user: mockUser, tokens: mockTokens })
    const store = useAuthStore()
    await store.login('san.zhang', 'password')
    expect(store.user).toEqual(mockUser)
    expect(store.isAuthenticated).toBe(true)
    expect(store.showLogin).toBe(false)
    expect(localStorage.getItem('auth_tokens')).not.toBeNull()
  })

  it('login 失败时抛出错误，isLoading 恢复 false', async () => {
    vi.mocked(authApi.login).mockRejectedValue(new Error('用户名或密码错误'))
    const store = useAuthStore()
    await expect(store.login('bad', 'wrong')).rejects.toThrow()
    expect(store.isAuthenticated).toBe(false)
    expect(store.isLoading).toBe(false)
  })

  it('logout 清除用户状态和 localStorage', async () => {
    vi.mocked(authApi.login).mockResolvedValue({ user: mockUser, tokens: mockTokens })
    vi.mocked(authApi.logout).mockResolvedValue(undefined)
    const store = useAuthStore()
    await store.login('san.zhang', 'password')
    await store.logout()
    expect(store.user).toBeNull()
    expect(store.isAuthenticated).toBe(false)
    expect(localStorage.getItem('auth_tokens')).toBeNull()
  })

  it('checkAuth 从 localStorage 恢复登录态', async () => {
    localStorage.setItem('auth_tokens', JSON.stringify(mockTokens))
    vi.mocked(authApi.getCurrentUser).mockResolvedValue(mockUser)
    const store = useAuthStore()
    await store.checkAuth()
    expect(store.user).toEqual(mockUser)
    expect(store.isAuthenticated).toBe(true)
  })

  it('checkAuth 在 token 已过期时清除登录态', async () => {
    const expiredTokens = { ...mockTokens, expiresAt: Date.now() - 1000 }
    localStorage.setItem('auth_tokens', JSON.stringify(expiredTokens))
    const store = useAuthStore()
    await store.checkAuth()
    expect(store.isAuthenticated).toBe(false)
    expect(localStorage.getItem('auth_tokens')).toBeNull()
  })

  it('checkAuth 在 getCurrentUser 失败时清除登录态', async () => {
    localStorage.setItem('auth_tokens', JSON.stringify(mockTokens))
    vi.mocked(authApi.getCurrentUser).mockRejectedValue(new Error('401'))
    const store = useAuthStore()
    await store.checkAuth()
    expect(store.isAuthenticated).toBe(false)
    expect(localStorage.getItem('auth_tokens')).toBeNull()
  })

  it('checkAuth 在没有存储 token 时不做任何事', async () => {
    const store = useAuthStore()
    await store.checkAuth()
    expect(store.isAuthenticated).toBe(false)
    expect(authApi.getCurrentUser).not.toHaveBeenCalled()
  })
})
