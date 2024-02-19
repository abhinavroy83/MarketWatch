import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Rooms() {
  const { _id } = useParams();
  const [rooms, setrooms] = useState([]);

  const fetchroomdetails = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/getspecificroom/${_id}`
      );
      console.log(res.data.rooms);
      setrooms(res.data.rooms);
    } catch (error) {
      console.log("error during fetching api", error);
    }
  };
  useEffect(() => {
    fetchroomdetails();
  }, []);
  return (
    <div className=" w-full max-w-7xl mx-auto px-4 py-2">
      <div className=" flex justify-between py-2">
        <div>
          <svg
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
          <p>we add later the washing icon</p>
        </div>
        <div>
          <svg
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
          </svg>
        </div>
      </div>
      <div>
        <div>
          <img
            src={rooms.PrdImage}
            alt="roomimg"
            className="h-[500px] w-[700px] rounded-md object-cover"
          />
        </div>
      </div>
    </div>
  );
}

export default Rooms;
