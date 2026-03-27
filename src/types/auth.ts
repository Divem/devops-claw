export interface AuthUser {
  id: string
  name: string
  avatarUrl: string
}

export interface LoginPayload {
  username: string
  password: string
}

export interface AuthTokens {
  accessToken: string
  refreshToken: string
  expiresAt: number // Unix timestamp in ms
}
