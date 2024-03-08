import React, { useEffect, useState } from "react";
import {
  AdminDashboard,
  AdminHeader,
} from "../../../components/AdminCompontents";
import axios from "axios";

function Allroom() {
  const [data, setdata] = useState([]);
  const fetchrooms = async (city) => {
    try {
      const res = await axios.get(
        city
          ? `http://localhost:8000/api/admin/getroombycity/${city}`
          : `http://localhost:8000/api/admin/getallrooms`
      );

      console.log(res.data.Allroom);
      setdata(res.data.Allroom);
    } catch (error) {
      console.log("Error during fetching rooms", error);
    }
  };
  useEffect(() => {
    fetchrooms();
  }, []);
  return (
    <div>
      <AdminHeader />
      <AdminDashboard>hello</AdminDashboard>
    </div>
  );
}

export default Allroom;
