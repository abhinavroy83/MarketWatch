import React, { useEffect, useState } from "react";
import { DashConatiner } from "../../../components";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function Getuserjobs() {
  const { userID } = useParams();
  const navigate = useNavigate();
  const [jobdata, setJobdata] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchusejobsdeatails = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/api/getjob/${userID}`);
      if (!res) {
        console.log("unable to the fetch job deatils ");
      }
      console.log(res.data.job);
      setJobdata(res.data.job);
    } catch (error) {
      console.error("error during the fetching job deatails for usee", error);
    }
  };
  useEffect(() => {
    fetchusejobsdeatails();
  }, [userID]);
  const nextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1); 
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const renderRows = () => {
    const startIndex = (currentPage - 1) * 4;
    const endIndex = Math.min(startIndex + 4, jobdata.length);
    return jobdata.slice(startIndex, endIndex).map((job) => (
      <tr key={job.name} className="divide-x divide-gray-200">
        <td className="whitespace-nowrap px-4 py-4">
          <div className="flex items-center">
            <div className="h-10 w-10 flex-shrink-0">
              <img
                className="h-10 w-10 rounded-full object-cover"
                src={job.company_logo}
                alt=""
              />
            </div>
            <div className="ml-4">
              <div className="text-sm font-medium text-gray-900">
                {job.company_name}
              </div>
            </div>
          </div>
        </td>
        <td className="whitespace-nowrap px-6 py-4">
          <div className="text-sm text-gray-900">{job.postion}</div>
        </td>

        <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-500">
          {job.jobtype}
        </td>
        <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-500">
          {job.salary}
        </td>
        <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-500">
          {job.job_location}
        </td>
        <td className="whitespace-nowrap px-4 py-4 text-right text-sm font-medium">
          <a href="#" className="text-gray-500 hover:text-indigo-600">
            Edit
          </a>
        </td>
      </tr>
    ));
  };

  return (
    <DashConatiner>
      <section className="mx-auto w-full max-w-7xl px-4 py-4">
        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
          <div>
            <h2 className="text-lg font-semibold">Employees</h2>
            <p className="mt-1 text-sm text-gray-700">
              This is a list of all employees. You can add new employees, edit
              or delete existing ones.
            </p>
          </div>
          <div>
            <button
              type="button"
              className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
              Add new employee
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
                        className="px-4 py-3.5 text-left text-sm font-normal text-gray-500"
                      >
                        <span>Company</span>
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3.5 text-left text-sm font-normal text-gray-500"
                      >
                        Job Title
                      </th>

                      <th
                        scope="col"
                        className="px-4 py-3.5 text-left text-sm font-normal text-gray-500"
                      >
                        Job Type
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-left text-sm font-normal text-gray-500"
                      >
                        Salary
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-left text-sm font-normal text-gray-500"
                      >
                        Location
                      </th>
                      <th scope="col" className="relative px-4 py-3.5">
                        <span className="sr-only">Edit</span>
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
              {jobdata.length > currentPage * 4 && (
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
    </DashConatiner>
  );
}

export default Getuserjobs;
