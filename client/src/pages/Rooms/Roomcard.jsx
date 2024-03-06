import React from "react";
import { Link } from "react-router-dom";
function Roomcard({ ...item }) {
  return (
    <Link
      to={`/rooms/${item._id}`}
      key={item._id}
      className="flex max-w-4xl flex-col items-center rounded-md md:flex-row border shadow-md hover:shadow-lg"
    >
      <img src={item.PrdImage} alt="" height={170} width={170} className="rounded-tl-md rounded-bl-md" />
      <div className="px-3">
          <h1 className="inline-flex items-center text-lg font-semibold">
            {item.Hotelname}
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. 
          </p>
      </div>
    </Link>
  );
}

export default Roomcard;
