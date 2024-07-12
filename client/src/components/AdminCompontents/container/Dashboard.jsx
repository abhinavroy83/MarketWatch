import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { IoPeopleSharp } from "react-icons/io5";
import { RiAdminFill } from "react-icons/ri";
import { MdOutlineSpatialTracking } from "react-icons/md";
import { MdPendingActions } from "react-icons/md";
import { FaMapMarkedAlt } from "react-icons/fa";
import { MdOutlineMeetingRoom } from "react-icons/md";
import { FaMapPin } from "react-icons/fa6";
import { BsPostcard } from "react-icons/bs";

function AdminDashboard({ children }) {
  const navigate = useNavigate();
  const role = useSelector((state) => state.adminauth.role);

  return (
    <div className="max-w-[1600px] mx-auto px-4 flex items-center h-screen overflow-hidden font-['udemy-regular'] mt-[1rem] lg:mt-[2rem] text-[20px]">
      <div className="w-[20%] bg-[#232f3e] h-[630px] p-2 flex flex-col items-center gap-2">
        <button
          onClick={() => {
            navigate(`/admin/dashboard`);
          }}
          className="mt-5 text-[1.1rem] w-full flex gap-2 text-white rounded-md bg-transparent pl-2 py-2 capitalize transition duration-300 ease-in-out  hover:bg-white hover:text-[#232f3e] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
        >
          <FaHome size={22} />
          Dashboard
        </button>
        <button
          onClick={() => {
            navigate(`/admin/alluser`);
          }}
          className="text-[1.1rem] w-full flex gap-2 text-white rounded-md bg-transparent pr-7 pl-2 py-2 capitalize transition duration-300 ease-in-out  hover:bg-white hover:text-[#232f3e] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
        >
          <IoPeopleSharp size={25} />
          Basic Users
        </button>
        {role === "Admin" && (
          <button
            onClick={() => {
              navigate(`/admin/getalladminsuser`);
            }}
            className="text-[1.1rem] w-full flex gap-2 text-white rounded-md bg-transparent pr-7 pl-2 py-2 capitalize transition duration-300 ease-in-out  hover:bg-white hover:text-[#232f3e] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            <RiAdminFill size={25} /> Admin Users
          </button>
        )}
        {role === "Admin" || role === "Manager" ? (
          <button
            onClick={() => {
              navigate(`/admin/getapproval`);
            }}
            className="whitespace-nowrap text-[1.1rem] w-full flex gap-2 text-white rounded-md bg-transparent pl-2 py-2 capitalize transition duration-300 ease-in-out  hover:bg-white hover:text-[#232f3e] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            <MdPendingActions size={25} />
            Pending Requests
          </button>
        ) : null}
        {role === "Admin" || role === "Manager" ? (
          <button
            onClick={() => {
              navigate(`/admin/allarea`);
            }}
            className="text-[1.1rem] w-full flex gap-2 text-white rounded-md bg-transparent pl-2 py-2 capitalize transition duration-300 ease-in-out  hover:bg-white hover:text-[#232f3e] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            <FaMapPin size={22} /> Area
          </button>
        ) : null}
        {role === "CustomerSupport" ? (
          <button
            onClick={() => {
              navigate(`/admin/requests`);
            }}
            className="text-[1.1rem] w-full flex gap-2 text-white rounded-md bg-transparent pr-7 pl-2 py-2 capitalize transition duration-300 ease-in-out  hover:bg-white hover:text-[#232f3e] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            <MdOutlineSpatialTracking size={25} /> Track Status
          </button>
        ) : null}
        {role === "Admin" || role === "CustomerSupport" ? (
          <button
            onClick={() => {
              navigate(`/admin/allroom`);
            }}
            className="text-[1.1rem] w-full flex gap-2 text-white rounded-md bg-transparent pr-7 pl-2 py-2 capitalize transition duration-300 ease-in-out  hover:bg-white hover:text-[#232f3e] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            <BsPostcard size={25} /> Posts
          </button>
        ) : null}
        {/* <button
          onClick={() => {
            // navigate(`/user/job/${userID}`);
          }}
          className="text-[22px] text-white rounded-md bg-transparent px-3 py-2 font-semibold transition duration-300 ease-in-out hover:bg-white hover:text-[#0b5e86] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
        >
          Jobs
        </button> */}
        {/* <button
          onClick={() => {
            navigate(`/admin/allbussiness`);
          }}
          className="text-[22px] text-white rounded-md bg-transparent px-3 py-2 font-semibold transition duration-300 ease-in-out hover:bg-white hover:text-[#0b5e86] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
        >
          Bussiness
        </button> */}
      </div>
      <main className=" w-4/5 bg-blue-100 h-[630px] p-2 ">{children}</main>
    </div>
  );
}

export default AdminDashboard;
