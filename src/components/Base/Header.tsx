import bg from "../../../public/bg.png"
import bgmobile from "../../../public/bgmobile.jpg"
export default function Header(){
    return(
        <div className="h-max w-full ">
        <img
      src={bg.src}
      className="hidden w-full h-screen md:flex md:flex-wrap"
    />
    <img src={bgmobile.src} className="w-screen h-[720px] md:hidden "/>
      <p className="font-bold h-max text-3xl flex justify-center flex-wrap w-full text-orange-600   absolute top-10">Welcome Here!</p>
      <span className=" w-full  text-white font-bold h-max md:text-4xl text-3xl flex justify-center left-6 md:left-auto  absolute top-32 md:text-slate-200">Unlock the power of conversation</span>
      <span className="hidden md:flex text-white font-bold h-max text-4xl  justify-center w-full  absolute top-44 md:text-slate-200">Connect. Chat. Collaborate</span>
        </div>
    )
}