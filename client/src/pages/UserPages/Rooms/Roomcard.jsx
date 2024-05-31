import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import femaleLogo from "../../../assets/female.png";
import maleLogo from "../../../assets/male.jpeg";
import { IoHeartCircle } from "react-icons/io5";
import { useSelector } from "react-redux";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaHeart } from "react-icons/fa";
import { IoHeartCircleOutline } from "react-icons/io5";
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
    // console.log(_id);
    try {
      const dat = {
        roomId: _id,
        status: true,
      };
      // console.log(dat);
      const res = await axios.post(`http://localhost:8000/api/addtowish`, dat, {
        headers: {
          jwttoken: `${token}`,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
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
        `http://localhost:8000/api/deletelist/${_id}`
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
          `http://localhost:8000/api/getlistbyroom/${item._id}`
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
    // const intervalId = setInterval(fetchwishstatus, 2000);

    // return () => clearInterval(intervalId);
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
      className={`flex relative max-w-4xl flex-col rounded-xl md:flex-row border shadow-md hover:shadow-lg h-[165px] ${
        isRoomOnlyPage ? "items-start" : ""
      }`}
    >
      <img
        src={item.PrdImage}
        alt=""
        width={220}
        className="rounded-tl-md rounded-bl-md h-[100%] max-w-xs transition duration-300 ease-in-out hover:opacity-80"
      />
      {/* <p className="absolute font-roboto bg-white/65 top-0 left-0 p-1 px-3 rounded-br-lg text-center"> */}
      {/* <span className="block text-[29px]">
          {new Intl.DateTimeFormat("en-US", { day: "2-digit" }).format(date)}
        </span>
        <span className="block text-gray-700 text-[24px]">
          {new Intl.DateTimeFormat("en-US", { month: "short" }).format(date)}
        </span> */}
      {/* </p> */}

      {/* <p className="absolute p-2  right-5 text-[23px] text-green-600 font-roboto font-bold text-right">
        {item.rent}
      </p> */}
      {/* <p className="absolute right-5 top-2 text-[23px] text-green-600 font-roboto font-bold text-right">
        {item.rent}
      </p> */}
      <p className="absolute font-roboto bg-white/80 top-0 left-0 p-1 px-3 rounded-br-lg text-center">
       <p className=" left-5 top-2 text-[25px] text-green-700 font-['udemy-bold'] text-right">
        {item.rent}
      
      </p>
      </p>

      <div
        className={`px-4 py-1 flex flex-col ${
          isRoomOnlyPage ? "" : ""
        } w-full`}
      >
        {/* <p>{item.postedon}</p> */}
        <h1 className="inline-flex items-center text-[23px] font-['udemy-bold']">
          {item.Adname && truncateCharacters(item.Adname, 42)}
        </h1>
        {/* <p className="text-[18px] text-gray-500 font-roboto">{item.area}</p> */}
        <p className=" flex gap-1 text-[20px] text-gray-600 mt-1 font-['udemy-regular'] items-center">
          <GrLocation size={20} /> {item.city},{stateAbbreviations[item.State]}
        </p>
        <p className="text-blue-800 text-[20px] mt-1 flex gap-1 items-center font-['udemy-regular']"><CgProfile />By: {item.postedby}</p>
        <p className="text-blue-800 text-[20px] flex gap-1 mt-1 items-center font-['udemy-regular']">
          {" "}
          <MdDateRange />{calculateTimeDifference(item.postedon)}
        </p>
        {/* <div className="flex gap-2 text-blue-800 text-[23px] mt-2"></div> */}
        
        {/* <div className="absolute bottom-3 right-6">
          {!wishliststatys ? (
            <div
              className="cursor-pointer p-2 bg-gray-500 rounded-full hover:bg-red-600"
              onClick={(e) => {
                e.preventDefault();
                makewishlist(item._id);
              }}
            >
              <FaHeart color="#fff" size={20} />
            </div>
          ) : (
            <div
              className="cursor-pointer p-2 border border-gray-300 rounded-full"
              onClick={(e) => {
                e.preventDefault();
                unwish(item._id);
              }}
            >
              <FaHeart color="red" size={20} />
            </div>
          )}
        </div> */}
        <div className="absolute bottom-3 right-4">
          {!wishliststatys ? (
            <div
              className="cursor-pointer p-2 rounded-full hover:bg-red-600 border border-gray-300 hover:text-white"
              onClick={(e) => {
                e.preventDefault();
                makewishlist(item._id);
              }}
            >
              <FaHeart className="text-gray-500 hover:text-white" size={20} />
            </div>
          ) : (
            <div
              className="cursor-pointer p-2 border border-gray-300 rounded-full"
              onClick={(e) => {
                e.preventDefault();
                unwish(item._id);
              }}
            >
              <FaHeart color="red" size={20} />
            </div>
          )}
        </div>
        <img
          className="flex absolute bottom-3 right-14"
          height={40}
          width={45}
          src={
            item.gender === "female"
              ? femaleLogo
              : item.gender === "male"
              ? maleLogo
              : femaleLogo
          }
          alt=""
        />
        {/* <img
          className="flex absolute bottom-14 right-6"
          height={45}
          width={45}
          src={
            item.gender === "female"
              ? femaleLogo
              : item.gender === "male"
                ? maleLogo
                : femaleLogo
          }
          alt=""
        /> */}
      </div>
    </Link>
  );
}

export default Roomcard;
