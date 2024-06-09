import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/authslice";
import { Link, useNavigate } from "react-router-dom";
import Signup from "./Signup";
import Login from "./Login";
import Ads from "../../pages/UserPages/Ads/Ads";
import { FaHeart } from "react-icons/fa";
import { PiHandHeartFill } from "react-icons/pi";
import { modalopen } from "../../store/modalslice";
import axios from "axios";
import { GiHamburgerMenu } from "react-icons/gi";


export default function Header() {
  const authstatus = useSelector((state) => state.auth.status);
  const userID = useSelector((state) => state.auth.userID);
  const [issignupmodel, setissignupmodalopen] = useState(false);
  const [isloginmodalopen, setloginmodeopen] = useState(false);
  const[openhamburger, setopenhamburger] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [cartno, setCartno] = useState("");

  const fetchcount = async () => {
    if (userID) {
      try {
        const res = await axios.get(
          ` https://marketwatch-e3hc.onrender.com/api/getlist/${userID}`
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

  // console.log(cartno);

  const handlelogout = () => {
    dispatch(logout());
    localStorage.removeItem("userdetails");
    // navigate("/login");
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
  }

  return (
    <div className="relative">
      <div className="w-full fixed z-50 flex bg-white flex-col">
        <Ads />
        <div className="w-full bg-[#0b5e86] shadow-2xl h-[50px] font-['udemy-regular'] items-center mb-0">

          <div className="flex justify-between items-center mt-[7px] max-w-[1600px] w-full m-auto">
            <div className="relative">
              <button className="items-center mt-1 ml-2" onClick={handlehamburger}> <GiHamburgerMenu className="cursor-pointer text-white" size={27}/> </button>
              {openhamburger && 
                <div className="inline-flex flex-col bg-[#0b5e86] max-w-[200px] p-2 overflow-auto border-2 border-black absolute top-[115%] fit-content w-[200px] left-0">
                <ul className="ml-3 space-x-8">
                  <button
                    type="button"
                    onClick={() => {
                      navigate("/");
                      {handlehamburger}
                    }}
                    className="rounded-md text-xl p-2 text-white font-medium font-['udemy-regular'] transition duration-300 ease-in-out hover:text-[#0b5e86] hover:bg-white hover:shadow-md"
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
                    className="rounded-md text-xl p-2 text-white font-medium  transition duration-300 ease-in-out hover:text-[#0b5e86] hover:bg-white hover:shadow-md"
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
                    className="rounded-md text-xl p-2 text-white font-medium transition duration-300 ease-in-out hover:text-[#0b5e86] hover:bg-white hover:shadow-md"
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
                    className="rounded-md text-xl p-2 text-white font-medium transition duration-300 ease-in-out hover:text-[#0b5e86] hover:bg-white hover:shadow-md"
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
                    className="rounded-md text-xl p-2 text-white font-medium transition duration-300 ease-in-out hover:text-[#0b5e86] hover:bg-white hover:shadow-md"
                  >
                    MOVIES
                  </button>
                </ul>
              </div>
              }
            </div>
            <div className="flex overflow-auto mx-1 hidden">
              <ul className="ml-3 space-x-8">
                <button
                  type="button"
                  onClick={() => {
                    navigate("/");
                  }}
                  className="rounded-md text-xl px-2 py-1 text-white font-medium font-sans transition duration-300 ease-in-out hover:text-[#0b5e86] hover:bg-white hover:shadow-md"
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
                  className="rounded-md text-xl px-2 py-1 text-white font-medium font-sans transition duration-300 ease-in-out hover:text-[#0b5e86] hover:bg-white hover:shadow-md"
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
                  className="rounded-md text-xl  px-2 py-1 text-white font-medium font-sans transition duration-300 ease-in-out hover:text-[#0b5e86] hover:bg-white hover:shadow-md"
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
                  className="rounded-md text-xl  px-2 py-1 text-white font-medium font-sans transition duration-300 ease-in-out hover:text-[#0b5e86] hover:bg-white hover:shadow-md"
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
                  className="rounded-md text-xl  px-2 py-1 text-white font-medium font-sans transition duration-300 ease-in-out hover:text-[#0b5e86] hover:bg-white hover:shadow-md"
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
                  className="rounded-md text-xl  px-2 py-1 text-white font-medium transition duration-300 ease-in-out hover:text-[#0b5e86] hover:bg-white hover:shadow-md"
                >
                  SIGN UP
                </button>
                <button
                  type="button"
                  onClick={() => handleModal(true, false)}
                  className="rounded-md text-xl  px-2 py-1 text-white font-medium transition duration-300 ease-in-out hover:text-[#0b5e86] hover:bg-white hover:shadow-md"
                >
                  LOG IN
                </button>
              </div>
            ) : (
              <div className="flex items-center">
                <div className="relative mr-3">
                  <FaHeart
                    className="text-white hover:text-red-400 cursor-pointer mt-2"
                    size={25}
                    onClick={() => {
                      navigate(`/dashboard/wishlist/${userID}`);
                    }}
                  />
                  {cartno > 0 && (
                    <div className="absolute top-1 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-600 text-white w-6 h-6 flex justify-center items-center rounded-full">
                      {cartno}
                    </div>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => {
                    navigate(`/myaccount/${userID}`);
                  }}
                  className="rounded-md text-xl  px-2 py-1 text-white font-medium transition duration-300 ease-in-out hover:text-[#0b5e86] hover:bg-white hover:shadow-md"
                >
                  MY ACCOUNT
                </button>
                <button
                  type="button"
                  onClick={handlelogout}
                  className="rounded-md text-xl px-2 py-1 text-white font-medium transition duration-300 ease-in-out hover:text-[#0b5e86] hover:bg-white hover:shadow-md"
                >
                  LOGOUT
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
