import React, { useEffect, useState } from "react";
import {
  AdminDashboard,
  AdminHeader,
} from "../../../../components/AdminCompontents";
import { useParams } from "react-router-dom";
import axios from "axios";
import Pagination from "../../../../components/SharedCompontents/Pagination";
import { MdDeleteForever } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { FaMapMarkerAlt } from "react-icons/fa";
import { TbMapPinPlus } from "react-icons/tb";
import { FaMapPin } from "react-icons/fa";
import { FaMapLocationDot } from "react-icons/fa6";

function Update_del_Area() {
  const { area_name } = useParams();
  const [suburbs, setSuburbs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const suburbsPerPage = 8;
  const [isedit, setIsedit] = useState(false);

  const fetchSuburbs = async () => {
    try {
      const res = await axios.get(
        `https://api.verydesi.com/api/admin/area/${area_name}`
      );
      setSuburbs(res.data.suburbs);
    } catch (error) {
      console.log("Error while fetching suburbs: ", error);
    }
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const indexOfLastSuburb = currentPage * suburbsPerPage;
  const indexOfFirstSuburb = indexOfLastSuburb - suburbsPerPage;
  const currentSuburbs = suburbs.slice(indexOfFirstSuburb, indexOfLastSuburb);

  const handledelete = (id) => {
    try {
      const del = axios.delete(
        `https://api.verydesi.com/api/admin/deletesub/${id}`
      );
      if (del) {
        alert("suburbs delete sucessfully");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSuburbs();
  }, [handledelete]);
  return (
    <div>
      <AdminHeader />
      <AdminDashboard>
        <section className="mx-auto w-full max-w-7xl px-4 py-4">
          <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
            <div>
              <h2 className="text-[20px] font-semibold">{area_name}</h2>
              <p className="mt-1 text-[17px] text-gray-700">
                This is a list of all Areas Available in {area_name}, you can
                edit or delete existing ones.
              </p>
            </div>
          </div>
          <div className="mt-6 flex flex-col">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                <div className="overflow-hidden border border-gray-200 md:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50 text-base">
                      <tr>
                        <th
                          scope="col"
                          className="px-4 py-3.5 text-left  font-normal text-gray-700"
                        >
                          <div className="flex gap-1">
                            {" "}
                            <FaMapMarkerAlt size={20} /> Area
                          </div>
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3.5 text-left font-normal text-gray-700"
                        >
                          <div className="flex gap-1">
                            {" "}
                            <TbMapPinPlus size={20} /> ZipCode
                          </div>
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3.5 text-left font-normal text-gray-700"
                        >
                          <div className="flex gap-1">
                            {" "}
                            <FaMapPin size={20} /> State
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
                          className="px-4 py-3.5 text-left font-normal text-gray-700"
                        >
                          <div className="flex gap-1">
                            {" "}
                            <MdEdit size={23} /> Edit
                          </div>
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3.5 text-left font-normal text-gray-700"
                        >
                          <div className="flex gap-1">
                            {" "}
                            <MdDeleteForever size={25} /> Delete
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white text-base items-center">
                      {currentSuburbs.map((item) => (
                        <tr key={item._id}>
                          {isedit ? (
                            <input
                              type="text"
                              defaultValue={item.area}
                              className=" border-2 border-red-500"
                            />
                          ) : (
                            <td className="whitespace-nowrap px-4 py-4  text-gray-500">
                              {item.area}
                            </td>
                          )}
                          <td className="whitespace-nowrap px-4 py-4  text-gray-500">
                            {item.zipcode}
                          </td>
                          <td className="whitespace-nowrap px-4 py-4 text-gray-500">
                            {item.state}
                          </td>
                          <td className="whitespace-nowrap px-4 py-4 text-gray-500">
                            {item.country}
                          </td>
                          {!isedit ? (
                            <td
                              className="whitespace-nowrap px-4 py-4 text-gray-500"
                              onClick={() => {
                                setIsedit(true);
                              }}
                            >
                              Edit
                            </td>
                          ) : (
                            <td
                              className="whitespace-nowrap px-4 py-4 text-gray-500"
                              onClick={() => {
                                setIsedit(false);
                              }}
                            >
                              cancle
                            </td>
                          )}
                          <td className="whitespace-nowrap px-4 py-4 text-gray-500 flex gap-2">
                            <button onClick={() => handledelete(item._id)}>
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <Pagination
              currentPage={currentPage}
              totalRooms={suburbs.length}
              paginate={paginate}
              roomsPerPage={suburbsPerPage}
            />
          </div>
        </section>
      </AdminDashboard>
    </div>
  );
}

export default Update_del_Area;
