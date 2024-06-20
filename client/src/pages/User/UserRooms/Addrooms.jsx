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

  const [filtercity, setfiltercity] = useState([]);

  const [zip, setzip] = useState([]);
  const [userimgs, setuserimg] = useState("");
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [resimgurl, setResimgurl] = useState([]);
  const [imgerror, setimgerror] = useState(false);
  const [uploadstats, setUploadstats] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm();
  const { userID } = useParams();
  const handleSelectFile = (e) => {
    const selectedFiles = Array.from(e.target.files);
    if (selectedFiles.length + files.length > 5) {
      alert("You can upload up to 5 images.");
      return;
    }
    const newFiles = selectedFiles.map((file) => {
      return {
        file,
        preview: URL.createObjectURL(file),
      };
    });
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    setimgerror(false);
  };

  const handleUpload = async () => {
    try {
      setLoading(true);
      const data = new FormData();
      files.forEach(({ file }) => {
        data.append("my_files", file);
      });

      const res = await axios.post("https://api.verydesi.com/img/upload", data);
      const urls = res.data.map((img) => img.url);
      if (res) {
        setResimgurl(urls);
        setUploadstats(true);
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const onsubmit = async (data) => {
    if (files.length === 0) {
      setimgerror(true);
      return;
    }
    // console.log(data);
    const roomdata = {
      Title: data.Title,
      Description: data.Description,
      Propertytype: data.Propertytype,
      city: data.PostingIn,
      Stay_lease: data.Stay_lease,
      Avaliblity_from: data.Avaliblity_from,
      Available_to: data.Available_to,
      Day_Available: data.Day_Available,
      Attchd_Bath: data.Attchd_Bath,
      Preferred_gender: data.Preferred_gender,
      Expected_Rooms: data.Expected_Rooms,
      Pricemodel: data.Pricemodel,
      Desposite: data.Desposite,
      is_room_furnished: data.is_room_furnished,
      Amenities_include: data.Amenities_include,
      Vegeterian_prefernce: data.Vegeterian_prefernce,
      Smoking_policy: data.Smoking_policy,
      Pet_friendly: data.Pet_friendly,
      Open_house_schedule: data.Open_house_schedule,
      Imgurl: resimgurl,
      user_name: data.user_name,
      email: data.email,
      phone_number: data.phone_number,
      address: data.address,
      zip_code: data.zip_code,
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
      const res = await fetchcity();
      const uniquecity = Array.from(
        new Set(res.data.city.map((item) => item.city))
      );
      setfiltercity(uniquecity);
    };
    fetchdata();
  }, []);

  return (
    <div className=" w-full mx-auto mt-44">
      <div className="w-full max-w-[1400px] mx-auto items-center  justify-center bg-white shadow-lg shadow-black/30">
        <div className="font-['udemy-regular'] mx-20">
          <p className="text-[30px] font-semibold text-[#000] flex items-center justify-center">
            Post Room In {cunrtcity}
          </p>
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
                  {...register("Title", {
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
                  {...register("Description", {
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
                  name="Propertytype"
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
                      <option value="Single Family Home">
                        Single Family Home
                      </option>
                      <option value="Apartment">Apartment</option>
                      <option value="Condo">Condo</option>
                      <option value="Town">Town House</option>
                      <option value="Home">Homes</option>
                      <option value="House">House</option>
                      <option value="Basement">Basement Apartment</option>
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
                  {...register("PostingIn", {
                    required: "PostingIn is required",
                  })}
                  defaultValue=""
                  // onChange={handlecities}
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
                    <input
                      type="radio"
                      value="Long term(6+ months)"
                      {...register("Stay_lease")}
                    />
                    <p>Long term(6+ months) </p>
                  </div>
                  <div className=" flex gap-1">
                    <input
                      type="radio"
                      value="Short term"
                      {...register("Stay_lease")}
                    />
                    <p>Short term </p>
                  </div>
                  <div className=" flex gap-1">
                    <input
                      type="radio"
                      value="Both"
                      {...register("Stay_lease")}
                    />
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
                  className="h-100px w-[225px] text-[18px] font-['udemy-regular'] border border-black/20 bg-transparent px-3 py-2 placeholder:text-gray-400 bg-white focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="text"
                  placeholder="Available from"
                  {...register("Avaliblity_from")}
                />
                <input
                  className="h-100px w-[263px] text-[18px] font-['udemy-regular'] border border-black/20 bg-transparent px-3 py-2 placeholder:text-gray-400 bg-white focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="text"
                  placeholder="Available to"
                  {...register("Available_to")}
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
                    <input
                      type="radio"
                      value="7 days a week"
                      {...register("Day_Available")}
                    />
                    <p>7 days a week </p>
                  </div>
                  <div className=" flex items-center gap-1">
                    <input
                      type="radio"
                      value="Weekends only"
                      {...register("Day_Available")}
                    />
                    <p>Weekends only </p>
                  </div>
                  <div className=" flex items-center gap-1">
                    <input
                      type="radio"
                      value="Monday to friday only"
                      {...register("Day_Available")}
                    />
                    <p>Monday to friday only</p>
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
                    <input
                      type="radio"
                      value="Yes"
                      {...register("Attchd_Bath")}
                    />
                    <p>Yes </p>
                  </div>
                  <div className=" flex gap-1 items-center">
                    <input
                      type="radio"
                      value="No"
                      {...register("Attchd_Bath")}
                    />
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
                    <input
                      type="radio"
                      value="Any"
                      {...register("Preferred_gender")}
                    />
                    <p>Any </p>
                  </div>
                  <div className=" flex gap-1 items-center">
                    <input
                      type="radio"
                      value="Male only"
                      {...register("Preferred_gender")}
                    />
                    <p>Male only</p>
                  </div>
                  <div className=" flex items-center gap-1">
                    <input
                      type="radio"
                      value="Female only"
                      {...register("Preferred_gender")}
                    />
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
                  className="h-100px w-[462px] text-[18px] font-['udemy-regular'] border border-black/20 bg-transparent px-3 py-2 placeholder:text-gray-400 bg-white focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  {...register("Expected_Rooms")}
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
                <select
                  {...register("Pricemodel")}
                  className="h-100px w-[500px] text-[18px] font-['udemy-regular'] text-21px border border-black/20 bg-transparent px-3 py-2 placeholder:text-gray-400 bg-white focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="">Select</option>
                  <option value="Per Month">Per Month</option>
                  <option value="Per Night">Per Night</option>
                  <option value="Per Day">Per Day</option>
                  <option value="Per Week">Per Week</option>
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
                  {...register("Desposite")}
                  type="text"
                  placeholder="Rent"
                  className="h-100px w-[462px] text-[18px] font-['udemy-regular'] border border-black/20 bg-transparent px-3 py-2 placeholder:text-gray-400 bg-white focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
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
                  className="h-100px w-[500px] text-[18px] font-['udemy-regular'] border border-black/20 bg-transparent px-3 py-2 placeholder:text-gray-400 bg-white focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  {...register("is_room_furnished")}
                >
                  <option value="">Select</option>
                  <option value="Unfurnished">Unfurnished</option>
                  <option value="Furnished with Bed">Furnished with Bed</option>
                  <option value="Semi Furnished">Semi Furnished</option>
                  <option value="Fully Furnished">Fully Furnished</option>
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
                      value="Gym/Fitness Center"
                      type="checkbox"
                      {...register("Amenities_include")}
                    />
                    <p>Gym/Fitness Center</p>
                  </div>
                  <div className="flex gap-1">
                    <input
                      type="checkbox"
                      value="Swimming Pool"
                      {...register("Amenities_include")}
                    />
                    <p>Swimming Pool</p>
                  </div>
                  <div className=" flex gap-1">
                    <input
                      value="Car Park"
                      type="checkbox"
                      {...register("Amenities_include")}
                    />
                    <p>Car Park</p>
                  </div>
                  <div className=" flex gap-1">
                    <input
                      value="Visitors Parking"
                      type="checkbox"
                      {...register("Amenities_include")}
                    />
                    <p>Visitors Parking</p>
                  </div>
                  <div className=" flex gap-1">
                    <input
                      value="Power Backup"
                      type="checkbox"
                      {...register("Amenities_include")}
                    />
                    <p>Power Backup</p>
                  </div>
                  <div className=" flex gap-1">
                    <input
                      value="Garbage Disposal"
                      type="checkbox"
                      {...register("Amenities_include")}
                    />
                    <p>Garbage Disposal</p>
                  </div>
                  <div className=" flex gap-1">
                    <input
                      value="Private Lawn"
                      type="checkbox"
                      {...register("Amenities_include")}
                    />
                    <p>Private Lawn</p>
                  </div>
                  <div className=" flex gap-1">
                    <input
                      value="Water Heater Plant"
                      type="checkbox"
                      {...register("Amenities_include")}
                    />
                    <p>Water Heater Plant</p>
                  </div>
                  <div className=" flex gap-1">
                    <input
                      value="Security System"
                      type="checkbox"
                      {...register("Amenities_include")}
                    />
                    <p>Security System</p>
                  </div>
                  <div className=" flex gap-1">
                    <input
                      value="Laundry Service"
                      type="checkbox"
                      {...register("Amenities_include")}
                    />
                    <p>Laundry Service</p>
                  </div>
                  <div className=" flex gap-1">
                    <input
                      value="Elevator"
                      type="checkbox"
                      {...register("Amenities_include")}
                    />
                    <p>Elevator</p>
                  </div>
                  <div className=" flex gap-1">
                    <input
                      value="Club House"
                      type="checkbox"
                      {...register("Amenities_include")}
                    />
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
                    <input
                      type="radio"
                      value="Yes,Vegeterian mandatory"
                      {...register("Vegeterian_prefernce")}
                    />
                    <p>Yes,Vegeterian mandatory</p>
                  </div>
                  <div className=" flex gap-1 items-center">
                    <input
                      type="radio"
                      value="No,Non-veg is ok"
                      {...register("Vegeterian_prefernce")}
                    />
                    <p>No,Non-veg is ok</p>
                  </div>
                  <div className="flex gap-1 items-center">
                    <input
                      type="radio"
                      value="Both"
                      {...register("Vegeterian_prefernce")}
                    />
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
                    <input
                      type="radio"
                      value="No Smoking"
                      {...register("Smoking_policy")}
                    />
                    <p>No Smoking</p>
                  </div>
                  <div className=" flex gap-1 items-center">
                    <input
                      type="radio"
                      value="Smoking is ok"
                      {...register("Smoking_policy")}
                    />
                    <p>Smoking is ok</p>
                  </div>
                  <div className=" flex gap-1 items-center">
                    <input
                      type="radio"
                      value="Smoke outside only"
                      {...register("Smoking_policy")}
                    />
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
                    <input
                      type="radio"
                      value="No Pets"
                      {...register("Pet_friendly")}
                    />
                    <p>No Pets</p>
                  </div>
                  <div className=" flex gap-1 items-center">
                    <input
                      type="radio"
                      value="Only Dogs"
                      {...register("Pet_friendly")}
                    />
                    <p>Only Dogs</p>
                  </div>
                  <div className=" flex gap-1 items-center">
                    <input
                      type="radio"
                      value="Only Cats"
                      {...register("Pet_friendly")}
                    />
                    <p>Only Cats</p>
                  </div>
                  <div className=" flex gap-1 items-center">
                    <input type="radio" {...register("Pet_friendly")} />
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
                  {...register("Open_house_schedule")}
                  className="font-['udemy-regular'] h-10 w-[500px] text-[18px] border border-black/20 bg-transparent px-3 py-2 placeholder:text-gray-400 bg-white focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>
              {/* Imgae  */}

              <div>
                <p className="text-[23px] font-bold mt-2">Upload Photo:-</p>
                <p className="mt-2 text-[21px] font-['udemy-regular'] peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Add Photo
                </p>
                <div className=" flex">
                  <input
                    type="file"
                    accept="image/*"
                    id="file"
                    onChange={handleSelectFile}
                    multiple
                  />
                  <div className="image-preview flex ">
                    {files.map((file, index) => (
                      <img
                        className=" h-10 w-10 mx-2"
                        key={index}
                        src={file.preview}
                        alt={`preview-${index}`}
                      />
                    ))}
                  </div>
                  {files.length > 0 && (
                    <>
                      {!uploadstats ? (
                        <button
                          type="button"
                          onClick={handleUpload}
                          className=" bg-green-700 py-2 px-3 text-white text-[18px] font-bold rounded-md"
                        >
                          {loading ? "Uploading..." : "Upload"}
                        </button>
                      ) : (
                        <p>uploaded</p>
                      )}
                    </>
                  )}
                </div>
                {imgerror && (
                  <p className="text-red-500 text-sm">Please upload an image</p>
                )}
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
                    {...register("user_name")}
                    className="font-['udemy-regular'] h-10 w-[500px] text-[18px] border border-black/20 bg-transparent px-3 py-2 placeholder:text-gray-400 bg-white focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
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
                    {...register("email")}
                    className="font-['udemy-regular'] h-10 w-[500px] text-[18px] border border-black/20 bg-transparent px-3 py-2 placeholder:text-gray-400 bg-white focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
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
                    {...register("phone_number")}
                    className="font-['udemy-regular'] h-10 w-[500px] text-[18px] border border-black/20 bg-transparent px-3 py-2 placeholder:text-gray-400 bg-white focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>
              </div>
              <div className="flex mt-10">
                  <label
                    className="text-[21px] w-[270px] font-['udemy-regular'] peer-disabled:cursor-not-allowed peer-disabled:opacity-70 inline-block"
                    htmlFor=""
                  >
                    Address
                  </label>
                  <input
                    type="text"
                    {...register("address")}
                    placeholder="Enter Address"
                    className="font-['udemy-regular'] h-10 w-[500px] text-[18px] border border-black/20 bg-transparent px-3 py-2 placeholder:text-gray-400 bg-white focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>
                <div className="flex items-center mt-10">
                  <label
                    className="text-[21px] w-[270px] font-['udemy-regular'] peer-disabled:cursor-not-allowed peer-disabled:opacity-70 inline-block"
                    htmlFor=""
                  >
                    Zip code
                  </label>
                  <div>
                    <input
                      type="text"
                      className="flex h-10 font-['udemy-regular'] w-[500px] text-[18px] border border-black/20 bg-transparent px-3 py-2 placeholder:text-gray-400 bg-white focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 "
                      placeholder="Enter zipcode"
                      {...register("zip_code")}
                    />
                    <p className="text-[16px] text-red-500 mt-1">
                      {" "}
                      {/* {errors.subarea && <p>{errors.subarea?.message}</p>} */}
                    </p>
                  </div>
                </div>
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
    </div>
  );
}

export default Addrooms;
