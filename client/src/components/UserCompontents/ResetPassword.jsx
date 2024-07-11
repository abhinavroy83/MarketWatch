import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { MdLockReset } from "react-icons/md";

function ResetPassword() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onsubmit = async (data) => {
    // console.log(data);
    try {
      const res = await axios.post(
        `https://api.verydesi.com/user/forgotpassword`,
        data
      );
      if (res) {
        alert("Link send ");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mt-[9rem] bg-white h-[500px] rounded-md border-t-2 border-b-2 border-black w-[850px] font-['udemy-regular'] flex self-center items-center justify-center shadow-gray-300 shadow-lg">
      <img
        className="w-[370px] h-[480px]"
        src={`https://th.bing.com/th/id/R.7fdc1613b5f5aefe4490a92f8722c867?rik=tl6k%2fmIxV8%2fyGw&riu=http%3a%2f%2fwww.cybrhawk.com%2fwp-content%2fuploads%2f2021%2f08%2fSecurity-1.gif&ehk=GFRiBjZrlnvjmlleUJixbqyUqAgioSRPOVPeGDQznvc%3d&risl=&pid=ImgRaw&r=0`}
        alt="logo"
      />
      <div className="w-[400px] flex flex-col gap-3">
        <p className="text-[29px] text-black flex gap-1 items-center">
          <MdLockReset size={35} />
          Reset Password
        </p>
        <p className="text-gray-600">
          Enter your email address here and we'll send you a link on that email
          where you can go and reset your password
        </p>
        <form onSubmit={handleSubmit(onsubmit)}>
          <input
            className="[flex h-10 w-full font-['udemy-regular'] rounded-md border border-black/30 bg-transparent px-3 py-2 text-[16px] placeholder:text-gray-600 bg-white focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50]"
            type="text"
            {...register("email", { required: "Please Enter Email" })}
          />
          <p className="text-[16px] text-red-500 mt-2">
            {" "}
            {errors.email && <p>{errors.email.message}</p>}
          </p>
          {/* {errors.email && <p>{errors.email.message}</p>} */}
          <button
            type="submit"
            className="rounded-md bg-blue-900 mt-4 w-full p-2 text-[19px] font-semibold text-white shadow-sm shadow-[#ccc] hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
