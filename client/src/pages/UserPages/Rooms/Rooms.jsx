import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ChildContainer, LeafletMap } from "../../../components";
import { useSelector } from "react-redux";
import CopyToClipboard from "react-copy-to-clipboard";
import Roomcard from "./Roomcard";

function Rooms() {
  const { _id } = useParams();
  const [rooms, setrooms] = useState([]);
  const [similarrooms, setsimilarrooms] = useState([]);
  const [locationsndString, setLocationsndString] = useState("");
  const [contactdet, setcontachdet] = useState(false);
  const [posteddate, setposteddate] = useState("");
  const authstatus = useSelector((state) => state.auth.status);
  const currentloc = useSelector((state) => state.auth.location);

  const url = `http://localhost:5173/rooms/${_id}`;
  const fetchroomdetails = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/getspecificroom/${_id}`
      );

      setrooms(res.data.rooms);
      const loc = {
        lat: res.data.rooms.location.coordinates[0],
        lng: res.data.rooms.location.coordinates[1],
      };

      const date = res.data.rooms.postedon
        ? new Date(res.data.rooms.postedon).toISOString().split("T")[0]
        : "";
      setposteddate(date);
      // console.log("locationsnd", locationString);
      setLocationsndString(loc);
    } catch (error) {
      console.log("error during fetching api", error);
    }
  };
  useEffect(() => {
    fetchroomdetails();
  }, []);
  const handlecopy = () => {
    alert("Link Copied");
  };
  const getRooms = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/getallrooms?lat=${currentloc.lat}&lng=${currentloc.lng}`
      );
      setsimilarrooms(res.data.Allrooms);
      // console.log(res.data.Allrooms);
    } catch (error) {
      console.log("error during fetching api", error);
    }
  };
  useEffect(() => {
    getRooms();
  }, [rooms]);

  const navigate = useNavigate();

  const renderRooms = () => {
    return similarrooms.slice(0, 3).map((item) => <Roomcard {...item} />);
  };

  return (
    <ChildContainer onLocationReceived={locationsndString}>
      <div className=" w-full max-w-7xl mx-auto px-4 py-2">
        <div className=" flex justify-between py-2">
          <div>
          <svg class="h-10 w-10 ml-1 text-black-500"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
           <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          <div className="flex pb-3">
          <img className="h-12 w-12 mt-3"src={`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSL8yWJzDEZZIG2fKqx1CjPuRqdUDx5W-BWIg&usqp=CAU`}/>
            <p className="mt-8 font-semibold text-[18px] font-[Roboto]">Washing Available Here</p>
          </div>
          </div>
          <div className=" cursor-pointer">
            <CopyToClipboard text={url} onCopy={handlecopy}>
              <svg
                class="h-8 w-8 text-red-500"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                {" "}
                <path stroke="none" d="M0 0h24v24H0z" />{" "}
                <circle cx="6" cy="12" r="3" /> <circle cx="18" cy="6" r="3" />{" "}
                <circle cx="18" cy="18" r="3" />{" "}
                <line x1="8.7" y1="10.7" x2="15.3" y2="7.3" />{" "}
                <line x1="8.7" y1="13.3" x2="15.3" y2="16.7" />
              </svg>
            </CopyToClipboard>
          </div>
        </div>
        <div className=" flex font-bold text-[20px]">
          <div>
            <img
              src={rooms.PrdImage}
              alt="roomimg"
              className="h-[600px] w-[880px] rounded-md object-cover"
            />
            <p className="font-[Poppins] mt-4">
              Posted By:{rooms.postedby} || Posted On:{posteddate}{" "}
            </p>
          </div>
          <div className="px-3 font-[Roboto] ml-7 flex flex-col gap-1">
              <p className="mt-3 text-2xl font-semibold text-gray-800 font-[Poppins]">
                {rooms.Hotelname}
              </p>
              <p className="text-red-700">{rooms.rent} monthly</p>
              <p>{rooms.address}</p>
              <p>
                {rooms.bed}Bed / {rooms.bath}Bath
              </p>
            <div>
              {locationsndString ? (
                <div className="mt-2">
                  <LeafletMap
                    onLocationReceived={locationsndString}
                    style={{ height: "300px", width: "500px" }}
                  />
                </div>
              ) : (
                <div>
                  <p>loading</p>
                </div>
              )}
            </div>
            <div>
              <button
                type="button"
                onClick={() => {
                  setcontachdet(true);
                  // if(authstatus)
                }}
                className="flex rounded-md bg-[#17b19f] mt-4 px-5 py-3 text-base text-[19px] font-semibold text-white shadow-sm hover:bg-[#17b19f]/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600"
              >
                <svg class="h-6 w-6 text-white-500 pt-1"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">  <path d="M15.05 5A5 5 0 0 1 19 8.95M15.05 1A9 9 0 0 1 23 8.94m-1 7.98v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                <span class="pt-1 ml-2">Get In touch </span>
              </button>
              {contactdet && authstatus ? (
                <div className="gap-4">
                  <p className="mt-3 mb-1 text-[17px]">Email:{rooms.email}</p>
                  <p className="text-[17px]">Number:{rooms.number}</p>
                </div>
              ) : null}
            </div>
          </div>
        </div>
        <div className="font-[Poppins] py-2 text-red-700">Description:{rooms.description}</div>
        <div className="mb-2">
          <div className="mt-2 flex items-center ">
            <div className=" flex justify-between w-full text-[18px] font-[Poppins]">
              <p>Similar room in the Area</p>
              <p
                className=" cursor-pointer"
                onClick={() => {
                  navigate("/rooms");
                }}
              >
                See full list of Roommates
              </p>
            </div>
          </div>
          <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 xl:mt-10 xl:grid-cols-3 xl:gap-16">
            {renderRooms()}
          </div>
        </div>
      </div>
    </ChildContainer>
  );
}

export default Rooms;
