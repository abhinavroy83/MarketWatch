import React from "react";
import { Link } from "react-router-dom";
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
  const formattedDate = new Intl.DateTimeFormat("en-US", options).format(date);

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
        width={190}
        className="rounded-tl-md rounded-bl-md h-[100%]"
      />
      <p className="absolute font-roboto bg-white top-0 left-0 px-2 rounded-br-lg">
        {/* <span className="block text-[30px]">12</span>
        
        <span className="block text-[16px] text-gray-500">JUN</span> */}
        {formattedDate}
      </p>
      <div
        className={`px-4 flex flex-col ${isRoomOnlyPage ? "mt-4" : ""} w-full`}
      >
        {/* <p>{item.postedon}</p> */}
        <h1 className="inline-flex items-center text-[22px] font-roboto">
          {item.Adname && truncateWords(item.Adname, 3)}
        </h1>
        {/* <p className="text-[18px] text-gray-500 font-roboto">{item.area}</p> */}
        <p className="text-[18px] text-gray-500 font-roboto">{item.address}</p>
        {/* <article className="flex gap-2 mt-1">
          <h1 className="text-[18px] text-gray-500 font-roboto flex items-center">
            Nonstop . 3 hr 24 min{" "}
          </h1>
        </article> */}
        <p className="text-[20px] text-black font-roboto mt-1 text-right">
          {item.rent}
        </p>
      </div>
    </Link>
  );
}

export default Roomcard;
