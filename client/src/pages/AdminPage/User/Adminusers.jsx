import React from "react";
import {
  AdminDashboard,
  AdminHeader,
} from "../../../components/AdminCompontents";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";

function Adminusers() {
  return (
    <div>
   
      <AdminDashboard>
        <div className="lg:hidden flex items-center text-gray-700 mt-2  font-['udemy-regular'] ">
          <Link to="/admin/dashboard">
            <FaHome size={20} />
          </Link>
          <IoIosArrowForward />
          <p>users</p>
        </div>
        <p className="text-[20px] font-semibold text-black p-5">
          All admin user
        </p>
      </AdminDashboard>
    </div>
  );
}

export default Adminusers;
