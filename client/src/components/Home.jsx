import React from "react";
import Getlocations from "./Getlocations";
import Header from "./Header";
import { useSelector } from "react-redux";
import Getproduct from "../pages/Getproduct";
import Container from "./Container/Container";
import Getrooms from "../pages/Rooms/Getrooms";

function Home() {
  return (
    <Container>
      <Getlocations />
      <h1>This is your home page</h1>
      <Getrooms />
      {/* <Getproduct /> */}
    </Container>
  );
}

export default Home;
