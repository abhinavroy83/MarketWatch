import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Container from "../Container/Container";
import { useNavigate } from "react-router-dom";
import { logout as adminlogout } from "../../store/adminauthslice";

function AdminHome() {
  const role = useSelector((state) => state.adminauth.role);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <Container>
      <div>
        AdminHome
        <p>hello {role}</p>
        <button
          className="rounded-md bg-transparent px-3 py-2 text-base/7 font-semibold text-black hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          onClick={() => {
            dispatch(adminlogout());
            localStorage.removeItem("admindetails");
            navigate("/admin/login");
          }}
        >
          logout
        </button>
      </div>
    </Container>
  );
}

export default AdminHome;
