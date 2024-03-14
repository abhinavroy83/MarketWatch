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
        <article className="flex gap-2 items-center mt-9 ml-2">
              <div className="flex">
              <img className="flex" height={40} width={40} src={'https://static.vecteezy.com/system/resources/previews/017/415/378/original/gender-icon-symbols-male-sex-signs-illustration-png.png'} alt="" />
               </div>
              <div className="block ml-5"> <h1 className="text-xl font-semibold font-[Montserrat] text-black">
                Company Name
              </h1>
              <h1 className="text-lg font-semibold font-[Montserrat] text-gray-500 pb-2">
              June 13, 2024, 3:00 PM
              </h1>
              </div>
              <div className="flex gap-4 justify-center items-center ml-[45.5rem]">
              <p className="text-xl font-semibold text-black font-[Montserrat]">
                $550 
              </p>
              </div>
            </article>
            <hr/>
            <article className="flex gap-2 items-center mt-2">
              <div className="flex">
              <img className="flex" height={60} width={60} src={'https://media.istockphoto.com/id/1284444739/vector/female-symbol-on-transparent-background.jpg?s=612x612&w=0&k=20&c=EK8Uhpixm-Bo-Es4bVvaGWLlJQcFAf99lCOAR04qOTk='} alt="" />
               </div>
              <div className="block"> <h1 className="text-xl font-semibold font-[Montserrat] text-black">
                Company Name
              </h1>
              <h1 className="text-lg font-semibold font-[Montserrat] text-gray-500 pb-2">
              June 13, 2024, 3:00 PM
              </h1>
              </div>
              <div className="flex gap-4 justify-center items-center ml-[45.5rem]">
              <p className="text-xl font-semibold text-black font-[Montserrat]">
                $550 
              </p>
              </div>
            </article>
            <hr/>
            <article className="flex gap-2 items-center mt-2">
              <div className="flex">
              <img className="flex" height={40} width={40} src={'https://static.vecteezy.com/system/resources/previews/017/415/378/original/gender-icon-symbols-male-sex-signs-illustration-png.png'} alt="" />
               </div>
              <div className="block ml-5"> <h1 className="text-xl font-semibold font-[Montserrat] text-black">
                Company Name
              </h1>
              <h1 className="text-lg font-semibold font-[Montserrat] text-gray-500 pb-2">
              June 13, 2024, 3:00 PM
              </h1>
              </div>
              <div className="flex gap-4 justify-center items-center ml-[45.5rem]">
              <p className="text-xl font-semibold text-black font-[Montserrat]">
                $550 
              </p>
              </div>
            </article>
            <hr/>
            <article className="flex gap-2 items-center mt-2">
              <div className="flex">
              <img className="flex" height={60} width={60} src={'https://media.istockphoto.com/id/1284444739/vector/female-symbol-on-transparent-background.jpg?s=612x612&w=0&k=20&c=EK8Uhpixm-Bo-Es4bVvaGWLlJQcFAf99lCOAR04qOTk='} alt="" />
               </div>
              <div className="block"> <h1 className="text-xl font-semibold font-[Montserrat] text-black">
                Company Name
              </h1>
              <h1 className="text-lg font-semibold font-[Montserrat] text-gray-500 pb-2">
              June 13, 2024, 3:00 PM
              </h1>
              </div>
              <div className="flex gap-4 justify-center items-center ml-[45.5rem]">
              <p className="text-xl font-semibold text-black font-[Montserrat]">
                $550 
              </p>
              </div>
            </article>
            <hr/>
            <article className="flex gap-2 items-center mt-2">
              <div className="flex">
              <img className="flex" height={60} width={60} src={'https://media.istockphoto.com/id/1284444739/vector/female-symbol-on-transparent-background.jpg?s=612x612&w=0&k=20&c=EK8Uhpixm-Bo-Es4bVvaGWLlJQcFAf99lCOAR04qOTk='} alt="" />
               </div>
              <div className="block"> <h1 className="text-xl font-semibold font-[Montserrat] text-black">
                Company Name
              </h1>
              <h1 className="text-lg font-semibold font-[Montserrat] text-gray-500 pb-2">
              June 13, 2024, 3:00 PM
              </h1>
              </div>
              <div className="flex gap-4 justify-center items-center ml-[45.5rem]">
              <p className="text-xl font-semibold text-black font-[Montserrat]">
                $550 
              </p>
              </div>
            </article>
            <hr/>
            <article className="flex gap-2 items-center mt-2">
              <div className="flex">
              <img className="flex" height={60} width={60} src={'https://media.istockphoto.com/id/1284444739/vector/female-symbol-on-transparent-background.jpg?s=612x612&w=0&k=20&c=EK8Uhpixm-Bo-Es4bVvaGWLlJQcFAf99lCOAR04qOTk='} alt="" />
               </div>
              <div className="block"> <h1 className="text-xl font-semibold font-[Montserrat] text-black">
                Company Name
              </h1>
              <h1 className="text-lg font-semibold font-[Montserrat] text-gray-500 pb-2">
              June 13, 2024, 3:00 PM
              </h1>
              </div>
              <div className="flex gap-4 justify-center items-center ml-[45.5rem]">
              <p className="text-xl font-semibold text-black font-[Montserrat]">
                $550 
              </p>
              </div>
            </article>
            <hr/>
            <article className="flex gap-2 items-center mt-2">
              <div className="flex">
              <img className="flex" height={40} width={40} src={'https://static.vecteezy.com/system/resources/previews/017/415/378/original/gender-icon-symbols-male-sex-signs-illustration-png.png'} alt="" />
               </div>
              <div className="block ml-5"> <h1 className="text-xl font-semibold font-[Montserrat] text-black">
                Company Name
              </h1>
              <h1 className="text-lg font-semibold font-[Montserrat] text-gray-500 pb-2">
              June 13, 2024, 3:00 PM
              </h1>
              </div>
              <div className="flex gap-4 justify-center items-center ml-[45.5rem]">
              <p className="text-xl font-semibold text-black font-[Montserrat]">
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
