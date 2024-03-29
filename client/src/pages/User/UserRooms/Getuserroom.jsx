import React, { useEffect, useState } from "react";
import { DashConatiner } from "../../../components";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

function Getuserroom() {
  const { userID } = useParams();
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();
  const [roomsdeatails, setRoomDetails] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchUserRoomDetails = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/getrooms/${userID}`
      );
      if (!res) {
        console.log("unable to fetch the data or it may be empty");
      }
      setRoomDetails(res.data.rooms);
    } catch (error) {
      console.error(
        "error during fetching data in room details for personal user",
        error
      );
    }
  };
  // const handledeleterooms = async (deleteid) => {
  //   console.log(deleteid);
  //   // try {
  //   //   await axios.delete(`http://localhost:8000/rooms/${deleteid}`);
  //   // } catch (error) {
  //   //   console.error(error);
  //   // }
  // };

  useEffect(() => {
    fetchUserRoomDetails();
  }, [userID]);

  const nextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const renderRows = () => {
    const startIndex = (currentPage - 1) * 4;
    const endIndex = Math.min(startIndex + 4, roomsdeatails.length);
    return roomsdeatails.slice(startIndex, endIndex).map((items) => (
      <tr key={items.name}>
        <td className="whitespace-nowrap px-4 py-4 font-[Montserrat]">
          <div className="flex items-center font-[Montserrat]">
            <div className="h-10 w-10 flex-shrink-0 font-[Montserrat]">
              <img
                className="h-10 w-10 rounded-full object-cover"
                src={items.PrdImage}
                alt=""
              />
            </div>
            <div className="ml-4 font-[Montserrat]">
              <div className="text-sm font-medium text-gray-900">
                {items.Hotelname}
              </div>
            </div>
          </div>
        </td>
        <td className="whitespace-nowrap px-12 py-4">
          <div className="text-sm text-gray-700 font-[Montserrat]">{items.city}</div>
        </td>
        <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-700 font-[Montserrat]">
          {items.address}
        </td>
        <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-700 font-[Montserrat]">
          {items.rent}
        </td>
        <td className="whitespace-nowrap flex justify-center items-center gap-2 px-4 py-6 text-right text-sm font-medium font-[Montserrat]">
        <svg class="h-6 w-6 text-red-500"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"/>
         </svg>
          <a className="text-red-500 font-semibold">Delete</a>
        </td>
      </tr>
    ));
  };

  return (
    <DashConatiner>
      <section className="mx-auto w-full max-w-7xl px-4 py-4 font-[Montserrat]">
        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
          <div>
            <h2 className="text-2xl font-semibold text-red-700">Rooms</h2>
            <p className="mt-1 text-sm text-gray-700">
              This is a list of all rooms. You can add new rooms, edit or delete
              existing ones.
            </p>
          </div>
          <div>
            <button
              type="button"
              onClick={() => {
                navigate(`/addroom/${userID}`);
              }}
              className="rounded-md bg-[#17b19f] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
              Add New Room
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
                        Price
                      </th>
                      <th scope="col" className="relative px-4 py-3.5">
                        <span className="sr-only">Edit</span>
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
              {roomsdeatails.length > currentPage * 4 && (
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

export default Getuserroom;
