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


function AdminDashboard({ children }) {
  const navigate = useNavigate();
  const role = useSelector((state) => state.adminauth.role);

  return (
    <div className="w-full max-w-[1229px] mx-auto px-4 flex justify-center items-center h-screen overflow-hidden font-['udemy-regular'] mt-7 text-[20px]">
      <div className="w-[22%] bg-[#0b5e86] h-4/5 p-2 flex flex-col items-center gap-2">
        <button
          onClick={() => {
            navigate(`/admin/dashboard`);
          }}
          className="mt-5 text-[20px] flex gap-2 text-white rounded-md bg-transparent px-3 py-2 capitalize font-semibold transition duration-300 ease-in-out  hover:bg-white hover:text-[#0b5e86] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
        >
          <FaHome size={30}/>Hello {role}
        </button>
        <button
          onClick={() => {
            navigate(`/admin/alluser`);
          }}
          className="text-[20px] text-white flex gap-2 hover:bg-white hover:text-[#0b5e86] rounded-md bg-transparent px-3 py-2 font-semibold transition duration-300 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
        >
         <IoPeopleSharp size={30}/>Basic Users
        </button>
        {role === "Admin" && (
          <button
            onClick={() => {
              navigate(`/admin/getalladminsuser`);
            }}
            className="text-[20px] text-white flex gap-2 hover:bg-white hover:text-[#0b5e86] rounded-md bg-transparent px-3 py-2 font-semibold transition duration-300 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
          <RiAdminFill size={30}/> Admin Users
          </button>
        )}
        {role === "Admin" || role === "Manager" ? (
          <button
            onClick={() => {
              navigate(`/admin/getapproval`);
            }}
            className="text-[20px] whitespace-nowrap text-white flex gap-2 hover:bg-white hover:text-[#0b5e86] rounded-md bg-transparent px-3 py-2 font-semibold transition duration-300 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
            <MdPendingActions size={30}/>Pending Requests
          </button>
        ) : null}
        {role === "Admin" || role === "Manager" ? (
          <button
            onClick={() => {
              navigate(`/admin/allarea`);
            }}
            className="text-[20px] text-white flex gap-1 hover:bg-white hover:text-[#0b5e86] rounded-md bg-transparent px-3 py-2 font-semibold transition duration-300 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
           <FaMapPin size={27}/> Area
          </button>
        ) : null}
        {role === "CustomerSupport" ? (
          <button
            onClick={() => {
              navigate(`/admin/requests`);
            }}
            className="text-[20px] text-white flex gap-2 hover:bg-white hover:text-[#0b5e86] rounded-md bg-transparent px-3 py-2 font-semibold transition duration-300 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
           <MdOutlineSpatialTracking size={30}/> Track Status
          </button>
        ) : null}
        {role === "Admin" || role === "CustomerSupport" ? (
          <button
            onClick={() => {
              navigate(`/admin/allroom`);
            }}
            className="text-[20px] text-white flex gap-2 hover:bg-white hover:text-[#0b5e86] rounded-md bg-transparent px-3 py-2 font-semibold transition duration-300 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
           <MdOutlineMeetingRoom size={30}/> Rooms
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
      <main className=" w-11/12 bg-gray-200 h-4/5 p-2 ">{children}</main>
    </div>
  );
}

export default AdminDashboard;
