import React, { useEffect, useState } from "react";
import { DashConatiner } from "../../../components";
import { Link, useParams, useNavigate } from "react-router-dom";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import axios from "axios";
import Loader from "../../../components/UserCompontents/Loader";

function ListAllwish() {
  const { userID } = useParams();
  const [data, setdata] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const handleDeleteRoom = async (deleteId) => {
    console.log(deleteId);
    try {
      const res = await axios.delete(
        `http://localhost:8000/api/deletelist/${deleteId}`
      );
      if (res) {
        // If deletion is successful, remove the deleted item from roomdata
        setdata((prevRoomData) =>
          prevRoomData.filter((room) => room._id !== deleteId)
        );
        alert("Unwish Successful");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchAllList = async () => {
      try {
        const listResponse = await axios.get(
          `http://localhost:8000/api/getlist/${userID}`
        );
        const list = listResponse.data.list.map((item) => item.roomId);
        console.log(list);
        const roomResponse = await axios.get(
          `http://localhost:8000/api/getrooms/${userID}`
        );
        const rooms = roomResponse.data.rooms;

        const matchedRooms = rooms.filter((room) => list.includes(room._id));
        console.log(matchedRooms);
        setdata(matchedRooms);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllList();
  }, [userID, handleDeleteRoom]);

  const nextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };
  if (loading) {
    return <Loader className={"h-screen flex justify-center items-center"} />;
  }

  const renderRows = () => {
    const startIndex = (currentPage - 1) * 10;
    const endIndex = Math.min(startIndex + 10, data.length);
    return data.slice(startIndex, endIndex).map((items) => (
      <tr key={items.name}>
        <td className="whitespace-nowrap px-4 py-4 font-roboto">
          <div className="flex items-center font-roboto">
            <div className="h-10 w-10 flex-shrink-0 font-roboto">
              <img
                className="h-10 w-10 rounded-full object-cover"
                src={items.PrdImage}
                alt=""
              />
            </div>
            <div className="ml-4 font-roboto">
              <div className="text-lg font-medium text-gray-900">
                {items.Hotelname}
              </div>
            </div>
          </div>
        </td>
        <td className="whitespace-nowrap px-12 py-4">
          <div className="text-lg text-gray-700 font-roboto">{items.city}</div>
        </td>
        <td className="whitespace-nowrap px-4 py-4 text-lg text-gray-700 font-roboto">
          {items.rent}
        </td>
        <td
          className="whitespace-nowrap px-4 py-4 text-lg text-gray-700 font-roboto  cursor-pointer"
          onClick={() => {
            navigate(`/rooms/${items.roomId}`);
          }}
        >
          Click here
        </td>
        <td className="whitespace-nowrap flex justify-center items-center gap-2 px-4 py-6 text-right text-lg font-medium font-roboto">
          <svg
            class="h-6 w-6 text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <a
            // onClick={() => {
            //   handleDeleteRoom(items._id);
            // }}
            className="text-red-500 font-semibold cursor-pointer"
          >
            Delete
          </a>
        </td>
      </tr>
    ));
  };
  return (
    <DashConatiner>
      <section className="mx-auto w-full max-w-7xl px-4 py-4 font-roboto">
        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
          <div>
            <h2 className="text-3xl font-semibold text-red-700 flex items-center gap-3">
              <FaHeart className="text-red-700" size={30} />
              Wishlist
            </h2>
            <p className="mt-2 text-lg text-gray-700 ml-1">
              Your Wishlist is here.
            </p>
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
                        className="px-4 py-3.5 text-left text-lg font-normal text-gray-700"
                      >
                        <span>Room</span>
                      </th>
                      <th
                        scope="col"
                        className="px-12 py-3.5 text-left text-lg font-normal text-gray-700"
                      >
                        City
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-left text-lg font-normal text-gray-700"
                      >
                        Price
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-left text-lg font-normal text-gray-700"
                      >
                        Visit Page
                      </th>
                      {/* <th
                        scope="col"
                        className="px-4 py-3.5 text-left text-lg font-normal text-gray-700"
                      >
                        Price
                      </th> */}
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-lg font-normal text-gray-700"
                      >
                        Remove
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
            <div className="space-x-2 flex">
              {currentPage > 1 && (
                <button
                  className="rounded-md bg-black px-3 py-2 text-lg flex items-center justify-center gap-2 font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                  onClick={prevPage}
                >
                  <FaArrowAltCircleLeft /> Previous
                </button>
              )}
              {data.length > currentPage * 4 && (
                <button
                  className="rounded-md bg-black px-3 py-2 text-lg flex items-center justify-center gap-2 font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                  onClick={nextPage}
                >
                  Next <FaArrowAltCircleRight />
                </button>
              )}
            </div>
          </div>
        </div>
      </section>
    </DashConatiner>
  );
}

export default ListAllwish;
