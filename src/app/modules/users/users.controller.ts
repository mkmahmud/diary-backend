import { Request, RequestHandler, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { usersService } from './users.service'
import httpStatus from 'http-status'

// Create Student
const createUser = catchAsync(async (req: Request, res: Response) => {
  const body = req.body
  const result = await usersService.createUser(body)

  // Send response
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User created Successfully',
    data: result,
  })
})

export const usersController = {
  createUser,
}
