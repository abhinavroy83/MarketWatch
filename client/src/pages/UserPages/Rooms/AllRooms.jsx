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
    getRooms();
    const loc = {
      lat: currentloc.lat,
      lng: currentloc.lng,
    };
    setLocationsndString(loc);
  }, [currentloc, usercity]);
  const renderRooms = () => {
    return rooms.map((item) => <Roomcard isRoomOnlyPage={true} {...item} />);
  };
  return (
    <ChildContainer onLocationReceived={locationsndString}>
      <div className="px-2 py-2 font-[opensans] mt-10 md:px-6 md:py-10 text-[36px]">
        <h1 className="text-3xl font-bold capitalize text-black lg:text-4xl">
          {usercity ? <p>Rooms In {usercity}</p> : <p>Rooms near you</p>}
        </h1>
        <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 xl:mt-3 xl:grid-cols-2 xl:gap-4">
          {renderRooms()}
          
        </div>
        <article className="flex gap-2 items-center mt-6 ml-2">
              <div className="block">
                <h1 className="text-lg font-semibold font-[OpenSans] text-black">
                Company Name
              </h1>
              <h1 className="text-sm font-semibold font-[OpenSans] text-gray-500 pb-2">
                Monday Food - 1 day ago
              </h1>
              </div>
              <div className="flex gap-4 justify-center items-center ml-[45.5rem]">
              <button
              className="rounded-md flex bg-green-500 text-lg font-[opensans] px-4 py-1 font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black">
             <svg class="h-6 w-6 text-white ml-0"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <line x1="12" y1="5" x2="12" y2="19" />  <line x1="18" y1="11" x2="12" y2="5" />  <line x1="6" y1="11" x2="12" y2="5" /></svg> 232
            </button>
              <p className="text-lg font-semibold text-black font-[OpenSans]">
                $550 
              </p>
              </div>
            </article>
            <hr/>
            <article className="flex gap-2 items-center mt-2 ml-2">
              <div className="block">
                <h1 className="text-lg font-semibold font-[OpenSans] text-black">
                Company Name
              </h1>
              <h1 className="text-sm font-semibold font-[OpenSans] text-gray-500 pb-2">
                Monday Food - 1 day ago
              </h1>
              </div>
              <div className="flex gap-4 justify-center items-center ml-[45.5rem]">
              <button
              className="rounded-md flex bg-red-500 text-lg font-[opensans] px-4 py-1 font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black">
              <svg class="h-6 w-6 text-white"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <line x1="12" y1="5" x2="12" y2="19" />  <line x1="18" y1="13" x2="12" y2="19" />  <line x1="6" y1="13" x2="12" y2="19" /></svg>    555        
              </button>
              <p className="text-lg font-semibold text-black font-[OpenSans]">
                $550 
              </p>
              </div>
            </article>
            <hr/>
            <article className="flex gap-2 items-center mt-2 ml-2">
              <div className="block">
                <h1 className="text-lg font-semibold font-[OpenSans] text-black">
                Company Name
              </h1>
              <h1 className="text-sm font-semibold font-[OpenSans] text-gray-500 pb-2">
                Monday Food - 1 day ago
              </h1>
              </div>
              <div className="flex gap-4 justify-center items-center ml-[45.5rem]">
              <button
              className="rounded-md flex bg-red-500 text-lg font-[opensans] px-4 py-1 font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black">
              <svg class="h-6 w-6 text-white"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <line x1="12" y1="5" x2="12" y2="19" />  <line x1="18" y1="13" x2="12" y2="19" />  <line x1="6" y1="13" x2="12" y2="19" /></svg>    555        
            </button>
              <p className="text-lg font-semibold text-black font-[OpenSans]">
                $550 
              </p>
              </div>
            </article>
            <hr/>
            <article className="flex gap-2 items-center mt-2 ml-2">
              <div className="block">
                <h1 className="text-lg font-semibold font-[OpenSans] text-black">
                Company Name
              </h1>
              <h1 className="text-sm font-semibold font-[OpenSans] text-gray-500 pb-2">
                Monday Food - 1 day ago
              </h1>
              </div>
              <div className="flex gap-4 justify-center items-center ml-[45.5rem]">
              <button
              className="rounded-md flex bg-red-500 text-lg font-[opensans] px-4 py-1 font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black">
              <svg class="h-6 w-6 text-white"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <line x1="12" y1="5" x2="12" y2="19" />  <line x1="18" y1="13" x2="12" y2="19" />  <line x1="6" y1="13" x2="12" y2="19" /></svg>    555        
            </button>
              <p className="text-lg font-semibold text-black font-[OpenSans]">
                $550 
              </p>
              </div>
            </article>
            <hr/>
            <article className="flex gap-2 items-center mt-2 ml-2">
              <div className="block">
                <h1 className="text-lg font-semibold font-[OpenSans] text-black">
                Company Name
              </h1>
              <h1 className="text-sm font-semibold font-[OpenSans] text-gray-500 pb-2">
                Monday Food - 1 day ago
              </h1>
              </div>
              <div className="flex gap-4 justify-center items-center ml-[45.5rem]">
              <button
              className="rounded-md flex bg-red-500 text-lg font-[opensans] px-4 py-1 font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black">
              <svg class="h-6 w-6 text-white"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <line x1="12" y1="5" x2="12" y2="19" />  <line x1="18" y1="13" x2="12" y2="19" />  <line x1="6" y1="13" x2="12" y2="19" /></svg>    555        
            </button>
              <p className="text-lg font-semibold text-black font-[OpenSans]">
                $550 
              </p>
              </div>
            </article>
            <hr/>
            <article className="flex gap-2 items-center mt-2 ml-2">
              <div className="block">
                <h1 className="text-lg font-semibold font-[OpenSans] text-black">
                Company Name
              </h1>
              <h1 className="text-sm font-semibold font-[OpenSans] text-gray-500 pb-2">
                Monday Food - 1 day ago
              </h1>
              </div>
              <div className="flex gap-4 justify-center items-center ml-[45.5rem]">
              <button
              className="rounded-md flex bg-red-500 text-lg font-[opensans] px-4 py-1 font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black">
              <svg class="h-6 w-6 text-white"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <line x1="12" y1="5" x2="12" y2="19" />  <line x1="18" y1="13" x2="12" y2="19" />  <line x1="6" y1="13" x2="12" y2="19" /></svg>    555        
            </button>
              <p className="text-lg font-semibold text-black font-[OpenSans]">
                $550 
              </p>
              </div>
            </article>
            <hr/>
            <article className="flex gap-2 items-center mt-2 ml-2">
              <div className="block">
                <h1 className="text-lg font-semibold font-[OpenSans] text-black">
                Company Name
              </h1>
              <h1 className="text-sm font-semibold font-[OpenSans] text-gray-500 pb-2">
                Monday Food - 1 day ago
              </h1>
              </div>
              <div className="flex gap-4 justify-center items-center ml-[45.5rem]">
              <button
              className="rounded-md flex bg-red-500 text-lg font-[opensans] px-4 py-1 font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black">
              <svg class="h-6 w-6 text-white"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <line x1="12" y1="5" x2="12" y2="19" />  <line x1="18" y1="13" x2="12" y2="19" />  <line x1="6" y1="13" x2="12" y2="19" /></svg>    555        
            </button>
              <p className="text-lg font-semibold text-black font-[OpenSans]">
                $550 
              </p>
              </div>
            </article>
            <hr/>
            <article className="flex gap-2 items-center mt-2 ml-2">
              <div className="block">
                <h1 className="text-lg font-semibold font-[OpenSans] text-black">
                Company Name
              </h1>
              <h1 className="text-sm font-semibold font-[OpenSans] text-gray-500 pb-2">
                Monday Food - 1 day ago
              </h1>
              </div>
              <div className="flex gap-4 justify-center items-center ml-[45.5rem]">
              <button
              className="rounded-md flex bg-red-500 text-lg font-[opensans] px-4 py-1 font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black">
              <svg class="h-6 w-6 text-white"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <line x1="12" y1="5" x2="12" y2="19" />  <line x1="18" y1="13" x2="12" y2="19" />  <line x1="6" y1="13" x2="12" y2="19" /></svg>    555        
            </button>
              <p className="text-lg font-semibold text-black font-[OpenSans]">
                $550 
              </p>
              </div>
            </article>
            <hr/>
      </div>
    </ChildContainer>
  );
}

export default AllRooms;
