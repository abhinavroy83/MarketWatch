import React from "react";
import { useSelector } from "react-redux";
import { DashConatiner } from "../../components";

function User() {
  const username = useSelector((state) => state.auth.user);
  // console.log(username);
  return (
    <DashConatiner>
      <div>{username}</div>
    </DashConatiner>
  );
}

export default User;
