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
      <div className="flex ml-9">
        <input
          placeholder="Start Your Search"
          type="text"
          value={city}
          onChange={(e) => {
            setcity(e.target.value);
          }}
          className="w-1/2 text-center hover:bg-white/80 border-black border-2 mt-1 bg-gray-200 rounded-full px-1 py-1.5"
        />
        <button className="hover:bg-black/80 ml-3 bg-black text-white px-5 mt-1 rounded-full" onClick={handleclick}><svg class="h-8 w-8 text-white"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <circle cx="10" cy="10" r="7" />  <line x1="21" y1="21" x2="15" y2="15" /></svg></button>
      </div>
      <Getrooms />
      <GetbusforHome />
      <Getjob />
      {/* <Getproduct /> */}
    </Container>
  );
}

export default Home;
