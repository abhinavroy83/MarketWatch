import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Addrooms from "./Addrooms";
import axios from "axios";

function Editroom() {
  const { _id } = useParams();
  const [data, setdata] = useState([]);
  // console.log(_id);

  useEffect(() => {
    const fetchroom = async () => {
      try {
        const res = await axios.get(
          `https://api.verydesi.com/api/getspecificroom/${_id}`
        );
        console.log(res.data.rooms);
        setdata(res.data.rooms);
      } catch (error) {
        console.log("error during fetching room at edit room page", error);
      }
    };
    fetchroom();
  }, [_id]);
  // console.log(data);
  return (
    <div>
      <Addrooms editdata={data} />
    </div>
  );
}

export default Editroom;
