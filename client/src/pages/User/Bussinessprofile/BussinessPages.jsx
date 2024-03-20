import React from "react";
import { useLocation } from "react-router-dom";
import Container from "../../../components/Container/Container";

function BussinessPages() {
  const location = useLocation();
  const data = location.state;
  console.log(data);

  const firstName = data && data.firstName;

  return (
    <Container>
      {firstName ? (
        <div>BussinessPages: {firstName}</div>
      ) : (
        <div>No firstName found in signupdata</div>
      )}
    </Container>
  );
}

export default BussinessPages;
