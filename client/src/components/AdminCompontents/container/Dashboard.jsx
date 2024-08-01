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
    <div className="max-w-[1600px] mx-auto px-4 flex items-center justify-center h-screen overflow-hidden font-['udemy-regular'] mt-[1rem] text-[20px]">
      <div className="w-[20%] h-[630px] border p-2 hidden lg:flex flex-col items-center">
        <button
          onClick={() => {
            navigate(`/admin/dashboard`);
          }}
          className="bg-transparent rounded-md py-1 px-4 w-full flex gap-4 items-center hover:bg-gray-200 text-black leading-8 self-start lg:mt-2 capitalize text-[1.1rem] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visibl2:outline-black "
        >
          <FaHome size={22} />
          Dashboard
        </button>
        <button
          onClick={() => {
            navigate(`/admin/alluser`);
          }}
          className="bg-transparent rounded-md py-1 px-4 w-full flex gap-4 items-center hover:bg-gray-200 text-black leading-8 self-start lg:mt-2 capitalize text-[1.1rem] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visibl2:outline-black "
        >
          <IoPeopleSharp size={25} />
          Basic Users
        </button>
        {role === "Admin" && (
          <button
            onClick={() => {
              navigate(`/admin/getalladminsuser`);
            }}
            className="bg-transparent rounded-md py-1 px-4 w-full flex gap-4 items-center hover:bg-gray-200 text-black leading-8 self-start lg:mt-2 capitalize text-[1.1rem] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visibl2:outline-black "
          >
            <RiAdminFill size={25} /> Admin Users
          </button>
        )}
        {role === "Admin" || role === "Manager" ? (
          <button
            onClick={() => {
              navigate(`/admin/getapproval`);
            }}
            className="bg-transparent rounded-md py-1 px-4 w-full flex gap-4 items-center hover:bg-gray-200 text-black leading-8 self-start lg:mt-2 capitalize text-[1.1rem] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visibl2:outline-black "
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
            className="bg-transparent rounded-md py-1 px-4 w-full flex gap-4 items-center hover:bg-gray-200 text-black leading-8 self-start lg:mt-2 capitalize text-[1.1rem] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visibl2:outline-black "
          >
            <FaMapPin size={22} /> Area
          </button>
        ) : null}
        {role === "CustomerSupport" ? (
          <button
            onClick={() => {
              navigate(`/admin/requests`);
            }}
            className="bg-transparent rounded-md py-1 px-4 w-full flex gap-4 items-center hover:bg-gray-200 text-black leading-8 self-start lg:mt-2 capitalize text-[1.1rem] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visibl2:outline-black "
          >
            <MdOutlineSpatialTracking size={25} /> Track Status
          </button>
        ) : null}
        {role === "Admin" || role === "CustomerSupport" ? (
          <button
            onClick={() => {
              navigate(`/admin/allroom`);
            }}
            className="bg-transparent rounded-md py-1 px-4 w-full flex gap-4 items-center hover:bg-gray-200 text-black leading-8 self-start lg:mt-2 capitalize text-[1.1rem] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visibl2:outline-black "
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
      <main className="w-auto lg:w-4/5 h-[630px] border p-2 overflow-scroll overflow-x-hidden overflow-y-hidden mt-3 lg:mt-0">
        {children}
      </main>
    </div>
  );
}

export default AdminDashboard;
