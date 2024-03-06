
import { GetServerSideProps } from "next";
import { getServerAuthSession } from "./api/auth/authoptions";
import LoginForm from "@/components/User/LoginForm";

export default function Login() {

return (
    <LoginForm/>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getServerAuthSession(ctx);

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
