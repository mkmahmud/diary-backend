import express, { Application, NextFunction, Request, Response } from 'express'
const app: Application = express()
import cors from 'cors'
import cookieParser from 'cookie-parser'
import routes from './app/routes'
import globalErrorHandler from './app/middlewares/globalErrorHandler'
import httpStatus from 'http-status'

// Cors
app.use(cors())
app.use(cookieParser())

// Parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Routes
app.use('/api/v1', routes)

// testing
app.get('/', async (req: Request, res: Response, next: NextFunction) => {
  res.send('Server is runing')
  // throw new ApiError(400, 'Pre baba error')
  // Promise.reject(new Error('Uhaled Promise Rejection'))
  // next('Ore Baba Error Next')
})

// Global testing
app.use(globalErrorHandler)

// Handel not found
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Not Found',

    errorMessage: [
      {
        path: '.',
        message: 'API not found',
      },
    ],
  })
  next()
})

export default app
