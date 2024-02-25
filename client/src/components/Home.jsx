import React, { useState } from "react";
import Getlocations from "./Getlocations";
import Header from "./Header";
import { useDispatch, useSelector } from "react-redux";
import Getproduct from "../pages/Getproduct";
import Container from "./Container/Container";
import Getrooms from "../pages/Rooms/Getrooms";
import Getjob from "../pages/Job/Getjob";
import GetbusforHome from "../pages/Bussiness/GetbusforHome";
import { cities } from "../store/authslice";

function Home() {
  const [city, setcity] = useState();
  const dispatch = useDispatch();
  const handleclick = (e) => {
    e.preventDefault;
    dispatch(cities({ city: city }));
    console.log(city);
  };
  return (
    <Container>
      <Getlocations />
      <input
        type="text"
        value={city}
        onChange={(e) => {
          setcity(e.target.value);
        }}
        className=" border-red-500 border-2"
      />
      <button onClick={handleclick}>Search</button>
      <Getrooms />
      <GetbusforHome />
      <Getjob />
      {/* <Getproduct /> */}
    </Container>
  );
}

export default Home;
