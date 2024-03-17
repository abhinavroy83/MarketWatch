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
      State: data.State,
      Hotelname: data.Hotelname,
      PrdImage: data.PrdImage,
      rent: data.rent,
      address: data.address,
      bed: data.bed,
      bath: data.bath,
      postedby: data.postedby,
      description: data.description,
      email: data.email,
      number: data.number,
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
      <div className="font-[Montserrat] font-semibold">
        <p className="text-3xl text-center mt-3">You Can Add New Room</p>
        <h1 className="text-1xl text-center mt-3">Check Schema </h1>

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
              required: "City required",
            })}
            errorMessage={errors.city?.message}
          />
          <Input
            label="State"
            type="text"
            {...register("State", {
              required: "State required",
            })}
            errorMessage={errors.State?.message}
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
              required: "Rent required",
            })}
            errorMessage={errors.rent?.message}
          />
          <Input
            label="Hotel Address"
            type="text"
            {...register("address", {
              required: "Address required",
            })}
            errorMessage={errors.address?.message}
          />
          <Input
            label="bed"
            type="text"
            {...register("bed", {
              required: "Address required",
            })}
            errorMessage={errors.bed?.message}
          />
          <Input
            label="bath"
            type="text"
            {...register("bath", {
              required: "Bath required",
            })}
            errorMessage={errors.bath?.message}
          />
          <Input
            label="postedby"
            type="text"
            {...register("postedby", {
              required: "Postedby required",
            })}
            errorMessage={errors.postedby?.message}
          />
          <Input
            label="description"
            type="text"
            {...register("description", {
              required: "Description required",
            })}
            errorMessage={errors.description?.message}
          />
          <Input
            label="email"
            type="text"
            {...register("email", {
              required: "Email required",
            })}
            errorMessage={errors.email?.message}
          />
          <Input
            label="number"
            type="text"
            {...register("number", {
              required: "Number required",
            })}
            errorMessage={errors.number?.message}
          />

          <button
            type="submit"
            className="rounded-md mt-7 bg-black  my-2 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            Add Hotel
          </button>
        </form>
      </div>
    </DashConatiner>
  );
}

export default Addrooms;
