import React from "react";
import { useForm } from "react-hook-form";
import { Container, Input } from "../components/index";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login as authlogin } from "../store/authslice";
import { useNavigate } from "react-router-dom";
function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const onsubmit = async (data) => {
    try {
      const res = await axios.post("http://localhost:8000/user/login", data);
      if (res) {
        console.log(res.data.data._id);
        alert("Successfully logged");
        localStorage.setItem("userdetails", JSON.stringify(res));
        dispatch(
          authlogin({
            token: res.data.jwttoken,
            user: res.data.data.name,
            userID: res.data.data._id,
          })
        );
        Navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col items-center justify-center border-2 border-solid border-red-500 px-4 py-10">
        <h1 className="text-3xl font-bold underline text-red-400 my-2">
          Login
        </h1>
        <form onSubmit={handleSubmit(onsubmit)} className="flex flex-col">
          <Input
            label="Email"
            type="text"
            className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
            {...register("email", { required: "Email is required" })}
          />
          <input
            label="Password"
            type="password"
            className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
            {...register("password", { required: true })}
          />
          <button
            type="submit"
            className="rounded-md bg-black  my-2 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
