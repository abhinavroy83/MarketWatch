import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import femaleLogo from "../../../assets/female.png";
import { MdDateRange } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { GrLocation } from "react-icons/gr";
import femaleLogo from "../../../assets/female5.png";
import maleLogo from "../../../assets/male5.png";
import { LuHeart } from "react-icons/lu";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { minuscart, pluscart } from "../../../store/cartslice";
import Alert from "../../../components/UserCompontents/Alert/Alert";

function Roomcardforsimilar({ isRoomOnlyPage, ...item }) {
  const token = useSelector((state) => state.auth.token);
  const userID = useSelector((state) => state.auth.userId);
  const auth = useSelector((state) => state.auth.status);
  const [wishliststatys, setWishlistStatus] = useState(false);

  const dispatch = useDispatch();
  const [toast, setToast] = useState({ isOpen: false, type: "", text: "" });

  const showToast = (type, text) => {
    setToast({ isOpen: false });
    setTimeout(() => {
      setToast({ isOpen: true, type, text });
    }, 100);
  };

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
          dispatch(pluscart());
          setWishlistStatus(true);
          showToast("success", "Added to Favorites.");
        }
      } catch (error) {
        console.error("Error adding to wishlist:", error);
      }
    } else {
      showToast("unsuccess", "Removed from Favorites.");
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
        dispatch(minuscart());
        setWishlistStatus(false);
        showToast("unsuccess", "Removed from Favorites.");
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
  function truncateWords(str, numWords) {
    const words = str.split(" ");

    const truncated = words.slice(0, numWords).join(" ");

    if (words.length > numWords) {
      return truncated + "...";
    }

    return truncated;
  }
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
      {toast.isOpen && (
        <Alert
          type={toast.type}
          text={toast.text}
          close={() => setToast({ isOpen: false, type: "", text: "" })}
        />
      )}
      <div className="relative w-full lg:w-72 lg:h-[100%] max-w-4xl overflow-hidden lg:rounded-tl-md lg:rounded-bl-md lg:rounded-none rounded-tl-md rounded-tr-md">
        <img
          src={item.Imgurl[0]}
          alt=""
          // width={200}
          className="hover:scale-110 object-cover transition-transform duration-500 ease-in duration-70 w-full h-full"
        />
      </div>
      {/* <p className="absolute font-roboto bg-white top-0 left-0 px-2 rounded-br-lg text-center">
        <span className="block text-[27px]">
          {new Intl.DateTimeFormat("en-US", { day: "2-digit" }).format(date)}
        </span>
        <span className="block text-gray-500">
          {new Intl.DateTimeFormat("en-US", { month: "short" }).format(date)}
        </span>
      </p> */}

      <img
        className={"absolute bottom-[1.4rem] right-[3.2rem]"}
        height={22}
        width={25}
        src={
          item.Preferred_gender === "Female only"
            ? femaleLogo
            : item.Preferred_gender === "Male only"
            ? maleLogo
            : femaleLogo
        }
      />

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

      <div
        className={`px-4 py-1 flex flex-col ${
          isRoomOnlyPage ? "mt-4" : ""
        } w-full`}
      >
        {/* <p>{item.postedon}</p> */}
        <p className="flex flex-col text-[21px] capitalize mt-3 lg:mt-1">
          {item.Title && truncateWords(item.Title, 3)}
        </p>
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
          {item.user_name}
        </p>
        <p className="text-blue-800 text-[19px] flex gap-1 mt-1 items-center font-['udemy-regular']">
          <MdDateRange />
          {calculateTimeDifference(item.postedon)}
        </p>
        {/* <p className="text-[18px] text-gray-500 font-roboto">{item.area}</p> */}
        {/* <p className="text-[18px] text-gray-500  font-roboto">{item.address}</p> */}
        {/* <article className="flex gap-2 mt-1">
          <h1 className="text-[18px] text-gray-500 font-roboto flex items-center">
            Nonstop . 3 hr 24 min{" "}
          </h1>
        </article> */}
        <p className="absolute font-['udemy-bold'] bg-white/80 top-0 left-0 p-1 px-3 rounded-br-lg text-center">
          <p className="left-5 top-2 text-[22px] text-green-700 text-right">
            ${item.Expected_Rooms}
          </p>
        </p>
      </div>
    </Link>
  );
}

export default Roomcardforsimilar;
