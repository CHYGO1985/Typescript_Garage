import * as React from 'react'
import { useState, useEffect } from 'react'
import zxcvbn from 'zxcvbn'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { FiLock, FiMail } from 'react-icons/fi'
import { SubmitHandler } from 'react-hook-form/dist/types/form'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import axios from 'axios'

import Input from '../inputs/Inputs'
import SlideButton from '../buttons/SlideButton'

interface IResetFormProps {
  token: string
}
const FormSchema = z
  .object({
    password: z
      .string()
      .min(6, 'Password must be atleast 6 characters.')
      .max(52, 'Password must be less than 52 characters.'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Password does not match',
    path: ['confirmPassword'],
  })
type FormSchemaType = z.infer<typeof FormSchema>
const ResetForm: React.FunctionComponent<IResetFormProps> = (props) => {
  const { token } = props
  const [passwordScore, setPasswordScore] = useState(0)
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
  })
  const onSubmit: SubmitHandler<FormSchemaType> = async (values) => {
    try {
      const { data } = await axios.post('/api/auth/reset', {
        password: values.password,
        token,
      })
      reset()
      toast.success(data.message)
    } catch (error: any) {
      toast.error(error.response.data.message)
    }
  }
  const validatePasswordStrength = () => {
    let password = watch().password
    return zxcvbn(password ? password : '').score
  }
  useEffect(() => {
    setPasswordScore(validatePasswordStrength())
  }, [watch().password])
  return (
    <div className='w-full px-12 py-4'>
      <h2 className='text-center text-2xl font-bold tracking-wide text-gray-800'>
        Reset password
      </h2>
      <p className='text-center text-sm text-gray-600 mt-2'>
        Sign in instead ? &nbsp;
        <Link
          href='/auth'
          className='text-blue-600 hover:text-blue-700 hover:underline cursor-pointer'
        >
          Sign in
        </Link>
      </p>
      <form className='my-8 text-sm' onSubmit={handleSubmit(onSubmit)}>
        <Input
          name='password'
          label='Password'
          type='password'
          icon={<FiLock />}
          placeholder='***********'
          register={register}
          error={errors?.password?.message}
          disabled={isSubmitting}
          translateY={-22}
        />
        {watch().password?.length > 0 && (
          <div className='flex mt-2'>
            {Array.from(Array(5).keys()).map((span, i) => (
              <span className='w-1/5 px-1' key={i}>
                <div
                  className={`h-2 rounded-xl b ${
                    passwordScore <= 2
                      ? 'bg-red-400'
                      : passwordScore < 4
                      ? 'bg-yellow-400'
                      : 'bg-green-500'
                  }`}
                ></div>
              </span>
            ))}
          </div>
        )}
        <Input
          name='confirmPassword'
          label='Confirm password'
          type='password'
          icon={<FiLock />}
          placeholder='***********'
          register={register}
          error={errors?.confirmPassword?.message}
          disabled={isSubmitting}
          translateY={-12}
        />
        <SlideButton
          type='submit'
          text='Change password'
          slide_text='Secure'
          icon={<FiLock />}
          disabled={isSubmitting}
        />
      </form>
    </div>
  )
}

export default ResetForm
