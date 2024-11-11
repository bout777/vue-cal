export enum UserRole {
  DEVELOPER = 'developer',
  ENTERPRISE = 'enterprise'
}

export interface UserInfo {
  id: number
  username: string
  role: UserRole
  email?: string
  phone?: string
  avatar?: string
}

export interface LoginResult {
  token: string
  user: UserInfo
}
