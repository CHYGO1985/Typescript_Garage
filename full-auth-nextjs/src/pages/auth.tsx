import RegisterForm from '@/components/forms/Register'
import Background from '@/components/backgrounds/Background'

const auth = () => {
  return (
    <div className='w-full flex items-center justify-center'>
      <div className='w-full h-100 flex items-center justify-center'>
        {/* form */}
        <div className='w-full sm:w5/6 md:w-2/3 lg:w1/2 xl:w-1/3 2xl:w-1/3 h-full bg-white flex flex-col items-center justify-center'>
          <div className='w-full px-12 py-4'>
            <h2 className='text-center text-2xl font-bold tracking-wide text-gray-800'>
              Sign up
            </h2>
            <p className='text-center text-sm text-gray-600 mt-2'>
              You already have an account? &nbsp;
              <a className='text-blue-600 hover:text-blue-700 hover:underline cursor-pointer'>
                Sign in
              </a>
            </p>
          </div>
          <RegisterForm />
        </div>
        {/* background  */}
        {/* ../../auth find the auth under public */}
        {/* to find favicon.io: ../../favicon.ico  */}
        <Background image='../../auth/register.jpg' />
      </div>
    </div>
  )
}

export default auth
