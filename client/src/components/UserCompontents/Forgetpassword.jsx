import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Alert from "./Alert/Alert";

function Forgetpassword() {
  const {
    handleSubmit,
    formState: { errors },
    register,
    reset,
  } = useForm();
  const [toast, setToast] = useState({ isOpen: false, type: "", text: "" });

  const { token } = useParams();
  // console.log(token);
  const onsubmit = async (data) => {
    // console.log(data);
    try {
      const res = await axios.post(
        `https://api.verydesi.com/user/resetpassword/${token}`,
        data
      );
      if (res) {
        setToast({
          isOpen: true,
          type: success,
          text: res.data.message,
        });
        toast.success();
      }
    } catch (error) {
      console.log(error);
    }
  };
  setTimeout(() => {
    setToast({ isOpen: false, type: "", text: "" });
  }, 3000);
  return (
    <div className="mt-[11rem] lg:mt-[9rem] flex lg:flex-row flex-col bg-white h-[550px] lg:h-[500px] rounded-md border-t-2 border-b-2 border-black w-[370px] lg:w-[850px] font-['udemy-regular'] self-center items-center justify-center shadow-gray-300 shadow-lg">
      {toast.isOpen && (
        <Alert
          type={toast.type}
          text={toast.text}
          close={() => setToast({ isOpen: false, type: "", text: "" })}
        />
      )}
      <img
        className="w-[370px] lg:h-[460px] h-[300px]"
        src={`https://res.cloudinary.com/druohnmyv/image/upload/v1723819324/assests/fuypxxcnvqrv8ctgwn9i.jpg`}
        alt="logo"
      />
      <div className="w-[300px] lg:w-[400px] flex flex-col gap-3">
        <p className="text-[29px] text-black flex gap-1 items-center">
          Forgot Password
        </p>
        <p className="text-gray-600">Don't Worry. You can set new password.</p>
        <form onSubmit={handleSubmit(onsubmit)}>
          <input
            className="[flex h-10 w-full font-['udemy-regular'] rounded-md border border-black/30 bg-transparent px-3 py-2 text-[16px] placeholder:text-gray-600 bg-white focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50]"
            type="text"
            {...register("newPassword", { required: "Please Enter Password" })}
          />
          <p className="text-[16px] text-red-500 mt-2">
            {" "}
            {errors.newPassword && <p>{errors.newPassword.message}</p>}
          </p>
          {/* {errors.newPassword && <p>{errors.newPassword.message}</p>} */}
          <button
            type="submit"
            className="rounded-md bg-blue-900 mt-4 w-full p-2 text-[19px] font-semibold text-white shadow-sm shadow-[#ccc] hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
}

export default Forgetpassword;
