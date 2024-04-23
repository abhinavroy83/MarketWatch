import React from "react";
import femaleLogo from "../../../assets/female.png";
import { Link } from "react-router-dom";
import { GrLocation } from "react-icons/gr";
import { MdDateRange } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import stateAbbreviations from "../../../Services/StateAprevation/stateAbbreviations.json";


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
      className={`flex gap-4 items-center mt-2  ${
        isSingleRow
          ? "justify-between"
          : "justify-start border shadow-md p-3 rounded-xl hover:shadow-lg"
      }`}
    >
      <div className="flex">
        <img className="flex" height={50} width={50} src={femaleLogo} alt="" />
      </div>
      <div className="block grow">
        <h1 className="text-[23px] font-['udemy-bold'] text-black">
          {" "}
          {truncateCharacters(item.Adname, 32)}
        </h1>
        <div className="">
        <h1 className="flex text-[20px] font-['udemy-regular'] text-gray-600 mt-1 items-center">
        <GrLocation size={20} className="mr-1"/> {item.city}, {stateAbbreviations[item.State]}
        <CgProfile className="mr-1 ml-3"/>By: {item.postedby}
         <p className="ml-3 flex gap-1 items-center">  <MdDateRange />{calculateTimeDifference(item.postedon)}</p>
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
      <div className="flex gap-4 justify-center items-center mr-3">
        <p className="text-[23px] text-green-700 font-['udemy-regular'] font-bold">
          {item.rent}
        </p>
      </div>
    </Link>
  );
}

export default Roomcard2nd;
