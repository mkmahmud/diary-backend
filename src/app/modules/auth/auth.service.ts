import httpStatus from 'http-status'
import { JwtPayload, Secret } from 'jsonwebtoken'
import config from '../../../config'
import {
  ILoginUser,
  ILoginUserResponse,
  IRefreshTokenResponse,
} from './auth.interface'
import { Users } from '../users/users.model'
import ApiError from '../../../Errors/ApiErrors'
import { jwtHelpers } from '../../../helpers/jwt'

// Login
const loginUser = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
  //   User Data
  const { id, password } = payload
  //    Check Is User Exist

  const isUserExist = await Users.isUserExist(id)
  // Throw error if user is not exist
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist')
  }
  // Check Password
  if (
    isUserExist.password &&
    !(await Users.isPasswordMatched(password, isUserExist.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect')
  }

  //create access token & refresh token
  const { userId, role } = isUserExist
  //   Access Token
  const accessToken = jwtHelpers.createToken(
    { userId, role },
    config.JWT_SECRET as Secret,
    config.JWT_EXPIRES_IN as string,
  )

  //   Refresh token
  const refreshToken = jwtHelpers.createToken(
    { userId, role },
    config.JWT_REFRESH_SECRET as Secret,
    config.JWT_REFRESH_EXPIRES_IN as string,
  )

  return {
    accessToken,
    refreshToken,
  }
}

// Refresh token
const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
  // verify token
  let verifiedToken: JwtPayload

  try {
    verifiedToken = jwtHelpers.verifyToken(
      token,
      config.JWT_REFRESH_SECRET as Secret,
    ) as JwtPayload
  } catch (err) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid Refresh Token')
  }

  const { userId } = verifiedToken

  // checking deleted user's refresh token
  const isUserExist = await Users.isUserExist(userId)
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist')
  }

  // generate new access token
  const newAccessToken = jwtHelpers.createToken(
    {
      id: isUserExist.userId,
      role: isUserExist.role,
    },
    config.JWT_SECRET as Secret,
    config.JWT_EXPIRES_IN as string,
  )

  return {
    accessToken: newAccessToken,
  }
}

export const AuthService = {
  loginUser,
  refreshToken,
}
