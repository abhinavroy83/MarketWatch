import React, { useEffect, useState } from "react";
import {
  AdminDashboard,
  AdminHeader,
} from "../../../components/AdminCompontents";
import axios from "axios";

function Getapproval() {
  const [data, setdata] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const getpendingapproval = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8000/api/admin/getapprovalrequest"
      );
      // console.log(res.data.pendingrequest);
      setdata(res.data.pendingrequest);
    } catch (error) {
      console.log("error during fetcing pendingapproval");
    }
  };

  const handleapprove = async (_id) => {
    try {
      const status = "approved";
      const res = await axios.put(
        `http://localhost:8000/api/admin/approvrequest/${_id}`,
        { status: status }
      );
      if (res) {
        alert("Approved");
      }
    } catch (error) {
      console.log("Error while handle approve", error);
    }
  };
  useEffect(() => {
    getpendingapproval();
  }, [handleapprove]);

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
        <td className="whitespace-nowrap px-4 py-4 text-base text-gray-500">
          {items.requestedID}
        </td>
        <td className="whitespace-nowrap px-4 py-4 text-base text-gray-500">
          {items.userId}
        </td>
        <td className="whitespace-nowrap px-4 py-4 text-base text-gray-500">
          {items.reason}
        </td>
        <td className="whitespace-nowrap px-4 py-4 text-base text-gray-500">
          {items.status}
        </td>
        <td className="whitespace-nowrap px-4 py-4 text-right text-base font-medium">
          <button
            onClick={() => {
              const _id = items._id;
              console.log(_id);
              if (confirm("Confirm to Approve") == true) {
                // deleteuser(_id);
                handleapprove(_id);
                console.log(_id);
              } else {
                console.log("cancle");
              }
            }}
          >
            Click here
          </button>
        </td>
      </tr>
    ));
  };

  return (
    <div>
      <AdminHeader />
      <AdminDashboard>
        <section className="mx-auto w-full max-w-7xl px-4 py-4">
          <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
            <div>
            <h2 className="text-3xl font-semibold text-red-700">List</h2>
              <p className="mt-1 text-lg text-gray-700">
                List of all Pending and Approval
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
                          className="px-6 py-3.5 text-left text-base font-normal text-gray-500"
                        >
                          Requested Id
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3.5 text-left text-base font-normal text-gray-500"
                        >
                          User Id
                        </th>

                        <th
                          scope="col"
                          className="px-4 py-3.5 text-left text-base font-normal text-gray-500"
                        >
                          reason
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3.5 text-left text-base font-normal text-gray-500"
                        >
                          status
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3.5 text-left text-base font-normal text-gray-500"
                        >
                          For Approve
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
                    className="rounded-md bg-black px-3 py-2 text-base font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                    onClick={prevPage}
                  >
                    &larr; Previous
                  </button>
                )}
                {data.length > currentPage * 4 && (
                  <button
                    className="rounded-md bg-black px-3 py-2 text-base font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
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

export default Getapproval;
