import { useRouter } from "next/router";

export default function IndexBody({email}:{email:string}){
    const router=useRouter();
    return(
        <div className="text-gray-300 w-full  h-max text-xl flex flex-col justify-center items-center font-normal  absolute top-56 md:text-black mt-3 ">
      <p className="h-max w-full p-2 text-center"> Seamlessly Connect and Effortlessly Chat with Our Intuitive Messaging Platform!</p>
      <div className="w-full  flex justify-center items-center gap-10 mt-8 mx-1">
      {email.length>0 ?(
      <>
     <button
      className="flex items-center bg-orange-600 rounded-xl md:p-3 font-medium text-white md:text-xl text-base p-1 px-2"
      onClick={() => router.push("/Home")}
    >
      <span className="mr-1">Chat Home</span>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6 mt-2 font-medium">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" /> 
      </svg>
    </button>

      </>
      ):(
       <>
        <button
        className="  bg-blue-700 rounded-xl md:p-3 font-medium text-white md:text-xl text-base  p-1 px-2"
        onClick={() => router.push("/AnonLogin")}>
   Anonymous Chat
   </button> 
   <button
        className="bg-orange-600 rounded-xl md:p-3 font-medium text-white md:text-xl text-base  p-1 px-2"
        onClick={() => router.push("/signup")}>
    Create Account
   </button> 
   </>
    
      )}
      </div>
      
   <div className="mt-3  md:bg-none md:mt-28 flex flex-wrap flex-col justify-center items-center">
    <p className="text-blue-800 text-lg px-2 bg-purple-400 font-medium rounded-xl w-max md:mt-2 mt-6">Reach people like you</p>
    <p className="text-slate-200 md:text-2xl  font-medium rounded-xl mt-3 text-center text-xl"> Anonymous Chat, Meet new people</p>
    <p className=" text-gray-300 md:text-lg text-base  font-medium rounded-xl mt-3 text-center">Find female and male strangers worldwide, the new modern texting
     alternative. </p>
    <p className="text-gray-300 md:text-lg text-base font-medium rounded-xl text-center">Connect with real people, enjoy ad free chats, and build 
    genuine relationships.</p>
   </div>   
 </div>      
    )
}


