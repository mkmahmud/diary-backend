import { Model } from 'mongoose'

export interface IUsers {
  userId: string
  email: string
  password: string
  role: string
}

export type UsersModel = {
  isUserExist(id: string): Promise<Pick<IUsers, 'userId' | 'password' | 'role'>>
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string,
  ): Promise<boolean>
} & Model<IUsers>
