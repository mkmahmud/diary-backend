// login user credentials
export type ILoginUser = {
  id: string
  password: string
}

// login user response
export type ILoginUserResponse = {
  accessToken: string
  refreshToken?: string
}

// Refresh user response
export type IRefreshTokenResponse = {
  accessToken: string
}
