import React, { useEffect, useState } from "react";
import { ChildContainer } from "../../components";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Roomcard from "./Roomcard";

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
    return rooms.map((item) => <Roomcard {...item} />);
  };
  return (
    <ChildContainer onLocationReceived={locationsndString}>
      <div className="px-2 py-2 md:px-6 md:py-10">
        <h1 className="text-2xl font-bold capitalize text-black lg:text-3xl">
          {usercity ? <p>Rooms In {usercity}</p> : <p>Rooms near you</p>}
        </h1>
        <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 xl:mt-12 xl:grid-cols-3 xl:gap-16">
          {renderRooms()}
        </div>
      </div>
    </ChildContainer>
  );
}

export default AllRooms;
