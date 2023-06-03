import * as React from 'react'
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

interface IForgetFormProps {}
const FormSchema = z.object({
  email: z.string().email('Please enter a valid email adress.'),
})

type FormSchemaType = z.infer<typeof FormSchema>
const ForgetForm: React.FunctionComponent<IForgetFormProps> = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
  })
  const onSubmit: SubmitHandler<FormSchemaType> = async (values) => {
    try {
      const { data } = await axios.post('/api/auth/forgot', {
        email: values.email,
      })
      toast.success(data.message)
    } catch (error: any) {
      toast.error(error.response.data.message)
    }
  }
  return (
    <div className='w-full px-12 py-4'>
      <h2 className='text-center text-2xl font-bold tracking-wide text-gray-800'>
        Forget password
      </h2>
      <p className='text-center text-sm text-gray-600 mt-2'>
        Sign in instead &nbsp;
        <Link
          href='/auth'
          className='text-blue-600 hover:text-blue-700 hover:underline cursor-pointer'
        >
          Sign in
        </Link>
      </p>
      <form className='my-8 text-sm' onSubmit={handleSubmit(onSubmit)}>
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

        <SlideButton
          type='submit'
          text='Send email'
          slide_text='Secure'
          icon={<FiLock />}
          disabled={isSubmitting}
        />
      </form>
    </div>
  )
}

export default ForgetForm
