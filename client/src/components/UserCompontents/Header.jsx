import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/authslice";
import { Link, useNavigate } from "react-router-dom";
import Signup from "./Signup";
import Login from "./Login";
import Ads from "../../pages/UserPages/Ads/Ads";

export default function Header() {
  const authstatus = useSelector((state) => state.auth.status);
  const userID = useSelector((state) => state.auth.userID);
  const [issignupmodel, setissignupmodalopen] = useState(false);
  const [isloginmodalopen, setloginmodeopen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlelogout = () => {
    dispatch(logout());
    localStorage.removeItem("userdetails");
    navigate("/login");
  };
  const handlesignmodelopen = () => {
    setissignupmodalopen(true);
  };

  const handleloginmodelopen = () => {
    setloginmodeopen(true);
  };

  //close

  const isloginmodelclose = () => {
    setloginmodeopen(false);
  };
  const issignupmodelclose = () => {
    setissignupmodalopen(false);
  };

  return (
    <div className=" w-full fixed z-50 flex bg-white bg-[url('https://w0.peakpx.com/wallpaper/323/21/HD-wallpaper-plain-white-abstract.jpg')] flex-col">
      <Ads />
      <div className=" w-screen bg-gray-400 shadow-2xl font-roboto border-b-4 border-black">
        <div className="flex justify-between items-center py-1 px-2 max-w-[1600px] w-full m-auto">
          <div className="">
            <ul className="ml-3 inline-flex space-x-8">
              <button
                type="button"
                onClick={() => {
                  navigate("/");
                }}
                className="rounded-md bg-transparent text-[17px] px-3 py-2 text-black font-bold hover:text-black hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              >
               HOME
              </button>
            </ul>
            <ul className="ml-3 inline-flex space-x-8 ">
              <button
                type="button"
                onClick={() => {
                  navigate("/Events");
                }}
                className="rounded-md bg-transparent text-[17px] px-3 py-2 text-black font-bold hover:text-black hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              >
                EVENTS
              </button>
            </ul>
            <ul className="ml-3 inline-flex space-x-8 ">
              <button
                type="button"
                onClick={() => {
                  navigate("/rooms");
                }}
                className="rounded-md bg-transparent text-[17px] px-3 py-2 text-black font-bold hover:text-black hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              >
                ROOMS
              </button>
            </ul>
            <ul className="ml-3 inline-flex space-x-8 ">
              <button
                type="button"
                onClick={() => {
                  navigate("/bussiness");
                }}
                className="rounded-md bg-transparent text-[17px] px-3 py-2 text-black font-bold hover:text-black hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              >
               BUSSINESS
              </button>
            </ul>
            <ul className="ml-3 inline-flex space-x-8 ">
              <button
                type="button"
                onClick={() => {
                  navigate("/Movie");
                }}
                className="rounded-md bg-transparent text-[17px] px-3 py-2 text-black font-bold hover:text-black hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              >
                MOVIES
              </button>
            </ul>
          </div>
          {!authstatus ? (
            <div className="hidden space-x-2 lg:block">
              <Signup isOpen={issignupmodel} onClose={issignupmodelclose} />
              <Login isOpen={isloginmodalopen} onClose={isloginmodelclose} />
              <button
                type="button"
                onClick={handlesignmodelopen}
                className="rounded-md bg-transparent text-[17px]  px-3 py-2 text-black font-bold hover:text-black hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              >
                SIGN UP
              </button>
              <button
                type="button"
                onClick={handleloginmodelopen}
                className="rounded-md text-[17px] px-3 py-2 text-black font-bold hover:text-black hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              >
                LOG IN
              </button>
            </div>
          ) : (
            <div className="flex">
               <svg class="h-7 w-7 text-black mt-1"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
              </svg>
              <button
                type="button"
                onClick={() => {
                  navigate(`/myaccount/${userID}`);
                }}
                className="rounded-md bg-transparent text-[17px] px-3 py-2 text-black font-bold hover:text-black hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              >
                MY ACCOUNT
              </button>
              <button
                type="button"
                onClick={handlelogout}
                className="rounded-md bg-transparent text-[17px] px-3 py-2 text-black font-bold hover:text-black hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              >
                LOGOUT
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
