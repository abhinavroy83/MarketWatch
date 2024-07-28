import React from "react";
import femaleLogo from "../../../assets/female5.png";
import maleLogo from "../../../assets/male5.png";
import { Link } from "react-router-dom";
import { GrLocation } from "react-icons/gr";
import { MdDateRange } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import stateAbbreviations from "../../../Services/StateAprevation/stateAbbreviations.json";
import { LuHeart } from "react-icons/lu";

function Roomcard2nd({ isSingleRow, ...item }) {
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

  return (
    <Link
      to={`/rooms/${item._id}`}
      className={`gap-4 items-center mt-2 inline-flex lg:flex w-full ${
        isSingleRow
          ? "justify-between"
          : "justify-start border shadow-md p-2 rounded-xl hover:shadow-lg"
      }`}
    >
      <img
        className="flex"
        height={37}
        width={37}
        src={
          item.Preferred_gender === "Female only"
            ? femaleLogo
            : item.Preferred_gender === "Male only"
            ? maleLogo
            : femaleLogo
        }
        alt=""
      />{" "}
      <div className="block grow">
        <h1 className="text-[21px] lg:text-[21px] font-['udemy-regular'] text-[#000]">
          {item.Title?.length > 0 ? truncateCharacters(item.Title, 80) : ""}
        </h1>

        <div className="">
          <h1 className="lg:flex block text-[18px] font-['udemy-regular'] text-[#585163] mt-1 items-center">
            {/* <GrLocation size={20} className="mr-1 items-center flex"/> {item.city},{stateAbbreviations[item.State]} */}
            <p className="flex gap-1 items-center">
              {" "}
              <GrLocation size={20} />
              {item.city},{" "}
              {item?.state?.length > 2
                ? stateAbbreviations[item.state]
                : item.state}
            </p>

            <p className="lg:ml-3 ml-0 flex gap-1 items-center">
              {" "}
              <CgProfile />
              By: {item.user_name}
            </p>
            <p className="lg:ml-3 ml-0 flex gap-1 items-center">
              {" "}
              <MdDateRange />
              {calculateTimeDifference(item.postedon)}
            </p>
          </h1>
        </div>
        <div className="flex gap-2 text-blue-800 text-2xl items-center">
          <p className="text-blue-800 text-2xl items-center">
            {/* By : {item.postedby} */}
          </p>
          {/* <p className="text-blue-800 text-base items-center"> {calculateTimeDifference(item.postedon)}</p> */}
        </div>
        {/* <p className="text-blue-800 text-2xl items-center mt-1"> {calculateTimeDifference(item.postedon)}</p> */}
      </div>
      <div className="flex lg:gap-3 gap-2 justify-center items-center">
        <LuHeart className="text-black hover:text-gray-600" size={22} />
        <p className="text-[22px] text-green-700 font-['udemy-regular'] font-bold w-[80px]">
          ${item.Expected_Rooms}
        </p>
      </div>
    </Link>
  );
}

export default Roomcard2nd;
