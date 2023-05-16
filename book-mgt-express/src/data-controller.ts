import { Request, Response, NextFunction, RequestHandler } from 'express'

export const dataHandler: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log(req.body)

  res.status(200).send('success')
}
