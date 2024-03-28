import React from "react";
import { Link } from "react-router-dom";
function Roomcard({ isRoomOnlyPage, ...item }) {
  return (
    <Link
      to={`/rooms/${item._id}`}
      key={item._id}
      className={`flex max-w-4xl flex-col rounded-md md:flex-row border shadow-md hover:shadow-lg items-start ${isRoomOnlyPage ? "items-start" : "items-center"}`}
    >
      <img
        src={item.PrdImage}
        alt=""
        height={200}
        width={190}
        className="rounded-tl-md rounded-bl-md"
      />
      <div className={`px-4 flex flex-col ${isRoomOnlyPage ? "mt-4" : ""} w-full`}>
        <h1 className="inline-flex items-center text-xl font-roboto">
          {item.Hotelname}
        </h1>
        <p className="text-sm text-gray-500 font-roboto">
        May 12-17
        </p>
        <article className="flex gap-2 mt-1">
        <svg class="h-7 w-7 text-gray-500"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">  <circle cx="12" cy="12" r="10" />  <polyline points="12 6 12 12 16 14" /></svg>
          <h1 className="text-sm text-gray-500 font-roboto flex items-center">
           1 Stop- 3 hr 24 min </h1>
        </article>
          <p className="text-base font-semibold text-black font-roboto mt-1 text-right">
            $310
          </p>  
       
      </div>
    </Link>
  );
}

export default Roomcard;
