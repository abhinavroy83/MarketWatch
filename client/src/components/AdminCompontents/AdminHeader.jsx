import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../store/adminauthslice";

function AdminHeader() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div className=" w-full bg-gray-400 shadow-2xl font-[Roboto] fixed">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:px-6 lg:px-8">
        <div className="inline-flex items-center space-x-2">
          <span className="font-bold text-white">Logo Here</span>
        </div>
        <div className="hidden grow items-start lg:flex">
          <ul className="ml-12 inline-flex space-x-8">
            <button
              type="button"
              onClick={() => {
                navigate("/admin/dashboard");
              }}
              className="rounded-md bg-transparent text-base/7 px-3 py-2 font-semibold text-black hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
              Home
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
            className="rounded-md bg-transparent px-3 py-2 text-base/7 font-semibold text-black hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminHeader;
