import React from "react";
import { Link } from "react-router-dom";
function Roomcard({ ...item }) {
  return (
    <Link
      to={`/rooms/${item._id}`}
      key={item._id}
      className="flex max-w-2xl flex-col items-center rounded-md border md:flex-row"
    >
      <div className="h-full w-full md:h-[200px] md:w-[300px]">
        <img
          src={item.PrdImage}
          alt="Room"
          className="h-[200px] w-full rounded-md object-cover"
        />
      </div>
      <div>
        <div className="p-4">
          <h1 className="inline-flex items-center text-lg font-semibold">
            {item.Hotelname}
          </h1>
          <p className="mt-3 text-sm text-gray-600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi,
            debitis?
          </p>
        </div>
      </div>
    </Link>
  );
}

export default Roomcard;
