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
    <div>
      <AdminHeader />
      <AdminDashboard>
        <div>
          AdminHome
          <p>hello {role}</p>
        </div>
      </AdminDashboard>
    </div>
  );
}

export default AdminHome;
