import Background from '@/components/backgrounds/Background'
import ForgetForm from '@/components/forms/Forget'

export default function forgot() {
  return (
    <div className='w-full flex items-center justify-center'>
      <div className='w-full h-100 flex items-center justify-center'>
        <div className='w-full sm:w5/6 md:w-2/3 lg:w1/2 xl:w-1/3 2xl:w-1/3 h-full bg-white flex flex-col items-center justify-center'>
          <ForgetForm />
        </div>

        {/*--Background--*/}
        <Background image={`"../../auth/reset.jpg"`} />
      </div>
    </div>
  )
}
