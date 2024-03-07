import React, { useEffect, useState } from "react";
import LeafletMap from "../UserCompontents/LeafletMap";
import { useDispatch, useSelector } from "react-redux";
import Container from "../Container/Container";
import { location as redlocation } from "../../store/authslice";

function Getlocations() {
  const [showmap, setshowmap] = useState(true);
  const dispatch = useDispatch();
  const [currentLocation, setcurrentLocation] = useState({
    lat: 0,
    lng: 0,
  });
  useEffect(() => {
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setcurrentLocation({ lat: latitude, lng: longitude });
          },
          (error) => {
            console.error(error);
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
      }
    };

    getLocation();
  }, []);

  useEffect(() => {
    dispatch(redlocation({ location: currentLocation }));
  }, [currentLocation, dispatch]);
  // console.log("currentlocation", currentlocation);

  return (
    <div className="flex flex-col justify-center">
      <Container>
        {currentLocation && showmap ? (
          <div className=" flex justify-center py-2">
            {/* <LeafletMap
              onLocationReceived={currentLocation}
              style={{ height: "300px", width: "100%" }}
            /> */}
            {/* <p>{currentLocation.lat}</p> */}
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
