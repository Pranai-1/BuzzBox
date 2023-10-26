import { useRouter } from "next/router";
import image2 from "../../public/image.png";
import { GetServerSideProps } from "next";
import { getServerAuthSession } from "./api/auth/authoptions";



export default function Home() {
  const router = useRouter();
  return (
    <div className="h-[657px] w-full relative bg-gray-900"    style={{
      background: 'linear-gradient(135deg, #444444, black)',
      padding: '10px', 
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)', 
      color: 'white',  
    }}>
      <p className="font-bold h-max text-3xl text-white flex  justify-center w-full">Welcome Here,Happy Texting !</p>
     
      <div className=" w-full h-[160px] flex flex-wrap  items-center justify-center gap-32 mt-6">
  <div className="h-full w-1/5 bg-black rounded-lg flex flex-col items-center">
  <p
  className="w-max text-white font-medium text-xl rounded-lg p-2 py-1 mt-1"
  style={{ background: 'linear-gradient(135deg, #4A90E2, #EE3377)',

 }}
  
>
  What is BuzzBox?
</p>

  </div>
 
  <div className="h-full w-1/5 bg-black rounded-lg">

  </div>
 
  <div className="h-full w-1/5 bg-black  rounded-lg ">

  </div>
         
  </div>
      
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