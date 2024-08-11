import React from "react";
import { DashConatiner } from "../../../components";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import resetpassword from "../../../assets/resetpassword.png";
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
        <p className="text-[1.5rem] p-2 bg-[#232f3e] text-white w-full flex gap-2 justify-center items-center text-center">
          {/* <FaHeart size={25} /> */}
          {/* <img className="w-[2rem] h-[2rem]" src="resetpassword" alt="" /> */}
          Change Password
        </p>{" "}
        <form
          action=""
          onSubmit={handleSubmit(onsubmit)}
          className="px-3 lg:px-10 flex flex-col gap-4 mt-7 text-[1rem]"
        >
          <div className="text-[1.1rem] flex">
            <label className="text-[1.1rem] text-black w-[130px] lg:w-[220px] font-['udemy-regular'] peer-disabled:cursor-not-allowed peer-disabled:opacity-70 inline-block">
              Old Password
            </label>
            <div className="flex flex-col gap-1">
              <input
                className="font-['udemy-regular'] h-10 w-[200px] lg:w-[280px] border border-black/20 bg-transparent px-3 py-2 placeholder:text-gray-400 bg-white focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                type="text"
                placeholder="Enter Your Old Password"
                {...register("oldpassword", {
                  required: "Old Password is required",
                })}
              />
              <p className="text-[14px] text-red-500">
                {errors.oldpassword && <p>{errors.oldpassword.message}</p>}
              </p>
            </div>
          </div>
          <div className="text-[1.1rem] flex">
            <label className="text-[1.1rem] text-black w-[130px] lg:w-[220px] font-['udemy-regular'] peer-disabled:cursor-not-allowed peer-disabled:opacity-70 inline-block">
              New Password
            </label>
            <div className="flex flex-col gap-1">
              <input
                className="font-['udemy-regular'] h-10 w-[200px] lg:w-[280px] border border-black/20 bg-transparent px-3 py-2 placeholder:text-gray-400 bg-white focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                type="text"
                placeholder="New Password"
                {...register("newpassword", {
                  required: "New Password is required",
                  pattern: {
                    value: /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/,
                    message:
                      "Password must contain at least one uppercase letter, one special character, and be at least 8 characters long",
                  },
                })}
              />{" "}
              <p className="text-[14px] text-red-500">
                {errors.newpassword && <p>{errors.newpassword.message}</p>}
              </p>
            </div>
          </div>
          <div className="text-[1.1rem] flex">
            <label className="text-[1.1rem] text-black w-[130px] lg:w-[220px] font-['udemy-regular'] peer-disabled:cursor-not-allowed peer-disabled:opacity-70 inline-block">
              Re-Enter New Password
            </label>
            <div className="flex flex-col gap-1">
              <input
                className="font-['udemy-regular'] h-10 w-[200px] lg:w-[280px] border border-black/20 bg-transparent px-3 py-2 placeholder:text-gray-400 bg-white focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                type="password"
                placeholder="Re-Enter New Password"
                {...register("confirmPassword", {
                  required: "Re-Enter New Password",
                  validate: (value) =>
                    value === watch("newpassword") || "Passwords do not match",
                })}
              />
              <p className="text-[14px] text-red-500">
                {errors.confirmPassword && (
                  <p>{errors.confirmPassword.message}</p>
                )}
              </p>
            </div>
          </div>
          <button
            type="submit"
            className="rounded-md bg-green-800 my-5 mt-2 px-4 py-3 mb-10 text-[1.1rem] self-center lg:self-start text-white shadow-sm hover:bg-green-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            Change Password
          </button>
        </form>
      </div>
    </DashConatiner>
  );
}

export default Updatepass;
