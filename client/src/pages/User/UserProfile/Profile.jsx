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
      <div className="flex">
      <h1 className="text-4xl p-2 ml-2 font-bold text-[#000] mt-7 font-[Montserrat]">
        You Can Edit Your Profile
      </h1>
      <svg class="h-[3rem] w-[3rem] text-black mt-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
</svg>

        </div>
      <h1 className="text-lg ml-5 text-[#000] font-[Montserrat]">
        Write Updated Changes Here-
      </h1>
      <form onSubmit={handleSubmit(onclick)}>
        <div className="flex font-[Montserrat] font-semibold p-2 mt-3 ml-4">
          <label>FirstName:</label>
          {isedit ? (
            <input className="ml-4 p-1 rounded-base"
              type="text"
              {...register("firstName")}
              defaultValue={data.firstName}
            />
          ) : (
            <p>{data.firstName}</p>
          )}
        </div>
        <div className="flex font-[Montserrat] font-semibold p-2 ml-4">
          <label>LastName:</label>
          {isedit ? (
            <input className="ml-4 p-1 rounded-base"
              type="text"
              {...register("lastName")}
              defaultValue={data.lastName}
            />
          ) : (
            <p>{data.lastName}</p>
          )}
        </div>
        <div className=" flex font-[Montserrat] font-semibold p-2 ml-4">
          <label>City:</label>
          {isedit ? (
            <input className="ml-4 p-1 rounded-base" type="text" {...register("city")} defaultValue={data.city} />
          ) : (
            <p>{data.city}</p>
          )}
        </div>
        <div className=" flex font-[Montserrat] font-semibold p-2 ml-4">
          <label>Country:</label>
          {isedit ? (
            <input className="ml-4 p-1 rounded-base"
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
          <button className="font-[Montserrat] ml-5 font-semibold bg-black p-2 rounded-lg text-white mt-3" type="submit">Update Changes</button>
        ) : (
          <button className="font-[Montserrat] ml-5 font-semibold bg-black p-2 px-3 rounded-lg text-white mt-3" onClick={toggleEdit}>Edit Profile</button>
        )}
        {isedit && <button className="font-[Montserrat] ml-4 font-semibold" onClick={toggleCancel}>Cancel</button>}
      </form>
    </DashConatiner>
  );
}

export default Profile;
