import { createResetToken } from '@/utils/tokens'

import type { NextApiRequest, NextApiResponse } from 'next'
import User from '@/components/models/User'
import getMongodbInstance from '@/utils/connect-mongodb'
import sendEmail from '@/utils/SendMail'
import { resetPasswordEmail } from '@/emailTemplates/reset'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    await getMongodbInstance()
    const { email } = req.body
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ message: 'This email does not exist.' })
    }
    const userId = createResetToken({
      id: user._id.toString(),
    })
    const url = `${process.env.NEXTAUTH_URL}/reset/${userId}`
    await sendEmail(
      email,
      user.name,
      user.image,
      url,
      'Reset your password - FullAuth',
      resetPasswordEmail,
    )
    res.json({
      message: 'An email has been sent to you, use it to reset your password.',
    })
  } catch (error) {
    res.status(500).json({ message: (error as Error).message })
  }
}
