import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/authslice";
import { Link, useNavigate } from "react-router-dom";
import Signup from "./Signup";
import Login from "./Login";
import Ads from "../../pages/UserPages/Ads/Ads";
import { modalopen } from "../../store/modalslice";
import axios from "axios";
import { GiHamburgerMenu } from "react-icons/gi";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { GiExitDoor } from "react-icons/gi";
import { RxCross1 } from "react-icons/rx";
import { FaHeart } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";
import { FaCaretDown } from "react-icons/fa";

export default function Header() {
  const authstatus = useSelector((state) => state.auth.status);
  const userID = useSelector((state) => state.auth.userID);
  const [openhamburger, setopenhamburger] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [cartno, setCartno] = useState("");

  const fetchcount = async () => {
    if (userID) {
      try {
        const res = await axios.get(
          ` https://api.verydesi.com/api/getlist/${userID}`
        );
        if (res.data.list.status === "error") {
          setCartno("");
        } else {
          setCartno(res.data.list.length);
        }
      } catch (error) {
        console.log("error during fetcing count api in header", error);
      }
    }
  };
  useEffect(() => {
    fetchcount();
  }, [userID]);

  const handlelogout = () => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="bg-gray-200 rounded-lg text-black flex flex-col p-10 items-center justify-center font-['udemy-regular'] relative">
            <RxCross1
              className="h-5 w-5 text-black absolute top-3 right-3 cursor-pointer hover:rotate-[360deg] transition-transform duration-300"
              onClick={onClose}
            />
            <GiExitDoor className="items-center" size={70} />
            <h1 className="text-[25px] mt-3 font-semibold">Confirm Logout</h1>
            <p className="text-[22px] text-gray-600">
              Are you sure you want to logout?
            </p>
            <div className="flex gap-4 items-center mt-4">
              <button
                className="bg-red-700 text-[20px] cursor-pointer px-7 py-2 rounded-md text-white"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                className="bg-green-700 text-[20px] cursor-pointer px-7 py-2 rounded-md text-white"
                onClick={() => {
                  dispatch(logout());
                  localStorage.removeItem("userdetails");
                  onClose();
                }}
              >
                Yes, Logout
              </button>
            </div>
          </div>
        );
      },
    });
  };

  const handleModal = (loginModalState, signUpModalState) => {
    dispatch(
      modalopen({
        isloginmodalopen: loginModalState,
        isSignupmodelopen: signUpModalState,
      })
    );
  };

  const handlehamburger = () => {
    setopenhamburger(!openhamburger);
  };

  return (
    <div className="relative">
      <div className="w-full fixed z-50 flex bg-white flex-col">
        <Ads />
        <div className="w-full bg-[#232f3e] shadow-2xl h-[39px] font-['udemy-regular'] items-center flex">
          <div className="flex justify-between items-center w-full mx-auto max-w-[1370px] lg:max-w-[1600px]">
            <div className="relative block lg:hidden">
              <button
                className="items-center mt-1 ml-2 flex"
                onClick={handlehamburger}
              >
                {" "}
                <GiHamburgerMenu
                  className="cursor-pointer text-white"
                  size={27}
                />{" "}
              </button>
              {openhamburger && (
                <div className="inline-flex flex-col bg-[#232f3e] max-w-[220px] p-2 overflow-auto border-2 border-black absolute top-[115%] fit-content w-[200px] left-0">
                  <ul className=" space-x-8">
                    <button
                      type="button"
                      onClick={() => {
                        navigate("/");
                        {
                          handlehamburger;
                        }
                      }}
                      className="flex gap-1 items-center py-1 group text-[16px] text-white font-medium font-sans transition duration-300 ease-in-out hover:shadow-md"
                    >
                      <RxHamburgerMenu /> Home
                    </button>
                  </ul>
                  <ul className="space-x-8 ">
                    <button
                      type="button"
                      onClick={() => {
                        navigate("/rooms");
                      }}
                      className="flex gap-1 items-center py-1 group text-[16px] text-white font-medium font-sans transition duration-300 ease-in-out hover:shadow-md"
                    >
                      Rooms
                      <FaCaretDown
                        className="group-hover:rotate-[360deg] transition-transform duration-300 "
                        size={15}
                      />
                    </button>
                  </ul>
                  <ul className="space-x-8 ">
                    <button
                      type="button"
                      onClick={() => {
                        // navigate("/Events");
                        alert("Coming soon");
                      }}
                      className="flex gap-1 items-center py-1 text-[16px] group text-white font-medium font-sans transition duration-300 ease-in-out  hover:shadow-md"
                    >
                      Events
                      <FaCaretDown
                        className="group-hover:rotate-[360deg] transition-transform duration-300 "
                        size={15}
                      />
                    </button>
                  </ul>
                  <ul className="space-x-8 ">
                    <button
                      type="button"
                      onClick={() => {
                        navigate();
                      }}
                      className="flex gap-1 items-center py-1 text-[16px] group text-white font-medium font-sans transition duration-300 ease-in-out hover:shadow-md"
                    >
                      Jobs
                      <FaCaretDown
                        className="group-hover:rotate-[360deg] transition-transform duration-300 "
                        size={15}
                      />
                    </button>
                  </ul>
                  <ul className="space-x-8 ">
                    <button
                      type="button"
                      onClick={() => {
                        // navigate("/bussiness");
                        alert("Coming soon");
                      }}
                      className="flex gap-1 items-center py-1 text-[16px] group text-white font-medium font-sans transition duration-300 ease-in-out hover:shadow-md"
                    >
                      Bussiness Listing
                      <FaCaretDown
                        className="group-hover:rotate-[360deg] transition-transform duration-300 "
                        size={15}
                      />
                    </button>
                  </ul>
                  <ul className="space-x-8 whitespace-nowrap">
                    <button
                      type="button"
                      onClick={() => {
                        // navigate("/Movie");
                        alert("Coming soon");
                      }}
                      className="flex gap-1 items-center py-1 group rounded-md text-[16px] text-white font-medium font-sans transition duration-300 ease-in-out hover:shadow-md"
                    >
                      Movies & Entertainment
                      <FaCaretDown
                        className="group-hover:rotate-[360deg] transition-transform duration-300"
                        size={15}
                      />
                    </button>
                  </ul>
                </div>
              )}
            </div>
            <div className="flex gap-2 overflow-auto mx-1 items-center">
              <ul className="ml-1 space-x-8">
                <button
                  type="button"
                  onClick={() => {
                    navigate("/");
                  }}
                  className="flex gap-1 items-center py-1 text-white text-[16px] font-sans transition duration-300 ease-in-out hover:shadow-md"
                >
                  <RxHamburgerMenu /> Home
                </button>
              </ul>
              <ul className="ml-2 space-x-8 ">
                <button
                  type="button"
                  onClick={() => {
                    navigate("/rooms");
                  }}
                  className="flex gap-1 items-center py-1 group text-[16px] text-white font-medium font-sans transition duration-300 ease-in-out hover:shadow-md"
                >
                  Rooms
                  <FaCaretDown
                    className="group-hover:rotate-[360deg] transition-transform duration-300 "
                    size={15}
                  />
                </button>
              </ul>
              <ul className="ml-2 space-x-8 ">
                <button
                  type="button"
                  onClick={() => {
                    // navigate("/Events");
                    alert("Coming soon");
                  }}
                  className="flex gap-1 items-center py-1 text-[16px] group text-white font-medium font-sans transition duration-300 ease-in-out  hover:shadow-md"
                >
                  Events
                  <FaCaretDown
                    className="group-hover:rotate-[360deg] transition-transform duration-300 "
                    size={15}
                  />
                </button>
              </ul>
              <ul className="ml-2 space-x-8 ">
                <button
                  type="button"
                  onClick={() => {
                    navigate();
                  }}
                  className="flex gap-1 items-center py-1 text-[16px] group text-white font-medium font-sans transition duration-300 ease-in-out hover:shadow-md"
                >
                  Jobs
                  <FaCaretDown
                    className="group-hover:rotate-[360deg] transition-transform duration-300 "
                    size={15}
                  />
                </button>
              </ul>
              <ul className="ml-2 space-x-8 ">
                <button
                  type="button"
                  onClick={() => {
                    // navigate("/bussiness");
                    alert("Coming soon");
                  }}
                  className="flex gap-1 items-center py-1 text-[16px] group text-white font-medium font-sans transition duration-300 ease-in-out hover:shadow-md"
                >
                  Bussiness Listing
                  <FaCaretDown
                    className="group-hover:rotate-[360deg] transition-transform duration-300 "
                    size={15}
                  />
                </button>
              </ul>
              <ul className="ml-2 space-x-8 ">
                <button
                  type="button"
                  onClick={() => {
                    // navigate("/Movie");
                    alert("Coming soon");
                  }}
                  className="flex gap-1 items-center py-1 group rounded-md text-[16px] text-white font-medium font-sans transition duration-300 ease-in-out hover:shadow-md"
                >
                  Movies & Entertainment
                  <FaCaretDown
                    className="group-hover:rotate-[360deg] transition-transform duration-300"
                    size={15}
                  />
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
                  className="rounded-md py-1 text-[16px] text-white font-medium font-sans transition duration-300 ease-in-out hover:shadow-md"
                >
                  Sign Up
                </button>
                <button
                  type="button"
                  onClick={() => handleModal(true, false)}
                  className="rounded-md py-1 text-[16px] text-white font-medium font-sans transition duration-300 ease-in-out hover:shadow-md"
                >
                  Log in
                </button>
              </div>
            ) : (
              <div className="flex items-center">
                <div className="relative mr-4">
                  <FaHeart
                    className="text-white hover:text-red-400 cursor-pointer"
                    size={17}
                    onClick={() => {
                      navigate(`/dashboard/wishlist/${userID}`);
                    }}
                  />
                  {cartno > 0 && (
                    <div className="absolute top-[0.2rem] right-[-0.2rem] transform translate-x-1/2 -translate-y-1/2 bg-red-600 text-white w-4 h-4 flex justify-center items-center rounded-full">
                      {cartno}
                    </div>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => {
                    navigate(`/myaccount/${userID}`);
                  }}
                  className="rounded-md py-2 text-[16px] text-white font-medium font-sans transition duration-300 ease-in-out"
                >
                  My Account
                </button>
                {/* <button
                  type="button"
                  onClick={handlelogout}
                  className="rounded-md text-lg lg:text-xl px-2 py-1 text-white font-medium transition duration-300 ease-in-out hover:text-[#0b5e86] hover:bg-white hover:shadow-md"
                >
                  LOGOUT
                </button> */}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
