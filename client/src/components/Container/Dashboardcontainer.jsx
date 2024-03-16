import React from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

function DashConatiner({ children }) {
  const username = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const { userID } = useParams();
  // console.log(userID);
  return (
    <div className="w-full mt-48 mb-10 h-full max-w-6xl mx-auto px-4 flex justify-center items-center overflow-hidden">
      <div className=" w-1/4  border-red-500 border-2 h-screen p-2 flex flex-col">
        <button
          onClick={() => {
            navigate(`/myaccount/${userID}`);
          }}
          className="rounded-md bg-transparent px-3 py-2  capitalize text-sm font-semibold text-black hover:bg-black/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
        >
          Hello {username}
        </button>
        <button
          onClick={() => {
            navigate(`/user/room/${userID}`);
          }}
          className="rounded-md bg-transparent px-3 py-2 text-sm font-semibold text-black hover:bg-black/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
        >
          Rooms
        </button>
        <button
          onClick={() => {
            navigate(`/user/job/${userID}`);
          }}
          className="rounded-md bg-transparent px-3 py-2 text-sm font-semibold text-black hover:bg-black/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
        >
          Jobs
        </button>
        <button
          onClick={() => {
            navigate(`/user/bussiness/${userID}`);
          }}
          className="rounded-md bg-transparent px-3 py-2 text-sm font-semibold text-black hover:bg-black/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
        >
          bussiness
        </button>
      </div>
      <main className=" w-3/4 border-red-500 border-2 h-screen p-2 ">
        {children}
      </main>
    </div>
  );
}

export default DashConatiner;
