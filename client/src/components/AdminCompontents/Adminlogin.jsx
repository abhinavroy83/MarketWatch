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
        ` https://marketwatch-e3hc.onrender.com/api/adminpage/login`,
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
    <div className=" bg-[#0b5e86]">
      <div className="w-full max-w-7xl mx-auto font-['udemy-regular']">
        <div className=" flex justify-center items-center h-screen ">
          <div className="w-[600px] h-[390px] font-['udemy-regular'] bg-white items-center flex flex-col justify-center p-5 gap-2 rounded-md shadow-lg shadow-gray-800">
            {/* <div className="bg-contain flex min-h-[300px] bg-[url('https://img.freepik.com/premium-vector/sign-account-user-authorization-login-authentication-page-concept-laptop-with-login-password-form-page-screen-stock-illustration_100456-1590.jpg')]">
        </div> */}
           <div className="bg-[#0b5e86] w-full max-w-7xl p-4 text-white text-[33px] items-center justify-center flex border-t-2 border-white shadow-md shadow-gray-600">DASHBOARD</div>
            <div className="text-[34px] text-[#0b5e86] font-bold mt-2">
              Log In Here
            </div>
            <form onSubmit={handleSubmit(onsubmit)} className="mt-0">
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
                <div className="flex font-['udemy-regular']  items-center">
                  <label className="min-w-[130px] text-[21px] text-black font-bold">
                    User Name:
                  </label>
                  <input
                    className="flex h-15 font-['udemy-regular'] w-[300px] bg-black text-[19px] border-b-2 border-black/10 bg-transparent px-3 py-2 placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-40 "
                    type="text"
                    Placeholder="Username"
                    {...register("username", {
                      required: "username is required",
                    })}
                    errorMessage={errors.username?.message}
                  />
                </div>
                <div className="flex font-['udemy-regular'] items-center">
                  <label className="min-w-[130px] text-[21px] text-black font-bold">Password:</label>
                  <input
                    className="flex h-15 font-['udemy-regular'] w-[300px] bg-white text-[19px]  border-b-2 border-black/10 bg-transparent px-3 py-2 placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-40 "
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
                  className="self-center justify-center items-center rounded-md bg-green-800 mt-7 p-3 text-[20px] text-white shadow-sm hover:bg-green-900"
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
