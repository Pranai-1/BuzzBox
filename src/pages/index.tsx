
import { GetServerSideProps } from "next";
import { getServerAuthSession } from "./api/auth/authoptions";
import Footer from "@/components/Base/Footer";
import IndexBody from "@/components/Base/IndexBody";
import Header from "@/components/Base/Header";
import Navbar from "@/components/Base/navbar";


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

export default function Index() {

  return (
    <div className="h-max w-full flex flex-col flex-wrap">
       
    <div className="h-full md:h-[600px]  relative flex flex-col flex-wrap ">
 
      <Header/>
      <IndexBody/>
      <Footer/>
    </div>
    
     </div>
  );
}

   
    