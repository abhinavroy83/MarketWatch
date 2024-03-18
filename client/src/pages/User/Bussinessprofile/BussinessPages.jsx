import React from "react";
import { useLocation } from "react-router-dom";

function BussinessPages() {
  const location = useLocation();
  const signupdata = location.state;
  console.log(signupdata);

  console.log(signupdata.firstName);
  return <div>BussinessPages</div>;
}

export default BussinessPages;
