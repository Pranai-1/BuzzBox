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
      <p className="font-bold h-max text-3xl flex justify-center w-full text-orange-600   absolute top-10">Welcome Here!</p>
      <span className="text-white font-bold h-max text-4xl flex justify-center w-full  absolute top-32 md:text-slate-200">Talk to Strangers, </span>
      <span className="text-white font-bold h-max text-4xl flex justify-center w-full  absolute top-44 md:text-slate-200">Make friends! </span>
        </div>
    )
}