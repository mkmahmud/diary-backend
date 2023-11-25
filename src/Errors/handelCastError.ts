import mongoose from 'mongoose'
import { IGenericHandlerMessage } from '../interfaces/error'

const handelCastError = (error: mongoose.Error.CastError) => {
  const errors: IGenericHandlerMessage[] = [
    {
      path: error.path,
      message: 'Invalid Id',
    },
  ]

  const statusCode = 400
  return {
    statusCode,
    message: 'Validition Error',
    errorMessage: errors,
  }
}

export default handelCastError
