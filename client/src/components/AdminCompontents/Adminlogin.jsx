import React from "react";
import Container from "../Container/Container";
import { useForm } from "react-hook-form";
import Input from "../SharedCompontents/Input";

function Adminlogin() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  
  return (
    <Container>
      <div className="">
        <div>AdminPage</div>
        <form onSubmit={handleSubmit(onsubmit)} className="w-2/6 h-2/4">
          <Input
            type="text"
            Placeholder="Username"
            {...register("username", { required: "username is required" })}
            errorMessage={errors.username?.message}
          />
          <Input
            type="text"
            Placeholder="Password"
            {...register("password", { required: "password is required" })}
            errorMessage={errors.password?.message}
          />
          <button type="submit">login</button>
        </form>
      </div>
    </Container>
  );
}

export default Adminlogin;
