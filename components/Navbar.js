import React from "react";
import { useRouter } from "next/router";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";
export default function Navbar() {
  const route = useRouter();
  return (
    <nav className=" w-full py-4 px-6 bg-gray-900 flex justify-between items-center">
      <h1 className=" text-white text-3xl font-bold">Maple Notes</h1>
      <div >
      <button
        className=" text-white bg-blue-700 rounded-lg py-2 px-6 font-semibold mr-3"
        onClick={() => {
          route.push("/");
        }}
      >
        Home
      </button>
      <button
        onClick={async () => {
          await signOut(auth);
          route.push("/signup");
        }}
        className=" text-white bg-blue-700 rounded-lg py-2 px-6 font-semibold"
      >
        SignOut
      </button>
      </div>
    </nav>
  );
}
