import React, { useEffect, useState } from "react";
import { DashConatiner } from "../../../components";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";

function Profile() {
  const { userID } = useParams();
  const { register, handleSubmit, setValue } = useForm();
  const [isedit, setisedit] = useState(false);
  const [data, setdata] = useState({});
  const navigate = useNavigate();
  const fetchuser = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/user/dashboard/profile/${userID}`
      );
      // console.log(res.data.user);
      setdata(res.data.user);
    } catch (error) {
      console.log("error during fetcing userdetails");
    }
  };

  const toggleEdit = () => {
    setisedit(true);
  };
  const toggleCancel = () => {
    setisedit(false);
  };
  const handleclick = (data) => {
    try {
      const res = axios.put(
        `http://localhost:8000/user/updateuser/${userID}`,
        data
      );
      if (res) {
        alert("updated successfuly");
        navigate(`/myaccount/${userID}`);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    fetchuser();
  }, [userID]);

  useEffect(() => {
    if (Object.keys(data).length !== 0) {
      for (const key in data) {
        setValue(key, data[key]);
      }
    }
  }, [data, setValue]);
  return (
    <DashConatiner>
      <form onSubmit={handleSubmit(onclick)}>
        <div className="flex font-[Montserrat] font-semibold">
          <label>FirstName:</label>
          {isedit ? (
            <input
              type="text"
              {...register("firstName")}
              defaultValue={data.firstName}
            />
          ) : (
            <p>{data.firstName}</p>
          )}
        </div>
        <div className="flex font-[Montserrat] font-semibold">
          <label>LastName:</label>
          {isedit ? (
            <input
              type="text"
              {...register("lastName")}
              defaultValue={data.lastName}
            />
          ) : (
            <p>{data.lastName}</p>
          )}
        </div>
        <div className=" flex font-[Montserrat] font-semibold">
          <label>City:</label>
          {isedit ? (
            <input type="text" {...register("city")} defaultValue={data.city} />
          ) : (
            <p>{data.city}</p>
          )}
        </div>
        <div className=" flex font-[Montserrat] font-semibold">
          <label>Country:</label>
          {isedit ? (
            <input
              type="text"
              {...register("country")}
              defaultValue={data.country}
            />
          ) : (
            <p>{data.country}</p>
          )}
        </div>

        {data.bussinessac === "no" && (
          <div className="flex">
            <p>for bussiness account :</p>
            <a className=" cursor-pointer">Click here</a>
          </div>
        )}

        {isedit ? (
          <button className="font-[Montserrat] font-semibold bg-black p-2 rounded-lg text-white mt-3" type="submit">Update</button>
        ) : (
          <button className="font-[Montserrat] font-semibold bg-black p-2 px-3 rounded-lg text-white mt-3" onClick={toggleEdit}>Edit</button>
        )}
        {isedit && <button className="font-[Montserrat] ml-4 font-semibold" onClick={toggleCancel}>Cancel</button>}
      </form>
    </DashConatiner>
  );
}

export default Profile;
