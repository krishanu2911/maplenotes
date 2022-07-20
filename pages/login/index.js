import React from "react";
import { useState } from "react";
import { BsEyeSlash, BsEye } from "react-icons/bs";
import { loginUser } from "../../utils/firebaseService";
import { useRouter } from "next/router";
import { validateForm } from "../../utils/validation";
import Link from "next/link";
export default function Index() {
  const [showPass, setShowPass] = useState(false);
  const [loginDetail, setLoginDetail] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState({
    email: {
      isError: true,
    },
    password: {
      isError: true,
    },
  });
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
    setLoginDetail({ ...loginDetail, [name]: value });
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    if (!error.email.isError && !error.password.isError) {
      await loginUser(loginDetail.email, loginDetail.password);
      router.push("/");
    }
  };
  return (
    <div className="flex flex-col justify-between items-center w-full min-h-screen">
      <section className=" flex flex-col gap-6  mt-20 w-96">
      <h1 className=" text-center text-4xl font-bold">Maple Notes</h1>
        <header className="text-center flex flex-col gap-4">
          <h1 className="text-3xl font-bold">Login to MapleNotes</h1>
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
                  <BsEye onClick={() => setShowPass((prev) => !prev)} />
                ) : (
                  <BsEyeSlash
                    onClick={() => setShowPass((prev) => !prev)}
                    className=" cursor-pointer"
                  />
                )}
              </div>
            </div>
            <button className=" w-full bg-blue-700 rounded-lg p-3 text-white font-semibold mt-8">
              Login
            </button>
          </form>
          <h1 className=" text-center mt-8">
            Dont have an account?
            <Link href="/signup">
              <span className=" cursor-pointer font-bold">Sign Up</span>
            </Link>
          </h1>
        </section>
      </section>
    </div>
  );
}
