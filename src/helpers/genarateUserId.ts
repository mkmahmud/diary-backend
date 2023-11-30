import { Users } from '../app/modules/users/users.model'
import { ENUM_USER_ROLE } from '../enums/userRole'

// Student Id
export const generateStudentId = async () => {
  const totalUser = await Users.find({ role: ENUM_USER_ROLE.STUDENT })
  let id = totalUser ? `S-000${totalUser.length + 1}` : 'S-00001'
  return id
}

// Management Id
export const generateManagementId = async () => {
  const totalUser = await Users.find({ role: ENUM_USER_ROLE.MANAGEMENT })
  let id = totalUser ? `M-000${totalUser.length + 1}` : 'M-00001'
  return id
}

// Admin Id
export const generateAdminId = async () => {
  const totalUser = await Users.find({ role: ENUM_USER_ROLE.ADMIN })
  let id = totalUser ? `A-000${totalUser.length + 1}` : 'A-00001'
  return id
}
