import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { ToastContainer, toast } from 'react-toastify'
import Head from 'next/head'

import '@/styles/globals.css'

import 'react-toastify/dist/ReactToastify.css'

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <Head>
        <title>Authentication -- JJ</title>
      </Head>
      <ToastContainer
        position='top-right'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='colored'
      />
      {/* Same as */}
      <ToastContainer />
      <Component {...pageProps} />
    </SessionProvider>
  )
}
