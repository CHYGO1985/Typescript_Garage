import * as React from 'react'
import Input from '../inputs/Inputs'
import validator from 'validator'
import { CiUser } from 'react-icons/ci'
import { FiLock, FiMail } from 'react-icons/fi'
import { useForm } from 'react-hook-form'
import { BsTelephone } from 'react-icons/bs'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState, useEffect } from 'react'
import zxcvbn from 'zxcvbn'

interface IRegisterFormProps {}

const FormSchema = z
  .object({
    first_name: z
      .string()
      .min(2, 'First name must be at least 2 characters')
      .max(32, 'First name must be less than 32 characters')
      .regex(new RegExp('^[a-zA-z]+$'), 'No special characters allowed.'),
    last_name: z
      .string()
      .min(2, 'Last name must be at least 2 characters')
      .max(32, 'Last name must be less than 32 characters')
      .regex(new RegExp('^[a-zA-z]+$'), 'No special characters allowed.'),
    email: z.string().email('Please enter a valid email adress.'),
    phone: z.string().refine(validator.isMobilePhone, {
      message: 'Please enter a valid phone number',
    }),
    password: z
      .string()
      .min(6, 'Password must be atleast 6 characters.')
      .max(52, 'Password must be less than 52 characters.'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password doesn't match",
    path: ['confirmPassword'],
  })

type FormSchemaType = z.infer<typeof FormSchema>

const RegisterForm: React.FunctionComponent<IRegisterFormProps> = (props) => {
  const [passwordScore, setPasswordScore] = useState(0)
  const {
    register,
    handleSubmit,
    watch, // watch the value
    formState: { errors, isSubmitting },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
  })

  const onSubmit = (data: any) => console.log(data)

  const validatePasswordStrength = () => {
    let password = watch().password
    return zxcvbn(password ? password : '').score
  }

  useEffect(() => {
    setPasswordScore(validatePasswordStrength())
  }, [watch().password])

  return (
    <form className='my-8 text-sm' onSubmit={handleSubmit(onSubmit)}>
      <div className='gap-2 md:flex'>
        <Input
          name='first_name'
          label='First name'
          type='text'
          icon={<CiUser />}
          placeholder='example'
          register={register}
          error={errors?.first_name?.message}
          disabled={isSubmitting}
          translateY={-22}
        />
        <Input
          name='last_name'
          label='Last name'
          type='text'
          icon={<CiUser />}
          placeholder='example'
          register={register}
          error={errors?.last_name?.message}
          disabled={isSubmitting}
          translateY={-12}
        />
      </div>
      <Input
        name='email'
        label='Email address'
        type='text'
        icon={<FiMail />}
        placeholder='example@emaple.com'
        register={register}
        error={errors?.email?.message}
        disabled={isSubmitting}
        translateY={-12}
      />
      <Input
        name='phone'
        label='Phone number'
        type='text'
        icon={<BsTelephone />}
        placeholder='+(xxx) xxx-xx-xx'
        register={register}
        error={errors?.phone?.message}
        disabled={isSubmitting}
        translateY={-12}
      />
      <Input
        name='password'
        label='Password'
        type='password'
        icon={<FiLock />}
        placeholder='***********'
        register={register}
        error={errors?.password?.message}
        disabled={isSubmitting}
        translateY={-12}
      />
      {watch().password?.length > 0 && (
        <div className='flex mt-2'>
          {Array.from(Array(5).keys()).map((i) => (
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
      <button type='submit'>Submit</button>
    </form>
  )
}

export default RegisterForm
