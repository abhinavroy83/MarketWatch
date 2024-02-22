import Modal from "react-modal";
import React from "react";
import { useForm } from "react-hook-form";
import Input from "./Input";
import axios from "axios";

function Signup({ isOpen, onClose }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const onSubmit = async (data) => {
    try {
      const res = await axios.post("http://localhost:8000/user/signup", data);
      if (res) {
        alert("signup successfully added");
      }
    } catch (error) {
      console.log(error);
    }
    reset();
  };
  return (
    <div>
      <Modal
        isOpen={isOpen}
        onRequestClose={onClose}
        style={{
          content: {
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 750,
            height: 600,
            border: "none",
            padding: "3px",
            backgroundColor: "#FFF",
            boxShadow: "0px 0px 25px 0px rgba(0, 0, 0, 0.1)",
          },
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
        }}
      >
        <div className=" w-full flex h-full">
          <div className="bg-slate-800 w-1/2">
            <p className=" text-white">Signup</p>
          </div>
          <div className="w-1/2 flex flex-col justify-center items-center">
            <h1 className="text-3xl font-bold underline text-red-400">
              Signup
            </h1>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Input
                label="FirstName"
                Placeholder="first name"
                type="text"
                {...register("firstName", {
                  required: "FirstName is required",
                })}
                errorMessage={errors.firstName?.message}
              />
              <Input
                label="Last Name"
                Placeholder="Last name"
                type="text"
                {...register("lastName", { required: "lastName is required" })}
                errorMessage={errors.lastName?.message}
              />
              <Input
                label="Email"
                Placeholder="Email"
                type="Email"
                {...register("email", {
                  required: "email required",
                  validate: {
                    matchPatern: (value) =>
                      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
                        value
                      ) || "Email address must be a valid address",
                  },
                })}
                errorMessage={errors.email?.message}
              />
              <div>
                <label> Date of Birth :</label>
                <input
                  type="date"
                  {...register("dob", { required: "DOB is required" })}
                />
                {errors.dob && <p>{errors.msg?.dob}</p>}
              </div>
              <div>
                <label>Select a country:</label>
                <select {...register("country", { required: true })}>
                  <option value="">Select</option>
                  <option value="Usa">USA</option>
                  <option value="India">India</option>
                </select>
                {errors.country && <p>This field is required.</p>}
              </div>
              <Input
                label="city"
                Placeholder="city"
                type="text"
                {...register("city", { required: "city is required" })}
                errorMessage={errors.city?.message}
              />
              <Input
                label="password"
                Placeholder="password"
                type="text"
                {...register("password", { required: "password is required" })}
                errorMessage={errors.password?.message}
              />
              <button
                className="inline-flex items-center rounded-md bg-black px-3 py-2 text-sm font-semibold text-white hover:bg-black/80"
                type="submit"
              >
                Sign up
              </button>
            </form>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default Signup;
