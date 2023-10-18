import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Navbar() {
  const router = useRouter();
  const { data: sessionData } = useSession();

  return (
    <div className=" w-full h-[50px] overflow-hidden flex justify-between items-center">
      <div>
        <h1
          className=" font-bold text-center text-orange-600 p-2 text-2xl cursor-pointer"
          onClick={() => {
            router.push("/");
          }}
        >
          BuzzBox
        </h1>
      </div>
      {sessionData?.user != null ? (
        <button
          className="p-2 font-medium text-xl bg-orange-500 rounded-xl text-white h-max pt-1 items-center"
          onClick={() => {
            void signOut();
            toast.success("Logged out successfully");
          }}
        >
          Logout
        </button>
      ) : (
        <button
          className="p-2 font-medium text-xl bg-orange-500 rounded-xl text-white h-max pt-1 items-center"
          onClick={() => router.push("/login")}
        >
          Login
        </button>
      )}
    </div>
  );
}
