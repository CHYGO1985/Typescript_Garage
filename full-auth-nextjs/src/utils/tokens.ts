import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { parseUrl } from 'next/dist/shared/lib/router/utils/parse-url'

dotenv.config()

const { ACTIVATION_TOKEN_SECRET, RESET_TOKEN_SECRET } = process.env

export const createActivationToken = (payload: any) => {
  return jwt.sign(payload, ACTIVATION_TOKEN_SECRET!, { expiresIn: '2d' })
}

export const createResetToken = (payload: any) => {
  return jwt.sign(payload, RESET_TOKEN_SECRET!, { expiresIn: '6h' })
}
