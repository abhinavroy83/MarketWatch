import React from "react";
import { useForm } from "react-hook-form";
import { Container, Input } from "../index";
import axios from "axios";
import Modal from "react-modal";
import { useDispatch } from "react-redux";
import { login as authlogin } from "../../store/authslice";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/logo.png";
import toast, { Toaster } from "react-hot-toast";

function Login({ isOpen, onClose }) {
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
        notify();
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
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={{
        content: {
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 880,
          height: 600,
          border: "none",
          padding: "0px",
          backgroundColor: "#FFF",
          boxShadow: "0px 0px 25px 0px rgba(0, 0, 0, 0.1)",
          borderRadius: 10,
        },
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.9)",
        },
      }}
    >
      {/* <div className="flex justify-center items-center h-full bg-gradient-to-tr from-[#17b19f] to-cyan-500 shadow-black bg-repeat-x bg-center bg-[url('https://img.freepik.com/premium-vector/blue-green-background-with-line-with-gradient-mesh-vector-illustration_103688-1644.jpg')] bg-cover"> */}
      <div className="flex flex-row items-center bg-white rounded-md h-full w-full font-[Montserrat]">
        <div className="bg-[url('https://img.freepik.com/free-vector/green-gradient-background-gradient-3d-design_343694-3667.jpg')] w-1/2 flex justify-center bg-cover h-full items-center">
          <div className="text-center font-bold">
            <img className="w-[100px] m-auto" src={Logo} />
            <p className=" text-black text-center mt-5 text-3xl">
              Welcome Back
            </p>
            <p className=" text-black text-center mt-5 px-10 text-base/7 font-[Montserrat]">
              Log In Here With Your Personal Details
            </p>
          </div>
        </div>
        <div className="w-50 px-20 items-center grow">
          <svg
            className="h-10 w-10 text-black-500 absolute top-3 right-3 cursor-pointer"
            onClick={onClose}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            {" "}
            <circle cx="12" cy="12" r="10" />{" "}
            <line x1="15" y1="9" x2="9" y2="15" />{" "}
            <line x1="9" y1="9" x2="15" y2="15" />
          </svg>
          <h1 className="text-3xl font-bold text-[#17b19f] text-center">
            GET STARTED
          </h1>
          <p className=" text-black text-center font-bold mt-2 px-10 text-base/7">
            Start Your Journey
          </p>
          <form
            onSubmit={handleSubmit(onsubmit)}
            className="flex flex-col mt-3 gap-3 font-[Montserrat]"
          >
            <Input
              label="Email"
              Placeholder="Email"
              type="Email"
              {...register("email", {
                required: "Email is required",
                validate: {
                  matchPatern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be a valid address",
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
            <button
              type="submit"
              className="rounded-md bg-[#17b19f] mt-3 px-0 py-2 text-sm font-semibold text-white shadow-sm shadow-[#ccc] text-[16px] hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
              Login Here
            </button>
            <h1 className="text-base mt-2 underline font-bold text-[#000] text-center">
              Or Continue With
            </h1>
            <div>
              <button
                type="button"
                className="rounded-md bg-[#fff] flex mt-2 w-full text-center justify-center gap-4 py-2 text-sm font-semibold shadow-sm shadow-black text-black border border-black/30 shadow-5xl text-[15px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              >
                <svg
                  class="h-5 w-5 text-gray-900"
                  align-iteams="left"
                  width="20"
                  height="24"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="currentColor"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  {" "}
                  <path stroke="none" d="M0 0h24v24H0z" />{" "}
                  <path d="M17.788 5.108A9 9 0 1021 12h-8" />
                </svg>
                Continue With Google
              </button>
              <button
                type="button"
                className="rounded-md bg-[#fff] flex mt-5 w-full text-center justify-center gap-4 py-2 text-sm font-semibold shadow-sm shadow-black text-black border border-black/30 shadow-5xl text-[15px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              >
                <svg
                  class="h-6 w-6 text-gray-900"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="currentColor"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  {" "}
                  <path stroke="none" d="M0 0h24v24H0z" />{" "}
                  <path d="M9 7c-3 0-4 3-4 5.5 0 3 2 7.5 4 7.5 1.088-.046 1.679-.5 3-.5 1.312 0 1.5.5 3 .5s4-3 4-5c-.028-.01-2.472-.403-2.5-3-.019-2.17 2.416-2.954 2.5-3-1.023-1.492-2.951-1.963-3.5-2-1.433-.111-2.83 1-3.5 1-.68 0-1.9-1-3-1z" />{" "}
                  <path d="M12 4a2 2 0 0 0 2 -2a2 2 0 0 0 -2 2" />
                </svg>
                Continue With Apple
              </button>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
}

export default Login;
