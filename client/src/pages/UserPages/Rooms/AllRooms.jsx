import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Roomcard from "./Roomcard";
import Roomcard2nd from "./Roomcard2nd";
import { ChildContainer } from "../../../components";

function AllRooms() {
  const currentloc = useSelector((state) => state.auth.location);
  const usercity = useSelector((state) => state.auth.city);
  const isverified = useSelector((state) => state.auth.isverified);
  const userID = useSelector((state) => state.auth.userID);
  const [locationsndString, setLocationsndString] = useState("");
  const [rooms, setRooms] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const roomsPerPage = 6;
  const navigate = useNavigate();
  console.log(currentloc);

  const getRooms = async () => {
    try {
      const res = await axios.get(
        usercity
          ? `http://localhost:8000/api/getallrooms?city=${usercity}`
          : `http://localhost:8000/api/getallrooms?lat=${currentloc.lng}&lng=${currentloc.lat}`
      );
      setRooms(res.data.Allrooms.reverse());

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

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const indexOfLastRoom = currentPage * roomsPerPage;
  const indexOfFirstRoom = indexOfLastRoom - roomsPerPage;
  const currentRooms = rooms.slice(indexOfFirstRoom, indexOfLastRoom);

  return (
    <ChildContainer
      onLocationReceived={
        locationsndString?.lat ? locationsndString : undefined
      }
    >
      {rooms.length > 0 ? (
        <div className="px-5 py-2 font-roboto mt-3 md:px-6 md:py-10 text-lg">
          <div className="flex justify-between">
            <h1 className="text-3xl capitalize text-black lg:text-4xl">
              {usercity ? <p>Rooms In {usercity}</p> : <p>Rooms near you</p>}
            </h1>
            {isverified && (
              <button
                type="submit"
                onClick={() => {
                  navigate(`/addroom/${userID}`);
                }}
                className="rounded-md bg-gray-400 px-3 py-2 text-[19px] items-center text-black shadow-sm shadow-[#ccc] hover:bg-black hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              >
                Post Room
              </button>
            )}
          </div>
          <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 xl:mt-3 xl:grid-cols-2 xl:gap-4">
            {rooms.slice(0, 6).map((item) => (
              <Roomcard key={item._id} isRoomOnlyPage={true} {...item} />
            ))}
          </div>
          {rooms.length > roomsPerPage && (
            <>
              <p className="text-[35px] text-black font-roboto mt-7">
                More Rooms
              </p>
              <div className="mt-4">
                {rooms.slice(6).map((item) => (
                  <Roomcard2nd key={item._id} {...item} />
                ))}
              </div>
            </>
          )}
          {rooms.length > roomsPerPage && (
            <div className="mt-4 flex  justify-between">
              <button
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
                className="mx-2 px-4 py-2 border border-gray-300 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300"
              >
                Previous
              </button>
              <button
                onClick={handleNextPage}
                disabled={indexOfLastRoom >= rooms.length}
                className="mx-2 px-4 py-2 border border-gray-300 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300"
              >
                Next
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className=" flex items-center text-black h-screen justify-center">
          <p>Currently! There is no Room at your location</p>
        </div>
      )}
    </ChildContainer>
  );
}

export default AllRooms;
