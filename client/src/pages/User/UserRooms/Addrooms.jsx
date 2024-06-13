import React, { useEffect, useState } from "react";
import { DashConatiner, FormInput } from "../../../components";
import { useSelector } from "react-redux";
import { Controller, useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { fetchcity } from "../../../Services/CityApi/Cityapi";
import { IoInformationCircleSharp } from "react-icons/io5";

function Addrooms() {
  const currentLocation = useSelector((state) => state.auth.location);
  const token = useSelector((state) => state.auth.token);
  const cunrtcity = useSelector((state) => state.auth.city);
  const navigate = useNavigate();
  const [areadata, setarea] = useState([]);
  const [filterstate, setfilterstate] = useState([]);
  const [filtercity, setfiltercity] = useState([]);
  const [filtersubarea, setfiltersubarea] = useState([]);
  const [zip, setzip] = useState([]);
  const [userimgs, setuserimg] = useState("");
  const [uti, setuti] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm();
  const { userID } = useParams();
  const handleimgchange = async (e) => {
    const file = e.target.files[0];
    // console.log(file);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "ml_default");
    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dp3hpp62z/image/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const uploadedImageUrl = response.data.secure_url;
      console.log(uploadedImageUrl);
      setuserimg(uploadedImageUrl);
    } catch (error) {
      console.error("Error uploading image:", error);
      if (error.response) {
        console.error("Response data:", error.response.data);
        // Extract and log the error message
        const errorMessage = error.response.data.error.message;
        console.error("Error message:", errorMessage);
      }
    }
  };
  const onsubmit = async (data) => {
    // console.log(data);
    const roomdata = {
      Adname: data.Adname,
      area: data.area,
      rent: data.rent,
      utilities: data.utilities,
      bed: data.bed,
      bath: data.bath,
      laundary: data.laundary,
      subarea: data.subarea,
      gender: data.gender,
      city: data.city,
      State: data.State,
      PrdImage: userimgs,
      address: data.address,
      postedby: data.postedby,
      description: data.description,
      email: data.email,
      number: data.number,
      location: {
        coordinates: [currentLocation.lng, currentLocation.lat],
      },
    };
    // console.log(roomdata);
    try {
      const res = await axios.post(
        " https://api.verydesi.com/api/addrooms",
        roomdata,
        {
          headers: {
            jwttoken: `${token}`,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (res) {
        // console.log(res);
        alert("rooms added successfully");
        reset();
        navigate(`/user/room/${userID}`);
      }
    } catch (error) {
      console.log("error during sending data to roomapi", error);
    }
  };

  useEffect(() => {
    const fetchdata = async () => {
      const ststs = await fetchcity();
      setarea(ststs.data.city);
      const uniquestate = Array.from(
        new Set(ststs.data.city.map((item) => item.state))
      );
      console.log(uniquestate);
      setfilterstate(uniquestate);
    };
    fetchdata();
  }, []);

  const handlestate = (e) => {
    const selectedstate = e.target.value;
    const upfcity = areadata.filter((item) => item.state === selectedstate);
    const uniquecity = [...new Set(upfcity.map((item) => item.city))];
    setfiltercity(uniquecity);
    const subar = areadata.filter((item) => item.state === selectedstate);
    // const subarea = subar.map((item) => item.area);
    // setfiltersubarea(subarea);
  };

  const handlecities = (e) => {
    const selectedCity = e.target.value;
    const subar = areadata.filter((item) => item.city === selectedCity);
    // const subarea = subar.map((item) => item.area);
    const uniquearea = [...new Set(subar.map((item) => item.area))];
    // console.log(uniquearea);
    setfiltersubarea(uniquearea);
  };

  const handlearea = (e) => {
    const selectedarea = e.target.value;
    // console.log(selectedarea);

    const zipCodes = areadata
      .filter((item) => item.area === selectedarea)
      .map((item) => item.zipcode);

    // console.log(zipCodes);
    setzip(zipCodes);
  };

  return (
    <div className="w-[1400px] m-auto items-center mt-48 justify-center bg-white shadow-lg shadow-black/30">
      <div className="font-['udemy-regular'] mx-20">
        <p className="text-[30px] font-semibold text-[#000] mt-4 flex items-center justify-center">
          Post Room In {cunrtcity}
        </p>
        {/* <p>{currentLocation.lat}</p>
        <p>{currentLocation.lng}</p> */}
        <form
          onSubmit={handleSubmit(onsubmit)}
          className="flex flex-col justify-center mt-7 gap-5 items-center"
        >
          <div className="w-full">
            <div className="flex">
              <label
                className="text-[21px] w-[343px] font-['udemy-regular'] leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 inline-block"
                htmlFor=""
              >
                Title
              </label>
              <input
                className="font-['udemy-regular'] h-10 w-full text-[18px] border border-black/20 bg-transparent px-3 py-2 placeholder:text-gray-400 bg-white focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                label="Title"
                type="text"
                placeholder="Title"
                {...register("description", {
                  required: "Title is required",
                })}
                // errorMessage={errors.area?.message}
              />
            </div>

            <div className="mt-10 flex">
              <label
                className="text-[21px] w-[343px] font-['udemy-regular'] peer-disabled:cursor-not-allowed peer-disabled:opacity-70 inline-block"
                htmlFor=""
              >
                Description
              </label>
              <textarea
                className="h-100px w-full text-[18px] font-['udemy-regular'] text-21px border border-black/20 bg-transparent px-3 py-2 placeholder:text-gray-400 bg-white focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                name="description"
                placeholder="Description"
                {...register("description", {
                  required: "Description is required",
                })}
              />
            </div>
            <div className="flex mt-10">
              <label
                className="text-[21px] w-[343px] font-['udemy-regular'] peer-disabled:cursor-not-allowed peer-disabled:opacity-70 inline-block"
                htmlFor=""
              >
                Property Type
              </label>
              <Controller
                name="propertytype"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <select
                    {...field}
                    className="h-100px w-full text-[18px] font-['udemy-regular'] text-21px border border-black/20 bg-transparent px-3 py-2 placeholder:text-gray-400 bg-white focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    name=""
                    id=""
                  >
                    <option value="">Select</option>
                    <option value="singlefamilyhome">Single Family Home</option>
                    <option value="apartment">Apartment</option>
                    <option value="condo">Condo</option>
                    <option value="town">Town House</option>
                    <option value="home">Homes</option>
                    <option value="house">House</option>
                    <option value="basement">Basement Apartment</option>
                  </select>
                )}
              />
            </div>
            <div className="flex mt-10">
              <label
                className="text-[21px] w-[343px] font-['udemy-regular'] peer-disabled:cursor-not-allowed peer-disabled:opacity-70 inline-block"
                htmlFor=" "
              >
                Posting In
              </label>

              <select
                className="h-100px w-full text-[18px] font-['udemy-regular'] text-21px border border-black/20 bg-transparent px-3 py-2 placeholder:text-gray-400 bg-white focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                {...register("city", {
                  required: "City is required",
                })}
                defaultValue=""
                onChange={handlecities}
              >
                <option className="text-gray-600" value="" disabled hidden>
                  Select city
                </option>
                {filtercity.map((city, index) => (
                  <option value={city} key={index}>
                    {city}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex text-[18px] mt-10">
              <label
                htmlFor=""
                className="text-[21px] w-[266px] font-['udemy-regular'] leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 inline-block"
              >
                Stay/Laese
              </label>
              <div className=" grid grid-cols-4 gap-4 text-[18px] w-[957px]">
                <div className="flex gap-1 whitespace-nowrap">
                  <input type="radio" {...register("stay/lease")} />
                  <p>Long term(6+ months) </p>
                </div>
                <div className=" flex gap-1">
                  <input type="radio" {...register("stay/lease")} />
                  <p>Short term </p>
                </div>
                <div className=" flex gap-1">
                  <input type="radio" {...register("stay/lease")} />
                  <p>Both </p>
                </div>
              </div>
            </div>

            <div className="flex mt-10 gap-5">
              <label
                className="text-[21px] w-[246px] font-['udemy-regular'] leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 inline-block"
                htmlFor=""
              >
                Avaliblity
              </label>
              <input
                className="h-100px w-[210px] text-[18px] font-['udemy-regular'] border border-black/20 bg-transparent px-3 py-2 placeholder:text-gray-400 bg-white focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                type="text"
                placeholder="Available from"
              />
              <input
                className="h-100px w-[263px] text-[18px] font-['udemy-regular'] border border-black/20 bg-transparent px-3 py-2 placeholder:text-gray-400 bg-white focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                type="text"
                placeholder="Available to"
              />
            </div>
            <div className="flex text-[18px] mt-10">
              <label
                className="text-[21px] w-[268px] font-['udemy-regular'] peer-disabled:cursor-not-allowed peer-disabled:opacity-70 inline-block"
                htmlFor=""
              >
                Day Available
              </label>
              <div className=" grid grid-cols-4 gap-4 text-[18px] w-[980px]">
                <div className=" flex items-center gap-1">
                  <input type="radio" {...register("dayavailable")} />
                  <p>7 days a week </p>
                </div>
                <div className=" flex items-center gap-1">
                  <input type="radio" {...register("dayavailable")} />
                  <p>Weekends only </p>
                </div>
                <div className=" flex items-center gap-1">
                  <input type="radio" {...register("dayavailable")} />
                  <p>Monday to friday only </p>
                </div>
              </div>
            </div>
            <div className=" flex mt-10 text-[18px] gap-20">
              <label
                className="text-[21px] w-[188px] font-['udemy-regular'] peer-disabled:cursor-not-allowed peer-disabled:opacity-70 inline-block"
                htmlFor=""
              >
                Attached Bath
              </label>
              <div className="grid grid-cols-4 gap-4 text-[18px] w-[980px]">
                <div className=" flex gap-1 items-center">
                  <input type="radio" {...register("Bath")} />
                  <p>Yes </p>
                </div>
                <div className=" flex gap-1 items-center">
                  <input type="radio" {...register("Bath")} />
                  <p>No </p>
                </div>
              </div>
            </div>

            <div className="flex mt-10 text-[18px] gap-20">
              <label
                className="text-[21px] w-[188px] font-['udemy-regular'] peer-disabled:cursor-not-allowed peer-disabled:opacity-70 inline-block"
                htmlFor=""
              >
                Preferred Gender
              </label>
              <div className="grid grid-cols-4 gap-4 text-[18px] w-[980px]">
                <div className=" flex gap-1 items-center">
                  <input type="radio" {...register("gender")} />
                  <p>Any </p>
                </div>
                <div className=" flex gap-1 items-center">
                  <input type="radio" {...register("gender")} />
                  <p>Male only</p>
                </div>
                <div className=" flex items-center gap-1">
                  <input type="radio" {...register("gender")} />
                  <p>Female only</p>
                </div>
              </div>
            </div>

            <div className="flex mt-10 text-[18px]">
              <label
                className="text-[21px] w-[266px] font-['udemy-regular'] peer-disabled:cursor-not-allowed peer-disabled:opacity-70 inline-block"
                htmlFor=""
              >
                Expected Rooms
              </label>
              <span className=" bg-gray-200 items-center justify-center inline-block text-[18px] font-['udemy-regular'] font-bold border border-black/20 px-3 py-2 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50">
                $
              </span>
              <input
                type="text"
                placeholder="Rent"
                className="h-100px w-[323px] text-[18px] font-['udemy-regular'] border border-black/20 bg-transparent px-3 py-2 placeholder:text-gray-400 bg-white focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
              />
              <input className="gap-1 ml-3" type="checkbox" />
              <p className="px-3 py-2 text-black gap-1">Negotiable</p>
              <input type="checkbox" />
              <p className="px-3 py-2 text-black">Hide Rent</p>
            </div>

            <div className="mt-10 flex">
              <label
                className="text-[21px] w-[266px] font-['udemy-regular'] peer-disabled:cursor-not-allowed peer-disabled:opacity-70 inline-block"
                htmlFor=""
              >
                Price Model
              </label>
              {/* <input
                className="h-100px w-[360px] text-[18px] font-['udemy-regular'] border border-black/20 bg-transparent px-3 py-2 placeholder:text-gray-400 bg-white focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                type="text"
                placeholder=" price model"
              /> */}
              <select
                name=""
                id=""
                className="h-100px w-[360px] text-[18px] font-['udemy-regular'] text-21px border border-black/20 bg-transparent px-3 py-2 placeholder:text-gray-400 bg-white focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="">Select</option>
                <option value="">Per Month</option>
                <option value="">Per Night</option>
                <option value="">Per Day</option>
                <option value="">Per Week</option>
              </select>
            </div>

            <div className="mt-10">
              <label
                className="text-[21px] w-[266px] font-['udemy-regular'] peer-disabled:cursor-not-allowed peer-disabled:opacity-70 inline-block"
                htmlFor=""
              >
                Desposite
              </label>
              <span className=" bg-gray-200 items-center justify-center inline-block text-[18px] font-['udemy-regular'] font-bold border border-black/20 px-3 py-2 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50">
                $
              </span>
              <input
                type="text"
                placeholder="Rent"
                className="h-100px w-[323px] text-[18px] font-['udemy-regular'] border border-black/20 bg-transparent px-3 py-2 placeholder:text-gray-400 bg-white focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>
            <div className="mt-10">
              <label
                className="text-[21px] w-[267px] font-['udemy-regular'] peer-disabled:cursor-not-allowed peer-disabled:opacity-70 inline-block"
                htmlFor=""
              >
                Is the room/furnished ?
              </label>
              <select
                className="h-100px w-[360px] text-[18px] font-['udemy-regular'] border border-black/20 bg-transparent px-3 py-2 placeholder:text-gray-400 bg-white focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                name=""
                id=""
              >
                <option value="">Select</option>
                <option value="">Unfurnished</option>
                <option value="">Furnished with Bed</option>
                <option value="">Semi Furnished</option>
                <option value="">Fully Furnished</option>
              </select>
            </div>

            <div className=" flex mt-10">
              <label
                className="text-[21px] w-[269px] font-['udemy-regular'] peer-disabled:cursor-not-allowed peer-disabled:opacity-70 inline-block"
                htmlFor=""
              >
                Amenities include
              </label>

              <div className=" grid grid-cols-4 gap-4 text-[18px] w-[980px]">
                <div className=" flex gap-1">
                  <input
                    // className="px-3 py-2 text-black mr-1 "
                    value=""
                    type="checkbox"
                    {...register("amenities")}
                  />
                  <p>Gym/Fitness Center</p>
                </div>
                <div className="flex gap-1">
                  <input value="" type="checkbox" {...register("amenities")} />
                  <p>Swimming Pool</p>
                </div>
                <div className=" flex gap-1">
                  <input value="" type="checkbox" {...register("amenities")} />
                  <p>Car Park</p>
                </div>
                <div className=" flex gap-1">
                  <input value="" type="checkbox" {...register("amenities")} />
                  <p>Visitors Parking</p>
                </div>
                <div className=" flex gap-1">
                  <input value="" type="checkbox" {...register("amenities")} />
                  <p>Power Backup</p>
                </div>
                <div className=" flex gap-1">
                  <input value="" type="checkbox" {...register("amenities")} />
                  <p>Garbage Disposal</p>
                </div>
                <div className=" flex gap-1">
                  <input value="" type="checkbox" {...register("amenities")} />
                  <p>Private Lawn</p>
                </div>
                <div className=" flex gap-1">
                  <input value="" type="checkbox" {...register("amenities")} />
                  <p>Water Heater Plant</p>
                </div>
                <div className=" flex gap-1">
                  <input value="" type="checkbox" {...register("amenities")} />
                  <p>Security System</p>
                </div>
                <div className=" flex gap-1">
                  <input value="" type="checkbox" {...register("amenities")} />
                  <p>Laundry Service</p>
                </div>
                <div className=" flex gap-1">
                  <input value="" type="checkbox" {...register("amenities")} />
                  <p>Elevator</p>
                </div>
                <div className=" flex gap-1">
                  <input value="" type="checkbox" {...register("amenities")} />
                  <p>Club House</p>
                </div>
              </div>
            </div>
            <div className=" flex mt-10 gap-20 text-[18px]">
              <label
                className="whitespace-nowrap text-[21px] w-[185px] font-['udemy-regular'] peer-disabled:cursor-not-allowed peer-disabled:opacity-70 inline-block"
                htmlFor=""
              >
                Vegeterian Preference
              </label>
              <div className=" grid grid-cols-4 gap-4 text-[18px] w-[980px]">
                <div className="flex gap-1 items-center whitespace-nowrap">
                  <input type="radio" {...register("vegeterianperference")} />
                  <p>Yes,Vegeterian mandatory</p>
                </div>
                <div className=" flex gap-1 items-center">
                  <input type="radio" {...register("vegeterianperference")} />
                  <p>No,Non-veg is ok</p>
                </div>
                <div className="flex gap-1 items-center">
                  <input type="radio" {...register("vegeterianperference")} />
                  <p>Both</p>
                </div>
              </div>
            </div>
            <div className=" flex gap-20 mt-10 text-[18px]">
              <label
                className="text-[21px] w-[187px] font-['udemy-regular'] peer-disabled:cursor-not-allowed peer-disabled:opacity-70 inline-block"
                htmlFor=""
              >
                Smoking Policy
              </label>
              <div className=" grid grid-cols-4 gap-4 text-[18px] w-[980px]">
                <div className=" flex gap-1 items-center">
                  <input type="radio" {...register("smokingpolicy")} />
                  <p>No Smoking</p>
                </div>
                <div className=" flex gap-1 items-center">
                  <input type="radio" {...register("smokingpolicy")} />
                  <p>Smoking is ok</p>
                </div>
                <div className=" flex gap-1 items-center">
                  <input type="radio" {...register("smokingpolicy")} />
                  <p>Smoke outside only</p>
                </div>
              </div>
            </div>

            <div className=" flex mt-10 text-[18px] gap-20">
              <label
                className="text-[21px] w-[187px] font-['udemy-regular'] peer-disabled:cursor-not-allowed peer-disabled:opacity-70 inline-block"
                htmlFor=""
              >
                Pet Friendly
              </label>

              <div className=" grid grid-cols-4 gap-4 text-[18px] w-[980px]">
                <div className=" flex gap-1 items-center">
                  <input type="radio" {...register("petfriendly")} />
                  <p>No Pets</p>
                </div>
                <div className=" flex gap-1 items-center">
                  <input type="radio" {...register("petfriendly")} />
                  <p>Only Dogs</p>
                </div>
                <div className=" flex gap-1 items-center">
                  <input type="radio" {...register("petfriendly")} />
                  <p>Only Cats</p>
                </div>
                <div className=" flex gap-1 items-center">
                  <input type="radio" {...register("petfriendly")} />
                  <p>Any Pet is Ok</p>
                </div>
              </div>
            </div>

            <div className="mt-10">
              <label
                className="text-[21px] w-[269px] font-['udemy-regular'] peer-disabled:cursor-not-allowed peer-disabled:opacity-70 inline-block"
                htmlFor=""
              >
                Open House Schedule
              </label>
              <input
                type="text"
                placeholder="Open House Date"
                className="font-['udemy-regular'] h-10 w-[360px] text-[18px] border border-black/20 bg-transparent px-3 py-2 placeholder:text-gray-400 bg-white focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>
            <div>
              <p className="text-[23px] font-bold mt-2">Upload Photo:-</p>
              <p className="mt-2 text-[21px] font-['udemy-regular'] peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Add Photo
              </p>
              <input type="file" accept="image/*" className="mt-1" />
            </div>

            <div>
              <p className="text-[23px] mt-5 font-bold">Your Details:-</p>
              <div>
                <label
                  className="mt-2 text-[21px] w-[270px] font-['udemy-regular'] peer-disabled:cursor-not-allowed peer-disabled:opacity-70 inline-block"
                  htmlFor=""
                >
                  Name*
                </label>
                <input
                  type="text"
                  placeholder="Enter Name"
                  className="font-['udemy-regular'] h-10 w-[360px] text-[18px] border border-black/20 bg-transparent px-3 py-2 placeholder:text-gray-400 bg-white focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>
              <div className="mt-10">
                <label
                  className="text-[21px] w-[270px] font-['udemy-regular'] peer-disabled:cursor-not-allowed peer-disabled:opacity-70 inline-block"
                  htmlFor=""
                >
                  Email*
                </label>
                <input
                  type="text"
                  placeholder="Enter Email"
                  className="font-['udemy-regular'] h-10 w-[360px] text-[18px] border border-black/20 bg-transparent px-3 py-2 placeholder:text-gray-400 bg-white focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>
              <div className="mt-10">
                <label
                  className="text-[21px] w-[270px] font-['udemy-regular'] peer-disabled:cursor-not-allowed peer-disabled:opacity-70 inline-block"
                  htmlFor=""
                >
                  Phone Number*
                </label>
                <input
                  type="text"
                  placeholder="Enter Number"
                  className="font-['udemy-regular'] h-10 w-[360px] text-[18px] border border-black/20 bg-transparent px-3 py-2 placeholder:text-gray-400 bg-white focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>
            </div>
          </div>

          {/* Area Name- */}
          <div className=" shadow-gray-300 w-[1300px] items-center justify-center p-4 pt-0 mt-7">
            {/* <p className="text-2xl text-black font-semibold flex items-center justify-center gap-2 p-1">
              <IoInformationCircleSharp />
              Area Name
            </p> */}
            <article className="flex flex-col gap-4 px-4">
            <div className="">
                <label
                  className="text-[21px] w-[270px] font-['udemy-regular'] peer-disabled:cursor-not-allowed peer-disabled:opacity-70 inline-block"
                  htmlFor=""
                >
                  Address
                </label>
                <input
                  type="text"
                  placeholder="Enter Address"
                  className="font-['udemy-regular'] h-10 w-[360px] text-[18px] border border-black/20 bg-transparent px-3 py-2 placeholder:text-gray-400 bg-white focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>
              <div className="mt-7">
                <div>
                  <div className="flex items-center">
                    <label 
                  className="text-[21px] w-[270px] font-['udemy-regular'] peer-disabled:cursor-not-allowed peer-disabled:opacity-70 inline-block"
                  htmlFor="">
                      State
                    </label>
                    <select
                      className="flex h-10 font-['udemy-regular'] w-[360px] text-[18px] border border-black/30 bg-transparent px-3 py-2 placeholder:text-gray-600 bg-white focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 "
                      {...register("State", {
                        required: "State is required",
                      })}
                      defaultValue=""
                      onChange={handlestate}
                    >
                      <option value="" disabled hidden>
                        Select State
                      </option>
                      {filterstate.map((state, index) => (
                        <option
                          className="text-[16px]"
                          value={state}
                          key={index}
                        >
                          {state}
                        </option>
                      ))}
                    </select>
                  </div>
                  <p className="text-[16px] text-red-500 mt-1">
                    {" "}
                    {errors.state && <p>{errors.state?.message}</p>}
                  </p>
                  {/* {errors.state && <p>{errors.state?.message}</p>} */}
                </div>

                <div>
                  <div className="flex items-center mt-10">
                    <label 
                  className="text-[21px] w-[270px] font-['udemy-regular'] peer-disabled:cursor-not-allowed peer-disabled:opacity-70 inline-block"
                  htmlFor="">
                      City
                    </label>
                    <div>
                      <select
                      className="flex h-10 font-['udemy-regular'] w-[360px] text-[18px] border border-black/30 bg-transparent px-3 py-2 placeholder:text-gray-600 bg-white focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 "
                      {...register("city", {
                          required: "City is required",
                        })}
                        defaultValue=""
                        onChange={handlecities}
                      >
                        <option
                          className="text-gray-600"
                          value=""
                          disabled
                          hidden
                        >
                          Select city
                        </option>
                        {filtercity.map((city, index) => (
                          <option value={city} key={index}>
                            {city}
                          </option>
                        ))}
                      </select>
                      <p className="text-[16px] text-red-500 mt-1">
                        {" "}
                        {errors.city && <p>{errors.city?.message}</p>}
                      </p>
                    </div>{" "}
                  </div>
                </div>
              </div>
              {/* Subarea */}
              <div className="mt-5">
                <div className="flex items-center">
                  <label 
                  className="text-[21px] w-[270px] font-['udemy-regular'] peer-disabled:cursor-not-allowed peer-disabled:opacity-70 inline-block"
                  htmlFor="">
                    Subarea
                  </label>
                  <div>
                    <select
                      className="flex h-10 font-['udemy-regular'] w-[360px] text-[18px] border border-black/30 bg-transparent px-3 py-2 placeholder:text-gray-600 bg-white focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 "
                      {...register("subarea", {
                        required: "subarea is required",
                      })}
                      defaultValue=""
                      onChange={handlearea}
                    >
                      <option value="" disabled hidden>
                        Select Subarea
                      </option>
                      {filtersubarea.map((subarea, index) => (
                        <option value={subarea} key={index}>
                          {subarea}
                        </option>
                      ))}
                    </select>
                    <p className="text-[16px] text-red-500 mt-1">
                      {" "}
                      {errors.subarea && <p>{errors.subarea?.message}</p>}
                    </p>
                  </div>
                </div>
                <div className="flex items-center mt-10">
                  <label 
                  className="text-[21px] w-[270px] font-['udemy-regular'] peer-disabled:cursor-not-allowed peer-disabled:opacity-70 inline-block"
                  htmlFor="">
                    Zip code
                  </label>
                  <div>
                    <select
                      className="flex h-10 font-['udemy-regular'] w-[360px] text-[18px] border border-black/30 bg-transparent px-3 py-2 placeholder:text-gray-600 bg-white focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 "
                      {...register("Zipcode", {
                        required: "Zipcode is required",
                      })}
                      defaultValue=""
                    >
                      <option value="" disabled hidden>
                        Select Zipcode
                      </option>
                      {zip.map((subarea, index) => (
                        <option value={subarea} key={index}>
                          {subarea}
                        </option>
                      ))}
                    </select>
                    <p className="text-[16px] text-red-500 mt-1">
                      {" "}
                      {errors.subarea && <p>{errors.subarea?.message}</p>}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-7">
                <label
                  className="text-[21px] w-[270px] font-['udemy-regular'] peer-disabled:cursor-not-allowed peer-disabled:opacity-70 inline-block"
                  htmlFor=""
                >
                  Posted By
                </label>
                <input
                  type="text"
                  placeholder="Posted By"
                  className="font-['udemy-regular'] h-10 w-[360px] text-[18px] border border-black/20 bg-transparent px-3 py-2 placeholder:text-gray-400 bg-white focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>
              {/* <FormInput
                label="Posted By"
                type="text"
                placeholder="Posted By"
                {...register("postedby", {
                  required: "Postedby required",
                })}
                errorMessage={errors.postedby?.message}
              /> */}
            </article>
          </div>

          <button
            type="submit"
            className="rounded-md bg-green-800 my-5 mt-0 px-4 py-3 mb-10 text-[18px] self-center font-semibold text-white shadow-sm hover:bg-green-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            Add New Room
          </button>
        </form>
      </div>
    </div>
  );
}

export default Addrooms;
