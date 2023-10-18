import Navbar from "@/components/navbar";
import "@/styles/globals.css";
import type { AppProps, AppType } from "next/app";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <ToastContainer />
      <Navbar />
      <Component {...pageProps} />
    </SessionProvider>
  );
};
export default MyApp;
