import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DashConatiner } from "../../../components";
import { useState } from "react";

function Getuserbussiness() {
  const { userID } = useParams();
  const [details, setdetails] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  const fetchuserbussinessdeatils = async () => {
    try {
      const res = await axios.get(
        ` https://api.verydesi.com/api/getbussinesslist/${userID}`
      );
      if (!res) {
        console.log("unable to fetch the data");
      }
      // console.log(res.data.business);
      setdetails(res.data.business);
    } catch (error) {
      console.error(
        "error during fetching data in bussiness details for personal user",
        error
      );
    }
  };
  useEffect(() => {
    fetchuserbussinessdeatils();
  }, [userID]);
  const nextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const renderRows = () => {
    const startIndex = (currentPage - 1) * 4;
    const endIndex = Math.min(startIndex + 4, details.length);
    return details.slice(startIndex, endIndex).map((items) => (
      <tr key={items._id}>
        <td className="whitespace-nowrap px-4 py-4 font-[Montserrat]">
          <div className="flex items-center">
            <div className="h-10 w-10 flex-shrink-0">
              <img
                className="h-10 w-10 rounded-full object-cover"
                src={items.Image}
                alt=""
              />
            </div>
            <div className="ml-4">
              <div className="text-sm font-medium text-gray-900 font-[Montserrat]">
                {items.business_name}
              </div>
            </div>
          </div>
        </td>
        <td className="whitespace-nowrap px-12 py-4">
          <div className="text-sm text-gray-700 font-[Montserrat]">
            {items.city}
          </div>
        </td>
        <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-700">
          {items.address1}
        </td>
        <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-700">
          {items.country}
        </td>
        <td className="whitespace-nowrap px-4 py-4 text-right text-sm font-medium">
          <a className="text-gray-700">Delete</a>
        </td>
      </tr>
    ));
  };
  return (
    <DashConatiner>
      <section className="mx-auto w-full max-w-7xl px-4 py-4 font-[Montserrat]">
        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
          <div>
            <h2 className="text-2xl font-semibold text-red-700">Bussiness</h2>
            <p className="mt-1 text-sm text-gray-700">
              This is a list of all rooms. You can add new rooms, edit or delete
              existing ones.
            </p>
          </div>
          <div>
            <button
              type="button"
              className="rounded-md bg-[#17b19f] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              onClick={() => {
                navigate(`/addbussiness/${userID}`);
              }}
            >
              Add New Bussiness
            </button>
          </div>
        </div>
        <div className="mt-6 flex flex-col">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden border border-gray-200 md:rounded-lg">
                <table className="min-w-full divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-left text-sm font-normal text-gray-700"
                      >
                        <span>Room</span>
                      </th>
                      <th
                        scope="col"
                        className="px-12 py-3.5 text-left text-sm font-normal text-gray-700"
                      >
                        City
                      </th>

                      <th
                        scope="col"
                        className="px-4 py-3.5 text-left text-sm font-normal text-gray-700"
                      >
                        Address
                      </th>

                      <th
                        scope="col"
                        className="px-4 py-3.5 text-left text-sm font-normal text-gray-700"
                      >
                        Country
                      </th>

                      <th className="whitespace-nowrap flex justify-center items-center gap-2 px-4 py-6 text-right text-sm font-medium font-[Montserrat]">
        <svg class="h-6 w-6 text-red-500"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"/>
         </svg>
          <a className="text-red-500 font-semibold">Delete</a>
        </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white ">
                    {renderRows()}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4 w-full border-gray-300">
          <div className="mt-2 flex items-center justify-end">
            <div className="space-x-2">
              {currentPage > 1 && (
                <button
                  className="rounded-md bg-[#17b19f] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                  onClick={prevPage}
                >
                  &larr; Previous
                </button>
              )}
              {details.length > currentPage * 4 && (
                <button
                  className="rounded-md bg-[#17b19f] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                  onClick={nextPage}
                >
                  Next &rarr;
                </button>
              )}
            </div>
          </div>
        </div>
      </section>
    </DashConatiner>
  );
}

export default Getuserbussiness;
