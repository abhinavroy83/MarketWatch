import React from "react";
import Userdashboardconatiner from "../../../components/AdminCompontents/container/Userdashboardconatiner";
import { useLocation } from "react-router-dom";

function Cnf_to_dltuser() {
  const location = useLocation(); 
//   const { id } = location.state;
  return (
    <Userdashboardconatiner>
      <div>sure to delete</div>
      {/* <p>{id}</p> */}
    </Userdashboardconatiner>
  );
}

export default Cnf_to_dltuser;
