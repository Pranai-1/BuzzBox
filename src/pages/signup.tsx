import { GetServerSideProps } from "next";
import "react-toastify/dist/ReactToastify.css";
import { getServerAuthSession } from "./api/auth/authoptions";
import SignupForm from "@/components/SignupForm";

export default function Signup() {
  return (
  <SignupForm/>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getServerAuthSession(ctx);
  if (session) {
    return {
      redirect: {
        destination: "/Home",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
};
