import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BusinessCard from "./BusinessCard";
import { useSelector } from "react-redux";
import { ChildContainer, LeafletMap } from "../../../components";

function Bussiness() {
  const { _id } = useParams();
  const [deatails, setdet] = useState([]);
  const [posteddate, setposteddate] = useState("");
  const [contactdet, setcontachdet] = useState(false);
  const [locationsndString, setLocationsndString] = useState("");
  const authstatus = useSelector((state) => state.auth.status);

  const fetchdetails = async () => {
    try {
      const res = await axios.get(
        `https://marketwatch-e3hc.onrender.com
  /api/getspecificbuss/${_id}`
      );
      // console.log(res.data.Allbusineses);
      setdet(res.data.Allbusineses);
      const dates = res.data.Allbusineses.date
        ? new Date(res.data.Allbusineses.date).toISOString().split("T")[0]
        : "";
      setposteddate(dates);
      const loc = {
        lat: res.data.Allbusineses.location.coordinates[0],
        lng: res.data.Allbusineses.location.coordinates[1],
      };
      setLocationsndString(loc);
    } catch (error) {
      console.log("error during fetching api");
    }
  };
  useEffect(() => {
    fetchdetails();
  }, [_id]);
  // const renderRooms = () => {
  //   return similardeatails.slice(0, 3).map((item) => <BusinessCard {...item} />);
  // };
  return (
    <ChildContainer>
    <div className="w-full max-w-7xl mx-auto px-4 py-2 mt-10 font-[Montserrat]">
      <div className=" flex justify-between py-2">
        <div>
          {/* <svg
            class="h-8 w-8 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
          <p>we add later the washing icon</p> */}
        </div>
        <div className=" cursor-pointer">
          {/* <CopyToClipboard text={url} onCopy={handlecopy}>
            </CopyToClipboard> */}
          {/* <svg
            class="h-8 w-8 text-gray-500"
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
          </svg> */}
        </div>
      </div>
      <div className="flex w-full max-w-7xl mx-auto">
        <div>
          {/* <p className="text-4xl font-bold font-[opensans]">Jobs</p> */}
          <img
            src={deatails.Image}
            alt="roomimg"
            className="h-[300px] w-[1200px] rounded-md object-cover"
          />
          {/* <p>
            Posted By:{deatails.business_name} || Posted On:{posteddate}{" "}
          </p> */}
        </div>
        {/* <div className=" px-3 border-red-500 border-2 ml-7">
          <p className="mt-3 text-2xl font-semibold text-gray-800">
            {deatails.business_name}
          </p>
          <p>Opening hour {deatails.hours_open} </p>
          <p>{deatails.address}</p>
          <div>
            <button
              type="button"
              onClick={() => {
                setcontachdet(true);
                // if(authstatus)
              }}
              className="rounded-md mx-auto bg-[#17b19f] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-yellow-600/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600"
            >
              Get In touch
            </button>
            {contactdet && authstatus ? (
              <div>
                <p>Email:{deatails.email}</p>
                <p>Number:{deatails.number}</p>
              </div>
            ) : null}
          </div>
        </div> */}
      <div>
        
      </div>
      </div>
      <div className="text-2xl font-semibold text-gray-800 py-2">Job Description</div>
      <div className="text-sm text-amber-950 ">
      <p>{deatails.description}</p><p>{deatails.description}</p><br/>
      <p>{deatails.description}</p><p>{deatails.description}</p><p>{deatails.description}</p>
      </div>
      <div>
            {locationsndString ? (
              <div className="mt-5 w-full">
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
      <div className=" mb-2">
        <div className="mt-2 flex items-center ">
          <div className=" flex justify-between w-full">
            {/* <p>Similar room in the Area</p>
            <p
              className=" cursor-pointer"
              onClick={() => {
                // navigate("/deatails");
              }}
            >
              See full list of Roommates
            </p> */}
          </div>
        </div>
        {/* <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 xl:mt-12 xl:grid-cols-3 xl:gap-16">
          {renderRooms()}
        </div> */}
      </div>
    </div>
    </ChildContainer>
  );
}

export default Bussiness;
