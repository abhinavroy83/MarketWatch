import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AddArea from "../AddArea";

function Editarea() {
  const { area_name } = useParams();
  const [data, setdata] = useState([]);

  const fetchdata = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/admin/area/${area_name}`
      );
      console.log(res.data.area);
      setdata(res.data.area);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchdata();
  }, [area_name]);

  return (
    <div>
      <AddArea editdata={data[0]} />
    </div>
  );
}

export default Editarea;
