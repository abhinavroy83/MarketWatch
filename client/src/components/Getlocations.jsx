import React, { useEffect, useState } from "react";
import LeafletMap from "./LeafletMap";
import { useSelector } from "react-redux";
import Container from "./Container/Container";

function Getlocations() {
  const [currentlocation, setcurrentlocation] = useState(null);
  const [showmap, setshowmap] = useState(true);

  useEffect(() => {
    Getlocations();
  }, []);

  const Getlocations = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setcurrentlocation(`${latitude},${longitude}`);
        },
        (error) => {
          console.error(error);
        }
      );
    }
  };

  return (
    <div className="flex flex-col justify-center">
      <Container>
        <p className="text-white font-dm-sans text-3xl font-bold leading-[144.023%]">
          Your Current location
        </p>

        {currentlocation && showmap ? (
          <div className=" flex justify-center py-2">
            <LeafletMap onLocationReceived={currentlocation} />
            {/* <p>{currentlocation}</p> */}
          </div>
        ) : (
          <div>
            <p>loading</p>
          </div>
        )}
      </Container>
    </div>
  );
}

export default Getlocations;
