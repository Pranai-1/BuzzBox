import { useRouter } from "next/router";
import girl from "../../public/girl.png"
import man from "../../public/man.png"
import { useState } from "react";
import axios from "axios";
export default function AnonLogin(){
    const router=useRouter();
    const [isClickedMan, setIsClickedMan] = useState<boolean>(false);
    const [isClickedGirl, setIsClickedGirl] = useState<boolean>(false);
    const[errorMessage,setErrorMessage]=useState<string>("")
    const handleClickMan = (type:string) => {
        if(isClickedGirl){
            setIsClickedGirl(false)
        }
        setIsClickedMan(true);
    };
    const handleClickGirl = (type:string) => {
        if(isClickedMan){
            setIsClickedMan(false)
        }
        setIsClickedGirl(true);
      };
   async function HandleSubmit() {
        let gender:string=""
      if(isClickedGirl){
        gender="Female"
      }
     
      if(isClickedMan){
        gender="Male"
      }
    if(gender.length==0){
        setErrorMessage("Please Select the Gender")
        return;
    }
   const body={
    gender
   }
   const response=await axios.post("/api/AnonymousUser/login",body)
   console.log(response.data.name)
    }

    return(
        <div className="h-[707px] w-full bg-black flex flex-wrap justify-center items-center">
         <div className="h-[350px] w-[350px] bg-slate-200 text-orange-600 rounded-xl p-2">
          <h1 className="text-3xl font-bold p-2 my-2">Before You start...</h1>
          <p className="text-black font-medium px-2">Your Gender:</p>
          <div className="h-max w-max flex justify-center items-center gap-6 mt-1 ml-3">
            <div className=" bg-gray-500 rounded-lg"  onClick={()=>handleClickMan("man")}>
            <img
            src={man.src}
            className={`h-[60px] w-[60px] p-4 rounded-lg ${isClickedMan ? 'border-2 border-red-600' : ''}`}
           />

          </div>
          <div className=" bg-gray-500 rounded-lg"  onClick={()=>handleClickGirl("girl")}>
          <img
            src={girl.src}
            className={`h-[60px] w-[60px] p-4 rounded-lg  ${isClickedGirl ? 'border-2 border-red-600' : ''}`}
        
      />
         </div>
        
          </div>
          {errorMessage.length>0&&(
            <p className="text-red">{errorMessage}**</p>
         )}
          <p className="text-gray-600 font-medium mt-2 p-2">I'm at least 18 years old and have read and agree to the Terms of Service</p>
         <button className="h-[40px] w-full bg-indigo-400 font-medium p-2 rounded-lg my-1 text-red-700 mr-2"
         onClick={HandleSubmit}
         >
            I Agree,Let's Go!</button>
         <span className="text-black pt-2 pl-2 mt-2">Already have an account?</span> 
         <span className=" text-blue-600 pl-1 pt-2 mt-2 cursor-pointer" onClick={()=>router.push("/login")}>Login</span>
         </div>
        </div>
    )
}