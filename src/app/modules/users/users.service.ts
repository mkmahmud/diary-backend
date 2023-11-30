import { ENUM_USER_ROLE } from '../../../enums/userRole'
import {
  generateAdminId,
  generateManagementId,
  generateStudentId,
} from '../../../helpers/genarateUserId'
import { IUsers } from './users.interface'
import { Users } from './users.model'
import bcrypt from 'bcrypt'

// Create User
const createUser = async (data: IUsers): Promise<IUsers | null | object> => {
  try {
    // check if user already exists
    const isExist = await Users.findOne({ email: data.email })
    if (isExist) {
      return { message: 'user already exists' }
    }

    const hashedPassword = await bcrypt.hash(data.password, 10)
    // Update password
    data.password = hashedPassword

    //set Role
    if (data.role) {
      data.role = data.role
    } else {
      data.role = ENUM_USER_ROLE.STUDENT
    }

    // Set User ID
    if (data.role === ENUM_USER_ROLE.STUDENT) {
      data.userId = await generateStudentId()
    } else if (data.role === ENUM_USER_ROLE.ADMIN) {
      data.userId = await generateAdminId()
    } else if (data.role === ENUM_USER_ROLE.MANAGEMENT) {
      data.userId = await generateManagementId()
    }

    // Create User
    await Users.create(data)
    return { message: 'Success' }
  } catch (error) {
    // Handle the error, e.g., log it or throw a custom error
    console.error('Error creating user:', error)
    throw new Error('Error creating user')
  }
}

export const usersService = {
  createUser,
}
