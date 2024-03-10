import React from "react";
import { Link } from "react-router-dom";

function BusinessCard({ ...item }) {
  return (
    <Link
    to={`/rooms/${item._id}`}
    key={item._id}
    className="flex max-w-4xl flex-col items-center gap-2 rounded-md md:flex-row border shadow-md hover:shadow-lg box-border"
  >
    <img
      src={item.Image}
      alt=""
      height={150}
      width={120}
      className="rounded-tl-md rounded-bl-md"
    />
    <div className="px-4 ml-1" style={{ overflowWrap: 'anywhere' }}>
      <h1 className="inline-flex items-center text-xl font-semibold font-[OpenSans]">
        {item.business_name}
      </h1>
      <p className="text-sm text-gray-600 font-[Montserrat]">
        {item.business_category}
      </p>
      <article className="flex gap-2 mt-1">
      <svg
        class="h-5 w-5 text-gray-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
        />
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
        <h1 className="text-sm text-gray-600 font-[Montserrat] pb-2">
        {item.city},{item.state},  {item.country} </h1>
      </article>
    </div>
  </Link>
  );
}

export default BusinessCard;
