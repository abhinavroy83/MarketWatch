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
            {...register("email", { required: "Email is required" })}
          />
          <Input
            label="Password"
            type="password"
            {...register("password", { required: true })}
          />
          <button
            type="submit"
            className="text-black rounded-md border-2 my-2 w-1/3 bg-white mx-auto"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
