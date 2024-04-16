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


function Roomcard({ isRoomOnlyPage, ...item }) {
  const token = useSelector((state) => state.auth.token);
  const userID = useSelector((state) => state.auth.userId);
  const [wishliststatys, setWishliststatys] = useState(false);

  const notify = () => toast("Added to Wishlist.");
  const unnotify = () => toast("Remove from Wishlist.");

  const makewishlist = async (_id) => {
    console.log(_id);
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
  const unwish = async () => {
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
      className={`flex relative max-w-4xl flex-col rounded-xl md:flex-row border shadow-md hover:shadow-lg items-start ${
        isRoomOnlyPage ? "items-start" : "items-center"
      }`}
    >
      <img
        src={item.PrdImage}
        alt=""
        width={250}
        className="rounded-tl-md rounded-bl-md h-[100%]"
      />
      <p className="absolute font-roboto bg-white/65 top-0 left-0 p-1 px-3 rounded-br-lg text-center">
        <span className="block text-[27px]">
          {new Intl.DateTimeFormat("en-US", { day: "2-digit" }).format(date)}
        </span>
        <span className="block text-gray-700">
          {new Intl.DateTimeFormat("en-US", { month: "short" }).format(date)}
        </span>
      </p>
      {/* <img
        className="flex absolute top-0 right-0"
        height={50}
        width={50}
        src={femaleLogo}
        alt=""
      /> */}
      <p className="absolute  p-2  right-5 text-[23px] text-green-600 font-roboto font-bold text-right">
        {item.rent}
      </p>
      <div
        className={`px-4 py-2 flex flex-col ${
          isRoomOnlyPage ? "mt-4" : ""
        } w-full`}
      >
        {/* <p>{item.postedon}</p> */}
        <h1 className="inline-flex items-center text-[23px] mt-4 font-roboto">
          {item.Adname && truncateCharacters(item.Adname, 32)}
        </h1>
        {/* <p className="text-[18px] text-gray-500 font-roboto">{item.area}</p> */}
        <p className="text-[23px] text-gray-700 mt-2 font-roboto">
          {item.city}, {item.State}
        </p>
        <p className="text-blue-800 text-xl mt-2">By : {item.postedby}</p>
        <p className="text-blue-800 text-base mt-1">
          {" "}
          {calculateTimeDifference(item.postedon)}
        </p>
        <div className="flex gap-2 text-blue-800 text-[23px] mt-1"></div>
        {/* <div className="block">
          {!wishliststatys ? (
            <IoHeartCircle
              size={40}
              onClick={(e) => {
                e.preventDefault();
                makewishlist(item._id);
              }}
              className="text-red-500 flex absolute bottom-3 right-3 hover:text-black"
            />
          ) : null} */}
          <div className="absolute bottom-3 right-6">
              {!wishliststatys ? (
                <div
                  className="cursor-pointer p-2 bg-red-600 rounded-full"
                  onClick={(e) => {
                    e.preventDefault();
                    makewishlist(item._id);
                  }}
                >
                  <FaHeart color="#fff" size={25} />
                </div>
              ) : (
                <div
                  className="cursor-pointer p-2 border border-gray-300 rounded-full"
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
          />
        </div>
    </Link>
  );
}

export default Roomcard;
