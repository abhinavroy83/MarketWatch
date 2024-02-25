import React from "react";
import { Link } from "react-router-dom";

function BusinessCard({ ...item }) {
  return (
    <Link
      to={`/bussiness/${item._id}`}
      key={item._id}
      className="flex flex-col items-center md:w-[400px] rounded-md border md:flex-row"
    >
      <div className=" md:h-[100px] md:w-[100px] m-2">
        <img src={item.Image} alt="Room" className="h-[100px] object-cover" />
      </div>
      <div>
        <div className="">
          <p className=" text-sm text-gray-900">{item.business_name}</p>
          <p className=" text-sm text-gray-900">{item.business_category}</p>
          <div className=" flex">
            <svg
              class="h-5 w-5 text-stone-500"
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
            <p className=" text-sm text-gray-900">
              {item.city},{item.state},{item.country}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default BusinessCard;
