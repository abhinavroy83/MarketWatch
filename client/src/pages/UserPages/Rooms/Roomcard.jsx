import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import femaleLogo from "../../../assets/female5.png";
import maleLogo from "../../../assets/male5.png";
import { useSelector } from "react-redux";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GrLocation } from "react-icons/gr";
import { MdDateRange } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import stateAbbreviations from "../../../Services/StateAprevation/stateAbbreviations.json";
import { LuHeart } from "react-icons/lu";
import { FaHeart } from "react-icons/fa";

function Roomcard({ isRoomOnlyPage, ...item }) {
  const token = useSelector((state) => state.auth.token);
  const userID = useSelector((state) => state.auth.userId);
  const auth = useSelector((state) => state.auth.status);
  const [wishliststatys, setWishlistStatus] = useState(false);

  const notify = () => toast("Added to Wishlist.");
  const unnotify = () => toast("Remove from Wishlist.");
  const unauthnotify = () => toast("Please Login");

  const makewishlist = async (_id) => {
    if (auth) {
      try {
        const dat = { roomId: _id, status: true };
        const res = await axios.post(
          `https://api.verydesi.com/api/addtowish`,
          dat,
          {
            headers: {
              jwttoken: `${token}`,
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );

        if (
          res.data.msg === "Successfully added to wishlist" ||
          res.data.msg === "Successfully updated"
        ) {
          setWishlistStatus(true);
          notify();
        }
      } catch (error) {
        console.error("Error adding to wishlist:", error);
      }
    } else {
      unauthnotify();
    }
  };

  const unwish = async (_id) => {
    try {
      const dat = { roomId: _id, status: false };
      const res = await axios.post(
        `https://api.verydesi.com/api/addtowish`,
        dat,
        {
          headers: {
            jwttoken: `${token}`,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (
        res.data.msg === "Successfully removed" ||
        res.data.msg === "Wishlist cleared"
      ) {
        setWishlistStatus(false);
        unnotify();
      }
    } catch (error) {
      console.error("Error removing from wishlist:", error);
    }
  };

  useEffect(() => {
    const fetchWishStatus = async () => {
      try {
        const res = await axios.get(
          `https://api.verydesi.com/api/getlistbyroom/${item._id}`,
          {
            headers: {
              jwttoken: `${token}`,
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );

        if (res.data.status === "not found") {
          setWishlistStatus(false);
        } else {
          setWishlistStatus(res.data.status);
        }
      } catch (error) {
        console.error("Error during fetching wishlist status:", error);
      }
    };

    fetchWishStatus();
  }, [item._id, token]);
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
      className={`flex relative max-w-4xl flex-col font-['udemy-regular'] rounded-xl md:flex-row border shadow-md hover:shadow-lg h-[450px] lg:h-[165px] ${
        isRoomOnlyPage ? "items-start" : ""
      }`}
    >
      <div className="relative w-full lg:w-72 lg:h-[100%] max-w-4xl overflow-hidden lg:rounded-tl-md lg:rounded-bl-md lg:rounded-none rounded-tl-md rounded-tr-md">
        <img
          src={
            item.Imgurl[0] ||
            "https://res.cloudinary.com/druohnmyv/image/upload/v1723819322/assests/tss6j8gnbbccyxwgxzzx.png"
          }
          alt=""
          className="hover:scale-110 object-cover transition-transform duration-500 ease-in duration-70 w-full lg:h-full "
        />
      </div>

      <p className="absolute font-bold bg-white/80 top-0 left-0 p-1 px-3 rounded-br-lg text-center">
        <p className="left-5 top-2 text-[22px] text-green-700 text-right">
          ${item.Expected_Rooms}
        </p>
      </p>

      <div
        className={`px-4 py-1 flex flex-col ${isRoomOnlyPage ? "" : ""} w-full`}
      >
        <h1 className="flex flex-col text-[21px] capitalize mt-3 lg:mt-1">
          {item.Title && truncateCharacters(item.Title, 42)}
        </h1>
        <p className=" flex gap-1 text-[19px] text-gray-600 mt-1 font-['udemy-regular'] items-center">
          <GrLocation size={20} />
          <span>{item.city},</span>
          <span className=" px-1">
            {item?.state?.length > 2
              ? stateAbbreviations[item.State]
              : item.state}
          </span>
        </p>
        <p className="text-blue-800 capitalize text-[19px] mt-1 flex gap-1 items-center font-['udemy-regular']">
          <CgProfile />
          By: {item.user_name}
        </p>
        <p className="text-blue-800 text-[19px] flex gap-1 mt-1 items-center font-['udemy-regular']">
          <MdDateRange />
          {calculateTimeDifference(item.postedon)}
        </p>
        {!auth && (
          <div className="absolute bottom-4 right-9">
            <div
              className="cursor-pointer p-2"
              onClick={(e) => {
                e.preventDefault();
                toast.warn("please login");
              }}
            >
              <LuHeart className="" color="red" size={22} />
            </div>
          </div>
        )}
        {auth && (
          <div className="absolute bottom-4 right-4">
            {!wishliststatys ? (
              <div
                className="cursor-pointer p-2 hover:text-white"
                onClick={(e) => {
                  e.preventDefault();
                  makewishlist(item._id);
                }}
              >
                <LuHeart
                  className="text-black hover:bg-red-600 hover:text-white rounded-full hover:p-[0.1rem]"
                  size={22}
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
                <LuHeart className="" color="red" size={22} />
              </div>
            )}
          </div>
        )}
        <img
          className={`flex absolute bottom-[1.4rem]  items-center ${
            auth ? "right-[3.2rem]" : "right-[1rem]"
          }`}
          height={
            item.Preferred_gender === "Female only"
              ? 22
              : item.Preferred_gender === "Male only"
              ? 30
              : item.Preferred_gender === "Any"
              ? 22
              : 22
          }
          width={
            item.Preferred_gender === "Female only"
              ? 25
              : item.Preferred_gender === "Male only"
              ? 28
              : item.Preferred_gender === "Any"
              ? 28
              : 22
          }
          src={
            item.Preferred_gender === "Female only"
              ? femaleLogo
              : item.Preferred_gender === "Male only"
              ? maleLogo
              : item.Preferred_gender === "Any"
              ? "https://res.cloudinary.com/druohnmyv/image/upload/v1723819314/assests/jum9urk9pw7dsladdtuq.png"
              : femaleLogo
          }
          alt="na"
        />
      </div>
    </Link>
  );
}

export default Roomcard;
