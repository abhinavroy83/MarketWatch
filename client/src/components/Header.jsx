import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/authslice";
import { Link, useNavigate } from "react-router-dom";
import PostProduct from "../pages/PostProduct";

export default function Header() {
  const authstatus = useSelector((state) => state.auth.status);
  const userID = useSelector((state) => state.auth.userID);
  // console.log(userID);
  // console.log(authstatus);
  const [ismodalopen, setismodalopen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlelogout = () => {
    dispatch(logout());
    localStorage.removeItem("userdetails");
  };
  const handlemodelopen = () => {
    if (authstatus) {
      setismodalopen(true);
    }
  };
  const ismodelclose = () => {
    setismodalopen(false);
  };

  return (
    <div className="relative w-full bg-gray-400">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:px-6 lg:px-8">
        <div className="inline-flex items-center space-x-2">
          <span className="font-bold text-white">ABC</span>
        </div>
        <div className="hidden grow items-start lg:flex">
          <ul className="ml-12 inline-flex space-x-8">
            <button
              type="button"
              onClick={() => {
                navigate("/");
              }}
              className="rounded-md bg-transparent px-3 py-2 text-sm font-semibold text-black hover:bg-black/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
              Home
            </button>
            {/* <button
              type="button"
              onClick={handlemodelopen}
              className="rounded-md bg-transparent px-3 py-2 text-sm font-semibold text-black hover:bg-black/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
              Postproduct
            </button> */}
          </ul>
        </div>
        {/* <PostProduct isOpen={ismodalopen} onClose={ismodelclose} /> */}
        {!authstatus ? (
          <div className="hidden space-x-2 lg:block">
            <button
              type="button"
              onClick={() => {
                navigate("/signup/");
              }}
              className="rounded-md bg-transparent px-3 py-2 text-sm font-semibold text-black hover:bg-black/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => {
                navigate("/login");
              }}
              className="rounded-md border border-black px-3 py-2 text-sm font-semibold text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
              Log In
            </button>
          </div>
        ) : (
          <div>
            <button
              type="button"
              onClick={() => {
                navigate(`/myaccount/${userID}`);
              }}
              className="rounded-md bg-transparent px-3 py-2 text-sm font-semibold text-black hover:bg-black/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
              MyAccount
            </button>
            <button
              type="button"
              onClick={handlelogout}
              className="rounded-md bg-transparent px-3 py-2 text-sm font-semibold text-black hover:bg-black/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
              logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
