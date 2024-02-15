import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Container } from "../../components";
import { ArrowUpRight } from "lucide-react";

function Getrooms() {
  const currentloc = useSelector((state) => state.auth.location);
  const [rooms, setrooms] = useState([]);
  //   console.log(currentloc);
  const getrooms = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/getallrooms?lat=${currentloc.lat}&lng=${currentloc.lng}`
      );
      console.log(res.data.Allrooms);
      setrooms(res.data.Allrooms);
    } catch (error) {
      console.log("error during fetcing api", error);
    }
  };
  useEffect(() => {
    getrooms();
  }, [currentloc]);
  return (
    <Container>
      <div className="px-2 py-2 md:px-6 md:py-10">
        <h1 className="text-2xl font-bold capitalize text-black lg:text-3xl">
          Rooms Near You
        </h1>
        <hr />
        <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 xl:mt-12 xl:grid-cols-3 xl:gap-16">
          {rooms.map((item) => (
            <div className="flex max-w-2xl flex-col items-center rounded-md border md:flex-row">
              <div className="h-full w-full md:h-[200px] md:w-[300px]">
                <img
                  src={item.PrdImage}
                  alt="Laptop"
                  className="h-[200px] w-full rounded-md object-cover"
                />
              </div>
              <div>
                <div className="p-4">
                  <h1 className="inline-flex items-center text-lg font-semibold">
                    {item.Hotelname}
                  </h1>
                  <p className="mt-3 text-sm text-gray-600">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Excepturi, debitis?
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
}

export default Getrooms;
