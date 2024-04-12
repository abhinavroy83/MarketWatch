import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/authslice";
import { Link, useNavigate } from "react-router-dom";
import Signup from "./Signup";
import Login from "./Login";
import Ads from "../../pages/UserPages/Ads/Ads";
import { FaHeart } from "react-icons/fa";
import { PiHandHeartFill } from "react-icons/pi";
import { modalopen } from '../../store/modalslice'

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
    // navigate("/login");
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

  const handleModal = (loginModalState, signUpModalState) => {
    dispatch(
      modalopen({
        isloginmodalopen: loginModalState,
        isSignupmodelopen: signUpModalState
      })
    )
  }

  return (
    <div className=" w-full fixed z-50 flex bg-white flex-col">
      <Ads />
      <div className="w-full bg-gray-400 shadow-2xl font-roboto border-b-2 border-black">
        <div className="flex justify-between items-center py-1 px-2 max-w-[1600px] w-full m-auto">
          <div className="flex overflow-auto">
            <ul className="ml-3 space-x-8">
              <button
                type="button"
                onClick={() => {
                  navigate("/");
                }}
                className="rounded-md text-xl px-3 py-2 text-black font-medium font-sans transition duration-300 ease-in-out hover:text-white hover:bg-gray-900 hover:shadow-md"
              >
                HOME
              </button>
            </ul>
            <ul className="ml-3 space-x-8 ">
              <button
                type="button"
                onClick={() => {
                  // navigate("/Events");
                  alert("Coming soon");
                }}
                className="rounded-md text-xl px-3 py-2 text-black font-medium font-sans transition duration-300 ease-in-out hover:text-white hover:bg-black hover:shadow-md"
              >
                EVENTS
              </button>
            </ul>
            <ul className="ml-3 space-x-8 ">
              <button
                type="button"
                onClick={() => {
                  navigate("/rooms");
                }}
                className="rounded-md text-xl px-3 py-2 text-black font-medium font-sans transition duration-300 ease-in-out hover:text-white hover:bg-black hover:shadow-md"
              >
                ROOMS
              </button>
            </ul>
            <ul className="ml-3 space-x-8 ">
              <button
                type="button"
                onClick={() => {
                  // navigate("/bussiness");
                  alert("Coming soon");
                }}
                className="rounded-md text-xl px-3 py-2 text-black font-medium font-sans transition duration-300 ease-in-out hover:text-white hover:bg-black hover:shadow-md"
              >
                BUSSINESS
              </button>
            </ul>
            <ul className="ml-3 space-x-8 ">
              <button
                type="button"
                onClick={() => {
                  // navigate("/Movie");
                  alert("Coming soon");
                }}
                className="rounded-md text-xl px-3 py-2 text-black font-medium font-sans transition duration-300 ease-in-out hover:text-white hover:bg-black hover:shadow-md"
              >
                MOVIES
              </button>
            </ul>
          </div>
          {!authstatus ? (
            <div className="hidden space-x-2 lg:block">
              <Signup />
              <Login />
              <button
                type="button"
                onClick={() => handleModal(false, true)}
                className="rounded-md text-xl px-3 py-2 text-black font-medium font-sans transition duration-300 ease-in-out hover:text-white hover:bg-black hover:shadow-md"
              >
                SIGN UP
              </button>
              <button
                type="button"
                onClick={() => handleModal(true, false)}
                className="rounded-md text-xl px-3 py-2 text-black font-medium font-sans transition duration-300 ease-in-out hover:text-white hover:bg-black hover:shadow-md"
              >
                LOG IN
              </button>
            </div>
          ) : (
            <div className="flex items-center">
              <div className="relative">
                <FaHeart
                  className="text-black hover:text-red-800 cursor-pointer mt-2"
                  size={25}
                  onClick={() => {
                    navigate(`/dashboard/wishlist/${userID}`);
                  }}
                />
                {cartno > 0 && (
                  <div className="absolute top-1 right-0 transform translate-x-1/2 -translate-y-1/2 text-white font-bold bg-red-700 w-6 h-6 flex justify-center items-center rounded-full">
                    {cartno}
                  </div>
                )}
              </div>
              <button
                type="button"
                onClick={() => {
                  navigate(`/myaccount/${userID}`);
                }}
                className="rounded-md text-xl px-3 py-2 text-black font-medium font-sans transition duration-300 ease-in-out hover:text-white hover:bg-black hover:shadow-md"
              >
                MY ACCOUNT
              </button>
              <button
                type="button"
                onClick={handlelogout}
                className="rounded-md text-xl px-3 py-2 text-black font-medium font-sans transition duration-300 ease-in-out hover:text-white hover:bg-black hover:shadow-md"
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
