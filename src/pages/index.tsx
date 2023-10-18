import { useRouter } from "next/router";
import image2 from "../../public/image.png";
import { GetServerSideProps } from "next";
import { getServerAuthSession } from "./api/auth/authoptions";

export default function Home() {
  const router = useRouter();
  return (
    <div className="h-full w-full relative">
      <img className="h-max ml-auto" src={image2.src} />
      <button
        className=" bg-orange-600 rounded-xl p-3 text-bold text-white text-xl absolute top-1/2 left-1/2 
   transform -translate-x-1/2 -translate-y-1/2"
        onClick={() => router.push("/signup")}
      >
        Create Account
      </button>
    </div>
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
