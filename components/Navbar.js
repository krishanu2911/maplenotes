import React from "react";
import { useRouter } from "next/router";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";
import { useAuth } from "../context/AuthContext";
export default function Navbar() {
  const route = useRouter();
  const { user } = useAuth();
  return (
    <nav className=" w-full py-4 px-6 bg-gray-900 flex justify-between items-center">
      <h1 className=" text-gray-300 text-3xl font-bold">Maple Notes</h1>
      <div>
        <button
          className=" text-gray-300 bg-gray-800 rounded-lg py-2 px-6 font-bold text-xl mr-3"
          onClick={() => {
            if (user !== null) {
              route.push("/");
            }
          }}
        >
          Home
        </button>
        {route.pathname === "/" && (
          <button
            onClick={async () => {
              await signOut(auth);
              route.push("/login");
            }}
            className=" text-gray-300 bg-gray-800  rounded-lg py-2 px-6 font-bold text-xl"
          >
            SignOut
          </button>
        )}
      </div>
    </nav>
  );
}
