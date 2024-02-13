import React from "react";
import { useForm } from "react-hook-form";

function Signup() {
  const { register, handleSubmit, formState = { errors } } = useForm();
  return (
    <div>
      <h1 className="text-3xl font-bold underline text-red-400">Login</h1>
      <form action=""></form>
    </div>
  );
}

export default Signup;