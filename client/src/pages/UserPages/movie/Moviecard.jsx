import React from "react";
import { Container } from "../../../components";

function Moviecard({ ...item }) {
  return (
    <Container>
      <div className="relative h-[300px] rounded-lg rounded-b-xl font-bold font-[Montserrat]">
        <img
          src={item.img}
          alt="AirMax Pro"
          className="z-0 h-full w-full rounded-md object-cover object-center"
          style={{ objectPosition: "center top" }}
        />
        <div
          className="rounded-2xl absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"
          style={{ backgroundImage: `url (${item.img})`, color: "red" }}
        ></div>
        <div className="rounded-xl absolute bottom-4 left-4 text-left">
          <h1 className="text-lg font-semibold text-white">Movie</h1>
          <p className="mt-1 text-sm text-gray-300 ">
            2h 30min : 2020 : From $20.22
          </p>
          <div className="flex gap-3 mt-2">
            <button className="mt-2 inline-flex cursor-pointer items-center text-sm font-semibold text-white bg-slate-500 p-3 px-4 rounded-full ">
              Trailer
            </button>
            <button className="mt-2 inline-flex cursor-pointer items-center text-sm font-semibold text-white bg-slate-500 p-3 px-4 rounded-full ">
              Know More
            </button>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default Moviecard;
