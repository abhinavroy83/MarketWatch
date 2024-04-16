import React from "react";
import Container from "../Container/Container";
import { useForm } from "react-hook-form";
import Input from "../SharedCompontents/Input";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login as adminauth } from "../../store/adminauthslice";
import { useNavigate } from "react-router-dom";

function Adminlogin() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onsubmit = async (data) => {
    try {
      const res = await axios.post(
        `http://localhost:8000/api/adminpage/login`,
        data
      );
      if (res.data.Status == "success") {
        console.log(res.data);
        dispatch(
          adminauth({
            token: res.data.jwttoken,
            role: res.data.data.role,
          })
        );
        localStorage.setItem("admindetails", JSON.stringify(res));
        alert("successfully logged in");
        navigate("/admin/dashboard");
      } else if (res.data.Status === "Incorrect Password") {
        alert("incorrect password");
      } else if (res.data.msg === "user not find") {
        alert("user not find");
      } else {
        alert("something went wrong");
      }
    } catch (error) {
      console.log("error during admin login", error);
    }
  };

  return (
    <div className=" bg-slate-200">
      <div className="w-full max-w-7xl mx-auto ">
        <div className=" flex justify-center items-center h-screen ">
          <div className="max-w-[800px] max-h-[500px] font-roboto bg-gray-300 items-center flex flex-col justify-center p-5 gap-7 border-2 border-black">
            {/* <div className="bg-contain flex min-h-[300px] bg-[url('https://img.freepik.com/premium-vector/sign-account-user-authorization-login-authentication-page-concept-laptop-with-login-password-form-page-screen-stock-illustration_100456-1590.jpg')]">
        </div> */}

            <div className="text-[34px] text-red-700 font-bold">
              Log In Page
            </div>
            <form onSubmit={handleSubmit(onsubmit)} className="">
              {/* <Input
            type="text"
            Placeholder="Username"
            {...register("username", { required: "username is required" })}
            errorMessage={errors.username?.message}
          /> */}
              {/* <Input
            type="text"
            Placeholder="Password"
            {...register("password", { required: "password is required" })}
            errorMessage={errors.password?.message}
          />             */}
              <div className="justify-center h-full">
                <div className="flex font-roboto p-2 items-center">
                  <label className="min-w-[120px] text-[21px]">
                    User Name:
                  </label>
                  <input
                    className="flex h-10 font-roboto w-[300px] bg-white text-[19px] rounded-md border border-black/30 bg-transparent px-3 py-2 placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-40 "
                    type="text"
                    Placeholder="Username"
                    {...register("username", {
                      required: "username is required",
                    })}
                    errorMessage={errors.username?.message}
                  />
                </div>
                <div className="flex font-roboto p-2 items-center">
                  <label className="min-w-[120px] text-[21px]">Password:</label>
                  <input
                    className="flex h-10 font-roboto w-[300px] bg-white text-[19px] rounded-md border border-black/30 bg-transparent px-3 py-2 placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-40 "
                    type="text"
                    Placeholder="Password"
                    {...register("password", {
                      required: "password is required",
                    })}
                    errorMessage={errors.password?.message}
                  />
                </div>
              </div>
              <div className=" flex mx-auto justify-center items-center h-full">
                <button
                  className="self-center justify-center items-center h-full rounded-md bg-black mt-4 p-3 text-[20px] text-white shadow-sm hover:bg-black/80 hover:text-white"
                  type="submit"
                >
                  Click To Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Adminlogin;
