import React from "react";
import { DashConatiner } from "../../../components";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";

function Addrooms() {
  const currentLocation = useSelector((state) => state.auth.location);
  console.log(currentLocation);
  const { register, handleSubmit, formState = { errors } } = useForm();
  return (
    <DashConatiner>
      <div>
        <p>Here u can add room</p>
        Addrooms
        {/* <p>{currentLocation.lat}</p>
        <p>{currentLocation.lng}</p> */}
        <form onSubmit={handleSubmit(onsubmit)}>
          
        </form>
      </div>
    </DashConatiner>
  );
}

export default Addrooms;
