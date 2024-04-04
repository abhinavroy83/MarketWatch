import React from "react";
import {
  AdminDashboard,
  AdminHeader,
} from "../../../components/AdminCompontents";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import axios from "axios";

function Addarea() {
  const { register, handleSubmit } = useForm();
  const token = useSelector((state) => state.adminauth.token);

  const onclick = async (data) => {
    console.log(data);
    try {
      const res = await axios.post(
        "https://marketwatch-e3hc.onrender.com/api/admin/postcity",
        data,
        {
          headers: {
            jwttoken: `${token}`,
          },
        }
      );
      if (res) {
        alert("added");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <AdminHeader />
      <AdminDashboard>
        <p>you can add Area here</p>
        <div className=" ">
          <form
            onSubmit={handleSubmit(onclick)}
            className="flex flex-col justify-center mx-auto"
          >
            <label htmlFor="">Country</label>
            <select {...register("country", { required: "true" })}>
              <option value="">Select...</option>
              <option value="Usa">USA</option>
            </select>
            <label htmlFor="">State</label>
            <select {...register("state", { required: "true" })}>
              <option value="">Select...</option>
              <option value="Oregon">Oregon</option>
              <option value="Washington">Washington</option>
            </select>
            <label htmlFor="">City</label>
            <input {...register("city", { required: true })} />

            <label htmlFor="">SubArea</label>
            <input {...register("subarea", { required: true })} />
            <button type="submit">Create Area</button>
          </form>
        </div>
      </AdminDashboard>
    </div>
  );
}

export default Addarea;
