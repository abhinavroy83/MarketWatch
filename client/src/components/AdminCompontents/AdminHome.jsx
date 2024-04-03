import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Container from "../Container/Container";
import { useNavigate } from "react-router-dom";
import { logout as adminlogout } from "../../store/adminauthslice";
import AdminDashboard from "./container/Dashboard";
import AdminHeader from "./AdminHeader";

function AdminHome() {
  const role = useSelector((state) => state.adminauth.role);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div className="font-roboto text-[20px]">
      <AdminHeader />
      <AdminDashboard>
        <div className="text-red-700 font-bold text-[27px] pl-4 mt-4 items-center justify-center text-center">
          <p className="border-b-2 border-gray-500 pb-4">Home Page</p> <hr className="text-black"></hr>
          <p className="mt-4">Welcome , {role}</p>
        </div>
      </AdminDashboard>
    </div>
  );
}

export default AdminHome;
