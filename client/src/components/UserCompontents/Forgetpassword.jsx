import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

function Forgetpassword() {
  const {
    handleSubmit,
    formState: { errors },
    register,
    reset,
  } = useForm();

  const { token } = useParams();
  // console.log(token);
  const onsubmit = async (data) => {
    console.log(data);
    try {
      const res = await axios.post(
        `https://api.verydesi.com/user/resetpassword/${token}`,
        data
      );
      if (res) {
        alert(res.data.message);
        // setTimeout(() => {
        //   window.location.href = "/signup";
        // }, 3000);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="mt-[9rem] bg-white p-5 h-[500px] rounded-md border-t-2 border-b-2 border-black w-[850px] font-['udemy-regular'] flex self-center gap-10 items-center justify-center shadow-gray-300 shadow-lg">
      <img
        className="w-[370px] h-full"
        // src={`https://th.bing.com/th/id/OIP.gCx0isx19k08ODXaux_nLQHaHa?rs=1&pid=ImgDetMain`}
        src={`https://img.freepik.com/free-vector/forgot-password-concept-illustration_114360-1010.jpg`}
        alt="logo"
      />
      <div className="w-[370px] flex flex-col gap-3">
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
            className="rounded-md bg-[#ff4f5b] mt-4 w-full p-2 text-[19px] font-semibold text-white shadow-sm shadow-[#ccc] hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
}

export default Forgetpassword;
