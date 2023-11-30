import { NextFunction, Request, Response } from 'express'
import ApiError from '../../Errors/ApiErrors'
import { jwtHelpers } from '../../helpers/jwt'
import { Secret, JwtPayload } from 'jsonwebtoken'
import config from '../../config'
import httpStatus from 'http-status'

declare global {
  namespace Express {
    interface Request {
      user?: {
        role: string
      }
    }
  }
}

const auth =
  (...requiredRoles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // get authorization token
      const token = req.headers.authorization
      if (!token) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized')
      }
      // verify token
      let verifiedUser: JwtPayload | null = null // Specify the type here

      verifiedUser = jwtHelpers.verifyToken(
        token,
        config.JWT_SECRET as Secret,
      ) as JwtPayload // Type assertion

      req.user = {
        role: verifiedUser.role,
        // Add other properties as needed
      }

      // role diye guard korar jnno
      if (requiredRoles.length && !requiredRoles.includes(verifiedUser.role)) {
        throw new ApiError(httpStatus.FORBIDDEN, 'Forbidden')
      }
      next()
    } catch (error) {
      next(error)
    }
  }

export default auth
