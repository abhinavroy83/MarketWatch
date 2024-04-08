import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ChildContainer, LeafletMap } from "../../../components";
import { useSelector } from "react-redux";
import CopyToClipboard from "react-copy-to-clipboard";
import Roomcard from "./Roomcard";
import { IoIosShareAlt } from "react-icons/io";
import { FaHeart } from "react-icons/fa";
import { BiSolidMessageRounded } from "react-icons/bi";
import { GiWashingMachine } from "react-icons/gi";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { FaShare } from "react-icons/fa";
import Conractform from "../Contactform/Conractform";
import Roomcardforsimilar from "./Roomcardforsimilar";

function Rooms() {
  const { _id } = useParams();
  const [rooms, setrooms] = useState([]);
  const [similarrooms, setsimilarrooms] = useState([]);
  const [locationsndString, setLocationsndString] = useState("");
  const [contactdet, setcontachdet] = useState(false);
  const [posteddate, setposteddate] = useState("");
  const authstatus = useSelector((state) => state.auth.status);
  const currentloc = useSelector((state) => state.auth.location);

  const url = `http://localhost:8000/rooms/${_id}`;
  const fetchroomdetails = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/getspecificroom/${_id}`
      );
      setrooms(res.data.rooms);
      const loc = {
        lat: res.data.rooms.location.coordinates[1],
        lng: res.data.rooms.location.coordinates[0],
      };
      const date = res.data.rooms.postedon
        ? new Date(res.data.rooms.postedon).toISOString().split("T")[0]
        : "";
      setposteddate(date);
      // console.log("locationsnd", locationString);
      setLocationsndString(loc);
    } catch (error) {
      console.log("error during fetching api", error);
    }
  };
  useEffect(() => {
    fetchroomdetails();
  }, [_id]);
  const handlecopy = () => {
    alert("Link Copied");
  };
  const getRooms = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/getallrooms?lat=${currentloc.lng}&lng=${currentloc.lat}`
      );
      setsimilarrooms(res.data.Allrooms);
      // console.log(res.data.Allrooms);
    } catch (error) {
      console.log("error during fetching api", error);
    }
  };
  useEffect(() => {
    getRooms();
  }, [rooms]);

  const fetchNextRoom = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/rooms/${_id}/next`
      );
      // console.log(res);
      navigate(`/rooms/${res.data.nextRoom._id}`);
    } catch (error) {
      console.error("Error fetching next room:", error);
    }
  };

  const fetchPreviousRoom = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/rooms/${_id}/previous`
      );
      // console.log(res);
      navigate(`/rooms/${res.data.previousRoom._id}`);
    } catch (error) {
      console.error("Error fetching previous room:", error);
    }
  };

  function truncateWords(str, numWords) {
    const words = str.split(" ");

    const truncated = words.slice(0, numWords).join(" ");

    if (words.length > numWords) {
      return truncated + "...";
    }

    return truncated;
  }

  const navigate = useNavigate();

  const renderRooms = () => {
    return similarrooms
      .slice(0, 3)
      .map((item) => <Roomcardforsimilar {...item} key={item._id} />);
  };

  const [isloginmodalopen, setloginmodeopen] = useState(false);

  const handleloginmodelopen = () => {
    setloginmodeopen(true);
  };

  //close

  const isloginmodelclose = () => {
    setloginmodeopen(false);
  };

  return (
    <ChildContainer onLocationReceived={locationsndString}>
      <Conractform isOpen={isloginmodalopen} onClose={isloginmodelclose} />

      <div className=" w-full max-w-7xl mx-auto px-4 py-2 mt-5 font-roboto">
        <div className="flex justify-between py-2 items-start">
          <div>
            <button className="rounded-full flex py-2 bg-pink-800 px-2 text-[22px] items-center text-white shadow-sm shadow-[#000] mb-3 gap-2 hover:shadow-lg">
              <MdKeyboardDoubleArrowLeft
                size={30}
                className="text-pink-800 bg-white rounded-full flex shadow-sm shadow-[#000]"
              />
              <button
                onClick={fetchPreviousRoom}
                type="submit"
                className="rounded-full flex bg-white px-7 text-[22px] items-center text-pink-800 shadow-sm shadow-[#000] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              >
                Previous
              </button>
            </button>
            <div className="flex">
              <svg
                class="h-12 w-12 ml-1 text-black-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <div className="flex pb-3">
                <div className="ml-1">
                  <GiWashingMachine size={45} />
                </div>
              </div>
            </div>
          </div>

          <div className="block">
            <div className="flex justify-end">
              <button className="rounded-full flex py-2 bg-blue-700 px-2 text-[22px] items-center text-white shadow-sm shadow-[#000] mb-3 gap-2 hover:shadow-lg">
                <button
                  type="submit"
                  onClick={fetchNextRoom}
                  className="rounded-full flex bg-white px-7 text-[22px] items-center text-blue-700 shadow-sm shadow-[#000] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                >
                  Next
                </button>
                <MdKeyboardDoubleArrowRight
                  size={30}
                  className="text-blue-700 bg-white rounded-full flex shadow-sm shadow-[#000]"
                />
              </button>
            </div>

            <div className="gap-2 flex">
              <div className="cursor-pointer p-2 bg-red-600 rounded-full">
                <FaHeart color="#fff" size={30} />
              </div>
              <div className="cursor-pointer p-2 bg-green-500 rounded-full">
                <BiSolidMessageRounded color="#fff" size={30} />
              </div>
              <div className="cursor-pointer p-2 bg-blue-600 rounded-full">
                <CopyToClipboard text={url} onCopy={handlecopy}>
                  <IoIosShareAlt color="#fff" size={30} />
                </CopyToClipboard>
              </div>
              <button
                type="submit"
                className="rounded-md justify-between bg-gray-400 gap-2 px-5 py-2 text-[19px] flex items-center text-black shadow-sm shadow-[#ccc] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              >
                <FaShare className="text-black" /> Share Now
              </button>
            </div>
          </div>
        </div>

        <div className="flex text-[23px]">
          <div>
            <img
              src={rooms.PrdImage}
              alt="roomimg"
              className="h-[560px] w-[880px] rounded-md object-cover"
            />
            <p className="font-roboto mt-4 text-[23px]">
              Posted By : {rooms.postedby} || Posted On : {posteddate}{" "}
            </p>
          </div>
          <div className="px-3 font-roboto ml-7 flex flex-col gap-1">
            <p className=" text-[23px] font-bold text-gray-800 font-roboto">
              {rooms.Adname && truncateWords(rooms.Adname, 6)}
            </p>
            <p className="text-red-700 text-[23px] flex gap-3">
              {rooms.rent} monthly{" "}
              <p className="text-[23px] text-blue-800">[Extra Utilites Here]</p>
            </p>
            <p className="text-[23px]">{rooms.address}</p>
            <p className="text-[23px]">
              {rooms.bed} Bed / {rooms.bath} Bath
            </p>
            <div>
              {locationsndString ? (
                <div className="mt-2">
                  <LeafletMap
                    onLocationReceived={locationsndString}
                    style={{ height: "350px", width: "500px" }}
                  />
                </div>
              ) : (
                <div>
                  <p className="font-roboto">loading</p>
                </div>
              )}
            </div>
            <div className="">
              <button
                type="button"
                onClick={handleloginmodelopen}
                className="flex rounded-md bg-gray-400 mt-4 px-5 py-3 text-[22px] text-black shadow-sm hover:bg-black hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600"
              >
                <svg
                  class="h-8 w-8 text-white-500"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  {" "}
                  <path d="M15.05 5A5 5 0 0 1 19 8.95M15.05 1A9 9 0 0 1 23 8.94m-1 7.98v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <span class="ml-2 items-center justify-center">
                  Get In touch{" "}
                </span>
              </button>
              {authstatus ? (
                <div>
                  <p className="text-[20px] mt-4 font-bold font-roboto text-blue-800">
                    Your Details Are -
                  </p>
                  <p className="text-[20px]">Email : {rooms.email}</p>
                  <p className="text-[20px]">Number : {rooms.number}</p>
                </div>
              ) : null}
            </div>
          </div>
        </div>
        <div className="font-roboto py-2 mt-2 text-[23px] text-black">
          Description : {rooms.description}
        </div>
        <div className="mb-2">
          <div className="mt-2 flex items-center ">
            <div className=" flex justify-between w-full text-[23px] font-roboto">
              <p>Similar room In The Area</p>
              <p
                className=" cursor-pointer"
                onClick={() => {
                  navigate("/rooms");
                }}
              >
                See full list of Roommates
              </p>
            </div>
          </div>
          <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 xl:mt-5 xl:grid-cols-3 xl:gap-8">
            {renderRooms()}
          </div>
        </div>
      </div>
    </ChildContainer>
  );
}

export default Rooms;
