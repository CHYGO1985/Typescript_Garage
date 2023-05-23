import { useSession, signIn, signOut, getSession } from 'next-auth/react'
import { NextPageContext } from 'next'
import { AiFillGithub } from 'react-icons/ai'
import { FaInstagram, FaYoutube, FaFacebook, FaLinkedin } from 'react-icons/fa'
import { SiUdemy } from 'react-icons/si'

export default function Home() {
  const { data: session } = useSession()
  const text1: string =
    'This is a full build covers the full authentication process'
  const text2: string =
    'ReactJS, NextJS, MongoDB, Typescript, Express, Next-auth etc is used'
  return (
    <>
      <div className='home bg-black min-h-screen text-white flex items-center justify-center'>
        <div className='container mx-auto'>
          <div className='border border-white relative flex flex-col w-full rounded-lg'>
            <div className='flex flex-wrap flex-col justify-center items-center'>
              <div className='w-full text-right'>
                <div className='py-6 px-3'>
                  <button
                    className='bg-blue-500 hover:bg-blue-700 text-md uppercase font-bold px-8 py-2 rounded-md sm:mr-2 mb-1 ease-linear transition-all duration-150'
                    onClick={() => signOut()}
                  >
                    Log out
                  </button>
                </div>
              </div>
              <div className='w-full flex justify-center'>
                <img
                  src={session?.user?.image!}
                  alt={`${session?.user?.name} image`}
                  className='rounded-full h-40 w-40'
                />
              </div>
              <div className='text-center mt-12'>
                <h3 className='text-4xl font-semibold mb-2'>
                  {session?.user?.name}
                </h3>
                <div className='text-sm mb-2 font-bold'>
                  {session?.user?.email}
                </div>
                <div className='mb-2 mt-10'>
                  You logged in using &nbsp;
                  <span className='capitalize bg-blue-400 text-white px-4 py-1 ml-2 font-bold italix text-lg rounded-md'>
                    {session?.user?.provider}
                  </span>
                </div>
              </div>
              <div className='w-full mt-10 py-10 border-t text-center'>
                <div className='flex flex-col flex-wrap justify-center'>
                  <div className='w-full px-4'>
                    <p className='mb-4 text-sm'>{text1}</p>
                    <p className='font-bold text-xs'>{text2}</p>
                  </div>
                  <div className='mt-6 flex items-center justify-center gap-2'>
                    Source code here: &nbsp;
                    <a
                      href='http://'
                      target='_blank'
                      rel='noopener noreferrer'
                      className='text-4xl'
                    >
                      <AiFillGithub />
                    </a>
                  </div>
                  <div className='flex justify-center gap-4 mt-4 pt-6 text-3xl'>
                    <a
                      href=''
                      target='_blank'
                      className='hover:scale-125 transition ease-in-out'
                    >
                      <AiFillGithub />
                    </a>
                    <a
                      href=''
                      target='_blank'
                      className='hover:scale-125 transition ease-in-out'
                    >
                      <FaInstagram />
                    </a>
                    <a
                      href=''
                      target='_blank'
                      className='hover:scale-125 transition ease-in-out'
                    >
                      <FaYoutube />
                    </a>
                    <a
                      href=''
                      target='_blank'
                      className='hover:scale-125 transition ease-in-out'
                    >
                      <FaFacebook />
                    </a>
                    <a
                      href=''
                      target='_blank'
                      className='hover:scale-125 transition ease-in-out'
                    >
                      <FaLinkedin />
                    </a>
                    <a
                      href=''
                      target='_blank'
                      className='hover:scale-125 transition ease-in-out'
                    >
                      <SiUdemy />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {session ? (
        <div className='flex flex-col gap-1 items-center'>
          <h1 className='text-red-700 text-4xl bg-lime-300'>
            {session?.user?.name}
          </h1>
          <img
            src={session?.user?.image!}
            alt='user image'
            className='w-32 h-32 rounded-full'
          />
          <h6>{session?.user?.email}</h6>
          <span>
            Provider: <b>{session?.user?.provider}</b>
          </span>
          <button className='bg-blue-400' onClick={() => signOut()}>
            Sign out
          </button>
        </div>
      ) : (
        <button className='bg-blue-400' onClick={() => signIn()}>
          Sign in
        </button>
      )}
    </>
  )
}

// for getting session info
export async function getServerSideProps(ctx: NextPageContext) {
  const session = await getSession(ctx)
  return {
    props: {
      session,
    },
  }
}
