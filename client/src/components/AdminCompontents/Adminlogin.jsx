import React from "react";
import Container from "../Container/Container";
import { useForm } from "react-hook-form";
import Input from "../SharedCompontents/Input";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login as adminauth } from "../../store/adminauthslice";
import { useNavigate } from "react-router-dom";
import login from "../../assets/login.png";
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
    <div className="bg-gradient-to-r from-cyan-500 to-green-500 w-full">
      <div className="w-full max-w-7xl mx-auto font-['udemy-regular']">
        <div className=" flex justify-center items-center h-screen ">
          <div className="lg:w-[600px] w-[350px] h-[350px] font-['udemy-regular'] bg-white items-center flex flex-col justify-center gap-2 rounded-md shadow-lg shadow-gray-800">
            {/* <div className="bg-contain flex min-h-[300px] bg-[url('https://img.freepik.com/premium-vector/sign-account-user-authorization-login-authentication-page-concept-laptop-with-login-password-form-page-screen-stock-illustration_100456-1590.jpg')]">
        </div> */}
            <div className="bg-gradient-to-r from-cyan-500 to-green-500 w-full max-w-7xl p-4 text-black text-[33px] items-center justify-center flex border-t-2 border-white shadow-md shadow-gray-600">
              <p className="flex gap-2 items-center text-[27px]">
                <img className="h-12 w-12" src={login} alt="" />
                DASHBOARD
              </p>
            </div>
            {/* <div className="text-[34px] text-[#0b5e86] font-bold mt-2">
              Log In Here
            </div> */}
            <form onSubmit={handleSubmit(onsubmit)} className="mt-7">
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
              <div className="justify-center">
                <div className="flex font-['udemy-regular'] justify-center items-center">
                  <label className="w-[120px] lg:w-[130px] text-[20px] text-black">
                    User Name
                  </label>
                  <input
                    className="flex h-10 lg:w-[300px] w-[200px] bg-black text-[19px] border-2 border-black/10 bg-transparent px-3 py-2 placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-40 "
                    type="text"
                    Placeholder="Username"
                    {...register("username", {
                      required: "username is required",
                    })}
                    errorMessage={errors.username?.message}
                  />
                </div>
                <div className="flex font-['udemy-regular'] items-center mt-5">
                  <label className="w-[120px] lg:w-[130px] text-[20px] text-black">
                    Password
                  </label>
                  <input
                    className="flex h-10 lg:w-[300px] w-[200px] bg-black text-[19px] border-2 border-black/10 bg-transparent px-3 py-2 placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-40 "
                    type="text"
                    Placeholder="Password"
                    {...register("password", {
                      required: "password is required",
                    })}
                    errorMessage={errors.password?.message}
                  />
                </div>
              </div>
              <div className="flex mx-auto justify-center items-center ">
                <button
                  className="self-center justify-center items-center rounded-md bg-green-700 mt-7 py-2 px-4 text-[20px] text-white shadow-sm hover:bg-black"
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
