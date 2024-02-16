import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Container } from "../../components";
import { ArrowUpRight } from "lucide-react";

function Getrooms() {
  const currentloc = useSelector((state) => state.auth.location);
  const [rooms, setRooms] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const getRooms = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/getallrooms?lat=${currentloc.lat}&lng=${currentloc.lng}`
      );
      setRooms(res.data.Allrooms);
    } catch (error) {
      console.log("error during fetching api", error);
    }
  };

  useEffect(() => {
    getRooms();
  }, [currentloc]);

  const nextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const renderRooms = () => {
    const startIndex = (currentPage - 1) * 6;
    const endIndex = Math.min(startIndex + 6, rooms.length);
    return rooms.slice(startIndex, endIndex).map((item) => (
      <div
        key={item.id}
        className="flex max-w-2xl flex-col items-center rounded-md border md:flex-row"
      >
        <div className="h-full w-full md:h-[200px] md:w-[300px]">
          <img
            src={item.PrdImage}
            alt="Room"
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
    ));
  };

  return (
    <Container>
      <div className="px-2 py-2 md:px-6 md:py-10">
        <h1 className="text-2xl font-bold capitalize text-black lg:text-3xl">
          Rooms Near You
        </h1>
        <hr />
        <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 xl:mt-12 xl:grid-cols-3 xl:gap-16">
          {renderRooms()}
        </div>
        <div className="mt-4 w-full border-gray-300">
          <div className="mt-2 flex items-center justify-end">
            <div className="space-x-2">
              {currentPage > 1 && (
                <button
                  className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                  onClick={prevPage}
                >
                  &larr; Previous
                </button>
              )}
              {rooms.length > currentPage * 4 && (
                <button
                  className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                  onClick={nextPage}
                >
                  Next &rarr;
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default Getrooms;
