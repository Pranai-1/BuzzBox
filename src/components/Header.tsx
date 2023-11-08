import a from "../../public/a.png"
export default function Header(){
    return(
        <>
         <img src={a.src} className="w-full h-[720px]"/>
      <p className="font-bold h-max text-3xl flex justify-center w-full text-orange-600   absolute top-10">Welcome Here!</p>
      <span className="font-bold h-max text-4xl flex justify-center w-full  absolute top-32 text-slate-300">Talk to Strangers, </span>
      <span className="font-bold h-max text-4xl flex justify-center w-full  absolute top-44 text-slate-300">Make friends! </span>
        </>
    )
}