
import { GetServerSideProps } from "next";
import { getServerAuthSession } from "./api/auth/authoptions";
import LoginForm from "@/components/User/LoginForm";
import { useSession } from "next-auth/react";

export default function Login() {
const session=useSession()
console.log(session)
return (
    <LoginForm/>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getServerAuthSession(ctx);
console.log(session)
  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
};
