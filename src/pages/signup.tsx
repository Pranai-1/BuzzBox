import axios from "axios";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getServerAuthSession } from "./api/auth/authoptions";

export default function Signup() {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [numberKey, setNumberKey] = useState<number>(0);
  const [name, setName] = useState<string>("");
  const [nameErrorMessage, setNameErrorMessage] = useState<string>("");
  const [numberKeyErrorMessage, setNumberKeyErrorMessage] =useState<string>("");
  const [emailErrorMessage, setEmailErrorMessage] = useState<string>("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState<string>("");
  
  const handleChange = (value: any, type: string) => {
    switch (type) {
      case "Name":
        setName(value);
        break;
      case "Email":
        setEmail(value);
        break;
      case "Password":
        setPassword(value);
        break;
      default:
        setNumberKey(value);
        break;
    }
  };

  const HandleSubmit = async () => {
    if (name.length <3){
      setNameErrorMessage("name must contain 3 characters");
      return
    } else{
      setNameErrorMessage("")
    }
   
    if (email.length <11) {
      setEmailErrorMessage("Invalid Email");
      return
    }else{
      setEmailErrorMessage("")
    }
    if (password.length <8) {
      setPasswordErrorMessage("Password must contain 8 characters");
      return
    } else{
      setPasswordErrorMessage("")
    }
    if (numberKey <100000 || numberKey>999999){
      setNumberKeyErrorMessage("number key should be of 6 digits");
      return
    }else{
      setNameErrorMessage("")
    }
   
      const body = {
        name,
        email,
        password,
        numberKey,
      };
      try {
        const response = await axios.post("/api/signup", body);

        toast.success("signup successful");
        router.push("/login");
      } catch {
        toast.error("signup failed");
      }
   
  };
  return (
    <div className=" h-[650px] w-full bg-slate-100 absolute flex justify-center items-center">
      <div className="bg-white  w-[360px] md:w-[440px] flex flex-col gap-2 mb-5 p-5 rounded-xl justify-center">
        <h1 className="font-bold text-center text-2xl text-orange-600">
          Signup to BuzzBox
        </h1>
        <p className="font-medium text-center text-gray-600">
          Start your journey
        </p>
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
        {nameErrorMessage.length>0 && (
          <p className="text-red-500 text-sm">Name is required*</p>
        )}

        <label className="block text-gray-700 text-sm font-bold mb-2 w-full">
          Email<span className="text-red-500">*</span>
          <input
            title="Email"
            required
            placeholder="Enter Your Email"
            onChange={(e) => handleChange(e.target.value, "Email")}
            className="block w-full p-3 border rounded mt-1"
          />
        </label>
        {emailErrorMessage.length>0 && (
          <p className="text-red-500 text-sm">Email is required*</p>
        )}
        <label className="block text-gray-700 text-sm font-bold mb-2 w-full">
          Password<span className="text-red-500">*</span>
          <input
            title="Password"
            required
            placeholder="Enter Your Password minlength-6"
            onChange={(e) => handleChange(e.target.value, "Password")}
            className="block w-full p-3 border rounded mt-1"
          />
        </label>
        {passwordErrorMessage.length>0 && (
          <p className="text-red-500 text-sm">Password is required*</p>
        )}
        <label className="block text-gray-700 text-sm font-bold mb-2 w-full">
          NumberKey<span className="text-red-500">*</span>
          <input
            title="NumberKey"
            type="number"
            required
            placeholder="Enter Your 6 Digit NumberKey"
            onChange={(e) => handleChange(e.target.value, "NumberKey")}
            className="block w-full p-3 border rounded mt-1"
          />
        </label>

        {numberKeyErrorMessage.length>0 && (
          <p className="text-red-500 text-sm">NumberKey is required*</p>
        )}
        <button
          className="p-2 font-medium text-xl bg-orange-500 rounded-xl text-white h-max pt-1 
       items-center  text-center"
          onClick={HandleSubmit}
        >
          Signup
        </button>
        <span>
          {" "}
          Already Registered*?
          <a href="/login" className="text-blue-500 underline">
            Login Now
          </a>
        </span>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getServerAuthSession(ctx);
  if (session) {
    return {
      redirect: {
        destination: "/Home",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
};
