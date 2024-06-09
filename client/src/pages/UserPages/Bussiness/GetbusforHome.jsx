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
          ? ` http://api.verydesi.com/api/getbusinessbyloc?city=${usercity}`
          : ` http://api.verydesi.com/api/getbusinessbyloc?lat=${currentloc.lat}&lng=${currentloc.lng}`
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
      return allbusi.slice(0, 6).map((item) => <BusinessCard {...item} />);
    } else {
      return <p>Loading...</p>;
    }
  };

  return (
    <Container>
      {allbusi.length > 0 ? (
        <div className="px-2 py-2 md:px-6 md:py-6">
          <div className="flex justify-between">
          <h1 className="text-4xl font-bold capitalize font-[opensans] text-black lg:text-4xl ">
            {usercity ? (
              <p>Bussiness In {usercity}</p>
            ) : (
              <p className="text-4xl font-[opensans]">Bussiness near you</p>
            )}
          </h1>
          <button
              className="rounded-md bg-[#17b19f] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              // onClick={nextPage}
            >
              More Rooms
            </button>
            </div>  
          <div className="mt-2 grid grid-cols-1 gap-8 md:grid-cols-2 xl:mt-2 xl:grid-cols-2 xl:gap-5">
            {renderRooms()}
          </div>
        </div>
      ) : null}
    </Container>
  );
}

export default GetbusforHome;
