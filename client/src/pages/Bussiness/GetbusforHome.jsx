import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Container } from "../../components";
import BusinessCard from "./BusinessCard";
import { useNavigate } from "react-router-dom";

function GetbusforHome() {
  const currentloc = useSelector((state) => state.auth.location);
  const navigate = useNavigate();

  const [allbusi, setallbusi] = useState([]);
  const fetchbus = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/getbusinessbyloc?lat=${currentloc.lat}&lng=${currentloc.lng}`
      );
      // console.log(res.data.Allbusiness);
      setallbusi(res.data.Allbusiness);
    } catch (error) {
      console.log("error during fetching api", error);
    }
  };
  useEffect(() => {
    fetchbus();
  }, [currentloc]);
  const nextPage = () => {
    navigate("/bussiness");
  };

  const renderRooms = () => {
    return allbusi.slice(0, 6).map((item) => <BusinessCard {...item} />);
  };
  return (
    <Container>
      <div className="px-2 py-2 md:px-6 md:py-10">
        <h1 className="text-2xl font-bold capitalize text-black lg:text-3xl">
          Bussiness Near You
        </h1>
        <hr />
        <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 xl:mt-12 xl:grid-cols-3 xl:gap-16">
          {renderRooms()}
        </div>
        <div className="mt-4 w-full border-gray-300">
          <div className="mt-2 flex items-center justify-end">
            <button
              className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              onClick={nextPage}
            >
              More..
            </button>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default GetbusforHome;
