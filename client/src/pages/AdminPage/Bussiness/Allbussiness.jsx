import React, { useEffect } from "react";
import {
  AdminDashboard,
  AdminHeader,
} from "../../../components/AdminCompontents";
import axios from "axios";

function Allbussiness() {
  const fetchbussiness = async (city) => {
    try {
      const res = await axios.get(
        city
          ? `http://localhost:8000/api/admin/getallbussiness/${city}`
          : `http://localhost:8000/api/admin/getallbussiness`
      );
      console.log(res.data.Allbussiness);
    } catch (error) {
      console.log("Error during fetching business", error);
    }
  };

  useEffect(() => {
    fetchbussiness();
  }, []);
  return (
    <div>
      <AdminHeader />
      <AdminDashboard>hello</AdminDashboard>
    </div>
  );
}

export default Allbussiness;
