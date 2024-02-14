import React from "react";
import { DashConatiner } from "../../../components";
import { Link } from "react-router-dom";

function Getuserroom() {
  return (
    <DashConatiner>
      <div>
        Click here to add rooms
        <Link to={"/addroom"}>AddRoom</Link>
      </div>
      <div>Getuserroom</div>
    </DashConatiner>
  );
}

export default Getuserroom;
