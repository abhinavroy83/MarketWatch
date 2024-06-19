import React, { useEffect, useState } from "react";
import {
  AdminDashboard,
  AdminHeader,
} from "../../../../components/AdminCompontents";
import { useParams } from "react-router-dom";
import axios from "axios";
import Pagination from "../../../../components/SharedCompontents/Pagination";

function Update_del_Area() {
  const { area_name } = useParams();
  const [suburbs, setSuburbs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const suburbsPerPage = 8;

  const fetchSuburbs = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/admin/area/${area_name}`
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
        `http://localhost:8000/api/admin/deletesub/${id}`
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
              <h2 className="text-lg font-semibold">{area_name}</h2>
              <p className="mt-1 text-sm text-gray-700">
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
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-4 py-3.5 text-left text-sm font-normal text-gray-700"
                        >
                          <span>Area</span>
                        </th>
                        <th
                          scope="col"
                          className="px-12 py-3.5 text-left text-sm font-normal text-gray-700"
                        >
                          Title
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3.5 text-left text-sm font-normal text-gray-700"
                        >
                          Zip code
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3.5 text-left text-sm font-normal text-gray-700"
                        >
                          State
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3.5 text-left text-sm font-normal text-gray-700"
                        >
                          Delete
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {currentSuburbs.map((item) => (
                        <tr key={item._id}>
                          <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-700">
                            {item.area}
                          </td>
                          <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-700">
                            {item.zipcode}
                          </td>
                          <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-700">
                            {item.state}
                          </td>
                          <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-700">
                            {item.country}
                          </td>
                          <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-700">
                            <button onClick={() => handledelete(item._id)}>
                              delete
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
