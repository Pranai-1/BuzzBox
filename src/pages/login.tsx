import axios from "axios";
import { GetServerSideProps } from "next";
import Credentials from "next-auth/providers/credentials";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react"
import { toast } from "react-toastify";
import {z} from "zod"
import { getServerAuthSession } from "./api/auth/authoptions";
export default function Login(){
    const[email,setEmail]=useState<string>("");
    const[password,setPassword]=useState<string>("");
    const[isEmptyEmail,setIsEmptyEmail]=useState<boolean>(false);
    const[isEmptyPassword,setIsEmptyPassword]=useState<boolean>(false);
    const router=useRouter();

    const userInput = z.object({
      email: z.string().min(11).max(40).email(),
      password: z.string().min(8).max(25)
    });


    const handleChange=(value:any,type:string)=>{
      switch(type){
        case("Email"):
                     setEmail(value)
                     break;        
        default: setPassword(value)
                  break;
      }
    }

    const HandleSubmit=async()=>{
     
      if (email.length === 0) {
        setIsEmptyEmail(true);
      } else {
        setIsEmptyEmail(false);
      }
      
      if (password.length === 0) {
        setIsEmptyPassword(true);
      } else {
        setIsEmptyPassword(false);
      }
      
      if (!isEmptyEmail && !isEmptyPassword) {
        const body = {
          email,
          password,
        };
      
        const parsedInput = userInput.safeParse(body);
      
        if (!parsedInput.success) {
          toast.error("Login failed");
        } else {
          const { email: parsedEmail, password: parsedPassword } = parsedInput.data;
      
          const response = await signIn("credentials", {
            email: parsedEmail,
            password: parsedPassword,
            redirect:false
          });
      if(response?.status==200){
       
          toast.success("Login success");
          router.push("/profile");
      }else{
        toast.error("Login failed");
      }
        }
      
  
  }
    }
    return(
        <div className=" h-[650px] w-full bg-slate-100 absolute flex justify-center items-center">
        <div className="bg-white w-1/3 flex flex-col gap-2 mb-5 p-5 rounded-xl justify-center">
            <h1 className="font-bold text-center text-2xl text-orange-600">Login to BuzzBox</h1>
            <p className="font-medium text-center text-gray-600">Start your journey</p>
        <label className="block text-gray-700 text-sm font-bold mb-2 w-full">
           Email<span className="text-red-500">*</span>
                <input title="Email"
                required
                placeholder="Enter Your Email" 
                onChange={(e)=>handleChange(e.target.value,"Email")}
                className="block w-full p-3 border rounded mt-1"
                />
        </label>
        {isEmptyEmail && (
            <p className="text-red-500 text-sm">Email is required*</p>
         )}
        <label className="block text-gray-700 text-sm font-bold mb-2 w-full">
           Password<span className="text-red-500">*</span>
                <input title="Password"
                required
                placeholder="Enter Your Password minlength-6" 
                onChange={(e)=>handleChange(e.target.value,"Password")}
                className="block w-full p-3 border rounded mt-1"
                />
        </label>
        {isEmptyPassword && (
            <p className="text-red-500 text-sm">Password is required*</p>
         )}
      
       <button className="p-2 font-medium text-xl bg-orange-500 rounded-xl text-white h-max pt-1 
       items-center  text-center"
       onClick={HandleSubmit}
       >Login</button>
      <span> New User*?<a href="/signup" className="text-blue-500 underline">Register here</a></span>
        
     
        </div>
        </div>
    )
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
    props: {}
  };
}