import React, { useEffect, useState } from "react";
import { DashConatiner } from "../../../components";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { BiMinusCircle } from "react-icons/bi";


function Getuserroom() {
  const { userID } = useParams();
  const token = useSelector((state) => state.auth.token);
  const isverified = useSelector((state) => state.auth.isverified);
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
  const handledeleterooms = async (deleteid) => {
    // console.log(deleteid);
    try {
      const res = await axios.delete(`http://localhost:8000/rooms/${deleteid}`);
      if (res) {
        alert("Room delete Sucessfully");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUserRoomDetails();
  }, [userID, handledeleterooms]);

  const nextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const renderRows = () => {
    const startIndex = (currentPage - 1) * 5;
    const endIndex = Math.min(startIndex + 5, roomsdeatails.length);
    return roomsdeatails.slice(startIndex, endIndex).map((items) => (
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
              <div className="text-[22px] font-medium text-gray-900">
                {items.Hotelname}
              </div>
            </div>
          </div>
        </td>
        <td className="whitespace-nowrap px-12 py-4">
          <div className="text-[22px] text-gray-700 font-roboto">{items.city}</div>
        </td>
        <td className="whitespace-nowrap px-4 py-4 text-[22px] text-gray-700 font-roboto">
          {items.address}
        </td>
        <td className="whitespace-nowrap px-4 py-4 text-[22px] text-gray-700 font-roboto">
          {items.rent}
        </td>
        <td className="whitespace-nowrap flex justify-center items-center gap-2 px-4 py-6 text-right text-[22px] font-medium font-roboto">
          <a
            onClick={() => {
              handledeleterooms(items._id);
            }}
            className="flex gap-3 items-center text-red-500 font-semibold cursor-pointer"
          >
            <BiMinusCircle size={25}/>  Delete
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
            <h2 className="text-3xl font-semibold text-[#0b5e86]">Rooms</h2>
            <p className="mt-1 text-[22px] text-gray-700">
              This is a list of all rooms. You can add new rooms, edit or delete
              existing ones.
            </p>
          </div>
          {isverified && (
            <div>
              <button
                type="button"
                onClick={() => {
                  navigate(`/addroom/${userID}`);
                }}
                className="rounded-md bg-green-800 px-3 py-2 text-[20px] font-semibold text-white shadow-sm hover:bg-green-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-800"
              >
                Add New Room
              </button>
            </div>
          )}
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
                        className="px-4 py-3.5 text-left text-[22px] font-normal text-gray-700"
                      >
                        <span>Room</span>
                      </th>
                      <th
                        scope="col"
                        className="px-12 py-3.5 text-left text-[22px] font-normal text-gray-700"
                      >
                        City
                      </th>

                      <th
                        scope="col"
                        className="px-4 py-3.5 text-left text-[22px] font-normal text-gray-700"
                      >
                        Address
                      </th>

                      <th
                        scope="col"
                        className="px-4 py-3.5 text-left text-[22px] font-normal text-gray-700"
                      >
                        Price
                      </th>
                      <th
                        scope="col"
                        // onClick={() => {
                        //   console.log(roomsdeatails);
                        //   handledeleterooms(roomsdeatails._id);
                        // }}
                        className="px-4 py-3.5 text-left text-[22px] font-normal text-gray-700"
                      >
                       Delete
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
                  className="rounded-md bg-green-800 px-3 py-2 text-[20px] flex items-center justify-center gap-2 font-semibold text-white shadow-sm hover:bg-green-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-800"
                  onClick={prevPage}
                >
                  <FaArrowAltCircleLeft /> Previous
                </button>
              )}
              {roomsdeatails.length > currentPage * 4 && (
                <button
                  className="rounded-md bg-green-800 px-3 py-2 text-[20px] flex items-center justify-center gap-2 font-semibold text-white shadow-sm hover:bg-green-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-800"
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

export default Getuserroom;
