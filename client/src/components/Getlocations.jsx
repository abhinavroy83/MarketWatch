import React, { useEffect, useState } from "react";
import LeafletMap from "./LeafletMap";
import { useDispatch, useSelector } from "react-redux";
import Container from "./Container/Container";
import { location as redlocation } from "../store/authslice";

function Getlocations() {
  const [currentlocation, setcurrentlocation] = useState(null);
  const [showmap, setshowmap] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    Getlocations();
    dispatch(redlocation({ location: currentlocation }));
  }, [currentlocation]);

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
  // console.log("currentlocation", currentlocation);

  return (
    <div className="flex flex-col justify-center">
      <Container>
        {currentlocation && showmap ? (
          <div className=" flex justify-center py-2">
            <LeafletMap
              onLocationReceived={currentlocation}
              style={{ height: "300px", width: "100%" }}
            />
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
