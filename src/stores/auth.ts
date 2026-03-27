import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { AuthUser, AuthTokens } from '@/types/auth'
import * as authApi from '@/api/auth'

const STORAGE_KEY = 'auth_tokens'
const REFRESH_BEFORE_EXPIRY_MS = 5 * 60 * 1000 // 5 minutes

function saveTokens(tokens: AuthTokens) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tokens))
}

function loadTokens(): AuthTokens | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as AuthTokens) : null
  } catch {
    return null
  }
}

function clearTokens() {
  localStorage.removeItem(STORAGE_KEY)
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<AuthUser | null>(null)
  const isAuthenticated = ref(false)
  const showLogin = ref(false)
  const isLoading = ref(false)

  let tokens: AuthTokens | null = null
  let refreshTimer: ReturnType<typeof setTimeout> | null = null
  let isRefreshing = false

  function scheduleRefresh(expiresAt: number) {
    if (refreshTimer) clearTimeout(refreshTimer)
    const delay = expiresAt - Date.now() - REFRESH_BEFORE_EXPIRY_MS
    if (delay > 0) {
      refreshTimer = setTimeout(() => {
        refreshToken()
      }, delay)
    } else {
      // already expired or about to expire, refresh immediately
      refreshToken()
    }
  }

  async function refreshToken() {
    if (isRefreshing || !tokens?.refreshToken) return
    isRefreshing = true
    try {
      const newTokens = await authApi.refreshToken(tokens.refreshToken)
      tokens = newTokens
      saveTokens(newTokens)
      scheduleRefresh(newTokens.expiresAt)
    } catch {
      clearAuth()
    } finally {
      isRefreshing = false
    }
  }

  function clearAuth() {
    user.value = null
    isAuthenticated.value = false
    tokens = null
    clearTokens()
    if (refreshTimer) {
      clearTimeout(refreshTimer)
      refreshTimer = null
    }
  }

  async function login(username: string, password: string): Promise<void> {
    isLoading.value = true
    try {
      const result = await authApi.login({ username, password })
      user.value = result.user
      tokens = result.tokens
      isAuthenticated.value = true
      showLogin.value = false
      saveTokens(result.tokens)
      scheduleRefresh(result.tokens.expiresAt)
    } finally {
      isLoading.value = false
    }
  }

  async function logout() {
    if (tokens?.accessToken) {
      try {
        await authApi.logout(tokens.accessToken)
      } catch {
        // ignore logout API errors
      }
    }
    clearAuth()
  }

  async function checkAuth() {
    const stored = loadTokens()
    if (!stored) return

    // If token already expired, clear
    if (stored.expiresAt <= Date.now()) {
      clearTokens()
      return
    }

    tokens = stored
    try {
      const currentUser = await authApi.getCurrentUser(stored.accessToken)
      user.value = currentUser
      isAuthenticated.value = true
      scheduleRefresh(stored.expiresAt)
    } catch {
      clearAuth()
    }
  }

  function getAccessToken(): string | null {
    return tokens?.accessToken ?? null
  }

  return {
    user,
    isAuthenticated,
    showLogin,
    isLoading,
    login,
    logout,
    checkAuth,
    refreshToken,
    getAccessToken,
  }
})
