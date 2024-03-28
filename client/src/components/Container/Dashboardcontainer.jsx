import React from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

function DashConatiner({ children }) {
  const username = useSelector((state) => state.auth.user);
  const bussinessac = useSelector((state) => state.auth.bussinessac);
  // console.log(username);
  const navigate = useNavigate();
  const { userID } = useParams();
  // console.log(userID);
  return (
    <div className="mt-48 mb-10 h-screen mx-auto px-4 flex max-w-[1600px] w-full m-auto items-center justify-center overflow-hidden">
      <div className=" w-1/4 bg-gray-300 border-2 h-screen p-2 flex flex-col font-roboto">
        <svg
          class="h-[9rem] w-[24rem] text-black mt-2 items-center"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1"
            d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <button
          onClick={() => {
            navigate(`/myaccount/${userID}`);
          }}
          className="rounded-md bg-transparent  mt-2 px-3 py-1 capitalize text-sm text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
        >
          Hello {username}
        </button>
        <button
          onClick={() => {
            navigate(`/user/room/${userID}`);
          }}
          className="rounded-md bg-transparent px-3 py-1 text-sm text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
        >
          My Rooms
        </button>
        {bussinessac == "yes" && (
          <>
            <button
              onClick={() => {
                navigate(`/user/job/${userID}`);
              }}
              className="rounded-md bg-transparent px-3 py-1 text-sm text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
              Jobs
            </button>
            <button
              onClick={() => {
                // navigate(`/user/job/${userID}`);
              }}
              className="rounded-md bg-transparent px-3 py-1 text-sm text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
              Events
            </button>
            <button
              onClick={() => {
                // navigate(`/user/job/${userID}`);
              }}
              className="rounded-md bg-transparent px-3 py-1 text-sm text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
              Movies
            </button>
            <button
              onClick={() => {
                navigate(`/user/bussiness/${userID}`);
              }}
              className="rounded-md bg-transparent px-3 py-1 text-sm text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
              Bussiness
            </button>
          </>
        )}
      </div>
      <main className=" w-4/5 bg-gray-200 border-2 h-screen p-2 overflow-scroll">
        {children}
      </main>
    </div>
  );
}

export default DashConatiner;
