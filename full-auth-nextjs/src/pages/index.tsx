import { useSession, signIn, signOut, getSession } from 'next-auth/react'
import { NextPageContext } from 'next'

export default function Home() {
  const { data: session } = useSession()
  return (
    <>
      <h1 className='text-red-700 text-4xl bg-lime-300'>
        {session?.user?.name}
      </h1>
      <img
        src={session?.user?.image!}
        alt='user image'
        className='w-32 h-32 rounded-full'
      />
      {session ? (
        <button className='bg-blue-400' onClick={() => signOut()}>
          Sign out
        </button>
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
