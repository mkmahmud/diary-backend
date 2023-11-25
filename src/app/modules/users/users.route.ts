import express from 'express'
import { usersController } from './users.controller'
import validateRequest from '../../middlewares/validateRequest'
import { usersValidation } from './users.validation'

const router = express.Router()

// Create User
router.post(
  '/create',
  validateRequest(usersValidation.usersZodSchema),
  usersController.createUser,
)

export const UserRoutes = router
