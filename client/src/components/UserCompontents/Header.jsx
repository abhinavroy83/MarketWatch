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
import { MdMeetingRoom } from "react-icons/md";
import { IoHome } from "react-icons/io5";
import { IoHomeSharp } from "react-icons/io5";
import { MdEventNote } from "react-icons/md";
import { MdOutlineWork } from "react-icons/md";
import { FaBusinessTime } from "react-icons/fa6";
import { BiSolidMoviePlay } from "react-icons/bi";
import { RiAccountPinBoxFill } from "react-icons/ri";
import { VscEdit } from "react-icons/vsc";

export default function Header() {
  const authstatus = useSelector((state) => state.auth.status);
  const userID = useSelector((state) => state.auth.userID);
  const [openhamburger, setopenhamburger] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [weatherData, setwhetherdata] = useState([]);
  const currentloc = useSelector((state) => state.auth.location);
  const city = useSelector((state) => state.auth.city);

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

  useEffect(() => {
    let lat, lng;
    if (currentloc) {
      lat = currentloc.lat;
      lng = currentloc.lng;
    } else {
      return;
    }
    axios
      .get(
        city
          ? `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
              city
            )}&appid=5e414d6a2d51b65b62d9b463859ae456`
          : `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=5e414d6a2d51b65b62d9b463859ae456`
      )
      .then((res) => {
        setwhetherdata(res.data);
      })
      .catch((error) => console.log("Error during fetcing whether", error));
  }, [currentloc, city]);

  const convertKelvinToCelsius = (kelvin) => {
    return kelvin - 273.15;
  };

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
        <div className="w-full bg-[#232f3e] shadow-2xl h-[45px] font-['udemy-regular'] items-center flex">
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
                <div className="inline-flex flex-col bg-[#232f3e] p-2 overflow-auto border-2 border-black absolute top-[115%] fit-content w-[230px] left-0">
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
                      <IoHome /> Home
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
                      <MdMeetingRoom
                        className="group-hover:rotate-[360deg] transition-transform duration-300 "
                        size={15}
                      />
                      Rooms
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
                      <MdEventNote
                        className="group-hover:rotate-[360deg] transition-transform duration-300 "
                        size={15}
                      />
                      Events
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
                      <MdOutlineWork
                        className="group-hover:rotate-[360deg] transition-transform duration-300 "
                        size={15}
                      />
                      Jobs
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
                      <FaBusinessTime
                        className="group-hover:rotate-[360deg] transition-transform duration-300 "
                        size={15}
                      />
                      Bussiness Listing
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
                      <BiSolidMoviePlay
                        className="group-hover:rotate-[360deg] transition-transform duration-300"
                        size={15}
                      />
                      Movies & Entertainment
                    </button>
                  </ul>
                </div>
              )}
            </div>

            <div className="flex gap-2 overflow-auto mx-1 items-center hidden lg:flex uppercase">
              <ul className="ml-1 space-x-8">
                <button
                  type="button"
                  onClick={() => {
                    navigate("/");
                  }}
                  className="uppercase flex gap-1 p-1 group text-white text-[18px] font-sans transition duration-300 ease-in-out hover:bg-white rounded-md hover:text-[#232f3e]"
                >
                  <IoHomeSharp
                    size={16}
                    className="group-hover:rotate-[360deg] transition-transform duration-300 mt-1"
                  />{" "}
                  Home
                </button>
              </ul>
              <ul className="ml-2 space-x-8 ">
                <button
                  type="button"
                  onClick={() => {
                    navigate("/rooms");
                  }}
                  className="uppercase flex gap-1 items-center p-1 group text-[18px] text-white font-medium font-sans transition duration-300 ease-in-out hover:shadow-md hover:bg-white rounded-md hover:text-[#232f3e]"
                >
                  <MdMeetingRoom
                    size={20}
                    className="group-hover:rotate-[360deg] transition-transform duration-300 "
                  />
                  Rooms
                  {/* <FaCaretDown
                    className="group-hover:rotate-[360deg] transition-transform duration-300 "
                    size={15}
                  /> */}
                </button>
              </ul>
              <ul className="ml-2 space-x-8 ">
                <button
                  type="button"
                  onClick={() => {
                    // navigate("/Events");
                    alert("Coming soon");
                  }}
                  className="uppercase flex gap-1 items-center p-1 text-[18px] group text-white font-medium font-sans transition duration-300 ease-in-out  hover:shadow-md hover:bg-white rounded-md hover:text-[#232f3e]"
                >
                  {" "}
                  <MdEventNote
                    className="group-hover:rotate-[360deg] transition-transform duration-300 "
                    size={17}
                  />
                  Events
                </button>
              </ul>
              <ul className="ml-2 space-x-8 ">
                <button
                  type="button"
                  onClick={() => {
                    navigate();
                  }}
                  className="uppercase flex gap-1 items-center p-1 text-[18px] group text-white font-medium font-sans transition duration-300 ease-in-out hover:shadow-md hover:bg-white rounded-md hover:text-[#232f3e]"
                >
                  <MdOutlineWork
                    className="group-hover:rotate-[360deg] transition-transform duration-300 "
                    size={17}
                  />
                  Jobs
                </button>
              </ul>
              <ul className="ml-2 space-x-8 ">
                <button
                  type="button"
                  onClick={() => {
                    // navigate("/bussiness");
                    alert("Coming soon");
                  }}
                  className="uppercase flex gap-1 items-center p-1 text-[18px] group text-white font-medium font-sans transition duration-300 ease-in-out hover:shadow-md hover:bg-white rounded-md hover:text-[#232f3e]"
                >
                  <FaBusinessTime
                    className="group-hover:rotate-[360deg] transition-transform duration-300 "
                    size={17}
                  />
                  Bussiness Listing
                </button>
              </ul>
              <ul className="ml-2 space-x-8 ">
                <button
                  type="button"
                  onClick={() => {
                    // navigate("/Movie");
                    alert("Coming soon");
                  }}
                  className="uppercase flex gap-1 items-center p-1 group text-[18px] text-white font-medium font-sans transition duration-300 ease-in-out hover:shadow-md hover:bg-white rounded-md hover:text-[#232f3e]"
                >
                  <BiSolidMoviePlay
                    className="group-hover:rotate-[360deg] transition-transform duration-300"
                    size={17}
                  />
                  Movies & Entertainment
                </button>
              </ul>
            </div>
            <div className=" flex justify-center items-center uppercase">
              <div>
                {weatherData.weather && weatherData.weather.length > 0 && (
                  <img
                    className="w-16 h-14 items-center justify-center border-full border-white"
                    src={`https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`}
                    alt="logo"
                  />
                )}
              </div>
              <div>
                {weatherData.main && (
                  <div className="">
                    <p className="ml-1 text-xl text-white flex gap-2 items-center">
                      {weatherData.name} /
                      {/* {convertKelvinToCelsius(weatherData.main.temp).toFixed(1)} */}
                      {weatherData.main.temp}
                      °F
                      <VscEdit size={18} className="cursor-pointer" />
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
