import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Container, Input } from "../index";
import axios from "axios";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { UserImage, login as authlogin, cities } from "../../store/authslice";
import { modalclose, modalopen } from "../../store/modalslice";
import { useLocation, useNavigate } from "react-router-dom";
import Logo from "../../assets/logo.png";
import { ToastContainer, toast } from "react-toastify";
import WebsiteLogo from "../../assets/logo-transparent.png";
import Signup from "./Signup";
import { FaGoogle } from "react-icons/fa";
import { AiOutlineApple } from "react-icons/ai";
import { FaApple } from "react-icons/fa";
import { getScreenSizeHook } from "../../../Hooks/GetScreenSizeHook";
import { HiQuestionMarkCircle } from "react-icons/hi";
import { RxCross1 } from "react-icons/rx";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const isLoginModalOpen = useSelector((state) => state.modal.isloginmodalopen);
  const location = useLocation();
  const { windowSize } = getScreenSizeHook();
  const isMobile = windowSize.width < 800;
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const onsubmit = async (data) => {
    try {
      const res = await axios.post(
        " https://api.verydesi.com/user/login",
        data
      );
      if (res.data.status == "success") {
        // console.log(res.data.data._id);
        // toast.success("Successfully logged");
        // console.log("city", res.data.data.city);
        // notify();
        localStorage.setItem("userdetails", JSON.stringify(res));
        dispatch(
          authlogin({
            token: res.data.jwttoken,
            user: res.data.data.firstName,
            userID: res.data.data._id,
            bussinessac: res.data.data.bussinessac,
            isverified: res.data.data.isVerified,
          })
        );
        dispatch(cities({ city: res.data.data.city }));
        dispatch(UserImage({ userimg: res.data.data.userimg }));
        dispatch(modalclose(isLoginModalOpen));
        Navigate("/");
      } else if (res.data.Status === "Incorrect password") {
        alert("incorrect password");
      } else if (res.data.msg === "user not find") {
        alert("user not find");
      } else {
        alert("something went wrong");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleModal = (loginModalState, signUpModalState) => {
    dispatch(
      modalopen({
        isloginmodalopen: loginModalState,
        isSignupmodelopen: signUpModalState,
      })
    );
  };

  const handleforget = () => {
    window.open("/forget-password", "_blank");
  };

  // console.log(isMobile);
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <Modal
        isOpen={isLoginModalOpen}
        onRequestClose={() => handleModal(false, false)}
        style={{
          content: {
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: isMobile ? 350 : 740,
            height: 560,
            border: "none",
            padding: "0px",
            backgroundColor: "#FFF",
            boxShadow: "0px 0px 25px 0px rgba(0, 0, 0, 0.1)",
            borderRadius: 10,
          },
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.9)",
            zIndex: 111,
          },
        }}
      >
        <div
          className={`flex flex-row items-center bg-white rounded-md h-full w-full font-['udemy-regular'] ${
            isMobile && "hidden"
          }`}
        >
          <div className="capitalize bg-[url('https://img.freepik.com/free-vector/green-gradient-background-gradient-3d-design_343694-3667.jpg')] w-1/2 flex justify-center bg-cover h-full items-center">
            <div className="text-center justify-center flex flex-col items-center">
              <img
                height={300}
                width={300}
                className="w-50 h-50"
                src={WebsiteLogo}
                alt=""
              />
              <p className=" text-black text-center mt-5 text-[30px]">
                Welcome
              </p>
              <p className=" text-black text-center mt-2 px-10 text-[20px] font-['udemy-regular'] capitalize">
                Register here to start using VeryDesi
              </p>
              <button
                className="capitalize place-items-center items-center rounded-md bg-[#000] border-2 border-white text-[20px] px-7 py-2 font-semibold text-white hover:bg-black/90 mt-5"
                type="submit"
                onClick={() => {
                  handleModal(false, true);
                }}
              >
                Sign up now
              </button>
            </div>
          </div>
          <div className="w-50 px-10 items-center grow">
            <RxCross1
              className="h-5 w-5 text-black absolute top-3 right-3 cursor-pointer hover:rotate-[360deg] transition-transform duration-300 "
              onClick={() => handleModal(false, false)}
            />
            <h1 className="text-[25px] font-bold text-[#0b5e86] text-center">
              Login
            </h1>
            {/* <p className=" text-black text-center mt-2 px-10 text-[20px]">
              Start Your Journey
            </p> */}
            <form
              onSubmit={handleSubmit(onsubmit)}
              className="flex flex-col mt-2 gap-3 font-['udemy-regular']"
            >
              <Input
                label="Email"
                Placeholder="Email"
                type="Email"
                {...register("email", {
                  required: "Email is required",
                  validate: {
                    matchPatern: (value) =>
                      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
                        value
                      ) || "Email address must be a valid address",
                  },
                })}
                errorMessage={errors.email?.message}
                className="!w-full"
              />
              <Input
                label="Password"
                Placeholder="Password"
                type="password"
                {...register("password", { required: "Password is required" })}
                errorMessage={errors.password?.message}
              />
              <div
                className="flex gap-1 text-[13px] cursor-pointer items-center font-bold justify-end"
                onClick={handleforget}
              >
                <HiQuestionMarkCircle size={17} />
                Forgot Password
              </div>
              <button
                type="submit"
                className="rounded-md bg-[#17b19f] mt-1 px-0 py-2 text-[20px] font-semibold text-white shadow-sm shadow-[#ccc] hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              >
                Login Here
              </button>
              <h1 className="text-[19px] mt-2 underline font-bold text-[#000] text-center">
                Or Continue With
              </h1>
              <div>
                <button
                  type="button"
                  className="rounded-md bg-[#fff] flex mt-2 w-full text-center justify-center gap-4 py-2 text-sm font-semibold shadow-sm shadow-black text-black border border-black/30 shadow-5xl text-[15px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                >
                  <p className="text-[19px] flex gap-4">
                    <FaGoogle />
                    Continue With Google
                  </p>
                </button>
                <button
                  type="button"
                  className="rounded-md bg-[#fff] flex mt-5 w-full text-center justify-center gap-4 py-2 text-sm font-semibold shadow-sm shadow-black text-black border border-black/30 shadow-5xl text-[15px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                >
                  <p className="flex gap-4 text-[19px] items-center">
                    <FaApple size={25} />
                    Continue With Apple
                  </p>
                </button>
              </div>
            </form>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default Login;
