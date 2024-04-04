import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function AdminDashboard({ children }) {
  const navigate = useNavigate();
  const role = useSelector((state) => state.adminauth.role);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 mt-56 flex justify-center items-center h-screen overflow-hidden font-roboto text-[20px]">
      <div className=" w-2/6 bg-gray-300  h-4/5 p-2 flex flex-col">
        <button
          onClick={() => {
            // navigate(`/myaccount/${userID}`);
          }}
          className="mt-5 rounded-md bg-transparent px-3 py-2 capitalize font-semibold transition duration-300 ease-in-out text-black hover:bg-black/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
        >
          Hello {role}
        </button>
        <button
          onClick={() => {
            navigate(`/admin/alluser`);
          }}
          className="rounded-md bg-transparent px-3 py-2 font-semibold transition duration-300 ease-in-out text-black hover:bg-black/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
        >
          Basic Users
        </button>
        {role === "Admin" && (
          <button
            onClick={() => {
              navigate(`/admin/getalladminsuser`);
            }}
            className="rounded-md bg-transparent px-3 py-2 font-semibold transition duration-300 ease-in-out text-black hover:bg-black/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            Admin Users
          </button>
        )}
        {role === "Admin" || role === "Manager" ? (
          <button
            onClick={() => {
              navigate(`/admin/getapproval`);
            }}
            className="rounded-md bg-transparent px-3 py-2 font-semibold transition duration-300 ease-in-out text-black hover:bg-black/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            Pending Requests
          </button>
        ) : null}
        {role === "Admin" || role === "Manager" ? (
          <button
            onClick={() => {
              navigate(`/admin/allarea`);
            }}
            className="rounded-md bg-transparent px-3 py-2 font-semibold transition duration-300 ease-in-out text-black hover:bg-black/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            Area
          </button>
        ) : null}
        {role === "CustomerSupport" ? (
          <button
            onClick={() => {
              navigate(`/admin/requests`);
            }}
            className="rounded-md bg-transparent px-3 py-2 font-semibold transition duration-300 ease-in-out text-black hover:bg-black/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            Track Status
          </button>
        ) : null}
        {role === "Admin" || role === "CustomerSupport" ? (
          <button
            onClick={() => {
              navigate(`/admin/allroom`);
            }}
            className="rounded-md bg-transparent px-3 py-2 font-semibold transition duration-300 ease-in-out text-black hover:bg-black/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            Rooms
          </button>
        ) : null}
        {/* <button
          onClick={() => {
            // navigate(`/user/job/${userID}`);
          }}
          className="rounded-md bg-transparent px-3 py-2 font-semibold transition duration-300 ease-in-out text-black hover:bg-black/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
        >
          Jobs
        </button> */}
        {/* <button
          onClick={() => {
            navigate(`/admin/allbussiness`);
          }}
          className="rounded-md bg-transparent px-3 py-2 font-semibold transition duration-300 ease-in-out text-black hover:bg-black/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
        >
          Bussiness
        </button> */}
      </div>
      <main className=" w-11/12 bg-gray-200 h-4/5 p-2 ">{children}</main>
    </div>
  );
}

export default AdminDashboard;
