import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../store/adminauthslice";
import { IoHome } from "react-icons/io5";
import { BiLogOut } from "react-icons/bi";

function AdminHeader() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div className=" mx-auto w-full bg-[#232f3e] shadow-2xl font-['udemy-regular'] fixed  ">
      <div className="mx-auto flex max-w-[1600px] items-center justify-between px-4 py-2 sm:px-6 lg:px-8">
        <Link to={"/rooms"} className="inline-flex items-center space-x-2">
          <img
            height={100}
            width={150}
            className="w-50 h-50"
            src={
              "https://res.cloudinary.com/druohnmyv/image/upload/v1723819327/assests/x31ydsmb8hkg05fqbkjf.png"
            }
            alt=""
          />
        </Link>
        <div className="hidden grow items-start lg:flex ">
          <ul className="ml-12 inline-flex space-x-8 capitalize">
            <button
              type="button"
              onClick={() => {
                navigate("/admin/dashboard");
              }}
              className="flex gap-1 bg-transparent text-[16px] px-3 py-2 text-white hover:bg-white rounded-md hover:text-[#232f3e] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
              <IoHome size={19} /> ADMIN HOME
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
            className="rounded-md text-[16px] flex gap-1 px-3 py-2 text-white hover:bg-white hover:text-[#232f3e] font-medium transition duration-300 ease-in-out hover:shadow-md"
          >
            <BiLogOut size={22} /> LOGOUT
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminHeader;
