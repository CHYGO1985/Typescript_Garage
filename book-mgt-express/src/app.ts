import express, { Response, Request, NextFunction } from 'express'

import { dataHandler } from './data-controller'

const app = express()

// for parsing message body
app.use(express.json())
// for parsing params in a url
app.use(express.urlencoded({ extended: true }))

app.get('/', (req: Request, res: Response, next: NextFunction) => {
  return res.send('hello world')
})

app.post('/api/data', dataHandler)

app.all('/api/all', (req: Request, res: Response, next: NextFunction) => {
  res.status(200).send('all')
})

app.listen(3000, () => {
  console.log('Application is listening at http://localhost:3000')
})
