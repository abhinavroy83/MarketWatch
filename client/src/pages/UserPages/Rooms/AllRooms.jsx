import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Roomcard from "./Roomcard";
import { ChildContainer } from "../../../components";

function AllRooms() {
  const currentloc = useSelector((state) => state.auth.location);
  const usercity = useSelector((state) => state.auth.city);
  const [locationsndString, setLocationsndString] = useState("");
  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate();
  console.log(currentloc);

  const getRooms = async () => {
    try {
      const res = await axios.get(
        usercity
          ? `http://localhost:8000/api/getallrooms?city=${usercity}`
          : `http://localhost:8000/api/getallrooms?lat=${currentloc.lat}&lng=${currentloc.lng}`
      );
      setRooms(res.data.Allrooms);

      // console.log(res.data.Allrooms);
    } catch (error) {
      console.log("error during fetching api", error);
    }
  };
  useEffect(() => {
    if (currentloc && currentloc.lat && currentloc.lng) {
      getRooms();
      const loc = {
        lat: currentloc.lat,
        lng: currentloc.lng,
      };
      setLocationsndString(loc);
    }
  }, [usercity, currentloc]);
  const renderRooms = () => {
    return rooms.map((item, index) => (
      <Roomcard key={item._id} isRoomOnlyPage={true} {...item} />
    ));
  };
  return (
    <ChildContainer
      onLocationReceived={
        locationsndString?.lat ? locationsndString : undefined
      }
    >
      <div className="px-5 py-2 font-roboto mt-3 md:px-6 md:py-10 text-lg">
        <div className="flex justify-between">
          <h1 className="text-3xl capitalize text-black lg:text-4xl">
            {usercity ? <p>Rooms In {usercity}</p> : <p>Rooms near you</p>}
          </h1>
          <button
            type="submit"
            className="rounded-md bg-[#17b19f] mt-3 px-3 py-2 text-[19px] items-center text-white shadow-sm shadow-[#ccc] hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            Post Room
          </button>
        </div>
        <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 xl:mt-3 xl:grid-cols-2 xl:gap-4">
          {renderRooms()}
        </div>
        <article className="flex gap-5 items-center mt-9 justify-between px-4">
          <div className="flex">
            <img
              className="flex"
              height={30}
              width={30}
              src={
                "https://static.vecteezy.com/system/resources/previews/017/415/378/original/gender-icon-symbols-male-sex-signs-illustration-png.png"
              }
              alt=""
            />
          </div>
          <div className="block grow">
            {" "}
            <h1 className="text-xl font-roboto text-black">Name Of Ad</h1>
            <h1 className="text-lg font-roboto text-gray-500 pb-2">
              City Name, State Posted By[First Name] 30 Mins Ago
            </h1>
          </div>
          <div className="flex gap-4 justify-center items-center">
            <p className="text-xl text-black font-roboto">$550</p>
          </div>
        </article>
        <hr />

        <article className="flex gap-2 items-center mt-2 justify-between pr-4">
          <div className="flex">
            <img
              className="flex"
              height={55}
              width={55}
              src={
                "https://media.istockphoto.com/id/1284444739/vector/female-symbol-on-transparent-background.jpg?s=612x612&w=0&k=20&c=EK8Uhpixm-Bo-Es4bVvaGWLlJQcFAf99lCOAR04qOTk="
              }
              alt=""
            />
          </div>
          <div className="block grow ">
            {" "}
            <h1 className="text-xl font-roboto text-black">Name Of Ad</h1>
            <h1 className="text-lg font-roboto text-gray-500 pb-2">
              City Name, State Posted By[First Name] 30 Mins Ago
            </h1>
          </div>
          <div className="flex gap-4 justify-center items-center">
            <p className="text-xl text-black font-roboto">$550</p>
          </div>
        </article>
        <hr />

        <article className="flex gap-5 items-center mt-2 justify-between px-4">
          <div className="flex">
            <img
              className="flex"
              height={30}
              width={30}
              src={
                "https://static.vecteezy.com/system/resources/previews/017/415/378/original/gender-icon-symbols-male-sex-signs-illustration-png.png"
              }
              alt=""
            />
          </div>
          <div className="block grow">
            {" "}
            <h1 className="text-xl font-roboto text-black">Name Of Ad</h1>
            <h1 className="text-lg font-roboto text-gray-500 pb-2">
              City Name, State Posted By[First Name] 30 Mins Ago
            </h1>
          </div>
          <div className="flex gap-4 justify-center items-center">
            <p className="text-xl text-black font-roboto">$550</p>
          </div>
        </article>
        <hr />

        <article className="flex gap-2 items-center mt-2 justify-between pr-4">
          <div className="flex">
            <img
              className="flex"
              height={55}
              width={55}
              src={
                "https://media.istockphoto.com/id/1284444739/vector/female-symbol-on-transparent-background.jpg?s=612x612&w=0&k=20&c=EK8Uhpixm-Bo-Es4bVvaGWLlJQcFAf99lCOAR04qOTk="
              }
              alt=""
            />
          </div>
          <div className="block grow ">
            {" "}
            <h1 className="text-xl font-roboto text-black">Name Of Ad</h1>
            <h1 className="text-lg font-roboto text-gray-500 pb-2">
              City Name, State Posted By[First Name] 30 Mins Ago
            </h1>
          </div>
          <div className="flex gap-4 justify-center items-center">
            <p className="text-xl text-black font-roboto">$550</p>
          </div>
        </article>
        <hr />

        <article className="flex gap-2 items-center mt-2 justify-between pr-4">
          <div className="flex">
            <img
              className="flex"
              height={55}
              width={55}
              src={
                "https://media.istockphoto.com/id/1284444739/vector/female-symbol-on-transparent-background.jpg?s=612x612&w=0&k=20&c=EK8Uhpixm-Bo-Es4bVvaGWLlJQcFAf99lCOAR04qOTk="
              }
              alt=""
            />
          </div>
          <div className="block grow ">
            {" "}
            <h1 className="text-xl font-roboto text-black">Name Of Ad</h1>
            <h1 className="text-lg font-roboto text-gray-500 pb-2">
              City Name, State Posted By[First Name] 30 Mins Ago
            </h1>
          </div>
          <div className="flex gap-4 justify-center items-center">
            <p className="text-xl text-black font-roboto">$550</p>
          </div>
        </article>
        <hr />

        <article className="flex gap-5 items-center mt-2 justify-between px-4">
          <div className="flex">
            <img
              className="flex"
              height={30}
              width={30}
              src={
                "https://static.vecteezy.com/system/resources/previews/017/415/378/original/gender-icon-symbols-male-sex-signs-illustration-png.png"
              }
              alt=""
            />
          </div>
          <div className="block grow">
            {" "}
            <h1 className="text-xl font-roboto text-black">Name Of Ad</h1>
            <h1 className="text-lg font-roboto text-gray-500 pb-2">
              City Name, State Posted By[First Name] 30 Mins Ago
            </h1>
          </div>
          <div className="flex gap-4 justify-center items-center">
            <p className="text-xl text-black font-roboto">$550</p>
          </div>
        </article>
        <hr />

        <article className="flex gap-5 items-center mt-2 justify-between px-4">
          <div className="flex">
            <img
              className="flex"
              height={30}
              width={30}
              src={
                "https://static.vecteezy.com/system/resources/previews/017/415/378/original/gender-icon-symbols-male-sex-signs-illustration-png.png"
              }
              alt=""
            />
          </div>
          <div className="block grow">
            {" "}
            <h1 className="text-xl font-roboto text-black">Name Of Ad</h1>
            <h1 className="text-lg font-roboto text-gray-500 pb-2">
              City Name, State Posted By[First Name] 30 Mins Ago
            </h1>
          </div>
          <div className="flex gap-4 justify-center items-center">
            <p className="text-xl text-black font-roboto">$550</p>
          </div>
        </article>
        <hr />
      </div>
    </ChildContainer>
  );
}

export default AllRooms;
