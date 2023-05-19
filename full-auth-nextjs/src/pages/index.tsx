import { useSession, signIn, signOut, getSession } from 'next-auth/react'
import { NextPageContext } from 'next'

export default function Home() {
  const { data: session } = useSession()
  return (
    <>
      <h1 className='text-red-700 text-4xl bg-lime-300'>full auth</h1>
      <button onClick={() => signOut()}>Sign out</button>
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
