import { ZodError, ZodIssue } from 'zod'
import { IGenericErrorResponse } from '../interfaces/common'
import { IGenericHandlerMessage } from '../interfaces/error'

const handleZodError = (error: ZodError): IGenericErrorResponse => {
  const statusCode = 400

  const errors: IGenericHandlerMessage[] = error.issues.map(
    (issue: ZodIssue) => {
      return {
        path: issue.path[issue.path.length - 1],
        message: issue.message,
      }
    },
  )

  return {
    statusCode,
    message: 'Validation Error',
    errorMessage: errors,
  }
}

export default handleZodError
