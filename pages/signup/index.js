import { signUpNewUser } from "../../utils/firebaseService.js";
import React from "react";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { BsEyeSlash, BsEye } from "react-icons/bs";
import { validateForm } from "../../utils/validation.js";
export default function Index() {
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
    confirmPassword: "",
    fullName: "",
  });
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [showError , setShowError] = useState(false);
  const router = useRouter();
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
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
  const submitHandler = async (e) => {
    e.preventDefault();
    if (
      !error.email.isError &&
      !error.password.isError &&
      userDetail.password === userDetail.confirmPassword
    ) {
      await signUpNewUser(
        userDetail.email,
        userDetail.fullName,
        userDetail.password
      );
      router.push("/");
    }else {
      setShowError(true);
    }
  };
  return (
    <div className=" flex flex-col justify-between items-center w-full min-h-screen">
      <section className=" flex flex-col gap-6  mt-20 w-96">
      <h1 className=" text-center text-4xl font-bold">Maple Notes</h1>
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
                placeholder="email"
                name="email"
                onChange={(e) => handleChange(e)}
                required
              />
              { showError && error.email.isError  && <h4 className="text-red-600">Please Enter Valid Email</h4>}
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
                <div onClick={() => setShowPass((prev) => !prev)}>
                  {showPass ? <BsEye /> : <BsEyeSlash />}
                </div>
              </div>
              { (showError && error.password.isError ) ? <h4 className="text-red-600">Please Enter Valid Email</h4> : <h4 className=" text-slate-700">Enter password greater than 6 length</h4>}
              <div className="btnBorder rounded-lg  border-slate-300 py-2 px-2 w-full  mt-3 justify-between flex items-center">
                <input
                  type={showConfirmPass ? "text" : "password"}
                  className=" border-transparent outline-transparent w-full"
                  placeholder="confirmPassword"
                  name="confirmPassword"
                  onChange={(e) => handleChange(e)}
                  required
                />
                <div onClick={() => setShowConfirmPass((prev) => !prev)}>
                  {showConfirmPass ? <BsEye /> : <BsEyeSlash />}
                </div>
              </div>
            </div>
            <button className=" w-full bg-gray-700 rounded-lg p-3 text-white font-semibold mt-8">
              Sign Up
            </button>
          </form>
          <h1 className=" text-center mt-8">
            Already have an account?
            <Link href="/login">
              <span className=" font-bold ml-1 cursor-pointer">Login</span>
            </Link>
          </h1>
        </section>
      </section>
    </div>
  );
}
