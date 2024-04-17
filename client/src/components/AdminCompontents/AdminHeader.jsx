import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../store/adminauthslice";
import WebsiteLogo from "../../assets/logo-transparent.png";

function AdminHeader() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div className="w-full bg-[#0b5e86] shadow-2xl font-[Roboto] fixed">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:px-6 lg:px-8">
        <Link to={"/"} className="inline-flex items-center space-x-2">
          <img
            height={100}
            width={180}
            className="w-50 h-50"
            src={WebsiteLogo}
            alt=""
          />
        </Link>
        <div className="hidden grow items-start lg:flex">
          <ul className="ml-12 inline-flex space-x-8">
            <button
              type="button"
              onClick={() => {
                navigate("/admin/dashboard");
              }}
              className="rounded-md bg-transparent text-[20px] px-3 py-2 text-white hover:bg-white hover:text-[#0b5e86] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
              Admin Home
            </button>
          </ul>
        </div>
        <div>

          <button
            type="button"
            onClick={() => {
              dispatch(logout());
              localStorage.removeItem("admindetails");
              navigate("/admin/login");
            }}
            className="rounded-md text-xl px-3 py-2 text-white hover:bg-white hover:text-[#0b5e86] font-medium transition duration-300 ease-in-out hover:shadow-md"
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminHeader;
