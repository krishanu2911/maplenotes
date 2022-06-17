import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../config/firebase.js";
import { doc, setDoc } from "firebase/firestore";
import React from "react";
import { useState } from "react";
import { useRouter } from 'next/router'
export default function signup() {
  const [error, setError] = useState({
    email: {
      isError: true,
    },
    password: {
      isError: true,
    },
  });
  const [userDetail, setUserDetail] = useState({
    email: "",
    password: "",
    fullName: "",
  });
  const router = useRouter();
  const emailRegex = new RegExp(/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/);
  const addNewUser = async (email, fullName, password) => {
    console.log(email, fullName, password);
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      storeUserToDb(fullName, email, password, res.user.uid);
    //   typeof window !== 'undefined' ? localStorage.getItem("userToken") : null
      localStorage.setItem("userToken", res.user.uid)
    } catch (err) {
      console.log(err);
    }
  };
  const storeUserToDb = async (fullName, email, password, userId) => {
    try {
      await setDoc(doc(db, "users", userId), {
        fullName,
        email,
        password,
        notes: [],
      });
    } catch (err) {
      console.log(err);
    }
  };
  const showPass = true;
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    console.log(name)
    const validateError = validateForm(name, value);
    setError((prevValue) => ({
      ...prevValue,
      [name]: {
        ...prevValue[name],
        isError: validateError,
      },
    }));
    setUserDetail({ ...userDetail, [name]: value });
  };
  const validateForm = (name, value) => {
    switch (name) {
      case "email":
        return !emailRegex.test(value);
      case "password":
        console.log(value.length);
        return !value.length > 6;
      default:
        return true;
    }
  };
  const submitHandler = (e) => {
    e.preventDefault();
    console.log(error);
    if (!error.email.isError && !error.password.isError) {
      console.log("hello andaer");
      addNewUser(userDetail.email, userDetail.fullName, userDetail.password);
      router.push("/")
    }
  };
  return (
    <div className=" flex flex-col justify-between items-center w-full min-h-screen">
      <section className={` flex flex-col gap-6  mt-20 w-96`}>
        <header className="text-center flex flex-col gap-4">
          <h1 className="text-3xl font-bold">Sign up for an account</h1>
          <h3 className="text-sm text-gray-500">
            Start Joting down your Notes
          </h3>
        </header>
        <section>
          <form onSubmit={(e) => submitHandler(e)}>
            <div>
              <input
                type="text"
                className="btnBorder rounded-lg border-slate-300 py-2 px-2 w-full"
                placeholder="Username or email"
                name="email"
                onChange={(e) => handleChange(e)}
                required
              />
              <input
                type="text"
                className="btnBorder rounded-lg border-slate-300 py-2 px-2 w-full mt-3"
                placeholder="fullName"
                name="fullName"
                onChange={(e) => handleChange(e)}
                required
              />
              <div className="btnBorder rounded-lg  border-slate-300 py-2 px-2 w-full  mt-3 justify-between flex items-center">
                <input
                  type={showPass ? "text" : "password"}
                  className=" border-transparent outline-transparent w-full"
                  placeholder="Password"
                  name="password"
                  onChange={(e) => handleChange(e)}
                  required
                />
                {showPass ? (
                  <button>eye</button>
                ) : (
                  <button className=" cursor-pointer">blockeye</button>
                )}
              </div>
            </div>
            <button className=" w-full bg-gray-700 rounded-lg p-3 text-white font-semibold mt-8">
              Sign Up
            </button>
          </form>
          <h1 className=" text-center mt-8">
            Already have an account?
            {/* <Link to="/"> */}
            <span className=" font-bold ml-1">Login</span>
            {/* </Link> */}
          </h1>
        </section>
      </section>
    </div>
  );
}
