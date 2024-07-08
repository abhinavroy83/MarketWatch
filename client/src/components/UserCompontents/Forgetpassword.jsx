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
        `http://localhost:8000/user/resetpassword/${token}`,
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
    <div className=" mt-80 flex flex-col justify-center items-center">
      Forgetpassword
      <form onSubmit={handleSubmit(onsubmit)}>
        <input
          className=" border-2 border-red-500"
          type="text"
          {...register("newPassword", { required: "Please enter Password" })}
        />
        {errors.newPassword && <p>{errors.newPassword.message}</p>}
        <button type="submit">Update Password</button>
      </form>
    </div>
  );
}

export default Forgetpassword;
