import React from "react";
import {
  AdminDashboard,
  AdminHeader,
} from "../../../components/AdminCompontents";

function Adminusers() {
  return (
    <div>
      <AdminHeader />
      <AdminDashboard>
        <p className="text-[20px] font-semibold text-black p-5">All admin user</p>
        
      </AdminDashboard>
    </div>
  );
}

export default Adminusers;
