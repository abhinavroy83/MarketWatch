import React, { useEffect, useState } from "react";
import {
  AdminDashboard,
  AdminHeader,
} from "../../../components/AdminCompontents";
import axios from "axios";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";

function Pendingrequest() {
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setdata] = useState([]);

  const token = useSelector((state) => state.adminauth.token);

  const fetchrequest = async () => {
    try {
      const res = await axios.get(
        " https://api.verydesi.com/api/admin/getallapproval",
        {
          headers: {
            jwttoken: `${token}`,
          },
        }
      );
      setdata(res.data.allrequest);
    } catch (error) {
      console.log("error during fetcing all user", error);
    }
  };

  const deleteuser = async (_id) => {
    try {
      const res = await axios.delete(
        ` https://api.verydesi.com/api/admin/dltaprvauser/${_id}`
      );
      if (res) {
        alert("user Deleted");
      }
    } catch (error) {
      console.log("error during fetcing all user", error);
    }
  };

  useEffect(() => {
    fetchrequest();
  }, [deleteuser]);
  const nextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const renderRows = () => {
    const itemsPerPage = 10;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, data.length);
    return data.slice(startIndex, endIndex).map((items) => (
      <tr key={items._id} className="divide-x divide-gray-200">
        <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-500">
          {items.userId}
        </td>
        <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-500">
          {items.reason}
        </td>

        <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-500">
          {items.status}
        </td>
        <td className="whitespace-nowrap px-4 py-4 text-right text-sm font-medium">
          {items.status === "approved" ? (
            <button
              onClick={() => {
                const _id = items._id;
                // console.log(_id);
                if (confirm("Confirm to dekete") == true) {
                  deleteuser(_id);
                  // handleapprove(_id);
                  console.log(_id);
                } else {
                  console.log("cancle");
                }
              }}
            >
              Click here
            </button>
          ) : null}
        </td>
      </tr>
    ));
  };

  return (
    <div>
      
      <AdminDashboard>
        <section className="mx-auto w-full max-w-7xl px-4 py-4">
          <div className="lg:hidden flex items-center text-gray-700 mt-2  font-['udemy-regular'] ">
            <Link to="/admin/dashboard">
              <FaHome size={20} />
            </Link>
            <IoIosArrowForward />
            <p>users</p>
          </div>
          <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
            <div>
              <p className="mt-1 text-lg text-gray-700">
                List of all pending Approval
              </p>
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
                          className="px-6 py-3.5 text-left text-sm font-normal text-gray-500"
                        >
                          User Id
                        </th>

                        <th
                          scope="col"
                          className="px-4 py-3.5 text-left text-sm font-normal text-gray-500"
                        >
                          reason
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3.5 text-left text-sm font-normal text-gray-500"
                        >
                          status
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3.5 text-left text-sm font-normal text-gray-500"
                        >
                          Delete user
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
              <div className="space-x-2">
                {currentPage > 1 && (
                  <button
                    className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                    onClick={prevPage}
                  >
                    &larr; Previous
                  </button>
                )}
                {data.length > currentPage * 4 && (
                  <button
                    className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                    onClick={nextPage}
                  >
                    Next &rarr;
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

export default Pendingrequest;
