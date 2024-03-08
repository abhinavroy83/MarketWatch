import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import BusinessCard from "./BusinessCard";
import { useNavigate } from "react-router-dom";
import { Container } from "../../../components";

function GetbusforHome() {
  const currentloc = useSelector((state) => state.auth.location);
  const navigate = useNavigate();
  const usercity = useSelector((state) => state.auth.city);
  // console.log("usercity", usercity);

  const [allbusi, setallbusi] = useState([]);
  const fetchBusiness = async () => {
    try {
      const res = await axios.get(
        usercity
          ? `http://localhost:8000/api/getbusinessbyloc?city=${usercity}`
          : `http://localhost:8000/api/getbusinessbyloc?lat=${currentloc.lat}&lng=${currentloc.lng}`
      );
      setallbusi(res.data.allBusiness);
    } catch (error) {
      console.log("error during fetching API", error);
    }
  };
  useEffect(() => {
    fetchBusiness();
  }, [usercity, currentloc]);
  const nextPage = () => {
    navigate("/bussiness");
  };

  const renderRooms = () => {
    if (allbusi && allbusi.length > 0) {
      return allbusi.slice(0, 4).map((item) => <BusinessCard {...item} />);
    } else {
      return <p>Loading...</p>;
    }
  };

  return (
    <Container>
      <div className="px-2 py-2 md:px-6 md:py-10">
        <h1 className="text-2xl font-bold capitalize text-black lg:text-3xl">
          {usercity ? (
            <p>Bussiness In {usercity}</p>
          ) : (
            <p>Bussiness near you</p>
          )}
        </h1>
        <hr />
        <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 xl:mt-12 xl:grid-cols-2 xl:gap-16">
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
