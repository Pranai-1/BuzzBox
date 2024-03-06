import { useRouter } from "next/router";
import logo from "../../public/logo.png"


export default function Title(){
  const router=useRouter()
    return(
      <div className="flex cursor-pointer" onClick={() => {
        router.push("/");
      }}>
   
        <div className="w-8 h-8 bg-center bg-no-repeat bg-cover rounded-full p-2 mt-2 ml-2" style={{ backgroundImage: `url(${logo.src})` }}></div>
        <div
          className=" font-bold text-center text-orange-600 p-2 text-2xl "
        >
          BuzzBox
        </div>
    

        </div>
    )
   
}