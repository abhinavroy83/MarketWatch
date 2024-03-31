import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Roomcard from "./Roomcard";
import { ChildContainer } from "../../../components";
import Roomcard2nd from "./Roomcard2nd";

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
          {rooms.map((item, index) => (
            <React.Fragment key={item._id}>
              {index < 8 ? (
                <Roomcard key={item._id} isRoomOnlyPage={true} {...item} />
              ) : null}
            </React.Fragment>
          ))}
        </div>
        <div className="mt-4">
          {rooms.slice(8).map((item) => (
            <Roomcard2nd key={item._id} {...item} />
          ))}
        </div>
      </div>
    </ChildContainer>
  );
}

export default AllRooms;
