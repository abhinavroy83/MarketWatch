import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/authslice";
import { Link, useNavigate } from "react-router-dom";
import Signup from "./Signup";
import Login from "./Login";

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
    <div className="w-full bg-gray-400 shadow-2xl font-[Montserrat] fixed z-50">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:px-6 lg:px-8">
        <div className="inline-flex mx-[-19%] items-center space-x-2">
        </div>
        <div className="hidden grow items-start mx-[18%] lg:flex">
          <ul className="ml-12 inline-flex space-x-8">
            <button
              type="button"
              onClick={() => {
                navigate("/");
              }}
              className="rounded-md bg-transparent text-base/7 px-3 py-2 font-semibold text-black hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
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
              className="rounded-md bg-transparent px-3 py-2 text-base/7 font-semibold text-black hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
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
              className="rounded-md bg-transparent px-3 py-2 text-base/7 font-semibold text-black hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
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
              className="rounded-md bg-transparent px-3 py-2 text-base/7 font-semibold text-black hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
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
              className="rounded-md bg-transparent px-3 py-2 text-base/7 font-semibold text-black hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
              Movie
            </button>
          </ul>
        </div>
        {!authstatus ? (
          <div className="hidden space-x-2 lg:block mx-[-20%]">
            <Signup isOpen={issignupmodel} onClose={issignupmodelclose} />
            <Login isOpen={isloginmodalopen} onClose={isloginmodelclose} />
            <button
              type="button"
              onClick={handlesignmodelopen}
              className="rounded-md bg-transparent px-3 py-2 text-base/7 font-semibold text-black hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
              Sign Up
            </button>
            <button
              type="button"
              onClick={handleloginmodelopen}
              className="rounded-md px-3 py-2 text-base/7 font-semibold text-black hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
              Log In
            </button>
          </div>
        ) : (
          <div className="mx-[-20%]">
            <button
              type="button"
              onClick={() => {
                navigate(`/myaccount/${userID}`);
              }}
              className="rounded-md bg-transparent px-3 py-2 text-base/7 font-semibold text-black hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
              My Account
            </button>
            <button
              type="button"
              onClick={handlelogout}
              className="rounded-md bg-transparent px-3 py-2 text-base/7 font-semibold text-black hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
