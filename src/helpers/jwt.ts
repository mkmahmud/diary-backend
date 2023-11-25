import jwt, { Secret } from 'jsonwebtoken'

const createToken = (
  payload: object,
  secret: Secret,
  expiresTime: string,
): string => {
  return jwt.sign(payload, secret, { expiresIn: expiresTime })
}

const verifyToken = (tocken: string, secret: Secret) => {
  return jwt.verify(tocken, secret)
}

export const jwtHelpers = {
  createToken,
  verifyToken,
}
