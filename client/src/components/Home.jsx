import React from "react";
import Getlocations from "./Getlocations";
import Header from "./Header";
import { useSelector } from "react-redux";
import Getproduct from "../pages/Getproduct";
import Container from "./Container/Container";
import Getrooms from "../pages/Rooms/Getrooms";
import Getjob from "../pages/Job/Getjob";

function Home() {
  return (
    <Container>
      <Getlocations />
      <Getrooms />
      <Getjob />
      {/* <Getproduct /> */}
    </Container>
  );
}

export default Home;
