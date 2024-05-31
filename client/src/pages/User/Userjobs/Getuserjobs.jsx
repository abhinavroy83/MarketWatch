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
  // console.log(jobdata)

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
      <tr key={job.name} className="font-[Montserrat]">
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
              <div className="text-sm font-medium text-gray-900 font-[Montserrat]">
                {job.company_name}
              </div>
            </div>
          </div>
        </td>
        <td className="whitespace-nowrap px-6 py-4 font-[Montserrat]">
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
            <h2 className="text-2xl font-semibold text-red-700">Jobs</h2>
            <p className="mt-1 text-sm text-gray-700">
              This is a list of all employees. You can add new Jobs, edit or
              delete existing ones.
            </p>
          </div>
          <div>
            <button
              type="button"
              onClick={() => {
                navigate(`/addjobs/${userID}`);
              }}
              className="rounded-md bg-[#17b19f] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
              Add New Jobs
            </button>
          </div>
        </div>
        <div className="mt-6 flex flex-col">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden border border-gray-200 md:rounded-lg">
                <table className="min-w-full">
                  <thead className="bg-gray-50">
                    <tr className="">
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
                  className="rounded-md bg-[#17b19f] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                  onClick={prevPage}
                >
                  &larr; Previous
                </button>
              )}
              {jobdata.length > currentPage * 4 && (
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

export default Getuserjobs;
