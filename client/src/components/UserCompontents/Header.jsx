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
    <div className=" w-full fixed z-50 flex bg-white flex-col">
      <Ads />
      <div className=" w-screen bg-gray-400 shadow-2xl font-roboto">
        <div className="flex justify-between items-center p-2 max-w-[1600px] w-full m-auto">
          <div className="">
            <ul className="ml-3 inline-flex space-x-8">
              <button
                type="button"
                onClick={() => {
                  navigate("/");
                }}
                className="rounded-md bg-transparent text-base/7 px-3 py-2 text-black hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              >
                Home
              </button>
            </ul>
            <ul className="ml-3 inline-flex space-x-8">
              <button
                type="button"
                onClick={() => {
                  navigate("/Events");
                }}
                className="rounded-md bg-transparent px-3 py-2 text-base/7 text-black hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              >
                Events
              </button>
            </ul>
            <ul className="ml-3 inline-flex space-x-8">
              <button
                type="button"
                onClick={() => {
                  navigate("/rooms");
                }}
                className="rounded-md bg-transparent px-3 py-2 text-base/7 text-black hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              >
                Rooms
              </button>
            </ul>
            <ul className="ml-3 inline-flex space-x-8">
              <button
                type="button"
                onClick={() => {
                  navigate("/bussiness");
                }}
                className="rounded-md bg-transparent px-3 py-2 text-base/7 text-black hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              >
                Bussiness
              </button>
            </ul>
            <ul className="ml-3 inline-flex space-x-8">
              <button
                type="button"
                onClick={() => {
                  navigate("/Movie");
                }}
                className="rounded-md bg-transparent px-3 py-2 text-base/7 text-black hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              >
                Movie
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
                className="rounded-md bg-transparent px-3 py-2 text-base/7 text-black hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              >
                Sign Up
              </button>
              <button
                type="button"
                onClick={handleloginmodelopen}
                className="rounded-md px-3 py-2 text-base/7 text-black hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              >
                Log In
              </button>
            </div>
          ) : (
            <div className="flex">
              <button
                type="button"
                onClick={() => {
                  navigate(`/myaccount/${userID}`);
                }}
                className="rounded-md bg-transparent px-3 py-2 text-base/7 text-black hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              >
                My Account
              </button>
              <button
                type="button"
                onClick={handlelogout}
                className="rounded-md bg-transparent px-3 py-2 text-base/7 text-black hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              >
                Logout
              </button>
              <svg class="h-8 w-8 text-black justify-items-center mt-1 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
           <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
          </svg>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
