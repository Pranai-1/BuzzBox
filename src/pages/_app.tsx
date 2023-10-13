import Navbar from '@/components/navbar'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {SessionProvider} from "next-auth/react"


export default function App({ Component, pageProps }: AppProps) {
  return(
    <>
    <SessionProvider session={pageProps.session}>
     <ToastContainer />
    <Navbar />
    <Component {...pageProps} />
    </SessionProvider>
    </>
  )

  
}
