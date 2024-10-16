import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { MdLockReset } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { modalopen } from "../../store/modalslice";
import { toast } from "react-toastify";
import Alert from "./Alert/Alert";
function ResetPassword() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const naviagte = useNavigate();
  const dispatch = useDispatch();
  const [toast, setToast] = useState({ isOpen: false, type: "", text: "" });

  const showToast = (type, text) => {
    setToast({ isOpen: false });
    setTimeout(() => {
      setToast({ isOpen: true, type, text });
    }, 100);
  };
  const onsubmit = async (data) => {
    // console.log(data);
    try {
      const res = await axios.post(
        `https://api.verydesi.com/user/forgotpassword`,
        data
      );

      if (res.data.status) {
        showToast("success", res.data.message);

        // alert(res.data.message);
        // naviagte("/");
        // dispatch(
        //   modalopen({
        //     isloginmodalopen: true,
        //   })
        // );
      }
      if (!res.data.status) {
        showToast("unsuccess", res.data.message);

        // alert(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mt-[11rem] lg:mt-[9rem] flex lg:flex-row flex-col bg-white h-[620px] lg:h-[500px] rounded-md border-t-2 border-b-2 border-black w-[370px] lg:w-[850px] font-['udemy-regular'] self-center items-center justify-center shadow-gray-300 shadow-lg">
      {toast.isOpen && (
        <Alert
          type={toast.type}
          text={toast.text}
          close={() => setToast({ isOpen: false, type: "", text: "" })}
        />
      )}
      <img
        className="w-[370px] lg:h-[460px] h-[300px]"
        // src={resetimg}
        src={`https://res.cloudinary.com/druohnmyv/image/upload/v1723819324/assests/fuypxxcnvqrv8ctgwn9i.jpg`}
        alt="logo"
      />
      <div className="w-[300px] lg:w-[400px] flex flex-col gap-3">
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
