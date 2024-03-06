import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { success } from "../../../public/toast";
import Title from "../Title";




export default function Navbar() {
  const router = useRouter();
  const { data: sessionData } = useSession();

  return (
    <div className=" w-full h-[50px] overflow-hidden flex justify-between items-cente bg-black md:bg-indigo-600">
       <Title/>
      {sessionData?.user != null ? (
        <button
          className="p-2 font-medium text-xl bg-orange-500 rounded-xl text-white h-max pt-1 items-center m-1"
          onClick={() => {
            void signOut();
         success("Logged out successfully");
          }}
        >
          Logout
        </button>
      ) : (
        <button
          className="p-2 font-medium text-xl bg-orange-500 rounded-xl text-white h-max pt-1 items-center m-1"
          onClick={() => router.push("/login")}
        >
          Login
        </button>
      )}
    </div>
  );
}
