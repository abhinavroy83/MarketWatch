import React from "react";
import Container from "../Container/Container";
import { useForm } from "react-hook-form";
import Input from "../SharedCompontents/Input";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login as adminauth } from "../../store/adminauthslice";
import { useNavigate } from "react-router-dom";

function Adminlogin() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onsubmit = async (data) => {
    try {
      const res = await axios.post(
        `http://localhost:8000/api/adminpage/login`,
        data
      );
      if (res.data.Status == "success") {
        console.log(res.data);
        dispatch(
          adminauth({
            token: res.data.jwttoken,
            role: res.data.data.role,
          })
        );
        localStorage.setItem("admindetails", JSON.stringify(res));
        alert("successfully logged in");
        navigate("/admin/dashboard");
      } else if (res.data.Status === "Incorrect Password") {
        alert("incorrect password");
      } else if (res.data.msg === "user not find") {
        alert("user not find");
      } else {
        alert("something went wrong");
      }
    } catch (error) {
      console.log("error during admin login", error);
    }
  };

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
