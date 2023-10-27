import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import { getServerAuthSession } from "./api/auth/authoptions";
import Footer from "@/components/Footer";
import IndexBody from "@/components/IndexBody";
import Images from "@/components/Images";

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

export default function Home() {
  const router = useRouter();
  return (
    <div className="h-full w-full relative bg-black p-10 px-0">
      <p className="font-bold h-max text-3xl flex justify-center w-full text-blue-700 ml-5 md:ml-0">Welcome Here!</p>
      <span className="font-bold h-max text-2xl flex justify-center w-full text-green-700 ml-5 md:ml-0">Happy Texting </span>
      <div className=" w-full h-max flex flex-wrap  items-center justify-center gap-6 mt-6 md:gap-32">
        <IndexBody/>
  </div>
  <p className="text-center mt-8 p-2 text-2xl font-bold text-orange-700">
    "In the world of messaging, let your words be the bridge to understanding."
  </p>
  <button
        className=" flex justify-center items-center bg-orange-600 rounded-xl p-3 font-bold mt-3 text-white text-xl ml-[130px] md:ml-[660px]"
        onClick={() => router.push("/signup")}
      >
        Create Account
      </button>
      <p className="mt-4 text-center text-white text-lg">
    Join us today and experience the future of online communication. Connect, share, and engage with BuzzBox!
  </p>
  <Images/>
  <button
        className=" flex justify-center items-center bg-blue-600 rounded-xl p-3 font-bold mt-10 text-white text-xl ml-[130px] md:ml-[650px]"
        onClick={() => router.push("/signup")}>
    Get Started
   </button>
   <Footer/>

    </div>
    
  );
}

