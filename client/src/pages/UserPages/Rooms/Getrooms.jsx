import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Roomcard from "./Roomcard";
import { Container } from "../../../components";

function Getrooms() {
  const currentloc = useSelector((state) => state.auth.location);
  const usercity = useSelector((state) => state.auth.city);

  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate();

  const getRooms = async () => {
    try {
      const res = await axios.get(
        usercity
          ? `https://marketwatch-e3hc.onrender.comapi/getallrooms?city=${usercity}`
          : `https://marketwatch-e3hc.onrender.comapi/getallrooms?lat=${currentloc.lat}&lng=${currentloc.lng}`
      );
      setRooms(res.data.Allrooms);
      // console.log(res.data.Allrooms);
    } catch (error) {
      console.log("error during fetching api", error);
    }
  };

  useEffect(() => {
    getRooms();
  }, [currentloc, usercity]);

  const nextPage = () => {
    navigate("/rooms");
  };

  const renderRooms = () => {
    return rooms
      .slice(0, 6)
      .map((item) => <Roomcard key={item.id} {...item} />);
  };

  return (
    <Container>
      <div className="px-2 py-2 md:px-6 mt-7 md:py-6">
        <div className="flex justify-between">
          <h1 className="text-4xl font-bold capitalize text-black lg:text-4xl font-roboto text-[36px]">
            {usercity ? (
              <p>Rooms & Roomates In {usercity}</p>
            ) : (
              <p>Rooms near you</p>
            )}
          </h1>
          <button
            className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            // onClick={nextPage}
          >
            Add Rooms
          </button>
        </div>
        <article className="flex xl:mt-2">
          <div className=" grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-2 xl:gap-5">
            {renderRooms()}
          </div>
          <div className="w-[500px] flex-grow ml-5">
            <article className="flex gap-2 items-center">
              <img
                className="h-[70px] w-[70px]"
                src={`https://g.foolcdn.com/art/companylogos/square/intc.png`}
              />
              <h1 className="text-2xl font-semibold font-roboto text-black ml-2">
                Company Name
              </h1>
              <p className="text-2xl font-semibold text-black font-roboto text-right ml-[8.5rem]">
                $310
              </p>
            </article>
            <hr />
            <article className="flex gap-2 items-center mt-2">
              <img
                className="h-[70px] w-[75px]"
                src={`https://cdn.pixabay.com/photo/2015/05/26/09/37/paypal-784404_1280.png`}
              />
              <h1 className="text-2xl font-semibold font-roboto text-black ml-2">
                Company Name
              </h1>
              <p className="text-2xl font-semibold text-black font-roboto text-right ml-[8.5rem]">
                $550
              </p>
            </article>
            <hr />
            <article className="flex gap-2 items-center mt-2">
              <img
                className="h-[70px] w-[75px]"
                src={`https://g.foolcdn.com/art/companylogos/square/intc.png`}
              />
              <h1 className="text-2xl font-semibold font-roboto text-black ml-2">
                Company Name
              </h1>
              <p className="text-2xl font-semibold text-black font-roboto text-right ml-[8.5rem]">
                $550
              </p>
            </article>
            <hr />
            <article className="flex gap-2 items-center mt-2">
              <img
                className="h-[70px] w-[75px]"
                src={`https://cdn.pixabay.com/photo/2015/05/26/09/37/paypal-784404_1280.png`}
              />
              <h1 className="text-2xl font-semibold font-roboto text-black ml-2">
                Company Name
              </h1>
              <p className="text-2xl font-semibold text-black font-roboto text-right ml-[8.5rem]">
                $550
              </p>
            </article>
            <hr />
            <article className="flex gap-2 items-center mt-2">
              <img
                className="h-[70px] w-[75px]"
                src={`https://g.foolcdn.com/art/companylogos/square/intc.png`}
              />
              <h1 className="text-2xl font-semibold font-roboto text-black ml-2">
                Company Name
              </h1>
              <p className="text-2xl font-semibold text-black font-roboto text-right ml-[8.5rem]">
                $550
              </p>
            </article>
            <hr />
            <article className="flex gap-2 items-center mt-2">
              <img
                className="h-[70px] w-[75px]"
                src={`https://cdn.pixabay.com/photo/2015/05/26/09/37/paypal-784404_1280.png`}
              />
              <h1 className="text-2xl font-semibold font-roboto text-black ml-2">
                Company Name
              </h1>
              <p className="text-2xl font-semibold text-black font-roboto text-right ml-[8.5rem]">
                $550
              </p>
            </article>
            <hr />
          </div>
        </article>
      </div>
    </Container>
  );
}

export default Getrooms;
