import React, { useEffect, useState } from "react";
import {
  AdminDashboard,
  AdminHeader,
} from "../../../components/AdminCompontents";
import { useForm } from "react-hook-form";
import { fetchcity } from "../../../Services/CityApi/Cityapi";
import { useNavigate } from "react-router-dom";
import Addsuburbs from "./Addsuburbs";
import { HiMinusCircle } from "react-icons/hi";
import { MdEdit } from "react-icons/md";
import Update_del_Area from "./Modify/Update_del_Area";
import stateAbbreviations from "../../../Services/StateAprevation/stateAbbreviations.json";
import { IoAddCircleOutline } from "react-icons/io5";

function AllArea() {
  const { handleSubmit, register } = useForm();
  const [data, setData] = useState([]);
  const [filterstate, setfilterstate] = useState([]);
  const [Filtercity, setFiltercity] = useState([]);
  const [selectedcountry, setSelectedcountry] = useState("");
  const [selectedstate, setSelectedstate] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [uniquestate, setuniquestate] = useState("");
  const [Filteresub, setFiltersub] = useState("");
  const [filterarea, setfilterarea] = useState("");
  const [filterpin, setfilterpin] = useState("");
  const [ismodelopen, setismodalopen] = useState(false);
  const navigate = useNavigate();

  // const state=

  const selcedata = {
    country: "Usa",
    state: selectedstate,
    area: selectedCity,
  };
  // console.log(selcedata);

  useEffect(() => {
    const fetchdata = async () => {
      const dta = await fetchcity();
      //   console.log(dta.data.city);
      setData(dta.data.city);
      const uniquestate = Array.from(
        new Set(dta.data.city.map((item) => item.state))
      );
      setfilterstate(uniquestate);
    };
    fetchdata();
  }, []);

  const onAddSuburbClick = () => {
    if (!selcedata.state || !selcedata.area) {
      alert("Please select both state and city");
    } else {
      setismodalopen(true);
    }
  };
  // console.log(selectedcountry);

  useEffect(() => {
    const filtercity = data.filter((item) => item.country === selectedcountry);
    // console.log(filtercity.area);
    const uniquecity = [...new Set(filtercity.map((item) => item.area))];
    setFiltercity(uniquecity);
  }, [selectedcountry]);

  useEffect(() => {
    const filterstate = data.filter((item) => item.area === selectedCity);
    if (filterstate.length > 0 && filterstate[0]?.subarea) {
      setFiltersub(filterstate[0]?.subarea);
      // console.log("Filtered subarea:", filterstate[0]?.subarea);
    } else {
      setFiltersub([]);
      console.log("Filtered subarea not found or undefined.");
    }

    const uniquiestt = [
      ...new Set(filterstate.map((item) => item.state)),
    ].flat();
    setuniquestate(uniquiestt);

    const areaZipCodes = {};
    filterstate.forEach((item) => {
      if (!areaZipCodes[item.area]) {
        areaZipCodes[item.area] = [];
      }
      if (item.zipcode) {
        areaZipCodes[item.area].push(item.zipcode);
      }
    });

    const areasWithZipCodes = Object.keys(areaZipCodes).map((area) => ({
      area,
      zipcodes: areaZipCodes[area],
    }));

    setfilterarea(areasWithZipCodes);
  }, [selectedCity, data]);
  // console.log(Filteresub);

  const onclose = () => {
    setismodalopen(false);
  };

  return (
    <div>
      <Addsuburbs isOpen={ismodelopen} onClose={onclose} {...selcedata} />
      <AdminHeader />
      <AdminDashboard>
        {/* <div className="mx-5 mt-6 flex justify-between">
          <p className="text-[22px] font-semibold font-['udemy-regular']">
            Add Area Details Here -
          </p>
          <div className="flex gap-3">
            <button
              className="rounded-md bg-green-800 px-4 py-2 text-[20px] font-semibold text-white shadow-sm hover:bg-green-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              onClick={(e) => {
                e.preventDefault();
                onAddSuburbClick();
              }}
            >
              Add New Subrs
            </button>
          </div>
        </div> */}
        <p className="text-center text-[22px] text-[#232f3e] font-['udemy-regular'] justify-center w-full">
          List of Avaible Area
        </p>
        <form className=" font-['udemy-regular'] mt-5">
          <div className=" flex w-full mx-auto justify-center items-center">
            <div className="flex flex-col border-2 border-gray-400 w-[15rem] bg-white text-[18px]">
              <p className="rounded-sm text-[20px] bg-[#232f3e] text-white p-1 shadow-lg shadow-gray-400">
                Country -
              </p>
              <ul>
                <li
                  value={"Usa"}
                  onClick={() => {
                    setSelectedcountry("Usa");
                  }}
                  className={`cursor-pointer    ${
                    selectedcountry === "Usa"
                      ? "text-[18px] bg-gray-600 text-white p-1 rounded-sm hover:bg-gray-600 hover:text-white hover:shadow-lg hover:shadow-gray-400"
                      : ""
                  }`}
                >
                  Usa
                </li>
                <li
                  value={"Canada"}
                  onClick={() => {
                    setSelectedcountry("Canada");
                  }}
                  className={`cursor-pointer    ${
                    selectedcountry === "Canada"
                      ? "text-[18px] bg-gray-600 text-white p-1 rounded-sm hover:bg-gray-600 hover:text-white hover:shadow-lg hover:shadow-gray-400"
                      : ""
                  }`}
                >
                  Canada
                </li>
              </ul>
            </div>
          </div>

          <div className="flex gap-20 justify-center mt-5">
            <div className="flex flex-col border-2 border-gray-400 w-[15rem]">
              <p className="text-[20px] rounded-sm bg-[#232f3e] text-white p-2 shadow-lg shadow-gray-400">
                List of Area in{" "}
                {selectedstate ? <p>{selectedstate}</p> : <span>City</span>}
              </p>
              <button
                onClick={() => {
                  <div className="flex flex-col">
                    <p className=" text-[17px]">List of Suburbs</p>
                    <ul>
                      {Filteresub.length > 0 &&
                        Filteresub.map((item, index) => (
                          <li key={index}>{item.subarea}</li>
                        ))}
                    </ul>
                  </div>;
                  navigate("/admin/addarea");
                }}
                className="flex gap-2 items-center bg-white py-2 text-[18px] font-semibold text-black border shadow-sm hover:bg-gray-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              >
                <IoAddCircleOutline size={22} />
                Add Area
              </button>
              <ul className="rounded-sm text-[18px] bg-white p-1">
                {Filtercity.map((city, index) => (
                  <div className=" flex justify-between">
                    <li
                      key={index}
                      value={city}
                      className={`cursor-pointer    ${
                        selectedCity === city
                          ? "text-[20px] bg-gray-600 text-white p-1 rounded-sm hover:bg-gray-600 hover:text-white hover:shadow-lg hover:shadow-gray-400"
                          : ""
                      }`}
                      onClick={() => {
                        setSelectedCity(city);
                      }}
                    >
                      {city}
                    </li>
                    <MdEdit
                      className=" cursor-pointer justify-center"
                      onClick={() => {
                        navigate(`/admin/area/update/${city}`);
                      }}
                    />
                  </div>
                ))}
              </ul>
            </div>

            <div className="flex flex-col border-2 border-gray-400 w-[15rem]">
              <p className="rounded-sm text-[20px] bg-[#232f3e] text-white shadow-lg shadow-gray-400 p-2">
                List of States
              </p>
              <div className=" overflow-y-auto max-h-96 scroll-m-0 justify-center bg-white text-[18px]">
                <ul className=" list-none p-0 ml-3 mt-2 ">
                  {Object.entries(stateAbbreviations).map(
                    ([state, abbreviation]) => (
                      <li
                        key={abbreviation}
                        className={`cursor-pointer ${
                          uniquestate.includes(state)
                            ? "text-[20px] bg-gray-600 text-white p-1 rounded-sm hover:bg-gray-500 hover:text-white hover:shadow-lg hover:shadow-gray-400 <HiMinusCircle/> "
                            : ""
                        }`}
                      >
                        {state} ({abbreviation})
                      </li>
                    )
                  )}
                </ul>
              </div>
            </div>

            <div className="flex flex-col border-2 w-[15rem]">
              <div className="border-2 border-gray-400 ">
                <p className="text-[20px] rounded-sm bg-[#232f3e] text-white p-2 shadow-lg shadow-gray-400">
                  List of Subarea
                </p>
                <ul className="rounded-sm text-[20px] flex flex-col ">
                  {Filteresub.length > 0 &&
                    Filteresub.map((item, index) => (
                      <li
                        key={index}
                        className=" border-red-600 border-2 rounded-md"
                      >
                        {item}
                        {/* {item.zipcodes.length > 0 && item.zipcodes.join(", ")} */}
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          </div>
        </form>
      </AdminDashboard>
    </div>
  );
}

export default AllArea;
