import React from "react";
import femaleLogo from "../../../assets/female.png";
import { Link } from "react-router-dom";

function Roomcard2nd({ isSingleRow, ...item }) {
  function truncateWords(str, numWords) {
    if (!str) return "";
    const words = str.split(" ");

    const truncated = words.slice(0, numWords).join(" ");

    if (words.length > numWords) {
      return truncated + "...";
    }

    return truncated;
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
      className={`flex gap-4 items-center mt-2 ${
        isSingleRow
          ? "justify-between pr-4"
          : "justify-start px-4 border shadow-md p-3 rounded-xl hover:shadow-lg"
      }`}
    >
      <div className="flex">
        <img className="flex" height={55} width={50} src={femaleLogo} alt="" />
      </div>
      <div className="block grow">
        <h1 className="text-[23px] font-roboto text-black">
          {" "}
          {truncateWords(item.Adname, 5)}
        </h1>
        <h1 className="text-[23px] font-roboto text-gray-700 mt-1">
          {item.city}
        </h1>
        <div className="flex gap-2 text-blue-800 text-2xl items-center">
          <p className="text-blue-800 text-2xl items-center">By : {item.postedby}</p>
          {/* <p className="text-blue-800 text-base items-center"> {calculateTimeDifference(item.postedon)}</p> */}
        </div>
        <p className="text-blue-800 text-2xl items-center mt-1"> {calculateTimeDifference(item.postedon)}</p>
      </div>
      <div className="flex gap-4 justify-center items-center">
        <p className="text-[23px] text-green-600 font-roboto font-bold mr-3">
          {item.rent}
        </p>
      </div>
    </Link>
  );
}

export default Roomcard2nd;
