import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import { env } from './config/env'
import routes from './routes'
import { notFound } from './middlewares/not-found'
import { errorHandler } from './middlewares/error-handler'

export const createApp = () => {
  const app = express()

  app.use(helmet())
  app.use(cors({ origin: env.CORS_ORIGIN, credentials: true }))
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))

  app.use('/api/v1', routes)

  app.use(notFound)
  app.use(errorHandler)

  return app
}
