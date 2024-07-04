import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import femaleLogo from "../../../assets/female3.png";
import maleLogo from "../../../assets/maleicon.png";
import { IoHeartCircle } from "react-icons/io5";
import { useSelector } from "react-redux";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaHeart } from "react-icons/fa";
import { GrLocation } from "react-icons/gr";
import { MdDateRange } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import stateAbbreviations from "../../../Services/StateAprevation/stateAbbreviations.json";

function Roomcard({ isRoomOnlyPage, ...item }) {
  const token = useSelector((state) => state.auth.token);
  const userID = useSelector((state) => state.auth.userId);
  const [wishliststatys, setWishliststatys] = useState(false);

  const notify = () => toast("Added to Wishlist.");
  const unnotify = () => toast("Remove from Wishlist.");

  const makewishlist = async (_id) => {
    try {
      const dat = {
        roomId: _id,
        status: true,
      };
      // console.log(dat);
      const res = await axios.post(
        ` https://api.verydesi.com/api/addtowish`,
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

  const unwish = async (_id) => {
    try {
      const res = await axios.delete(
        ` https://api.verydesi.com/api/deletelist/${_id}`
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
          ` https://api.verydesi.com/api/getlistbyroom/${item._id}`
        );
        // console.log(res.data.list.status);
        if (res.data.status == "not") {
          setWishliststatys(false);
        } else if (res.data.list[0].status == true) {
          setWishliststatys(true);
        } else {
          setWishliststatys(false);
        }
      } catch (error) {
        console.log("error during fetcignlist", error);
      }
    };
    fetchwishstatus();
  }, [item._id]);
  function truncateCharacters(str, numCharacters) {
    if (str.length > numCharacters) {
      return str.slice(0, numCharacters) + "...";
    }
    return str;
  }

  const calculateTimeDifference = (dateStr) => {
    const date = new Date(dateStr);
    const currentDate = new Date();
    const diffInMs = currentDate - date;
    const diffInSeconds = Math.floor(diffInMs / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);
    const diffInMonths = Math.floor(diffInDays / 30);

    if (diffInSeconds < 60) {
      return "Just now";
    } else if (diffInMinutes < 60) {
      return `${diffInMinutes} minute${diffInMinutes > 1 ? "s" : ""} ago`;
    } else if (diffInHours < 24) {
      return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`;
    } else if (diffInDays < 30) {
      return `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`;
    } else {
      return `${diffInMonths} month${diffInMonths > 1 ? "s" : ""} ago`;
    }
  };

  const dateStr = item.postedon;
  const date = new Date(dateStr);

  const options = { day: "2-digit", month: "short" };

  return (
    <Link
      to={`/rooms/${item._id}`}
      key={item._id}
      className={`flex relative max-w-4xl flex-col rounded-xl md:flex-row border shadow-md hover:shadow-lg h-[450px] lg:h-[165px] ${
        isRoomOnlyPage ? "items-start" : ""
      }`}
    >
      <img
        src={
          item.Imgurl[0] ||
          "https://www.freeiconspng.com/uploads/no-image-icon-11.PNG"
        }
        alt=""
        // width={220}
        className="w-full lg:w-52 rounded-tl-md rounded-tr-md lg:rounded-none lg:rounded-tl-md lg:rounded-bl-md lg:h-[100%] max-w-4xl transition duration-300 ease-in-out hover:opacity-80"
      />

      <p className="absolute font-roboto bg-white/80 top-0 left-0 p-1 px-3 rounded-br-lg text-center">
        <p className="left-5 top-2 text-[25px] text-green-700 font-['udemy-bold'] text-right">
          ${item.Expected_Rooms}
        </p>
      </p>

      <div
        className={`px-4 py-1 flex flex-col ${isRoomOnlyPage ? "" : ""} w-full`}
      >
        <h1 className="flex flex-col text-[23px] font-['udemy-regular'] capitalize mt-3 lg:mt-0">
          {item.Title && truncateCharacters(item.Title, 42)}
        </h1>
        <p className=" flex gap-1 text-[20px] text-gray-600 mt-1 font-['udemy-regular'] items-center">
          <GrLocation size={20} /> {item.city},{stateAbbreviations[item.State]}
        </p>
        <p className="text-blue-800 capitalize text-[20px] mt-1 flex gap-1 items-center font-['udemy-regular']">
          <CgProfile />
          By: {item.user_name}
        </p>
        <p className="text-blue-800 text-[20px] flex gap-1 mt-1 items-center font-['udemy-regular']">
          {" "}
          <MdDateRange />
          {calculateTimeDifference(item.postedon)}
        </p>
        <div className="absolute bottom-3 right-4">
          {!wishliststatys ? (
            <div
              className="cursor-pointer p-2 hover:text-white"
              onClick={(e) => {
                e.preventDefault();
                makewishlist(item._id);
              }}
            >
              <FaHeart
                className="text-gray-500 hover:text-gray-700 "
                size={25}
              />
            </div>
          ) : (
            <div
              className="cursor-pointer p-2"
              onClick={(e) => {
                e.preventDefault();
                unwish(item._id);
              }}
            >
              <FaHeart color="red" size={25} />
            </div>
          )}
        </div>
        <img
          className="flex absolute bottom-5 right-14 "
          height={15}
          width={27}
          src={
            item.Preferred_gender === "Female only"
              ? femaleLogo
              : item.Preferred_gender === "Male only"
              ? maleLogo
              : femaleLogo
          }
          alt=""
        />
      </div>
    </Link>
  );
}

export default Roomcard;
