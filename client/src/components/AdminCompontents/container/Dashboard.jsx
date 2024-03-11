import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function AdminDashboard({ children }) {
  const navigate = useNavigate();
  const role = useSelector((state) => state.adminauth.role);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 flex justify-center items-center h-screen overflow-hidden">
      <div className=" w-1/6  border-red-500 border-2 h-4/5 p-2 flex flex-col">
        <button
          onClick={() => {
            // navigate(`/myaccount/${userID}`);
          }}
          className="rounded-md bg-transparent px-3 py-2  capitalize text-sm font-semibold text-black hover:bg-black/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
        >
          Hello {role}
        </button>
        <button
          onClick={() => {
            navigate(`/admin/alluser`);
          }}
          className="rounded-md bg-transparent px-3 py-2 text-sm font-semibold text-black hover:bg-black/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
        >
          Users
        </button>
        {role === "Admin" || role === "CustomerSupport" ? (
          <button
            onClick={() => {
              navigate(`/admin/allroom`);
            }}
            className="rounded-md bg-transparent px-3 py-2 text-sm font-semibold text-black hover:bg-black/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            Rooms
          </button>
        ) : null}
        {/* <button
          onClick={() => {
            // navigate(`/user/job/${userID}`);
          }}
          className="rounded-md bg-transparent px-3 py-2 text-sm font-semibold text-black hover:bg-black/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
        >
          Jobs
        </button> */}
        <button
          onClick={() => {
            navigate(`/admin/allbussiness`);
          }}
          className="rounded-md bg-transparent px-3 py-2 text-sm font-semibold text-black hover:bg-black/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
        >
          bussiness
        </button>
      </div>
      <main className=" w-10/12 border-red-500 border-2 h-4/5 p-2 ">
        {children}
      </main>
    </div>
  );
}

export default AdminDashboard;
