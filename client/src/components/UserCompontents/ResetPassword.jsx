import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";

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
        `http://localhost:8000/user/forgotpassword`,
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
    <div className=" mt-96">
      <p>ResetPassword</p>

      <form onSubmit={handleSubmit(onsubmit)}>
        <input
          className=" border-2 border-red-600"
          type="text"
          {...register("email", { required: "Please enter email" })}
        />
        {errors.email && <p>{errors.email.message}</p>}
        <button type="submit">find</button>
      </form>
    </div>
  );
}

export default ResetPassword;
