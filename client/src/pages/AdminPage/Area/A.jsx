import React from "react";

function A() {
  return (
    <div className=" h-full overflow-auto max-full">
      <div className="lg:hidden flex items-center text-gray-700 mt-2  font-['udemy-regular'] ">
        <Link to="/admin/dashboard">
          <FaHome size={20} />
        </Link>
        <IoIosArrowForward />
        <p className="">Area</p>
      </div>

      {/* <div className="mx-5 mt-6 flex justify-between">
    <p className="text-[22px] font-semibold font-['udemy-regular']">
      Add Area Details Here -
    </p>
    <div className="flex gap-3">
      <button
        className="rounded-md bg-green-800 px-4 py-2 text-[20px] font-semibold text-white shadow-sm hover:bg-green-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
        onClick={(e) => {
          e.preventDefault();
          onAddSuburbClick();
        }}
      >
        Add New Subrs
      </button>
    </div>
  </div> */}
      <p className="text-center text-[22px] text-[#232f3e] font-['udemy-regular'] justify-center w-full">
        List of Avaible Area
      </p>
      <form className=" font-['udemy-regular'] mt-5">
        <div className=" flex w-full mx-auto justify-center items-center">
          <div className="flex flex-col border-2 border-gray-400 w-[15rem] bg-white text-[18px] rounded-md">
            <p className="rounded-md text-[20px] bg-[#232f3e] text-white p-1 shadow-lg shadow-gray-400">
              Country -
            </p>
            <ul className="">
              <li
                value={"Usa"}
                onClick={() => {
                  setSelectedcountry("Usa");
                }}
                className={`cursor-pointer    ${
                  selectedcountry === "Usa"
                    ? "text-[18px] bg-gray-600 text-white p-1 rounded-sm hover:bg-gray-600 hover:text-white hover:shadow-lg hover:shadow-gray-400"
                    : ""
                }`}
              >
                <p className="ml-3">USA</p>
              </li>
              <li
                value={"Canada"}
                onClick={() => {
                  setSelectedcountry("Canada");
                }}
                className={`cursor-pointer    ${
                  selectedcountry === "Canada"
                    ? "text-[18px] bg-gray-600 text-white p-1 rounded-sm hover:bg-gray-600 hover:text-white hover:shadow-lg hover:shadow-gray-400"
                    : ""
                }`}
              >
                <p className="ml-3">Canada</p>
              </li>
            </ul>
          </div>
        </div>

        <div className="lg:flex lg:gap-20 lg:justify-center mt-5">
          <div className="flex flex-col border-2 border-gray-400 w-[15rem] rounded-md">
            <p className="text-[20px] bg-[#232f3e] text-white p-2 shadow-lg shadow-gray-400 rounded-md">
              List of Area in{" "}
              {selectedstate ? <p>{selectedstate}</p> : <span>City</span>}
            </p>
            <button
              onClick={() => {
                <div className="flex flex-col">
                  <p className=" text-[17px]">List of Suburbs</p>
                  <ul>
                    {Filteresub.length > 0 &&
                      Filteresub.map((item, index) => (
                        <li key={index}>{item.subarea}</li>
                      ))}
                  </ul>
                </div>;
                navigate("/admin/addarea");
              }}
              className="flex gap-2 items-center bg-white py-2 text-[18px] font-semibold text-black border shadow-sm hover:bg-gray-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
              <IoAddCircleOutline size={22} />
              Add Area
            </button>
            <ul className="rounded-sm text-[18px] bg-white p-1">
              {Filtercity.map((city, index) => (
                <div className=" flex justify-between">
                  <li
                    key={index}
                    value={city}
                    className={`cursor-pointer    ${
                      selectedCity === city
                        ? "text-[20px] bg-gray-600 text-white p-1 rounded-sm hover:bg-gray-600 hover:text-white hover:shadow-lg hover:shadow-gray-400"
                        : ""
                    }`}
                    onClick={() => {
                      setSelectedCity(city);
                    }}
                  >
                    {city}
                  </li>
                  <MdEdit
                    className=" cursor-pointer justify-center"
                    onClick={() => {
                      navigate(`/admin/area/update/${city}`);
                    }}
                  />
                </div>
              ))}
            </ul>
          </div>

          <div className="flex flex-col border-2 border-gray-400 w-[15rem] rounded-md mt-5 lg:mt-0">
            <p className="text-[20px] bg-[#232f3e] text-white shadow-lg shadow-gray-400 p-2 rounded-md">
              List of States
            </p>
            <div className=" overflow-y-auto max-h-96 scroll-m-0 justify-center bg-white text-[18px]">
              <ul className="list-none p-0 ml-3 mt-2">
                {selectedcountry ? (
                  Object.entries(
                    selectedcountry === "Usa"
                      ? stateAbbreviations
                      : canadainstateAbbreviations
                  ).map(([state, abbreviation]) => (
                    <li
                      key={abbreviation}
                      className={`cursor-pointer ${
                        uniquestate.includes(state)
                          ? "text-[20px] bg-gray-600 text-white p-1 rounded-sm hover:bg-gray-500 hover:text-white hover:shadow-lg hover:shadow-gray-400"
                          : ""
                      }`}
                    >
                      {state} ({abbreviation})
                    </li>
                  ))
                ) : (
                  <li className="text-gray-500">Please select a country.</li>
                )}
              </ul>
            </div>
          </div>

          <div className="flex flex-col w-[15rem]">
            <div className="border-2 border-gray-400 rounded-md">
              <p className="text-[20px] rounded-md bg-[#232f3e] text-white p-2 shadow-lg shadow-gray-400">
                List of Subarea
              </p>
              <div className=" overflow-y-auto max-h-96 scroll-m-0 justify-center bg-white">
                <ul className="rounded-sm text-[18px] flex flex-col ml-3 mt-2">
                  {Filteresub.length > 0 &&
                    Filteresub.map((item, index) => (
                      <li key={index} className="">
                        {item}
                        {/* {item.zipcodes.length > 0 && item.zipcodes.join(", ")} */}
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="flex flex-col w-[15rem]">
            <div className="border-2 border-gray-400 rounded-md">
              <p className="text-[20px] rounded-md bg-[#232f3e] text-white p-2 shadow-lg shadow-gray-400">
                List of zipcode
              </p>
              <div className=" overflow-y-auto max-h-96 scroll-m-0 justify-center bg-white">
                <ul className="rounded-sm text-[18px] flex flex-col ml-3 mt-2">
                  {filterpin.length > 0 &&
                    filterpin.map((item, index) => (
                      <li key={index} className="">
                        {item}
                        {/* {item.zipcodes.length > 0 && item.zipcodes.join(", ")} */}
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default A;
