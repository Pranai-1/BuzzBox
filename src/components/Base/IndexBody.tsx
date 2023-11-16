import { useRouter } from "next/router";

export default function IndexBody(){
    const router=useRouter();
    return(
        <>
        <div className="text-gray-300 w-full  h-max text-xl flex flex-col justify-center items-center font-normal  absolute top-56 md:text-black mt-3 ">
      <p> Experience an exciting free Omegle text alternative to Find friends, connect with strangers, and</p>
       <p> talk with girls and guys in random anonymous chat rooms. No registration required. </p>

       <div className="w-full   flex justify-center items-center gap-10 mt-8">
        <button
        className="  bg-blue-700 rounded-xl p-3 font-medium  text-white text-xl"
        onClick={() => router.push("/AnonLogin")}>
   Anonymous Chat
   </button> 
   <button
        className="  bg-orange-600 rounded-xl p-3 font-medium text-white text-xl  "
        onClick={() => router.push("/signup")}>
    Create Account
   </button> 
   </div>
    
   <div className="mt-3 bg-gradient-to-b  from-teal-500 to-purple-600 md:bg-none md:mt-32 flex flex-wrap flex-col justify-center items-center">
    <p className="text-blue-800 text-lg px-2 bg-purple-400 font-medium rounded-xl w-max mt-2">Reach people like you</p>
    <p className="text-slate-200 text-2xl  font-medium rounded-xl mt-3"> Anonymous Chat, Meet new people</p>
    <p className=" text-gray-300 text-lg  font-medium rounded-xl mt-3">Find female and male strangers worldwide, the new modern Omegle
     alternative. </p>
    <p className="text-gray-300 text-lg  font-medium rounded-xl ">Connect with real people, enjoy ad free chats, and build 
    genuine relationships.</p>
   </div>   
 </div>
        
        
 </>
         
    )
}


