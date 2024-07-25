import React, { useEffect, useState } from "react";
import {
  AdminDashboard,
  AdminHeader,
} from "../../../components/AdminCompontents";
import axios from "axios";
import { MdDeleteForever } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { FaMapPin } from "react-icons/fa";
import { FaMapLocationDot } from "react-icons/fa6";
import { TfiMoney } from "react-icons/tfi";
import { MdOutlineEmail } from "react-icons/md";
import { MdOutlineMeetingRoom } from "react-icons/md";
import { FaArrowRight } from "react-icons/fa6";
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
function Allroom() {
  const [data, setdata] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [cities, setCities] = useState([]);
  const [selectedCity, setselectedCity] = useState("");
  const navigate = useNavigate();

  const fetchrooms = async (city) => {
    try {
      const res = await axios.get(
        city
          ? ` https://api.verydesi.com/api/admin/getroombycity/${city}`
          : ` https://api.verydesi.com/api/admin/getallrooms`
      );
      setdata(res.data.Allroom.reverse());
    } catch (error) {
      console.log("Error during fetching rooms", error);
    }
  };

  const deleteuser = async (_id) => {
    try {
      const dlt = await axios.delete(
        ` https://api.verydesi.com/api/admin/deleteroom/${_id}`
      );
      if (dlt) {
        alert("successfully deleted");
      }
    } catch (error) {
      console.log("some issue while deleting try again", error);
    }
  };

  const fetchcity = async () => {
    try {
      const res = await axios.get(
        " https://api.verydesi.com/api/admin/getallrooms"
      );
      const uniqueCities = Array.from(
        new Set(res.data.Allroom.map((item) => item.city))
      );
      setCities(uniqueCities);
    } catch (error) {
      console.log("Error during fetching rooms", error);
    }
  };

  const handlecity = (e) => {
    const selectedCity = e.target.value;
    setselectedCity(selectedCity);
    // fetchrooms(selectedCity);
  };
  useEffect(() => {
    fetchrooms(selectedCity);
  }, [deleteuser, selectedCity]);

  useEffect(() => {
    fetchcity();
  });

  const nextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const renderRows = () => {
    const itemsPerPage = 5;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, data.length);
    return data.slice(startIndex, endIndex).map((items) => (
      <tr key={items._id} className="divide-x divide-gray-200 mb-4 ">
        <td className="whitespace-nowrap px-4 py-4">
          <div className="flex items-center">
            <div className="h-10 w-10 flex-shrink-0">
              <img
                className="h-10 w-10 rounded-full object-cover"
                src={items.Imgurl[0]}
                alt=""
              />
            </div>
            <div className="ml-4">
              <div className="text-base font-medium text-gray-500">
                {items.Title}
              </div>
            </div>
          </div>
        </td>
        <td className="whitespace-nowrap px-6 py-4">
          <div className="text-base text-gray-500">{items.email}</div>
        </td>

        <td className="whitespace-nowrap px-4 py-4 text-base text-gray-500">
          {items.Expected_Rooms}
        </td>
        {/* <td className="whitespace-nowrap px-4 py-4 text-base text-gray-500">
          {items.address}
        </td> */}
        <td className="whitespace-nowrap px-4 py-4 text-base text-gray-500">
          {items.city}
        </td>
        <td className="whitespace-nowrap px-4 py-4 text-base text-gray-500">
          {items.country}
        </td>
        <td className="whitespace-nowrap px-4 py-4 text-left text-base font-medium">
          <a href="#" className="text-gray-500 hover:text-indigo-600">
            Edit
          </a>
        </td>
        <td className="px-4 py-3.5 text-left text-base text-gray-500 hover:text-red-700">
          <button
            className="hover:text-red-600"
            onClick={() => {
              const _id = items._id;
              // console.log(_id);
              if (confirm("Confirm to delete") == true) {
                deleteuser(_id);
              } else {
                console.log("cancel");
              }
            }}
          >
            Delete
          </button>
        </td>
      </tr>
    ));
  };

  return (
    <div>
      <AdminHeader />
      <AdminDashboard>
        <section className="mx-auto font-['udemy-regular'] w-full max-w-7xl px-4 py-4">
          <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
            <div>
              <p className="text-[20px] font-semibold">All Rooms</p>
              <p className="mt-1 text-[17px] text-gray-700 font-['udemy-regular']">
                This is list of All Rooms. You can add, edit or delete existing
                ones.
              </p>
            </div>
            <div className="flex">
              <select
                className="mr-4 bg-white p-2 rounded-md"
                name="city"
                onChange={handlecity}
              >
                {cities.map((city, index) => (
                  <option className="text-base" key={index} value={city}>
                    {city}
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={() => {
                  navigate(`/admin/postroom`);
                }}
                className="whitespace-nowrap flex rounded-md bg-green-800 px-3 py-2 text-[19px] font-semibold text-white shadow-sm hover:bg-green-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              >
                Add Room
              </button>
            </div>
          </div>
          <div className="mt-6 flex flex-col">
            <div className="-mx-4 -my-2 overflow-scroll sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                <div className="overflow-hidden border border-gray-200 md:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr className="divide-x divide-gray-200">
                        <th
                          scope="col"
                          className="px-4 py-3.5 text-left text-base font-normal text-gray-700"
                        >
                          <div className="flex gap-1">
                            {" "}
                            <MdOutlineMeetingRoom size={23} /> Room
                          </div>
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3.5 text-left text-base font-normal text-gray-700"
                        >
                          <div className="flex gap-1">
                            {" "}
                            <MdOutlineEmail size={23} /> Email
                          </div>
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3.5 text-left text-base font-normal text-gray-700"
                        >
                          <div className="flex gap-1">
                            {" "}
                            <TfiMoney size={20} /> Rent
                          </div>
                        </th>

                        {/* <th
                          scope="col"
                          className="px-4 py-3.5 text-left text-base font-normal text-gray-500"
                        >
                          Address
                        </th> */}
                        <th
                          scope="col"
                          className="px-4 py-3.5 text-left text-base font-normal text-gray-700"
                        >
                          <div className="flex gap-1">
                            {" "}
                            <FaMapPin size={20} /> City
                          </div>
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3.5 text-left text-base font-normal text-gray-700"
                        >
                          <div className="flex gap-1">
                            {" "}
                            <FaMapLocationDot size={20} /> Country
                          </div>
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3.5 text-left text-base font-normal text-gray-700"
                        >
                          <div className="flex gap-1">
                            {" "}
                            <MdEdit size={23} /> Edit
                          </div>
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3.5 text-left text-base font-normal text-gray-700"
                        >
                          <div className="flex gap-1">
                            {" "}
                            <MdDeleteForever size={25} /> Delete
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {renderRows()}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4 w-full border-gray-300">
            <div className="mt-2 flex items-center justify-end">
              <div className="space-x-2 flex">
                {currentPage > 1 && (
                  <button
                    className="mx-2 px-4 py-2 border rounded-md flex items-center justify-center gap-2 bg-white text-gray-500 text-[17px] hover:bg-gray-300 hover:text-black"
                    onClick={prevPage}
                  >
                    <FaArrowLeft /> Previous
                  </button>
                )}
                {data.length > currentPage * 4 && (
                  <button
                    className="mx-2 px-4 py-2 border rounded-md flex items-center justify-center gap-2 bg-white text-gray-500 text-[17px] hover:bg-gray-300 hover:text-black"
                    onClick={nextPage}
                  >
                    Next <FaArrowRight />
                  </button>
                )}
              </div>
            </div>
          </div>
        </section>
      </AdminDashboard>
    </div>
  );
}

export default Allroom;
