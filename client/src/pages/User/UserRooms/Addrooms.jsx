import React from "react";
import { DashConatiner } from "../../../components";
import { useSelector } from "react-redux";

function Addrooms() {
  const currentLocation = useSelector((state) => state.auth.location);
  console.log(currentLocation);
  return (
    <DashConatiner>
      <div>
        Addrooms
        <p>{currentLocation.lat}</p> 
        <p>{currentLocation.lng}</p>
      </div>
    </DashConatiner>
  );
}

export default Addrooms;
