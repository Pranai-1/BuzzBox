import a from "../../public/a.png"
import s from "../../public/s.jpg"
export default function Header(){
    return(
        <>
        <img
      src={a.src}
      className="hidden md:block  w-full h-[720px]"
    />
    <img src={s.src} className="h-[720px] md:hidden "/>
      <p className="font-bold h-max text-3xl flex justify-center w-full text-orange-600   absolute top-10">Welcome Here!</p>
      <span className="text-white font-bold h-max text-4xl flex justify-center w-full  absolute top-32 md:text-slate-200">Talk to Strangers, </span>
      <span className="text-white font-bold h-max text-4xl flex justify-center w-full  absolute top-44 md:text-slate-200">Make friends! </span>
        </>
    )
}