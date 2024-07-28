import React from "react";
import { Link } from "react-router-dom";
// import femaleLogo from "../../../assets/female.png";
import { MdDateRange } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { GrLocation } from "react-icons/gr";
import femaleLogo from "../../../assets/female5.png";
import maleLogo from "../../../assets/male5.png";
import { LuHeart } from "react-icons/lu";

function Roomcardforsimilar({ isRoomOnlyPage, ...item }) {
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
      className={`flex relative max-w-4xl flex-col font-['udemy-regular'] rounded-xl md:flex-row border shadow-md hover:shadow-lg h-[450px] lg:h-[165px] ${
        isRoomOnlyPage ? "items-start" : ""
      }`}
    >
      <img
        src={item.Imgurl[0]}
        alt=""
        width={200}
        className="scale-95 hover:scale-100 ease-in duration-500 w-full lg:w-52 rounded-md lg:h-[100%] max-w-4xl transition "
      />
      {/* <p className="absolute font-roboto bg-white top-0 left-0 px-2 rounded-br-lg text-center">
        <span className="block text-[27px]">
          {new Intl.DateTimeFormat("en-US", { day: "2-digit" }).format(date)}
        </span>
        <span className="block text-gray-500">
          {new Intl.DateTimeFormat("en-US", { month: "short" }).format(date)}
        </span>
      </p> */}
      <img
        className="absolute bottom-[1.4rem] right-[3.2rem]"
        height={22}
        width={25}
        src={femaleLogo}
        alt=""
      />
      <div className="absolute bottom-4 right-4">
        <div
          className="cursor-pointer p-2 hover:text-white"
          // onClick={(e) => {
          //   e.preventDefault();
          //   makewishlist(item._id);
          // }}
        >
          <LuHeart className="text-black hover:text-gray-600" size={22} />
        </div>
        {/* <div
          className="cursor-pointer p-2"
          onClick={(e) => {
            e.preventDefault();
            unwish(item._id);
          }}
        >
          <LuHeart className="" color="red" size={22} />
        </div> */}
      </div>
      <div
        className={`px-4 py-1 flex flex-col ${
          isRoomOnlyPage ? "mt-4" : ""
        } w-full`}
      >
        {/* <p>{item.postedon}</p> */}
        <p className="flex flex-col text-[21px] capitalize mt-3 lg:mt-0">
          {item.Title && truncateWords(item.Title, 3)}
        </p>
        <p className=" flex gap-1 text-[19px] text-gray-600 mt-1 font-['udemy-regular'] items-center">
          <GrLocation size={20} />
          location
          {/* <span>{item.city},</span>
          <span className=" px-1">
            {item?.state?.length > 2
              ? stateAbbreviations[item.State]
              : item.state}
          </span> */}
        </p>
        <p className="text-blue-800 capitalize text-[19px] mt-1 flex gap-1 items-center font-['udemy-regular']">
          <CgProfile />
          By:
          {/* {item.user_name} */}
        </p>
        <p className="text-blue-800 text-[19px] flex gap-1 mt-1 items-center font-['udemy-regular']">
          <MdDateRange />
          Date
          {/* {calculateTimeDifference(item.postedon)} */}
        </p>
        {/* <p className="text-[18px] text-gray-500 font-roboto">{item.area}</p> */}
        {/* <p className="text-[18px] text-gray-500  font-roboto">{item.address}</p> */}
        {/* <article className="flex gap-2 mt-1">
          <h1 className="text-[18px] text-gray-500 font-roboto flex items-center">
            Nonstop . 3 hr 24 min{" "}
          </h1>
        </article> */}
        <p className="absolute font-['udemy-bold'] bg-white/80 top-0 left-0 p-1 px-3 rounded-br-lg text-center">
          <p className="left-5 top-2 text-[22px] text-green-700 text-right">
            ${item.Expected_Rooms}
          </p>
        </p>
      </div>
    </Link>
  );
}

export default Roomcardforsimilar;
