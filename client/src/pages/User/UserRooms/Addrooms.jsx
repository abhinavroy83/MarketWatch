import React from "react";
import { DashConatiner, Input } from "../../../components";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function Addrooms() {
  const currentLocation = useSelector((state) => state.auth.location);
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();
  console.log(currentLocation);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const { userID } = useParams();
  const onsubmit = async (data) => {
    const roomdata = {
      city: data.city,
      Hotelname: data.Hotelname,
      PrdImage: data.PrdImage,
      rent: data.rent,
      address: data.address,
      location: {
        coordinates: [currentLocation.lat, currentLocation.lng],
      },
    };
    try {
      const res = await axios.post(
        "http://localhost:8000/api/addrooms",
        roomdata,
        {
          headers: {
            jwttoken: `${token}`,
          },
        }
      );
      if (res) {
        console.log(res);
        alert("rooms added successfully");
        reset();
        navigate(`/user/room/${userID}`);
      }
    } catch (error) {
      console.log("error during sending data to roomapi", error);
    }
  };
  return (
    <DashConatiner>
      <div>
        <p>Here u can add room</p>
        <h1>chekc schema </h1>
      
        {/* <p>{currentLocation.lat}</p>
        <p>{currentLocation.lng}</p> */}
        <form
          onSubmit={handleSubmit(onsubmit)}
          className=" flex flex-col justify-center items-center"
        >
          <Input
            label="City"
            type="text"
            {...register("city", {
              required: "city required",
            })}
            errorMessage={errors.city?.message}
          />
          <Input
            label="Hotelname"
            type="text"
            {...register("Hotelname", {
              required: "Hotelname required",
            })}
            errorMessage={errors.Hotelname?.message}
          />
          <Input
            label="Hotel Image Url"
            type="text"
            {...register("PrdImage", {
              required: "PrdImage required",
            })}
            errorMessage={errors.PrdImage?.message}
          />
          <Input
            label="rent"
            type="text"
            {...register("rent", {
              required: "rent required",
            })}
            errorMessage={errors.rent?.message}
          />
          <Input
            label="Hotel Address"
            type="text"
            {...register("address", {
              required: "address required",
            })}
            errorMessage={errors.address?.message}
          />

          <button
            type="submit"
            className="rounded-md bg-black  my-2 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            Add Hotel
          </button>
        </form>
      </div>
    </DashConatiner>
  );
}

export default Addrooms;
