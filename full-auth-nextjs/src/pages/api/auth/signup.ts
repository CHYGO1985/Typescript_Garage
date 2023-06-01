import { NextApiRequest, NextApiResponse } from 'next'
import validator from 'validator'
import bcrypt from 'bcryptjs'
import User from '@/components/models/User'
import getMongodbInstance from '@/utils/connect-mongodb'
import { createActivationToken } from '@/utils/tokens'
import sendEmail from '@/utils/SendMail'
import { activateTemplateEmail } from '@/emailTemplates/activate'

export default async function signup(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    await getMongodbInstance()
    const { first_name, last_name, email, phone, password } = req.body
    if (!first_name || !last_name || !email || !phone || !password) {
      return res.status(400).json({ message: 'Please fill in all fields.' })
    }
    if (!validator.isEmail(email)) {
      return res
        .status(400)
        .json({ message: 'Please Add a valid email address.' })
    }
    if (!validator.isMobilePhone(phone)) {
      return res
        .status(400)
        .json({ message: 'Please Add a valid phone number.' })
    }
    const user = await User.findOne({ email: email })
    if (user) {
      return res
        .status(400)
        .json({ message: 'This email address already exists.' })
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: 'Password must be atleast 6 characters.' })
    }
    const cryptedPassword = await bcrypt.hash(password, 12)
    const newuser = new User({
      name: `${first_name + '' + last_name}`,
      email,
      phone,
      password: cryptedPassword,
    })
    await newuser.save()
    const activationToken = createActivationToken({
      id: newuser._id.toString(),
    })
    const url = `${process.env.NEXTAUTH_URL}/activate/${activationToken}`
    await sendEmail(
      newuser.email,
      newuser.name,
      '',
      url,
      'Activate your account - FullAuth',
      activateTemplateEmail,
    )
    res.status(200).json({
      message: 'Register success! Please activate your account to start.',
    })
  } catch (error) {
    res.status(500).json({ message: (error as Error).message })
  }
}
