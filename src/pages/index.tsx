
import { GetServerSideProps } from "next";
import { getServerAuthSession } from "./api/auth/authoptions";
import Footer from "@/components/Footer";
import IndexBody from "@/components/IndexBody";
import Header from "@/components/Header";
import Navbar from "@/components/navbar";


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

  return (
    <div className="h-max w-full flex flex-col flex-wrap">
         <Navbar />
    <div className="h-full md:h-[600px]  relative flex flex-col flex-wrap ">
 
      <Header/>
      <IndexBody/>
      <Footer/>
    </div>
    
     </div>
  );
}

   
      {/* <div className=" w-full h-max flex flex-wrap  items-center justify-center gap-6 mt-6 md:gap-32">
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

   <div className="flex justify-center flex-wrap mt-4 font-medium">
   <div  className="h-max w-max bg-black  rounded-lg flex flex-col items-center gap-2 m-2 flex-wrap justify-center"
      style={{
        background: 'linear-gradient(135deg, #4AC0E8, #338BB3)',
        padding: '20px',
        boxShadow: '0 10px 20px rgba(51, 139, 179, 0.5)',
    }}
          >
   
    <p className="italic">"Texting is the closest thing to telepathy we have."</p>
    <p className="italic">"Words are free; it's how you use them that may cost you."</p>
    <p className="italic">"Texting is a silent shout for love."</p>
 
  </div>
  <div  className="h-max w-max bg-black  rounded-lg flex flex-col items-center gap-2 m-2"
             style={{
              background: 'linear-gradient(135deg, #4AC0E8, #338BB3)',
              padding: '20px',
              boxShadow: '0 10px 20px rgba(51, 139, 179, 0.5)',
          }}
          
            >
  <p className="italic">"In the world of messages, every word counts."</p>
  <p className="italic">"A text message can say so much with just a few characters."</p>
  <p className="italic">"The art of texting is in the spaces between the words."</p>
  </div>

  </div>
  <Images/>
  <button
        className=" flex justify-center items-center bg-blue-600 rounded-xl p-3 font-bold mt-10 text-white text-xl ml-[130px] md:ml-[660px]"
        onClick={() => router.push("/signup")}>
    Get Started
   </button> */}