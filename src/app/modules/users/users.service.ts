import { IUsers } from './users.interface'
import { Users } from './users.model'
import bcrypt from 'bcrypt'

// Create User
const createUser = async (data: IUsers): Promise<IUsers | null | string> => {
  try {
    // check if user already exists
    const isExist = await Users.findOne({ email: data.email })
    if (isExist) {
      return 'user already exists'
    }

    const hashedPassword = await bcrypt.hash(data.password, 10)
    // Update password
    data.password = hashedPassword
    // Create User
    const result = await Users.create(data)
    const email = result.email
    return email
  } catch (error) {
    // Handle the error, e.g., log it or throw a custom error
    console.error('Error creating user:', error)
    throw new Error('Error creating user')
  }
}

export const usersService = {
  createUser,
}
