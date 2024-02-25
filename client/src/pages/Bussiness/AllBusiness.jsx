import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ChildContainer } from "../../components";
import BusinessCard from "./BusinessCard";

function AllBusiness() {
  const currentloc = useSelector((state) => state.auth.location);
  const [deatails, setdetails] = useState([]);
  const usercity = useSelector((state) => state.auth.city);

  const fetchallbusiness = async () => {
    try {
      const res = await axios.get(
        usercity
          ? `http://localhost:8000/api/getbusinessbyloc?city=${usercity}`
          : `http://localhost:8000/api/getbusinessbyloc?lat=${currentloc.lat}&lng=${currentloc.lng}`
      );
      setdetails(res.data.allBusiness);
    } catch (error) {
      console.log("error during fetching api");
    }
  };
  useEffect(() => {
    fetchallbusiness();
  }, [currentloc, usercity]);

  const renderRooms = () => {
    if (deatails && deatails.length > 0) {
      return deatails.map((item) => <BusinessCard {...item} />);
    } else {
      return <p>Loading...</p>;
    }
  };
  return (
    <ChildContainer>
      <div className="px-2 py-2 md:px-6 md:py-10">
        <h1 className="text-2xl font-bold capitalize text-black lg:text-3xl">
          {usercity ? (
            <p>Bussiness In {usercity}</p>
          ) : (
            <p>Bussiness near you</p>
          )}
        </h1>
        <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 xl:mt-12 xl:grid-cols-2 xl:gap-16">
          {renderRooms()}
        </div>
      </div>
    </ChildContainer>
  );
}

export default AllBusiness;