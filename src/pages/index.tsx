import { useRouter } from "next/router";
import image1 from "../../public/image1.jpg";
import image2 from "../../public/image2.jpg";
import image3 from "../../public/image3.jpg";
import image4 from "../../public/image4.jpg";
import image5 from "../../public/image5.jpg";
import { GetServerSideProps } from "next";
import { getServerAuthSession } from "./api/auth/authoptions";



export default function Home() {
  const router = useRouter();
  return (
    <div className="h-full w-full relative bg-black p-10">
      <p className="font-bold h-max text-3xl flex  justify-center w-full text-blue-700">Welcome Here,Happy Texting !</p>
     
      <div className=" w-full h-[160px] flex flex-wrap  items-center justify-center gap-32 mt-6">
  <div className="h-full w-1/5 bg-black rounded-lg flex flex-col items-center gap-2"
       style={{
        background: 'linear-gradient(135deg, #001f3f, #4A90E2)',
        padding:'10px',
        boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3)',
      }}
      >
    <p
      className="w-max text-black font-medium text-xl rounded-lg p-2 bg-slate-400"
      >
      What is BuzzBox?
    </p>
    <p className="font-medium  text-black rounded-lg">
      BuzzBox is an innovative online messaging platform that facilitates quick and efficient communication.   
    </p>
  </div>
 
  <div className="h-full w-1/5 bg-black rounded-lg flex flex-col items-center gap-2"
   style={{
    background: 'linear-gradient(135deg, #001f3f, #4A90E2)',
    padding:'10px',
    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3)',
  }}>
       <p
      className="w-max text-black font-medium text-xl rounded-lg p-2 bg-slate-400"
      >
     Requirements
    </p>
    <p className="font-medium  text-black rounded-lg">
    To get started with our platform, you'll need an unique numberKey for every user.  
    </p>
  </div>
 
  <div className="h-full w-1/5 bg-black  rounded-lg flex flex-col items-center gap-2"
     style={{
      background: 'linear-gradient(135deg, #001f3f, #4A90E2)',
      padding:'10px',
      boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3)',
    }}>
    <p
      className="w-max text-black font-medium text-xl rounded-lg p-2 bg-slate-400"
      >
      Rules and Guidelines!!
    </p>
    <p className="font-medium  text-black rounded-lg">
      <p>
    - Be respectful and considerate in your interactions.
    </p>              
    - Do not use offensive language or engage in harassment.   
    </p>
  </div>
         
  </div>
  <p className="text-center mt-8 p-2 text-2xl font-bold text-orange-700">
    "In the world of messaging, let your words be the bridge to understanding."
  </p>
  <button
        className=" flex justify-center items-center bg-orange-600 rounded-xl p-3 font-bold mt-3 text-white text-xl ml-[650px]"
        onClick={() => router.push("/signup")}
      >
        Create Account
      </button>
      <p className="mt-4 text-center text-white text-lg">
    Join us today and experience the future of online communication. Connect, share, and engage with BuzzBox!
  </p>
   <div className="w-full h-[250px] flex justify-center  gap-32 mt-3">
    <img
      src={image1.src}
      alt="Image Description"
      className="mt-4 w-max h-full"
    />
    <img
      src={image3.src}
      alt="Image Description"
      className="mt-4 w-max h-full"
    />
     <img
      src={image2.src}
      alt="Image Description"
      className="mt-4 w-max h-full"
    />
  </div>
  <div className="w-full h-[250px] flex justify-center  gap-32 mt-10">
    <img
      src={image4.src}
      alt="Image Description"
      className="mt-4 w-max h-full mr-10 ml-10"
    />
    <img
      src={image5.src}
      alt="Image Description"
      className="mt-4 w-max h-full"
    />
  </div>
  <button
        className=" flex justify-center items-center bg-blue-600 rounded-xl p-3 font-bold mt-10 text-white text-xl ml-[650px]"
        onClick={() => router.push("/signup")}
      >
        Get Started
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
{/* <img className="h-max ml-auto" src={image2.src} />
      <button
        className=" bg-orange-600 rounded-xl p-3 text-bold text-white text-xl absolute top-1/2 left-1/2 
   transform -translate-x-1/2 -translate-y-1/2"
        onClick={() => router.push("/signup")}
      >
        Create Account
      </button> */}