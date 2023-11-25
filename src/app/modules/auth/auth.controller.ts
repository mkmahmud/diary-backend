import { Request, Response } from 'express'
import config from '../../../config'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { ILoginUserResponse, IRefreshTokenResponse } from './auth.interface'
import { AuthService } from './auth.service'
import httpStatus from 'http-status'

// Log In user
const loginUser = catchAsync(async (req: Request, res: Response) => {
  // Login Data
  const { ...loginData } = req.body
  //   Check Data
  const result = await AuthService.loginUser(loginData)
  //   refresh token
  const { refreshToken } = result
  // set refresh token into cookie
  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  }
  res.cookie('refreshToken', refreshToken, cookieOptions)

  //   Send response
  sendResponse<ILoginUserResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User logged in successfully !',
    data: result,
  })
})

// Genarete Refresh token
const refreshToken = catchAsync(async (req: Request, res: Response) => {
  // get refresh token form cookies
  const { refreshToken } = req.cookies

  //   check refresh token
  const result = await AuthService.refreshToken(refreshToken)

  // set refresh token into cookie
  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  }
  res.cookie('refreshToken', refreshToken, cookieOptions)

  //   Send response
  sendResponse<IRefreshTokenResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User logged in successfully !',
    data: result,
  })
})

export const AuthController = {
  loginUser,
  refreshToken,
}
