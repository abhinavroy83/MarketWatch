import axios from "axios";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

function Container({ children }) {
  const currentloc = useSelector((state) => state.auth.location);
  // useEffect(() => {
  //   axios
  //     .get(
  //       `https://api.openweathermap.org/data/2.5/weather?lat=${currentloc.lat}&lon=${currentloc.lng}&appid=5e414d6a2d51b65b62d9b463859ae456`
  //     )
  //     .then((res) => {
  //       console.log(res.data), setwhetherdata(res.data);
  //     })
  //     .catch((error) => console.log("Error during fetcing whether", error));
  // }, [currentloc]);
  return <div className="w-full max-w-7xl mx-auto">{children}</div>;
}

export default Container;
