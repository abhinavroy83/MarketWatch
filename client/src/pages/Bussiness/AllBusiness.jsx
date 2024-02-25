import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ChildContainer } from "../../components";
import BusinessCard from "./BusinessCard";

function AllBusiness() {
  const currentloc = useSelector((state) => state.auth.location);
  const [deatails, setdetails] = useState([]);
  const fetchallbusiness = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/getbusinessbyloc?lat=${currentloc.lat}&lng=${currentloc.lng}`
      );
      console.log(res.data.Allbusiness);
      setdetails(res.data.Allbusiness);
    } catch (error) {
      console.log("error during fetching api");
    }
  };
  useEffect(() => {
    fetchallbusiness();
  }, [currentloc]);

  const Bussinesss = () => {
    return deatails.map((item) => <BusinessCard {...item} />);
  };
  return (
    <ChildContainer>
      <div className="px-2 py-2 md:px-6 md:py-10">
        <h1 className="text-2xl font-bold capitalize text-black lg:text-3xl">
          Bussiness Near You
        </h1>
        <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 xl:mt-12 xl:grid-cols-2 xl:gap-16">
          {Bussinesss()}
        </div>
      </div>
    </ChildContainer>
  );
}

export default AllBusiness;
