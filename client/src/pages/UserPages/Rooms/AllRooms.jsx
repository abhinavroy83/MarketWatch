import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Roomcard from "./Roomcard";
import Roomcard2nd from "./Roomcard2nd";
import { ChildContainer } from "../../../components";
import Loader from "../../../components/UserCompontents/Loader";
import Pagination from "../../../components/SharedCompontents/Pagination";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Roomcardforsimilar from "./Roomcardforsimilar";
import stateAbbreviationMapping from "../../../Services/StateAprevation/stateAbbreviations.json";
import Alert from "../../../components/UserCompontents/Alert/Alert";
import { MapPin } from "lucide-react";

function AllRooms() {
  const currentloc = useSelector((state) => state.auth.location);
  const usercity = useSelector((state) => state.auth.city);
  const isverified = useSelector((state) => state.auth.isverified);
  const authstatus = useSelector((state) => state.auth.status);
  const [similarrooms, setsimilarrooms] = useState([]);
  const userID = useSelector((state) => state.auth.userID);
  const [locationsndString, setLocationsndString] = useState("");
  const [rooms, setRooms] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const roomsPerPage = 25;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const getRooms = async () => {
    try {
      const res = await axios.get(
        usercity
          ? ` https://api.verydesi.com/api/getallrooms?city=${usercity}`
          : ` https://api.verydesi.com/api/getallrooms?lat=${currentloc.lng}&lng=${currentloc.lat}`
      );

      const rooms = res.data.Allrooms.reverse();
      const areaRes = await axios.get(
        `https://api.verydesi.com/api/admin/area/${usercity}`
      );
      const areaData = areaRes.data.area[0];
      // console.log(areaData);
      const primaryState = areaData.primaryState;
      // console.log(primaryState);
      const states = areaData.state;

      const priority = (room) => {
        const roomStateFullName = Object.keys(stateAbbreviationMapping).find(
          (key) => stateAbbreviationMapping[key] === room.state
        );

        const isPrimaryState = roomStateFullName || room.state === primaryState;
        const isStateListed = states.includes(roomStateFullName || room.state);
        const isCityListed = areaData.subarea.some(
          (subarea) => subarea.split(",")[0] === room.city
        );
        const isZipListed = areaData.zipcode.includes(room.zip_code);

        if (isPrimaryState && (isCityListed || isZipListed)) return 1;
        if (isStateListed && (isCityListed || isZipListed)) return 2;
        if (isCityListed) return 3;
        if (isZipListed) return 4;
        if (isPrimaryState) return 5;
        return 6;
      };

      rooms.sort((a, b) => priority(a) - priority(b));
      setRooms(rooms);
      setLoading(false);
    } catch (error) {
      console.log("error during fetching api", error);
    }
  };

  const getRoomonlocation = async () => {
    try {
      const res = await axios.get(
        `https://api.verydesi.com/api/getallrooms?lat=${currentloc.lng}&lng=${currentloc.lat}`
      );
      setsimilarrooms(res.data.Allrooms);
      // console.log(res.data.Allrooms);
    } catch (error) {
      console.log("error during fetching api", error);
    }
  };

  const renderRooms = () => {
    return similarrooms.map((item) => (
      <Roomcardforsimilar {...item} key={item._id} />
    ));
  };

  useEffect(() => {
    if (currentloc && currentloc.lat && currentloc.lng) {
      getRooms();
      getRoomonlocation();
      const loc = {
        lat: currentloc.lat,
        lng: currentloc.lng,
      };
      setLocationsndString(loc);
    }
  }, [usercity, currentloc]);
  // console.log(isverified);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const recentRooms = rooms.slice(0, 6);
  const otherRooms = rooms.slice(6);

  const indexOfLastRoom = currentPage * roomsPerPage;
  const indexOfFirstRoom = indexOfLastRoom - roomsPerPage;
  const currentRooms = otherRooms.slice(indexOfFirstRoom, indexOfLastRoom);

  if (loading)
    return <Loader className={"h-screen flex justify-center items-center"} />;

  return (
    <ChildContainer
      onLocationReceived={
        locationsndString?.lat ? locationsndString : undefined
      }
    >
      {toast.isOpen && (
        <Alert
          type={toast.type}
          text={toast.text}
          close={() => setToast({ isOpen: false, type: "", text: "" })}
        />
      )}

      {rooms.length > 0 ? (
        <div className="px-3 font-['udemy-regular'] md:px- md:py-0 text-lg ">
          <div className="flex justify-between items-center gap-1">
            <h1 className="capitalize text-[23px] lg:text-[23px] font-['udemy-bold']">
              {usercity ? (
                <p>Featured Rooms In {usercity}</p>
              ) : (
                <p>Rooms near you</p>
              )}
            </h1>
            {isverified ? (
              <button
                type="submit"
                onClick={() => {
                  navigate(`/addroom/${userID}`);
                }}
                className="rounded-md bg-green-800 whitespace-nowrap py-2 px-3 lg:px-2 text-[1rem] lg:text-[1.1rem] items-center text-white shadow-sm shadow-[#ccc] hover:bg-green-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              >
                Post Room
              </button>
            ) : (
              <button
                type="submit"
                onClick={() => {
                  if (!authstatus) {
                    toast("Login to PostRoom");
                  } else {
                    toast("Please verify your self to PostRoom");
                  }
                  // navigate("/login");
                }}
                className="rounded-md bg-green-800 px-2 py-2 text-[1rem] lg:text-[1.1rem] items-center text-white shadow-sm shadow-[#ccc] hover:bg-green-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              >
                Post Room
              </button>
            )}
          </div>
          <div className="lg:mt-8 mt-4 grid grid-cols-1 gap-3 md:grid-cols-2 xl:mt-3 xl:grid-cols-2 xl:gap-2">
            {recentRooms.map((item) => (
              <Roomcard key={item._id} {...item} />
            ))}
          </div>
          {otherRooms.length > 0 && (
            <>
              <p className="text-[22px] lg:text-[23px] font-['udemy-bold'] mt-5">
                More Rooms
              </p>
              <div className="mt-1 lg:mt-4 ">
                {currentRooms.map((item) => (
                  <Roomcard2nd key={item._id} {...item} />
                ))}
              </div>
              <Pagination
                currentPage={currentPage}
                totalRooms={otherRooms.length}
                roomsPerPage={roomsPerPage}
                paginate={paginate}
              />
            </>
          )}
          {/* {rooms.length < 6 && (
            <div>
              <>
                <p className="text-[23px] capitalize text-black font-bold font-['udemy-bold'] mt-7">
                  More Room on Your Current location{" "}
                </p>
                <div className="mt-4 ">
                  {similarrooms.map((item) => (
                    <Roomcard2nd key={item._id} {...item} />
                  ))}
                </div>
                <Pagination
                  currentPage={currentPage}
                  totalRooms={similarrooms.length}
                  roomsPerPage={roomsPerPage}
                  paginate={paginate}
                />
              </>
            </div>
          )} */}
        </div>
      ) : (
        <div className="  flex items-center justify-center">
          <div className="bg-white  p-8 max-w-md w-full space-y-6">
            <div className="flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mx-auto">
              <MapPin className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-center text-gray-800">
              No Rooms Available
            </h2>
            <p className="text-center text-gray-600">
              Currently, there are no rooms available at your location. Would
              you like to post a room?
            </p>
            <div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <button
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 ease-in-out transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                onClick={() => {
                  navigate(`/addroom/${userID}`);
                }}
              >
                Post Room
              </button>
            </div>
          </div>
        </div>
      )}
    </ChildContainer>
  );
}

export default AllRooms;
