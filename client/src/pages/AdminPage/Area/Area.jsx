import React, { useEffect, useState } from "react";
import {
  AdminDashboard,
  AdminHeader,
} from "../../../components/AdminCompontents";
import { fetchcity } from "../../../Services/CityApi/Cityapi";
import { useNavigate } from "react-router-dom";

function City() {
  const [data, setdata] = useState([]);
  const [cntry, setcountry] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectcountry, setselectcountry] = useState("select");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchdata = async () => {
      const citys = await fetchcity();
      console.log(citys.data.city);
      setdata(citys.data.city);
      const uniqueCities = Array.from(
        new Set(citys.data.city.map((item) => item.state))
      );
      //   console.log(uniqueCities)
      setcountry(uniqueCities);
    };
    fetchdata();
  }, [selectcountry]);
  const nextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };
  const renderRows = () => {
    const itemsPerPage = 7;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, data.length);
    return data.slice(startIndex, endIndex).map((items) => (
      <tr key={items._id} className="divide-x divide-gray-200">
        <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-500">
          {items.country}
        </td>
        <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-500">
          {items.state}
        </td>
        <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-500">
          {items.city}
        </td>
        <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-500">
          {items.subarea}
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
              <h2 className="text-lg font-semibold">All Area</h2>
              <p className="mt-1 text-sm text-gray-700">List of all city</p>
            </div>
            <div>
              <select
                name="State"
                onChange={() => {
                  const selectcountry = e.target.value;
                  setselectcountry(selectcountry);
                }}
              >
                {cntry.map((state, index) => (
                  <option key={index} value={state}>
                    {state}
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={() => {
                  navigate(`/admin/addarea`);
                }}
                className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              >
                Add new City
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
                          className="px-6 py-3.5 text-left text-sm font-normal text-gray-500"
                        >
                          Country
                        </th>

                        <th
                          scope="col"
                          className="px-4 py-3.5 text-left text-sm font-normal text-gray-500"
                        >
                          State
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3.5 text-left text-sm font-normal text-gray-500"
                        >
                          City
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3.5 text-left text-sm font-normal text-gray-500"
                        >
                          Subarea
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

export default City;
