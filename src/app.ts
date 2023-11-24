import express, { Application, NextFunction, Request, Response } from 'express'
const app: Application = express()
import cors from 'cors'
import cookieParser from 'cookie-parser'

// Cors
app.use(cors())
app.use(cookieParser())

// Parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Handel not found
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
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
