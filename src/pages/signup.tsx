import axios from "axios";
import { useState } from "react"
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export default function Signup(){
    const[email,setEmail]=useState<string>("");
    const[password,setPassword]=useState<string>("");
    const[numberKey,setNumberKey]=useState<number>(0);
    const[name,setName]=useState<string>("");
    const[isEmptyName,setIsEmptyName]=useState<boolean>(false);
    const[isEmptyEmail,setIsEmptyEmail]=useState<boolean>(false);
    const[isEmptyPassword,setIsEmptyPassword]=useState<boolean>(false);
    const[isEmptyNumberKey,setIsEmptyNumberKey]=useState<boolean>(false);
    const handleChange=(value:any,type:string)=>{
      switch(type){
        case("Name"):
                     setName(value)
                     break;
        case("Email"):
                     setEmail(value)
                     break;
        case("Password"):
                     setPassword(value)
                     break;
        default: setNumberKey(value)
                  break;
      }
    }

    const  HandleSubmit=async()=>{
      if(name.length==0)
        setIsEmptyName(true);
      else
        setIsEmptyName(false);
     if(email.length==0)
        setIsEmptyEmail(true);
     else
      setIsEmptyEmail(false);
    if(password.length==0)
        setIsEmptyPassword(true);
      else
      setIsEmptyPassword(false);
     if(numberKey==0)
        setIsEmptyNumberKey(true);
      else
      setIsEmptyNumberKey(false);
 
    if(!isEmptyName && !isEmptyEmail && !isEmptyPassword && !isEmptyNumberKey){
      const body={
        name,
        email,
        password,
        numberKey
      }
      try{
        const response = await axios.post("/api/signup", body);

          toast.success("signup successful")
      }catch{
        toast.error("signup failed")
      }
     
    }

      
    }
    return(
        <div className=" h-[650px] w-full bg-slate-100 absolute flex justify-center items-center">
        <div className="bg-white w-1/3 flex flex-col gap-2 mb-5 p-5 rounded-xl justify-center">
            <h1 className="font-bold text-center text-2xl text-orange-600">Signup to BuzzBox</h1>
            <p className="font-medium text-center text-gray-600">Start your journey</p>
        <label className="block text-gray-700 text-sm font-bold mb-1 w-full">
            Name<span className="text-red-500">*</span>
            <input
                title="Name"
                type="text"
                required
                placeholder="Enter Your Name"
                onChange={(e) => handleChange(e.target.value, "Name")}
                className="block w-full p-3 border rounded mt-1"
            />
        </label>
        {isEmptyName && (
            <p className="text-red-500 text-sm">Name is required*</p>
         )}
       
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
        <label className="block text-gray-700 text-sm font-bold mb-2 w-full">
           NumberKey<span className="text-red-500">*</span>
                <input title="NumberKey"
                required
                placeholder="Enter Your 6 Digit NumberKey" 
                onChange={(e)=>handleChange(e.target.value,"NumberKey")}
                className="block w-full p-3 border rounded mt-1"
                />
        </label>
        {isEmptyNumberKey && (
            <p className="text-red-500 text-sm">NumberKey is required*</p>
         )}
       <button className="p-2 font-medium text-xl bg-orange-500 rounded-xl text-white h-max pt-1 
       items-center  text-center"
       onClick={HandleSubmit}
       >Signup</button>
        <span> Already Registered*?<a href="/login" className="text-blue-500 underline">Login Now</a></span>
        </div>
        </div>
    )
}