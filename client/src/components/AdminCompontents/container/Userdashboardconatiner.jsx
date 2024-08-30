import React, { Children } from "react";
import AdminDashboard from "./Dashboard";
import AdminHeader from "../AdminHeader";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function Userdashboardconatiner({ children }) {
  const navigate = useNavigate();
  const { id } = useParams();
  // console.log(id);
  const handledeleteuser = async () => {
    try {
      const dlt = await axios.delete(
        ` https://api.verydesi.com/api/admin/deleteuser/${id}`
      );
      // console.log(dlt);
      if (dlt) {
        alert("successfully deleted");
        navigate("/admin/alluser");
      }
    } catch (error) {
      console.log("error");
    }
  };
  const handledeleteuserwithdata = async () => {
    try {
      const dlt = await axios.delete(
        ` https://api.verydesi.com/api/admin/deleteuserwithdata/${id}`
      );
      // console.log(dlt);
      if (dlt) {
        alert("successfully deleted");
        navigate("/admin/alluser");
      }
    } catch (error) {
      console.log("error");
    }
  };

  return (
    <div>
      <AdminDashboard>
        <div className="flex flex-col">
          <div className=" flex">
            <p>Delete account with data?</p>
            <button
              onClick={() => {
                if (
                  confirm("Are you sure to delete account with data") == true
                ) {
                  handledeleteuserwithdata();
                } else {
                  alert("cancle");
                }
              }}
              className=" px-2 border-2 border-red-400"
            >
              yes
            </button>
            <button
              onClick={() => {
                if (
                  confirm("Are you sure to delete account without data") == true
                ) {
                  handledeleteuser();
                } else {
                  alert("cancle");
                }
              }}
              className="px-2 border-2 border-red-400 mx-2"
            >
              no
            </button>
          </div>
          <div>
            <button className="rounded-md bg-transparent px-3 py-2 text-sm font-semibold text-black hover:bg-black/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black">
              Your Profile
            </button>
            <button
              onClick={() => {
                navigate(`/admin/confirmtodelete/userrooms/${id}`);
              }}
              className="rounded-md bg-transparent px-3 py-2 text-sm font-semibold text-black hover:bg-black/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
              All Rooms
            </button>
            <button className="rounded-md bg-transparent px-3 py-2 text-sm font-semibold text-black hover:bg-black/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black">
              All Bussiness
            </button>
          </div>
          <aside>{children}</aside>
        </div>
      </AdminDashboard>
    </div>
  );
}

export default Userdashboardconatiner;
