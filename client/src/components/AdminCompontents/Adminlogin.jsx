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
        ` https://api.verydesi.com/api/adminpage/login`,
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
    <div className="min-h-screen bg-gray-200 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6 space-y-10">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Welcome Back
            </h1>
            <p className="text-gray-600">Please sign in to your account</p>
          </div>
          <form onSubmit={handleSubmit(onsubmit)} className="space-y-4">
            <div>
              <label htmlFor="username" className="sr-only">
                Username
              </label>
              <div className="relative">
                <svg
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
                <input
                  id="username"
                  type="text"
                  {...register("username")}
                  placeholder="Username"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  required
                />
              </div>
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <div className="relative">
                <svg
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect
                    x="3"
                    y="11"
                    width="18"
                    height="11"
                    rx="2"
                    ry="2"
                  ></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
                <input
                  id="password"
                  type="password"
                  {...register("password")}
                  placeholder="Password"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-emerald-500 text-white py-2 rounded-md hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-colors duration-300"
            >
              Login
            </button>
          </form>
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?
              <a
                href="#"
                className="font-medium text-emerald-500 hover:text-emerald-500"
              >
                Contact your administrator
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Adminlogin;
