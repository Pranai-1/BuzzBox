
import { GetServerSideProps } from "next";
import { getServerAuthSession } from "./api/auth/authoptions";
import Footer from "@/components/Base/Footer";
import IndexBody from "@/components/Base/IndexBody";
import Header from "@/components/Base/Header";
import Navbar from "@/components/Base/navbar";


export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getServerAuthSession(ctx);
  let email:string=""
console.log(session)
  if(session){
    email=session.user.email
  }
  return {
    props: {email},
  };
};

export default function Index({email}:{email:string }) {

  return (
    <div className="h-max w-full flex flex-col flex-wrap">
        <Navbar/>
    <div className="h-full md:h-[600px]  relative flex flex-col flex-wrap ">
  
      <Header/>
      <IndexBody email={email}/>
      <Footer/>
    </div>
    
     </div>
  );
}

   
    