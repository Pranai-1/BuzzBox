import Navbar from "@/components/Base/navbar";
import "@/styles/globals.css";
import type { AppProps, AppType } from "next/app";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";
import 'simplebar/dist/simplebar.min.css';
const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <ToastContainer />
     
      <Component {...pageProps} />
    </SessionProvider>
  );
};
export default MyApp;
