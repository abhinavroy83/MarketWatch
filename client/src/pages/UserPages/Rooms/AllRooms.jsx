import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Roomcard from "./Roomcard";
import Roomcard2nd from "./Roomcard2nd";
import RoomcardNew from "./RoomCardNew";
import { ChildContainer } from "../../../components";
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from "react-icons/fa";
import Loader from "../../../components/UserCompontents/Loader";

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
  const [loading, setLoading] = useState(true);

  const getRooms = async () => {
    try {
      const res = await axios.get(
        usercity
          ? ` https://marketwatch-e3hc.onrender.com/api/getallrooms?city=${usercity}`
          : ` https://marketwatch-e3hc.onrender.com/api/getallrooms?lat=${currentloc.lng}&lng=${currentloc.lat}`
      );
      setRooms(res.data.Allrooms.reverse());
      setLoading(false);
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

  if (loading)
    return <Loader className={"h-screen flex justify-center items-center"} />;

  console.log(rooms);
  return (
    <ChildContainer
      onLocationReceived={
        locationsndString?.lat ? locationsndString : undefined
      }
    >
      {rooms.length > 0 ? (
        <div className="px-5 font-['udemy-bold'] mt-7 md:px-6 md:py-0 text-lg">
          <div className="flex justify-between items-center">
            <h1 className="capitalize text-[26px]">
              {usercity ? (
                <p>Featured Rooms In {usercity}</p>
              ) : (
                <p>Rooms near you</p>
              )}
            </h1>
            {isverified && (
              <button
                type="submit"
                onClick={() => {
                  navigate(`/addroom/${userID}`);
                }}
                className="rounded-md bg-green-800 px-3 py-2 text-[22px] items-center text-white shadow-sm shadow-[#ccc] hover:bg-green-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              >
                Post Room
              </button>
            )}
          </div>
          <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 xl:mt-3 xl:grid-cols-2 xl:gap-2">
            {currentRooms.map((item) => (
              <Roomcard key={item._id} {...item} />
            ))}
          </div>
          {/* <div className="mt-5 pb-[18px] overflow-x-scroll whitespace-nowrap grid grid-flow-col gap-4">
            {currentRooms.map((item) => (
              <Roomcard key={item._id} {...item} />
            ))}
          </div> */}
          {rooms.length > roomsPerPage && (
            <>
              <p className="text-[26px] text-black font-bold font-['udemy-bold'] mt-7">
                More Rooms
              </p>
              <div className="mt-4">
                {rooms.slice(3).map((item) => (
                  <Roomcard2nd key={item._id} {...item} />
                ))}
              </div>
            </>
          )}
          {rooms.length > roomsPerPage && (
            <div className="mt-4 flex justify-between">
              {currentPage > 1 && (
                <button
                  onClick={handlePreviousPage}
                  className="mx-2 px-4 py-2 border flex items-center justify-center gap-2 rounded-md bg-green-800 text-[22px] text-white hover:bg-green-900"
                >
                  <FaArrowAltCircleLeft /> Previous
                </button>
              )}
              <button
                onClick={handleNextPage}
                disabled={indexOfLastRoom >= rooms.length}
                className="mx-2 mt-2 px-4 py-2 border flex items-center justify-center gap-2 rounded-md bg-green-800 text-[22px] text-white hover:bg-green-900"
              >
                More
                <FaArrowAltCircleRight />
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="font-roboto text-lg flex items-center text-black h-screen justify-center">
          <p>Currently! There is no Room at your location</p>
        </div>
      )}
    </ChildContainer>
  );
}

export default AllRooms;
