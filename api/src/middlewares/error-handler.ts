import type { NextFunction, Request, Response } from 'express'
import { isProduction } from '../config/env'

export class HttpError extends Error {
  constructor(
    public readonly statusCode: number,
    message: string
  ) {
    super(message)
    this.name = 'HttpError'
  }
}

// Express recognizes error handlers by their 4-argument signature, so `_next` must stay.
export const errorHandler = (err: unknown, _req: Request, res: Response, _next: NextFunction) => {
  const statusCode = err instanceof HttpError ? err.statusCode : 500
  const message = err instanceof Error ? err.message : 'Internal Server Error'

  if (statusCode >= 500) console.error(err)

  res.status(statusCode).json({
    message: statusCode >= 500 && isProduction ? 'Internal Server Error' : message,
    ...(!isProduction && err instanceof Error ? { stack: err.stack } : {})
  })
}
