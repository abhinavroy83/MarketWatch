import React from "react";
import { DashConatiner } from "../../../components";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import axios from "axios";

function Updatepass() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const { userID } = useParams();

  const onsubmit = async (data) => {
    // try {
    //   const res = await axios.put(
    //     `http://localhost:8000/user/updatepassword/${userID}`
    //   );
    // } catch (error) {}
  };
  return (
    <DashConatiner>
      <div>
        <form action="" onSubmit={handleSubmit(onsubmit)}>
          <div className=" ">
            <label className="min-w-[120px">Old Password</label>
            <input
              className="font-['udemy-regular'] h-10 w-[280px] lg:w-[280px] text-[1rem] border border-black/20 bg-transparent px-3 py-2 placeholder:text-gray-400 bg-white focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
              type="text"
              placeholder="Enter your Old password"
              {...register("oldpassword", {
                required: "Old Password is required",
              })}
            />
            {errors.oldpassword && <p>{errors.oldpassword.message}</p>}
          </div>
          <div className=" ">
            <label className="min-w-[120px">New Password</label>
            <input
              className="font-['udemy-regular'] h-10 w-[280px] lg:w-[280px] text-[1rem] border border-black/20 bg-transparent px-3 py-2 placeholder:text-gray-400 bg-white focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
              type="text"
              placeholder="New password"
              {...register("newpassword", {
                required: "New Password is required",
                pattern: {
                  value: /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/,
                  message:
                    "Password must contain at least one uppercase letter, one special character, and be at least 8 characters long",
                },
              })}
            />
            {errors.newpassword && <p>{errors.newpassword.message}</p>}
          </div>
          <div className=" ">
            <label className="min-w-[120px]">Re-Enter New Password</label>
            <input
              className="font-['udemy-regular'] h-10 w-[280px] lg:w-[280px] text-[1rem] border border-black/20 bg-transparent px-3 py-2 placeholder:text-gray-400 bg-white focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
              type="password"
              placeholder="Re-Enter New Password"
              {...register("confirmPassword", {
                required: "Please re-enter the new password",
                validate: (value) =>
                  value === watch("newpassword") || "Passwords do not match",
              })}
            />
            {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
          </div>
          <button type="submit" className=" border-2 border-red-200">
            Change
          </button>
        </form>
      </div>
    </DashConatiner>
  );
}

export default Updatepass;
