import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router"
import { useEffect, useState } from "react";

export default function Navbar(){
    const router=useRouter();
    const{data}=useSession()
    const[isLoggedIn,setIsLoggedIn]=useState(false)
    useEffect(() => {
        if (data) {
         setIsLoggedIn(true)
          console.log("User data:", data);
        }else{
            setIsLoggedIn(false)
        }
      }, [data])
    return(
        <div className=" w-full h-[50px] overflow-hidden flex justify-between items-center">
            <div>
               <h1 className=" font-bold text-center text-orange-600 p-2 text-2xl cursor-pointer"
               onClick={()=>{router.push("/")}}
               >BuzzBox</h1>
            </div>
            {isLoggedIn ?(
                 <button className="p-2 font-medium text-xl bg-orange-500 rounded-xl text-white h-max pt-1 items-center"
                 onClick={()=>signOut()}
                 >
                     Logout</button>
            ):(
                <button className="p-2 font-medium text-xl bg-orange-500 rounded-xl text-white h-max pt-1 items-center"
                onClick={()=>router.push("/login")}
                >
                    Login</button>
            )}
           
        </div>
    )
}