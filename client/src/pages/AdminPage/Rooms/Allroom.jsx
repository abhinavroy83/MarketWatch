import React, { useEffect, useState } from "react";
import {
  AdminDashboard,
  AdminHeader,
} from "../../../components/AdminCompontents";
import axios from "axios";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { FaArrowAltCircleLeft } from "react-icons/fa";

function Allroom() {
  const [data, setdata] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [cities, setCities] = useState([]);
  const [selectedCity, setselectedCity] = useState("");

  const fetchrooms = async (city) => {
    try {
      const res = await axios.get(
        city
          ? `https://marketwatch-e3hc.onrender.com
  /api/admin/getroombycity/${city}`
          : `https://marketwatch-e3hc.onrender.com
  /api/admin/getallrooms`
      );

      // console.log(res.data.Allroom);

      setdata(res.data.Allroom.reverse());
    } catch (error) {
      console.log("Error during fetching rooms", error);r
    }
  };

  const deleteuser = async (_id) => {
    try {
      const dlt = await axios.delete(
        `https://marketwatch-e3hc.onrender.com
  /api/admin/deleteroom/${_id}`
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
        "https://marketwatch-e3hc.onrender.com
  /api/admin/getallrooms"
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
    const itemsPerPage = 6;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, data.length);
    return data.slice(startIndex, endIndex).map((items) => (
      <tr key={items._id} className="divide-x divide-gray-200">
        <td className="whitespace-nowrap px-4 py-4">
          <div className="flex items-center">
            <div className="h-10 w-10 flex-shrink-0">
              <img
                className="h-10 w-10 rounded-full object-cover"
                src={items.PrdImage}
                alt=""
              />
            </div>
            <div className="ml-4">
              <div className="text-base font-medium text-gray-900">
                {items.Hotelname}
              </div>
            </div>
          </div>
        </td>
        <td className="whitespace-nowrap px-6 py-4">
          <div className="text-base text-gray-900">{items.email}</div>
        </td>

        <td className="whitespace-nowrap px-4 py-4 text-base text-gray-500">
          {items.rent}
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
        <td className="whitespace-nowrap px-4 py-4 text-right text-base font-medium">
          <a href="#" className="text-gray-500 hover:text-indigo-600">
            Edit
          </a>
        </td>
        <td className="whitespace-nowrap px-4 py-4 text-right text-base font-medium">
          <button
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
            delete
          </button>
        </td>
      </tr>
    ));
  };

  return (
    <div>
      <AdminHeader />
      <AdminDashboard>
        <section className="mx-auto font-roboto w-full max-w-7xl px-4 py-4">
          <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
            <div>
              <p className="text-3xl font-semibold text-[#0b5e86]">All Rooms</p>
              <p className="mt-1 text-xl text-gray-700 font-roboto">
                This is list of All Rooms. You can add,
                edit or delete existing ones.
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
                  // navigate(`/addjobs/${userID}`);
                }}
                className="flex rounded-md bg-green-800 px-3 py-2 text-lg font-semibold text-white shadow-sm hover:bg-green-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              >
                Add Room
              </button>
            </div>
          </div>
          <div className="mt-6 flex flex-col">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                <div className="overflow-hidden border border-gray-200 md:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr className="divide-x divide-gray-200">
                        <th
                          scope="col"
                          className="px-4 py-3.5 text-left text-base font-normal text-gray-700"
                        >
                          <span>Room</span>
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3.5 text-left text-base font-normal text-gray-500"
                        >
                          <span>Email</span>
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3.5 text-left text-base font-normal text-gray-500"
                        >
                          Rent
                        </th>

                        {/* <th
                          scope="col"
                          className="px-4 py-3.5 text-left text-base font-normal text-gray-500"
                        >
                          Address
                        </th> */}
                        <th
                          scope="col"
                          className="px-4 py-3.5 text-left text-base font-normal text-gray-500"
                        >
                          City
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3.5 text-left text-base font-normal text-gray-500"
                        >
                          Country
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3.5 text-left text-base font-normal text-gray-500"
                        >
                          Edit
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3.5 text-left text-base font-normal text-gray-500"
                        >
                          Delete
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
                    className="rounded-md bg-green-800 px-3 py-2 flex items-center justify-center gap-2 text-base font-semibold text-white shadow-sm hover:bg-green-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                    onClick={prevPage}
                  >
                    <FaArrowAltCircleLeft /> Previous
                  </button>
                )}
                {data.length > currentPage * 4 && (
                  <button
                    className="rounded-md bg-green-800 px-3 py-2 flex items-center justify-center gap-2 text-base font-semibold text-white shadow-sm hover:bg-green-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                    onClick={nextPage}
                  >
                    Next <FaArrowAltCircleRight />
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
