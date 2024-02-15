import React, { useEffect, useState } from "react";
import { DashConatiner } from "../../../components";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

function Getuserroom() {
  const { userID } = useParams();
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();
  const [roomsdeatails, setroomdeatils] = useState([]);
  // console.log(token);
  // console.log("userID", userID);
  const fetchuserroomdetails = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/getrooms/${userID}`
      );
      if (!res) {
        console.log("unable to fetch the data or it may be empty");
      }
      // console.log("response", res.data.rooms);
      setroomdeatils(res.data.rooms);
    } catch (error) {
      console.error(
        "error during fetching data in room details for persnol user",
        error
      );
    }
  };
  useEffect(() => {
    fetchuserroomdetails();
  }, [userID]);

  return (
    <DashConatiner>
      <section className="mx-auto w-full max-w-7xl px-4 py-4">
        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
          <div>
            <h2 className="text-lg font-semibold">Rooms</h2>
            <p className="mt-1 text-sm text-gray-700">
              This is a list of all rooms. You can add new rooms, edit or delete
              existing ones.
            </p>
          </div>
          <div>
            <button
              type="button"
              onClick={() => {
                navigate("/addroom");
              }}
              className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
              Add new room
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
                  {roomsdeatails ? (
                    <tbody className="divide-y divide-gray-200 bg-white overflow-y-scroll h-80 ">
                      {roomsdeatails.map((items) => (
                        <tr key={items.name}>
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
                                <div className="text-sm font-medium text-gray-900">
                                  {items.Hotelname}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-12 py-4">
                            <div className="text-sm text-gray-700">
                              {items.city}
                            </div>
                          </td>

                          <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-700">
                            {items.address}
                          </td>
                          <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-700">
                            {items.rent}
                          </td>
                          <td className="whitespace-nowrap px-4 py-4 text-right text-sm font-medium">
                            <a href="#" className="text-gray-700">
                              Edit
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  ) : (
                    <div>
                      <p>loading...</p>
                    </div>
                  )}
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </DashConatiner>
  );
}

export default Getuserroom;
