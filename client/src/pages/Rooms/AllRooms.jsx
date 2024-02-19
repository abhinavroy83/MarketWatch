import React, { useEffect, useState } from "react";
import { ChildContainer } from "../../components";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Roomcard from "./Roomcard";

function AllRooms() {
  const currentloc = useSelector((state) => state.auth.location);
  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate();

  const getRooms = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/getallrooms?lat=${currentloc.lat}&lng=${currentloc.lng}`
      );
      setRooms(res.data.Allrooms);
      console.log(res.data.Allrooms);
    } catch (error) {
      console.log("error during fetching api", error);
    }
  };
  useEffect(() => {
    getRooms();
  }, [currentloc]);
  const renderRooms = () => {
    return rooms.map((item) => <Roomcard {...item} />);
  };
  return (
    <ChildContainer>
      <div className="px-2 py-2 md:px-6 md:py-10">
        <h1 className="text-2xl font-bold capitalize text-black lg:text-3xl">
          Rooms Near You
        </h1>
        <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 xl:mt-12 xl:grid-cols-3 xl:gap-16">
          {renderRooms()}
        </div>
      </div>
    </ChildContainer>
  );
}

export default AllRooms;
