import React from "react";
import { Link } from "react-router-dom";
import femaleLogo from "../../../assets/female.png";
import { IoHeartCircle } from "react-icons/io5";

function Roomcard({ isRoomOnlyPage, ...item }) {
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
      <p className="absolute top-2 right-5 text-[23px] text-green-600 font-roboto font-bold text-right">
          {item.rent}</p>
      <div
        className={`px-4 flex flex-col ${isRoomOnlyPage ? "mt-4" : ""} w-full`}
      >
        {/* <p>{item.postedon}</p> */}
        <h1 className="inline-flex items-center text-[23px] mt-4 font-roboto">
          {item.Adname && truncateWords(item.Adname, 4)}
        </h1>
        {/* <p className="text-[18px] text-gray-500 font-roboto">{item.area}</p> */}
        <p className="text-[23px] text-gray-700 mt-2 font-roboto">
          {item.city}, {item.State}
        </p>
        <p className="text-blue-800 text-[23px] mt-2">By : {item.postedby}</p>
        <div className="flex gap-2 text-blue-800 text-[23px] mt-1">
        <p> 208 hours ago</p>
          {/* <p>By : {item.postedby}</p> */}
        </div>
        <div className="block">
        {/* <div className="gap-2 flex">
              {!wishliststatys ? (
                <div
                  className="cursor-pointer p-2 bg-red-600 rounded-full"
                  onClick={makewishlist}
                >
                  <FaHeart color="#fff" size={30} />
                </div>
              ) : (
                <div
                  className="cursor-pointer p-2 border border-gray-300 rounded-full"
                  onClick={unwish}
                >
                  <FaHeart color="red" size={30} />
                </div>
              )} */}
         <IoHeartCircle size={40} className="text-red-500 flex absolute bottom-3 right-3 hover:text-black" />  
        <img
        className="flex absolute bottom-14 right-3"
        height={45}
        width={45}
        src={femaleLogo}
        alt=""
      />
      </div>
        </div>
        
    </Link>
  );
}

export default Roomcard;
