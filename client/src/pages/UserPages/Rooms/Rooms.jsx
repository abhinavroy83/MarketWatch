import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ChildContainer,
  LeafletMap,
  LeafletMap2,
  ShareComponent,
} from "../../../components";
import { useSelector } from "react-redux";
import CopyToClipboard from "react-copy-to-clipboard";
import Roomcard from "./Roomcard";
import { IoIosShareAlt } from "react-icons/io";
import { FaHeart } from "react-icons/fa";
import { BiSolidMessageRounded } from "react-icons/bi";
import { GiWashingMachine } from "react-icons/gi";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { FaShare } from "react-icons/fa";
import Conractform from "../Contactform/Conractform";
import Roomcardforsimilar from "./Roomcardforsimilar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LuPhoneCall } from "react-icons/lu";
import femaleLogo from "../../../assets/female.png";
import maleLogo from "../../../assets/male.jpeg";
import { CgSmartHomeWashMachine } from "react-icons/cg";
import { FaShareAlt } from "react-icons/fa";

function Rooms() {
  const { _id } = useParams();
  const [rooms, setrooms] = useState([]);
  const [similarrooms, setsimilarrooms] = useState([]);
  const [locationsndString, setLocationsndString] = useState("");
  const [contactdet, setcontachdet] = useState(false);
  const [posteddate, setposteddate] = useState("");
  const authstatus = useSelector((state) => state.auth.status);
  const currentloc = useSelector((state) => state.auth.location);
  const [wishliststatys, setWishliststatys] = useState(false);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const url = ` https://marketwatch-e3hc.onrender.com/rooms/${_id}`;
  const fetchroomdetails = async () => {
    try {
      const res = await axios.get(
        ` https://marketwatch-e3hc.onrender.com/api/getspecificroom/${_id}`
      );
      setrooms(res.data.rooms);
      const loc = {
        lat: res.data.rooms.location.coordinates[1],
        lng: res.data.rooms.location.coordinates[0],
      };
      const date = res.data.rooms.postedon
        ? new Date(res.data.rooms.postedon).toISOString().split("T")[0]
        : "";
      setposteddate(date);
      // console.log("locationsnd", locationString);
      setLocationsndString(loc);
    } catch (error) {
      console.log("error during fetching api", error);
    }
  };
  useEffect(() => {
    fetchroomdetails();
  }, [_id]);
  const handlecopy = () => {
    alert("Link Copied");
  };
  const getRooms = async () => {
    try {
      const res = await axios.get(
        ` https://marketwatch-e3hc.onrender.com/api/getallrooms?lat=${currentloc.lng}&lng=${currentloc.lat}`
      );
      setsimilarrooms(res.data.Allrooms);
      // console.log(res.data.Allrooms);
    } catch (error) {
      console.log("error during fetching api", error);
    }
  };
  useEffect(() => {
    getRooms();
  }, [rooms]);

  const fetchNextRoom = async () => {
    try {
      const res = await axios.get(
        ` https://marketwatch-e3hc.onrender.com/api/rooms/${_id}/previous`
      );
      // console.log(res);
      navigate(`/rooms/${res.data.previousRoom._id}`);
    } catch (error) {
      console.error("Error fetching next room:", error);
    }
  };

  const fetchPreviousRoom = async () => {
    try {
      const res = await axios.get(
        ` https://marketwatch-e3hc.onrender.com/api/rooms/${_id}/next`
      );
      // console.log(res);
      navigate(`/rooms/${res.data.nextRoom._id}`);
    } catch (error) {
      console.error("Error fetching previous room:", error);
    }
  };

  function truncateWords(str, numWords) {
    const words = str.split(" ");

    const truncated = words.slice(0, numWords).join(" ");

    if (words.length > numWords) {
      return truncated + "...";
    }

    return truncated;
  }

  const navigate = useNavigate();

  const renderRooms = () => {
    return similarrooms
      .slice(0, 3)
      .map((item) => <Roomcardforsimilar {...item} key={item._id} />);
  };

  const [isloginmodalopen, setloginmodeopen] = useState(false);

  const handleloginmodelopen = () => {
    setloginmodeopen(true);
  };

  //close
  {
    /* <div className="flex">
              <svg
                class="h-12 w-12 ml-1 text-black-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <div className="flex pb-3">
                <div className="ml-1">
                  <GiWashingMachine size={45} />
                </div>
              </div>
            </div> */
  }
  const isloginmodelclose = () => {
    setloginmodeopen(false);
  };

  // console.log(rooms._id);
  const notify = () => toast("Added to Wishlist.");
  const unnotify = () => toast("Remove from Wishlist.");

  const makewishlist = async () => {
    try {
      const dat = {
        roomId: _id,
        status: true,
      };
      // console.log(dat);
      const res = await axios.post(
        ` https://marketwatch-e3hc.onrender.com/api/addtowish`,
        dat,
        {
          headers: {
            jwttoken: `${token}`,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (res) {
        setWishliststatys(true);
        notify();
        // alert("successfully added to wishlist");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const unwish = async () => {
    try {
      const res = await axios.delete(
        ` https://marketwatch-e3hc.onrender.com/api/deletelist/${_id}`
      );
      if (res) {
        setWishliststatys(false);
        unnotify();
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchwishstatus = async () => {
      try {
        const res = await axios.get(
          ` https://marketwatch-e3hc.onrender.com/api/getlistbyroom/${_id}`
        );
        if (res.data.status == "not") {
          setWishliststatys(false);
        } else if (res.data.list[0].status) {
          setWishliststatys(true);
        } else {
          setWishliststatys(false);
        }
      } catch (error) {
        console.log("error during fetcignlist", error);
      }
    };
    fetchwishstatus();
  }, [_id]);

  const [isSharePopupOpen, setIsSharePopupOpen] = useState(false);

  const toggleSharePopup = () => {
    setIsSharePopupOpen(!isSharePopupOpen);
  };
  // console.log(wishliststatys);

  return (
    <ChildContainer onLocationReceived={locationsndString}>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <Conractform isOpen={isloginmodalopen} onClose={isloginmodelclose} />
      <div className=" w-full max-w-7xl mx-auto px-4 py-2 mt-5 font-['udemy-regular']">
        <div className="flex justify-between py-2 items-start">
          <div>
            <button className="rounded-full flex py-2 bg-pink-800 px-2 text-[22px] items-center text-white shadow-sm shadow-[#000] mb-3 gap-2 hover:shadow-lg">
              <MdKeyboardDoubleArrowLeft
                size={30}
                className="text-pink-800 bg-white rounded-full flex shadow-sm shadow-[#000]"
              />
              <button
                onClick={fetchPreviousRoom}
                type="submit"
                className="rounded-full flex bg-white px-7 text-[22px] items-center text-pink-800 shadow-sm shadow-[#000] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              >
                Previous
              </button>
            </button>
            <p className=" text-[30px] font-bold text-black font-['udemy-regular']">
              {rooms.Adname && truncateWords(rooms.Adname, 6)}
            </p>
          </div>

          <div className="block">
            <div className="flex justify-end">
              <button className="rounded-full flex py-2 bg-blue-700 px-2 text-[22px] items-center text-white shadow-sm shadow-[#000] mb-3 gap-2 hover:shadow-lg">
                <button
                  type="submit"
                  onClick={fetchNextRoom}
                  className="rounded-full flex bg-white px-7 text-[22px] items-center text-blue-700 shadow-sm shadow-[#000] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                >
                  Next
                </button>
                <MdKeyboardDoubleArrowRight
                  size={30}
                  className="text-blue-700 bg-white rounded-full flex shadow-sm shadow-[#000]"
                />
              </button>
            </div>

            <div className="gap-2 flex">
              {!wishliststatys ? (
                <div
                  className="cursor-pointer p-2 bg-red-600 rounded-full shadow-md hover:shadow-[#000]"
                  onClick={makewishlist}
                >
                  <FaHeart color="#fff" size={30} />
                </div>
              ) : (
                <div
                  className="cursor-pointer p-2 border border-gray-300 rounded-full shadow-md hover:shadow-[#000]"
                  onClick={unwish}
                >
                  <FaHeart color="red" size={30} />
                </div>
              )}
              <div className="cursor-pointer p-2 bg-green-500 rounded-full shadow-md hover:shadow-[#000]">
                <BiSolidMessageRounded color="#fff" size={30} />
              </div>
              <div className="cursor-pointer p-2 bg-blue-600 rounded-full shadow-md hover:shadow-[#000]">
                <CopyToClipboard text={url} onCopy={handlecopy}>
                  <FaShareAlt color="#fff" size={30} />
                </CopyToClipboard>
              </div>
              <button
                type="submit"
                onClick={toggleSharePopup}
                className="rounded-md justify-between bg-gray-400 gap-2 px-5 py-2 text-[19px] flex items-center text-black shadow-sm shadow-[#ccc] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              >
                <FaShare className="text-black" /> Share Now
              </button>
              {isSharePopupOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
                  <div className="bg-white rounded-lg shadow-lg">
                    <ShareComponent
                      url={url}
                      title="Room title"
                      onClose={toggleSharePopup}
                    />
                    {/* <button
                      onClick={toggleSharePopup}
                      className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 focus:outline-none"
                    >
                      Close
                    </button> */}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex text-[25px]">
          <div>
            <img
              src={rooms.PrdImage}
              alt="roomimg"
              className="h-[500px] w-[800px] rounded-md object-cover"
            />
            <p className="flex font-['udemy-regular'] mt-4 text-[25px] text-blue-800 gap-2 font-bold">
              Posted By :{" "}
              <p className="text-gray-600 font-medium">{rooms.postedby}</p>
              || Posted On :{" "}
              <p className="text-gray-600 font-medium">{posteddate} </p>
            </p>
          </div>
          <div className="px-3 font-['udemy-regular'] ml-7 flex flex-col gap-1">
            {/* <p className=" text-[25px] font-bold text-gray-800 font-['udemy-regular']">
              {rooms.Adname && truncateWords(rooms.Adname, 6)}
            </p> */}
            <p className="text-green-700 text-[25px] font-bold flex gap-3">
              {rooms.rent} monthly{" "}
              {/* <p className="text-[25px] text-blue-800">[Extra Utilites Here]</p> */}
            </p>
            <p className="text-[25px]">{rooms.address}</p>
            <div className="flex items-center justify-between">
              <p className="text-[25px]">
                {rooms.bed} Bed / {rooms.bath} Bath
              </p>
              <div className="flex">
                <img
                  className="flex"
                  height={40}
                  width={40}
                  src={
                    rooms.gender === "female"
                      ? femaleLogo
                      : rooms.gender === "male"
                      ? maleLogo
                      : femaleLogo
                  }
                  alt=""
                />
                <div className="flex">
                  <CgSmartHomeWashMachine size={40} />
                </div>
              </div>
              {/* <img
             className="flex"
              height={50}
             width={50}
             src={femaleLogo}
             alt=""
            />
              <div className="flex">
                  <GiWashingMachine size={45} />
              </div> */}
            </div>
            <div>
              {locationsndString ? (
                <div className="mt-2">
                  <LeafletMap2
                    onLocationReceived={locationsndString}
                    style={{ height: "300px", width: "500px" }}
                  />
                </div>
              ) : (
                <div>
                  <p className="font-['udemy-regular']">Loading</p>
                </div>
              )}
            </div>
            <div
              className={`flex ${
                authstatus && "flex-row-reverse"
              } justify-between mt-4`}
            >
              <button
                type="button"
                onClick={handleloginmodelopen}
                className="flex self-center rounded-md bg-green-800 px-5 py-4 text-[22px] text-white shadow-sm hover:bg-green-900 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600"
              >
                <LuPhoneCall size={30} />
                <span class="ml-2 items-center justify-center">
                  Get In touch{" "}
                </span>
              </button>
              {authstatus && (
                <div className="">
                  {/* <p className="text-[20px] font-bold font-['udemy-regular'] text-blue-800">
                    Your Details Are -
                  </p> */}
                  <p className="text-gray-600 text-[22px]">
                    Email : {rooms.email}
                  </p>
                  <p className="text-gray-600 text-[22px]">
                    Number : {rooms.number}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="font-['udemy-regular'] py-2 mt-2 text-[25px] text-gray-600">
          <p className="text-blue-800 font-bold ">Overview : </p>
          {rooms.description}
        </div>
        <div className="mt-4 mb-2 border-t-2 border-black">
          <div className="mt-2 flex items-center ">
            <div className=" flex justify-between w-full text-[25px] font-['udemy-regular'] text-blue-800 font-bold">
              <p>Similar room In The Area</p>
              <p
                className=" cursor-pointer"
                onClick={() => {
                  navigate("/rooms");
                }}
              >
                See full list of Roommates
              </p>
            </div>
          </div>
          <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 xl:mt-5 xl:grid-cols-3 xl:gap-8">
            {renderRooms()}
          </div>
        </div>
      </div>
    </ChildContainer>
  );
}

export default Rooms;
