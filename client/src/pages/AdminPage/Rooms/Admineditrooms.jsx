import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import axios from "axios";
import AdminPostRooms from "./AdminPostRooms";

function Admineditrooms() {
  const { _id } = useParams();
  const [data, setdata] = useState([]);
  // console.log(_id);

  useEffect(() => {
    const fetchroom = async () => {
      try {
        const res = await axios.get(
          `https://api.verydesi.com/api/getspecificroom/${_id}`
        );
        setdata(res.data.rooms);
      } catch (error) {
        console.log("error during fetching room at edit room page", error);
      }
    };
    fetchroom();
  }, [_id]);
  return (
    <div>
      <AdminPostRooms editdata={data} />
    </div>
  );
}

export default Admineditrooms;
