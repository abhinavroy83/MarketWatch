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
        <p className="text-3xl font-semibold text-[#0b5e86] p-5">All admin user</p>
        
      </AdminDashboard>
    </div>
  );
}

export default Adminusers;
