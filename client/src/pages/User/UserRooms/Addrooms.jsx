import React, { useEffect, useRef, useState } from "react";
import { DashConatiner, FormInput } from "../../../components";
import { useSelector } from "react-redux";
import { Controller, useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { fetchcity } from "../../../Services/CityApi/Cityapi";
import { IoInformationCircleSharp } from "react-icons/io5";
import { FaCalendarAlt } from "react-icons/fa";
import authslice from "../../../store/authslice";
import DatePicker from "react-datepicker";
import { useLoadScript, StandaloneSearchBox } from "@react-google-maps/api";
import "react-datepicker/dist/react-datepicker.css";

import stateAbbreviationMapping from "../../../Services/StateAprevation/stateAbbreviations.json";

const libraries = ["places"];

function Addrooms({ editdata }) {
  const currentLocation = useSelector((state) => state.auth.location);
  const token = useSelector((state) => state.auth.token);
  const cunrtcity = useSelector((state) => state.auth.city);
  const navigate = useNavigate();
  const [filtercity, setfiltercity] = useState([]);
  const [userimgs, setuserimg] = useState("");
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [resimgurl, setResimgurl] = useState([]);
  const [imgerror, setimgerror] = useState(false);
  const [uploadstats, setUploadstats] = useState(false);
  const [profiledata, setprofile] = useState([]);
  const [stayLeaseOption, setStayLeaseOption] = useState("");
  const [city, setCity] = useState("");
  const [zip, setzip] = useState("");
  const [state, setState] = useState("");
  const [country, setcountry] = useState("");
  const [isImmediate, setIsImmediate] = useState(false);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyDV2wKeoUG0TSghZ1adR-t8z0cJJS8EM24",
    libraries,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
    setValue,
    watch,
    trigger,
  } = useForm();
  const selectedBathroom = watch("Attchd_Bath");
  const preferredGender = watch("Preferred_gender");

  const [autocomplete, setAutocomplete] = useState(null);
  const [location, setLocation] = useState({ lat: null, lng: null });

  const onLoad = (autocompleteInstance) => {
    setAutocomplete(autocompleteInstance);
  };

  const onPlaceChanged = () => {
    if (autocomplete !== null) {
      const place = autocomplete.getPlaces()[0];
      const lat = place.geometry.location.lat();
      const lng = place.geometry.location.lng();
      setLocation({ lat, lng });
      setValue("address", place.formatted_address);
      setValue("latitude", lat);
      setValue("longitude", lng);
      const addressComponents = place.address_components;
      let city = "";
      let state = "";
      let zip = "";
      let country = "";

      for (let component of addressComponents) {
        if (component.types.includes("locality")) {
          city = component.long_name;
        }
        if (component.types.includes("administrative_area_level_1")) {
          state = component.short_name;
        }
        if (component.types.includes("postal_code")) {
          zip = component.long_name;
        }
        if (component.types.includes("country")) {
          country = component.long_name;
        }
      }

      setCity(city);
      setState(state);
      setValue("city", city);
      setValue("state", state);
      setValue("zip_code", zip);
      setValue("country", country);
    } else {
      console.log("Autocomplete is not loaded yet!");
    }
  };
  const { userID } = useParams();
  useEffect(() => {
    trigger();
  }, [trigger, userID]);

  const usrId = useSelector((state) => state.auth.userID);

  const handleStayLeaseChange = (e) => {
    setStayLeaseOption(e.target.value);
  };

  useEffect(() => {
    const fetchusedetails = async () => {
      const res = await axios.get(
        `https://api.verydesi.com/user/dashboard/profile/${usrId}`
      );
      setprofile(res.data.user);
    };
    fetchusedetails();
  }, [usrId]);

  const fullname = profiledata
    ? `${profiledata.firstName} ${profiledata.lastName}`
    : "";

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

  const handleRemoveFile = (index) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const handleUpload = async () => {
    try {
      // setLoader(true);
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
  // useEffect(() => {
  //   if (files.length > 0) {
  //     const timeout = setTimeout(() => {
  //       handleUpload();
  //     }, 1000);

  //     return () => clearTimeout(timeout);
  //   }
  // }, [files]);
  // console.log(resimgurl);
  const fetchAreaData = async (city) => {
    console.log(city);
    const response = await axios(
      `https://api.verydesi.com/api/admin/area/${city}`
    );
    // const data = response.j();
    // console.log(response.data.area[0]);
    return response.data.area[0];
  };

  const onsubmit = async (data) => {
    const city = data.postingincity;
    const areaData = await fetchAreaData(city);
    const enteredStateAbbreviation = state;
    const enteredStateFullName = Object.keys(stateAbbreviationMapping).find(
      (key) => stateAbbreviationMapping[key] === enteredStateAbbreviation
    );
    // const enteredState = data.state;
    const enteredCity = data.city;
    const enteredZip = data.zipcode;
    const isPrimaryState = areaData.primaryState.includes(
      enteredStateFullName || data.state
    );
    const isStateInList = areaData.state.includes(
      enteredStateFullName || data.state
    );
    const isValidCity = areaData.subarea.some(
      (subarea) => subarea.split(",")[0] === enteredCity
    );
    const isValidZip = areaData.zipcode.includes(enteredZip);

    if (isPrimaryState || (isStateInList && (isValidCity || isValidZip))) {
      const roomdata = {
        Title: data.Title,
        Description: data.Description,
        Propertytype: data.Propertytype,
        postingincity: data.postingincity,
        Stay_lease: data.Stay_lease,
        Avaliblity_from: data.Avaliblity_from,
        Available_to: data.Available_to,
        Immediate: data.Immediate,
        Attchd_Bath: data.Attchd_Bath,
        Bath_Location: data.Bath_Location,
        Preferred_gender: data.Preferred_gender,
        Couples_welcome: data.Couples_welcome,
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
        user_name: fullname,
        email: profiledata.email,
        phone_number: data.phone_number,
        city: data.city,
        address: data.address,
        state: data.state,
        zip_code: data.zipcode,
        location: {
          coordinates: [location.lng, location.lat],
        },
      };

      if (editdata) {
        try {
          // console.log("ddcds", editdata._id);
          const res = await axios.put(
            `https://api.verydesi.com/api/updaterooms/${editdata._id}`,
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

            alert("update room successfully");
            navigate(`/rooms/${editdata._id}`);
          }
        } catch (error) {
          console.log("error while update room ", error);
        }
      } else {
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
            navigate(`/rooms/${res.data.rooms._id}`);
          }
        } catch (error) {
          console.log("error during sending data to roomapi", error);
        }
      }
    } else {
      alert("Enter Address is not available");
    }
    // console.log("resimgurl", resimgurl);
    // console.log(roomdata);
  };

  useEffect(() => {
    const fetchdata = async () => {
      const res = await fetchcity();
      const uniquecity = Array.from(
        new Set(res.data.city.map((item) => item.area))
      );
      setfiltercity(uniquecity);
    };
    fetchdata();
  }, []);

  const handleCheckboxChange = () => {
    setIsImmediate(!isImmediate);
  };

  useEffect(() => {
    if (isImmediate) {
      setValue("Avaliblity_from", null);
      setValue("Available_to", null);
    }
  }, [isImmediate, setValue]);

  useEffect(() => {
    if (editdata) {
      // console.log("Populating form with editdata:", editdata);
      setStayLeaseOption(editdata?.Stay_lease);
      setValue("postingincity", editdata?.postingincity || "Portland");
      setValue("Title", editdata?.Title || "");
      setValue("Description", editdata?.Description || "");
      setValue("Propertytype", editdata?.Propertytype || "");
      setValue("Stay_lease", editdata?.Stay_lease || "");
      setValue("Pricemodel", editdata?.Pricemodel || "");
      setValue("Expected_Rooms", editdata?.Expected_Rooms || "");
      setValue("Avaliblity_from", editdata?.Avaliblity_from || "");
      setValue("Available_to", editdata?.Available_to || "");
      setValue("Immediate", editdata?.Immediate || "");
      setValue("Attchd_Bath", editdata?.Attchd_Bath || "");
      setValue("Bath_Location", editdata?.Bath_Location || "");
      setValue("Preferred_gender", editdata?.Preferred_gender || "");
      setValue("Couples_welcome", editdata?.Couples_welcome || "");
      setValue("Desposite", editdata?.Desposite || "");
      setValue("is_room_furnished", editdata?.is_room_furnished || "");
      setValue("Amenities_include", editdata?.Amenities_include || "");
      setValue("Vegeterian_prefernce", editdata?.Vegeterian_prefernce || "");
      setValue("Smoking_policy", editdata?.Smoking_policy || "");
      setValue("Pet_friendly", editdata?.Pet_friendly || "");
      setValue("Open_house_schedule", editdata?.Open_house_schedule || "");
      setValue("phone_number", editdata?.phone_number || "");
      setValue("address", editdata?.address || "");
      setValue("city", editdata?.city || "");
      setValue("state", editdata?.state || "");
      setValue("zipcode", editdata?.zipcode || "");
      if (editdata.Imgurl) {
        setFiles(editdata.Imgurl.map((url) => ({ preview: url })));
        setResimgurl(editdata.Imgurl);
      }
    }
  }, [editdata, setValue]);

  const datainputref = useRef(null);

  useEffect(() => {
    const handleFocus = () => {
      if (datainputref.current) {
        datainputref.current.showPicker();
      }
    };

    const input = datainputref.current;
    if (input) {
      input.addEventListener("focus", handleFocus);
    }

    return () => {
      if (input) {
        input.removeEventListener("focus", handleFocus);
      }
    };
  }, []);

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading Maps</div>;
  }

  return (
    <div className="w-full mx-auto mt-[9rem] items-center lg:mt-[7%]">
      <div className="w-full lg:max-w-[1400px] md:max-w-sm mx-auto items-center justify-center bg-white shadow-lg shadow-black/30">
        <div className="font-['udemy-regular'] mx-4 lg:mx-20">
          <form
            onSubmit={handleSubmit(onsubmit)}
            className="flex flex-col justify-center text-[1.1rem] mt-7 items-center"
          >
            <div className="flex gap-2 items-center">
              <p className="text-[1.5rem] text-[#000] flex items-center justify-center mt-6">
                {editdata ? <p>Edit Room In</p> : <p>Post Room In</p>}
              </p>
              <Controller
                className="bg-black"
                name="postingincity"
                control={control}
                defaultValue="Portland"
                rules={{ required: "PostingIn is required" }}
                render={({ field }) => (
                  <select
                    {...field}
                    className="mt-6 text-[1.5rem] font-['udemy-regular'] bg-gray-200 text-black border-2 placeholder:text-gray-400 cursor-pointer"
                    onChange={(e) => {
                      const selectedValue = e.target.value;

                      if (selectedValue !== profiledata.belongcity) {
                        alert(
                          `Your profile is connected to ${profiledata.belongcity}, are you sure you want to post in ${selectedValue}?`
                        );
                      }

                      field.onChange(selectedValue);
                    }}
                  >
                    <option className="text-gray-200" value="" disabled hidden>
                      Select city
                    </option>
                    {filtercity.map((city, index) => (
                      <option
                        value={city}
                        key={index}
                        className="text-[17px] bg-white text-[#232f3e]"
                      >
                        {city}
                      </option>
                    ))}
                  </select>
                )}
              />
            </div>
            <p className="text-[16px] mt-1 text-red-500">
              {errors.postingincity && <p>{errors.postingincity.message}</p>}
            </p>
            <p className="text-[1.1rem]">
              Your Account is belong {profiledata.belongcity}
            </p>
            <div className="w-full items-center">
              <div className="flex mt-5">
                <label
                  className="w-[118px] lg:w-[266px] font-['udemy-regular'] leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 inline-block"
                  htmlFor=""
                >
                  Title<span className=" text-red-500">*</span>
                </label>
                <div className="">
                  <input
                    className="font-['udemy-regular'] h-10 w-[220px] lg:w-[740px]  border border-black/20 bg-transparent px-3 py-2 placeholder:text-gray-400 bg-white focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    label="Title"
                    type="text"
                    // defaultValue={editdata?.Title}
                    placeholder="Title"
                    {...register("Title", {
                      required: "Title is required",
                    })}
                  />

                  <p className="text-[16px] mt-1 text-red-500">
                    {errors.Title && <p>{errors.Title.message}</p>}
                  </p>
                </div>
              </div>

              <div className="mt-5 flex">
                <label
                  className="w-[118px] lg:w-[266px] font-['udemy-regular'] leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 inline-block"
                  htmlFor=""
                >
                  Description<span className=" text-red-500">*</span>
                </label>
                <div className="">
                  <textarea
                    className="font-['udemy-regular'] h-20 w-[220px] lg:w-[740px] border border-black/20 bg-transparent px-3 py-2 placeholder:text-gray-400 bg-white focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    name="description"
                    placeholder="Description"
                    {...register("Description", {
                      required: "Description is required",
                      validate: {
                        minChars: (value) =>
                          value.trim().length >= 50 ||
                          "Description must be at least 50 characters",
                      },
                    })}
                  />
                  <p className="text-[16px] text-red-500 ">
                    {errors.Description && <p>{errors.Description.message}</p>}
                  </p>
                </div>
              </div>

              <div className="flex mt-4">
                <label
                  className="w-[118px] lg:w-[266px] font-['udemy-regular'] whitespace-nowrap peer-disabled:cursor-not-allowed peer-disabled:opacity-70 inline-block"
                  htmlFor=""
                >
                  Property Type<span className=" text-red-500">*</span>
                </label>
                <div>
                  <Controller
                    name="Propertytype"
                    control={control}
                    rules={{ required: "Property Type is required" }}
                    defaultValue=""
                    render={({ field }) => (
                      <select
                        {...field}
                        className="font-['udemy-regular'] h-10 w-[220px] lg:w-[740px] border border-black/20 bg-transparent px-3 py-2 placeholder:text-gray-400 bg-white focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
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
                  <p className="text-[16px] mt-1 text-red-500">
                    {errors.Propertytype && (
                      <p>{errors.Propertytype.message}</p>
                    )}
                  </p>
                </div>
              </div>

              <div className="flex mt-5">
                <label
                  htmlFor=""
                  className="w-[118px] lg:w-[275px] font-['udemy-regular'] leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 inline-block"
                >
                  Stay/Lease<span className=" text-red-500">*</span>
                </label>
                <div>
                  <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 w-auto">
                    <div className=" flex gap-2 whitespace-nowrap ">
                      <input
                        type="radio"
                        value="Short term"
                        {...register("Stay_lease", {
                          required: "Stay/Lease required",
                        })}
                        onChange={handleStayLeaseChange}
                      />
                      <p>Short term(1Dayto6Months) </p>
                    </div>
                    <div className="flex gap-2 whitespace-nowrap lg:px-2">
                      <input
                        type="radio"
                        value="Long term(6+ months)"
                        {...register("Stay_lease", {
                          required: "Stay/Lease required",
                        })}
                        onChange={handleStayLeaseChange}
                      />
                      <p>Long term(6+ Months) </p>
                    </div>
                    <div className=" flex gap-2">
                      <input
                        type="radio"
                        value="Both"
                        {...register("Stay_lease", {
                          required: "Stay/Lease required",
                        })}
                        onChange={handleStayLeaseChange}
                      />
                      <p>Both* </p>
                    </div>
                  </div>
                  <p className="text-[16px] mt-1 text-red-500">
                    {errors.Stay_lease && <p>{errors.Stay_lease.message}</p>}
                  </p>
                </div>
              </div>

              <div className="mt-5 flex text-[1.1rem]">
                <label
                  className="w-[118px] lg:w-[266px] font-['udemy-regular'] peer-disabled:cursor-not-allowed peer-disabled:opacity-70 inline-block"
                  htmlFor=""
                >
                  Price Model<span className=" text-red-500">*</span>
                </label>
                <div>
                  <Controller
                    name="Pricemodel"
                    control={control}
                    rules={{ required: "Pricemodel is required" }}
                    render={({ field, fieldState: { error } }) => (
                      <>
                        <select
                          {...field}
                          value={field.value || ""}
                          className="h-100px w-[220px] lg:w-[500px] border border-black/20 bg-transparent px-3 py-2 placeholder:text-gray-400 bg-white focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          <option value="">Select</option>
                          {stayLeaseOption === "Short term" && (
                            <>
                              <option value="Per Night">Per Night</option>
                              <option value="Per Day">Per Day</option>
                              <option value="Per Week">Per Week</option>
                            </>
                          )}
                          {stayLeaseOption === "Long term(6+ months)" && (
                            <option value="Per Month">Per Month</option>
                          )}
                          {stayLeaseOption === "Both" && (
                            <>
                              <option value="Per Month">Per Month</option>
                              <option value="Per Night">Per Night</option>
                              <option value="Per Day">Per Day</option>
                              <option value="Per Week">Per Week</option>
                            </>
                          )}
                        </select>
                        {error && (
                          <p className="text-[16px] mt-1 text-red-500">
                            {error.message}
                          </p>
                        )}
                      </>
                    )}
                  />
                </div>
              </div>

              <div className="flex mt-5 text-[1.1rem]">
                <label
                  className="w-[118px] lg:w-[266px] font-['udemy-regular'] peer-disabled:cursor-not-allowed peer-disabled:opacity-70 inline-block"
                  htmlFor=""
                >
                  Rent<span className=" text-red-500">*</span>
                </label>
                <div className="flex lg:flex-row flex-col">
                  <div className="items-center">
                    <div className="flex">
                      <span className="bg-gray-200 items-center justify-center inline-block font-['udemy-regular'] font-bold border border-black/20 px-3 py-2 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50">
                        $
                      </span>
                      <input
                        type="number"
                        placeholder="Rent"
                        className="h-100px w-[182px] lg:w-[462px] font-['udemy-regular'] border border-black/20 bg-transparent px-3 py-2 placeholder:text-gray-400 bg-white focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                        {...register("Expected_Rooms", {
                          required: "Rent is require",
                        })}
                      />
                    </div>
                    <p className="text-[16px] mt-1 text-red-500">
                      {" "}
                      {errors.Expected_Rooms && (
                        <p>{errors.Expected_Rooms.message}</p>
                      )}
                    </p>
                  </div>
                  <div className="flex">
                    <div className="flex items-center gap-1 lg:ml-5 ml-0">
                      <input
                        type="checkbox"
                        // {...register("Negotiable")}
                      />
                      <p className="px-3 py-2 text-black">Negotiable</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <input type="checkbox" />
                      <p className="px-3 py-2 text-black">Hide Rent</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex mt-4 lg:gap-5  text-[1.1rem]">
                <label
                  className="w-[118px] lg:w-[245px] flex gap-1 font-['udemy-regular'] leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 lg:inline-block"
                  htmlFor=""
                >
                  Availability<span className="text-red-500">*</span>
                </label>
                <div className="flex flex-col lg:flex-row lg:gap-5 gap-2">
                  <div className="">
                    <Controller
                      name="Avaliblity_from"
                      control={control}
                      render={({ field }) => (
                        <DatePicker
                          {...field}
                          selected={field.value}
                          className={`h-100px w-[220px] lg:w-[240px] font-['udemy-regular'] border border-black/20 px-3 py-2  placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 ${
                            isImmediate
                              ? "bg-gray-200 cursor-not-allowed"
                              : "bg-white"
                          }`}
                          placeholderText="Available from"
                          disabled={isImmediate}
                        />
                      )}
                    />
                    {errors.Avaliblity_from && (
                      <p className="text-[16px] mt-1 text-red-500">
                        {errors.Avaliblity_from.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <Controller
                      name="Available_to"
                      control={control}
                      render={({ field }) => (
                        <DatePicker
                          {...field}
                          selected={field.value}
                          className={`h-100px w-[220px] lg:w-[240px] font-['udemy-regular'] border border-black/20 px-3 py-2  placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 ${
                            isImmediate
                              ? "bg-gray-200 cursor-not-allowed"
                              : "bg-white"
                          }`}
                          placeholderText="Available to"
                          disabled={isImmediate}
                        />
                      )}
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      {...register("Immediate")}
                      checked={isImmediate}
                      onChange={handleCheckboxChange}
                    />
                    <p className="py-2 text-black text-[18px]">Immediate</p>
                  </div>
                </div>
              </div>

              <div className="flex mt-5 text-[1.1rem] lg:gap-20">
                <label
                  className="w-[118px] lg:w-[188px] font-['udemy-regular'] peer-disabled:cursor-not-allowed peer-disabled:opacity-70 inline-block"
                  htmlFor=""
                >
                  Separate Bathroom<span className="text-red-500">*</span>
                </label>
                <div>
                  <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 lg:w-[976px]">
                    <div className="flex gap-1 items-center">
                      <input
                        type="radio"
                        value="Yes"
                        {...register("Attchd_Bath", {
                          required: "Please select Bath",
                        })}
                      />
                      <p>Yes</p>
                    </div>
                    <div className="flex gap-1 items-center">
                      <input
                        type="radio"
                        value="No"
                        {...register("Attchd_Bath", {
                          required: "Please select Bath",
                        })}
                      />
                      <p>No</p>
                    </div>
                  </div>
                  {errors.Attchd_Bath && (
                    <p className="text-[16px] mt-1 text-red-500">
                      {errors.Attchd_Bath.message}
                    </p>
                  )}

                  {selectedBathroom === "Yes" && (
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 lg:w-[976px] mt-2">
                      <div className="flex gap-1 items-center">
                        <input
                          type="radio"
                          value="Attached in Room"
                          {...register("Bath_Location", {
                            required: "Please select Bath location",
                          })}
                        />
                        <p>Attached in Room</p>
                      </div>
                      <div className="flex gap-1 items-center">
                        <input
                          type="radio"
                          value="Outside the room"
                          {...register("Bath_Location", {
                            required: "Please select Bath location",
                          })}
                        />
                        <p>Outside the room</p>
                      </div>
                      {errors.Bath_Location && (
                        <p className="text-[16px] mt-1 text-red-500">
                          {errors.Bath_Location.message}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex mt-5 text-[1.1rem] lg:gap-20">
                <label
                  className="w-[118px] lg:w-[188px] font-['udemy-regular'] peer-disabled:cursor-not-allowed peer-disabled:opacity-70 inline-block"
                  htmlFor=""
                >
                  Preferred Gender<span className="text-red-500">*</span>
                </label>
                <div>
                  <div className="grid lg:grid-cols-4 grid-cols-1 gap-4 lg:w-[976px]">
                    <div className="flex gap-1 items-center">
                      <input
                        type="radio"
                        value="Male only"
                        {...register("Preferred_gender", {
                          required: "Please select gender",
                        })}
                      />
                      <p className="flex items-center gap-1">
                        Male
                        <img
                          className="h-5 w-5"
                          src={
                            "https://res.cloudinary.com/druohnmyv/image/upload/v1723819319/assests/kjkamlgskyfqpgzvjocz.png"
                          }
                          alt=""
                        />
                      </p>
                    </div>
                    <div className="flex items-center gap-1">
                      <input
                        type="radio"
                        value="Female only"
                        {...register("Preferred_gender", {
                          required: "Please select gender",
                        })}
                      />
                      <p className="flex items-center">
                        Female
                        <img
                          className="h-4 w-4"
                          src={
                            "https://res.cloudinary.com/druohnmyv/image/upload/v1723819317/assests/acn46dsajdgzwlmk9j5v.png"
                          }
                          alt=""
                        />
                      </p>
                    </div>
                    <div className="flex gap-1 items-center">
                      <input
                        type="radio"
                        value="Any"
                        {...register("Preferred_gender", {
                          required: "Please select gender",
                        })}
                      />
                      <p className="flex items-center gap-1">
                        Any
                        <img
                          className="h-5 w-5"
                          src={
                            "https://res.cloudinary.com/druohnmyv/image/upload/v1723819314/assests/jum9urk9pw7dsladdtuq.png"
                          }
                          alt=""
                        />
                      </p>
                    </div>
                  </div>
                  {errors.Preferred_gender && (
                    <p className="text-[16px] mt-1 text-red-500">
                      {errors.Preferred_gender.message}
                    </p>
                  )}
                </div>
              </div>

              {preferredGender && (
                <div className="flex mt-5 gap-[3rem] lg:gap-20 text-[1.1rem]">
                  <label
                    className="w-[118px] lg:w-[188px] font-['udemy-regular'] peer-disabled:cursor-not-allowed peer-disabled:opacity-70 inline-block"
                    htmlFor="couples_welcome"
                  >
                    Couples Welcome
                  </label>
                  <div>
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 w-[976px]">
                      <div className="flex gap-1 items-center">
                        <input
                          type="radio"
                          value="Yes"
                          {...register("Couples_welcome", {
                            required: "Please select an option",
                          })}
                        />
                        <p>Yes</p>
                      </div>
                      <div className="flex gap-1 items-center">
                        <input
                          type="radio"
                          value="No"
                          {...register("Couples_welcome", {
                            required: "Please select an option",
                          })}
                        />
                        <p>No</p>
                      </div>
                    </div>
                    {errors.Couples_welcome && (
                      <p className="text-[16px] mt-1 text-red-500">
                        {errors.Couples_welcome.message}
                      </p>
                    )}
                  </div>
                </div>
              )}

              <div className="flex mt-5 text-[1.1rem]">
                <label
                  className="w-[118px] lg:w-[266px] font-['udemy-regular'] peer-disabled:cursor-not-allowed peer-disabled:opacity-70 inline-block"
                  htmlFor=""
                >
                  Deposit
                </label>
                <div className="flex lg:flex-row flex-col">
                  <div className="flex">
                    <span className=" bg-gray-200 items-center justify-center inline-block font-['udemy-regular'] font-bold border border-black/20 px-3 py-2 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50">
                      $
                    </span>
                    <input
                      type="number"
                      placeholder="Deposit"
                      className="h-100px w-[182px] lg:w-[462px] font-['udemy-regular'] border border-black/20 bg-transparent px-3 py-2 placeholder:text-gray-400 bg-white focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      {...register("Desposite")}
                    />
                  </div>
                </div>
              </div>

              <div className="mt-5 text-[1.1rem] items-center flex">
                <label
                  className=" w-[118px] lg:w-[267px] font-['udemy-regular'] peer-disabled:cursor-not-allowed peer-disabled:opacity-70 inline-block"
                  htmlFor=""
                >
                  Is room/ furnished?
                </label>
                <select
                  className="h-100px lg:w-[500px] w-[220px] text-[1.1rem] items-center font-['udemy-regular'] border border-black/20 bg-transparent px-3 py-2 placeholder:text-gray-400 bg-white focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  {...register("is_room_furnished")}
                >
                  <option value="">Select</option>
                  <option value="Unfurnished">Unfurnished</option>
                  <option value="Furnished with Bed">
                    Furnished only with Bed
                  </option>
                  <option value="Semi Furnished">Semi Furnished</option>
                  <option value="Fully Furnished">Fully Furnished</option>
                </select>
              </div>

              <div className=" flex mt-5 text-[1.1rem]">
                <label
                  className=" w-[118px] lg:w-[269px] font-['udemy-regular'] peer-disabled:cursor-not-allowed peer-disabled:opacity-70 inline-block"
                  htmlFor=""
                >
                  Amenities include
                </label>

                <div className=" grid grid-cols-1 lg:grid-cols-4 gap-4 lg:w-[980px]">
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
              <div className=" flex mt-5 lg:gap-20 gap-[3rem] text-[1.1rem]">
                <label
                  className="lg:whitespace-nowrap w-[74px] lg:w-[185px] font-['udemy-regular'] peer-disabled:cursor-not-allowed peer-disabled:opacity-70 inline-block"
                  htmlFor=""
                >
                  Dietary Preference
                </label>
                <div className=" grid grid-cols-1 lg:grid-cols-4 gap-4 w-[650px] lg:w-[980px]">
                  <div className="flex gap-1 items-center whitespace-nowrap">
                    <input
                      type="radio"
                      value="Yes, Vegetarian only"
                      {...register("Vegeterian_prefernce")}
                    />
                    <p>Vegeterian</p>
                  </div>
                  <div className=" flex gap-1 items-center">
                    <input
                      type="radio"
                      value="No, Non-veg is ok"
                      {...register("Vegeterian_prefernce")}
                    />
                    <p>Non-Veg</p>
                  </div>
                  <div className="flex gap-1 items-center">
                    <input
                      type="radio"
                      value="Both"
                      {...register("Vegeterian_prefernce")}
                    />
                    <p>Both Ok</p>
                  </div>
                </div>
              </div>
              <div className=" flex lg:gap-20 gap-[3.1rem] mt-5 text-[1.1rem]">
                <label
                  className=" w-[187px] font-['udemy-regular'] peer-disabled:cursor-not-allowed peer-disabled:opacity-70 inline-block"
                  htmlFor=""
                >
                  Smoking Policy
                </label>
                <div className=" grid grid-cols-1 lg:grid-cols-4 gap-4 w-[650px] lg:w-[980px]">
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

              <div className=" flex mt-5 text-[1.1rem] lg:gap-20 gap-[3.3rem]">
                <label
                  className=" w-[187px] font-['udemy-regular'] peer-disabled:cursor-not-allowed peer-disabled:opacity-70 inline-block"
                  htmlFor=""
                >
                  Pet Friendly
                </label>
                <div className=" grid grid-cols-1 lg:grid-cols-4 gap-4 w-[650px] lg:w-[980px]">
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

              <div className="mt-5 text-[1.1rem] flex">
                <label
                  className=" w-[269px] font-['udemy-regular'] peer-disabled:cursor-not-allowed peer-disabled:opacity-70 inline-block"
                  htmlFor=""
                >
                  Open House Schedule
                </label>
                <input
                  type="date"
                  placeholder="Open House Date"
                  {...register("Open_house_schedule")}
                  className="font-['udemy-regular'] h-10 w-[500px] border border-black/20 bg-transparent px-3 py-2 placeholder:text-gray-400 bg-white focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>

              {/* Imgae  */}
              <div></div>
              <div className=" mt-5 text-[1.1rem]">
                <p className="text-[1.1rem] mt-2 font-bold">
                  Add your photos below
                </p>
                <div className="flex">
                  <div class="border border-dashed border-gray-400 rounded-sm relative mt-3 text-[1.1rem] flex flex-col justify-center w-[770px] bg-white">
                    <div className="">
                      <input
                        type="file"
                        accept="image/*"
                        id="file"
                        onChange={handleSelectFile}
                        multiple
                        class="cursor-pointer relative block opacity-0 w-full h-full p-20 z-50"
                      />
                      <div class="text-center p-10 absolute top-0 right-0 left-0 m-auto">
                        <h4>
                          Drop files anywhere to upload
                          <br />
                          or
                        </h4>
                        <p class="">Select Files</p>
                      </div>
                    </div>
                  </div>
                  <div className="">
                    <div className="image-preview flex flex-wrap justify-evenly">
                      {files.map((file, index) => (
                        <div className="relative" key={index}>
                          <img
                            className="h-20 w-20 rounded-md"
                            src={file.preview}
                            alt={`preview-${index}`}
                          />
                          <button
                            type="button"
                            onClick={() => handleRemoveFile(index)}
                            className="absolute top-0 left-0 bg-red-500 text-white rounded-full h-6 w-6 flex items-center justify-center"
                          >
                            &times;
                          </button>
                        </div>
                      ))}
                    </div>

                    {files.length > 0 && (
                      <>
                        {!uploadstats ? (
                          <button
                            type="button"
                            onClick={handleUpload}
                            className=" bg-green-700 py-2 px-3 text-white text-[1.2rem] font-bold rounded-md ml-2 mt-4"
                          >
                            {loading ? "Uploading..." : "Upload"}
                          </button>
                        ) : (
                          <p>uploaded</p>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <p className="text-[1.2rem] mt-5 font-bold">Your Details:-</p>
                <div className="flex items-center">
                  <label
                    className="mt-2 lg:w-[270px] w-[118px] text-[1.1rem] font-['udemy-regular'] peer-disabled:cursor-not-allowed peer-disabled:opacity-70 inline-block"
                    htmlFor=""
                  >
                    Name
                  </label>
                  {/* <input
                    type="text"
                    placeholder="Enter Name"
                    {...register("user_name")}
                    className="font-['udemy-regular'] h-10 w-[500px] text-[18px] border border-black/20 bg-transparent px-3 py-2 placeholder:text-gray-400 bg-white focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  /> */}
                  {<p className="text-[1.1rem]">{fullname}</p>}
                </div>
                <div className="mt-5 flex">
                  <label
                    className="lg:w-[270px] w-[118px] text-[1.1rem] font-['udemy-regular'] peer-disabled:cursor-not-allowed peer-disabled:opacity-70 inline-block"
                    htmlFor=""
                  >
                    Email
                  </label>
                  {/* <input
                    type="text"
                    placeholder="Enter Email"
                    {...register("email")}
                    className="font-['udemy-regular'] h-10 w-[500px] border border-black/20 bg-transparent px-3 py-2 placeholder:text-gray-400 bg-white focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  /> */}
                  <p className="text-[1.1rem]">{profiledata?.email}</p>
                </div>
                <div className="mt-5 text-[1.1rem] flex">
                  <label
                    className="lg:w-[270px] w-[118px] font-['udemy-regular'] peer-disabled:cursor-not-allowed peer-disabled:opacity-70 inline-block"
                    htmlFor=""
                  >
                    Phone Number<span className=" text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Number"
                    {...register("phone_number")}
                    defaultValue={profiledata?.phone_number}
                    className="font-['udemy-regular'] h-10 w-[230px] lg:w-[500px] border border-black/20 bg-transparent px-3 py-2 placeholder:text-gray-400 bg-white focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>
              </div>
              <div className="flex mt-5 text-[1.1rem]">
                <label
                  className="lg:w-[270px] w-[118px] font-['udemy-regular'] peer-disabled:cursor-not-allowed peer-disabled:opacity-70 inline-block"
                  htmlFor=""
                >
                  Address<span className=" text-red-500">*</span>
                </label>
                <div>
                  <StandaloneSearchBox
                    onLoad={onLoad}
                    onPlacesChanged={onPlaceChanged}
                  >
                    <input
                      type="text"
                      placeholder="Enter a location"
                      {...register("address")}
                      className="font-['udemy-regular'] h-10 w-[230px] lg:w-[500px] border border-black/20 bg-transparent px-3 py-2 placeholder:text-gray-400 bg-white focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                  </StandaloneSearchBox>
                  <input type="hidden" {...register("latitude")} />
                  <input type="hidden" {...register("longitude")} />
                  {/* <input
                    type="text"
                    {...register("address", {
                      required: "Address is required",
                    })}
                    placeholder="Enter Address"
                    className="font-['udemy-regular'] h-10 w-[500px] text-[18px] border border-black/20 bg-transparent px-3 py-2 placeholder:text-gray-400 bg-white focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  /> */}
                  {/* <p className="text-[16px] mt-1 text-red-500">
                    {" "}
                    {errors.address && <p>{errors.address.message}</p>}
                  </p> */}
                </div>
              </div>
              <div className="flex text-[1.1rem]">
                <label
                  className="text-[1.1rem] text-white w-[118px] lg:w-[270px] font-['udemy-regular'] peer-disabled:cursor-not-allowed peer-disabled:opacity-70 inline-block"
                  htmlFor=""
                >
                  City
                </label>
                <div className="flex flex-col lg:flex-row gap-4 items-center mt-4">
                  <div className="flex items-center mt-1 text-[1.1rem]">
                    <div>
                      <input
                        type="text"
                        className="flex h-10 font-['udemy-regular'] lg:w-[180px] w-[230px] text-[1.1rem] border border-black/20 bg-transparent px-3 py-2 placeholder:text-gray-400 bg-white focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 "
                        placeholder="City"
                        {...register("city")}
                      />
                    </div>
                  </div>

                  <div className="flex items-center mt-1 text-[1.1rem]">
                    {/* <label
                    className="w-[270px] font-['udemy-regular'] peer-disabled:cursor-not-allowed peer-disabled:opacity-70 inline-block"
                    htmlFor=""
                  >
                    State
                  </label> */}
                    <div>
                      <input
                        type="text"
                        className="flex h-10 font-['udemy-regular'] lg:w-[180px] w-[230px] border border-black/20 bg-transparent px-3 py-2 placeholder:text-gray-400 bg-white focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 "
                        placeholder="State"
                        {...register("state")}
                      />
                    </div>
                  </div>
                  <div className="flex items-center mt-1 text-[1.1rem]">
                    {/* <label
                    className="w-[270px] font-['udemy-regular'] peer-disabled:cursor-not-allowed peer-disabled:opacity-70 inline-block"
                    htmlFor=""
                  >
                    Zip code
                  </label> */}
                    <div>
                      <input
                        type="text"
                        // defaultValue={profiledata?.pin}
                        className="flex h-10 font-['udemy-regular'] lg:w-[180px] w-[230px] text-[1.1rem] border border-black/20 bg-transparent px-3 py-2 placeholder:text-gray-400 bg-white focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 "
                        placeholder="Enter zipcode"
                        {...register("zipcode")}
                      />
                      <p className="text-[16px] text-red-500">
                        {" "}
                        {/* {errors.subarea && <p>{errors.subarea?.message}</p>} */}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center mt-1 text-[1.1rem]">
                    {/* <label
                    className=" w-[270px] font-['udemy-regular'] peer-disabled:cursor-not-allowed peer-disabled:opacity-70 inline-block"
                    htmlFor=""
                  >
                    Country
                  </label> */}
                    <div>
                      <input
                        type="text"
                        className="flex h-10 font-['udemy-regular'] lg:w-[180px] w-[230px] border border-black/20 bg-transparent px-3 py-2 placeholder:text-gray-400 bg-white focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 "
                        placeholder="Country"
                        {...register("country")}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {editdata ? (
              <button
                type="submit"
                className="rounded-md bg-green-800 my-5 mt-6 px-4 py-3 mb-10 text-[1.1rem] self-center font-semibold text-white shadow-sm hover:bg-green-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              >
                Update Room
              </button>
            ) : (
              <button
                type="submit"
                className="rounded-md bg-green-800 my-4 mt-6 px-4 py-4 mb-10 text-[1.1rem] self-center font-semibold text-white shadow-sm hover:bg-green-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              >
                Add New Room
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Addrooms;
