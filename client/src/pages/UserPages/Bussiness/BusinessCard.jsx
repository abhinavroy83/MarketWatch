import React from "react";
import { Link } from "react-router-dom";

function BusinessCard({ ...item }) {
  return (
    <Link
      to={`/bussiness/${item._id}`}
      key={item._id}
      className="flex max-w-4xl flex-col items-center gap-2 rounded-md md:flex-row border shadow-md hover:shadow-lg box-border"
    >
      <img
        src={item.Image}
        alt=""
        height={100}
        width={130}
        className="rounded-tl-md rounded-bl-md"
      />
      <div className="px-2 ml-1 mt-3 self-start flex-grow" style={{ overflowWrap: 'anywhere' }}>
        <h1 className="inline-flex items-center text-xl font-semibold font-[OpenSans]">
          {item.business_name}
        </h1>
        <article className="flex justify-between items-center">
          <p className="text-sm mt-2 text-blue-600 font-[Montserrat]">
            @{item.business_category}
          </p>
          <p className="border border-gray-400 rounded-full p-1 mr-3">
            <svg class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </p>
        </article>
        <div className="flex justify-between items-center mt-4">
          <article className="flex gap-1 justify-between">
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
            <h1 className="text-sm text-gray-500 font-bold font-[Montserrat]">
              {item.city},{item.state},  {item.country} </h1>|
            <svg class="h-5 w-5 text-gray-500" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <rect x="4" y="5" width="16" height="16" rx="2" />  <line x1="16" y1="3" x2="16" y2="7" />  <line x1="8" y1="3" x2="8" y2="7" />  <line x1="4" y1="11" x2="20" y2="11" />  <line x1="10" y1="16" x2="14" y2="16" /></svg>
            <h1 className="text-sm font-[Montserrat] text-gray-500 font-bold">
              02 Jan 2024</h1>
            
          </article>
          <button
              className=" bg-blue-600 text-[12px] font-[opensans] py-1 mr-3 px-1 justify-between font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black max-w-max"
            >
              OPEN MAP
          </button>
        </div>
      </div>
    </Link>
  );
}

export default BusinessCard;
