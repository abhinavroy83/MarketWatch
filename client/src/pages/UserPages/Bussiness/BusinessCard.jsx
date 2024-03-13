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
      height={220}
      width={150}
      className="rounded-tl-md rounded-bl-md"
    />
    <div className="px-2 ml-1" style={{ overflowWrap: 'anywhere' }}>
      <h1 className="inline-flex items-center text-xl font-semibold font-[OpenSans]">
        {item.business_name}
      </h1>
      <article className="flex justify-between items-center">
        <p className="text-sm text-blue-600 font-[Montserrat]">
          {item.business_category}
        </p>
        <p className="border border-black rounded-full p-1">
          <svg class="h-5 w-5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
          </svg>
        </p>
      </article>
      <article className="flex gap-1 mt-3 justify-between"> 
      <svg
        class="h-5 w-5 text-black"
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
        <h1 className="text-sm text-black font-[Montserrat]">
        {item.city},{item.state},  {item.country} </h1>|
        <img  className="h-5 w-5" 
          src={`https://static.thenounproject.com/png/368899-200.png`}/>
          <h1 className="text-sm font-[Montserrat] text-black">
           New Events</h1>
           <button
              className=" bg-blue-600 text-sm font-[opensans] px-1 justify-between ml-4 font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black max-w-max" style={{ inlineSize: 'max-content', marginInline: 'auto' }}
            >
              FULL TIME
            </button>
      </article>
    </div>
  </Link>
  );
}

export default BusinessCard;
