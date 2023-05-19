// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import getMongodbInstance from '@/utils/connect-mongodb'

type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  await getMongodbInstance()
  res.status(200).json({ name: 'John Doe' })
}
