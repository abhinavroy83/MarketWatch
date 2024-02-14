import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function DashConatiner({ children }) {
  const username = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  return (
    <div className="w-full max-w-6xl mx-auto px-4 flex justify-center items-center h-screen overflow-hidden">
      <div className=" w-1/4  border-red-500 border-2 h-4/5 p-2 flex flex-col">
        <button
          onClick={() => {
            navigate("/myaccount");
          }}
          className="rounded-md bg-transparent px-3 py-2  capitalize text-sm font-semibold text-black hover:bg-black/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
        >
          Hello {username}
        </button>
        <button
          onClick={() => {
            navigate("/user/room");
          }}
          className="rounded-md bg-transparent px-3 py-2 text-sm font-semibold text-black hover:bg-black/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
        >
          Rooms
        </button>
        <button
          onClick={() => {
            navigate("/user/job");
          }}
          className="rounded-md bg-transparent px-3 py-2 text-sm font-semibold text-black hover:bg-black/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
        >
          Jobs
        </button>
      </div>
      <main className=" w-3/4 border-red-500 border-2 h-4/5 p-2 ">
        {children}
      </main>
    </div>
  );
}

export default DashConatiner;
