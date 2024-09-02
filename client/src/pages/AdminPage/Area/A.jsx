import React from "react";

function A() {
  return (
    <div className=" h-full overflow-y-auto ">
      <p className="text-[22px] font-bold text-[#232f3e] my-7 font-['udemy-regular'] flex justify-center">
        Here You can Add Area
      </p>
      <form onSubmit={handleSubmit(onsubmit)}>
        <div className="flex flex-col gap-3 justify-center items-center">
          <div className="flex items-center">
            <label className="w-[160px] text-[18px]" htmlFor="country">
              Select Country
            </label>
            <div>
              <select
                className="flex h-10 w-[200px] lg:w-[300px] text-[17px] rounded-md border border-black/30 bg-transparent px-3 py-2 placeholder:text-gray-600 bg-white focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                {...register("country", {
                  required: "Please fill the country",
                })}
                disabled={!!editdata}
                onChange={(e) => setSelectedcountry(e.target.value)}
              >
                <option value="">Select Country</option>
                <option className="text-[15px]" value="Usa">
                  USA
                </option>
                <option className="text-[15px]" value="Canada">
                  CANADA
                </option>
              </select>
              {errors.country && (
                <p className="text-red-500 text-[16px] mt-2">
                  {errors.country?.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center">
            <label className="w-[160px] text-[18px]" htmlFor="state">
              Select State
            </label>
            <select
              className="flex h-10 w-[200px] lg:w-[300px] text-[17px] rounded-md border border-black/30 bg-transparent px-3 py-2 placeholder:text-gray-600 bg-white focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
              onChange={handleStateChange}
            >
              <option value="" disabled hidden>
                Select State
              </option>

              {selectedcountry ? (
                Object.entries(
                  selectedcountry === "Usa"
                    ? stateAbbreviations
                    : canadainstateAbbreviations
                ).map(([state, abbreviation]) => (
                  <option
                    className="text-[15px]"
                    key={abbreviation}
                    value={state}
                  >
                    {state} ({abbreviation})
                  </option>
                ))
              ) : (
                <option className="text-gray-500">
                  Please select a country.
                </option>
              )}
            </select>
          </div>

          <div className="flex space-x-2">
            {selectedstate.map((item) => (
              <div
                key={item}
                className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  primaryState === item
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                } `}
              >
                <span className="mr-2">{item}</span>

                <button
                  type="button"
                  onClick={() => setAsPrimaryState(item)}
                  className="text-black"
                >
                  {primaryState === item ? "Primary" : "Choose as Primary"}
                </button>
                <button
                  type="button"
                  onClick={() => removeState(item)}
                  className="ml-2 text-green-600 hover:text-green-800"
                >
                  <XCircle className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>

          <div className="flex items-center">
            <label className="w-[160px] text-[18px]" htmlFor="area">
              Area
            </label>
            <input
              className="flex h-10 w-[200px] lg:w-[300px] text-[17px] rounded-md border border-black/30 bg-transparent px-3 py-2 placeholder:text-gray-600 bg-white focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
              type="text"
              required="true"
              {...register("area")}
              placeholder="Type Area"
              disabled={!!editdata}
            />
          </div>
          {/* previosuly we named this as subarea ,now its cities  */}
          <div className="flex gap-2 text-[17px]">
            <label
              className="w-[150px] text-[18px] lg:ml-[5.7rem]"
              htmlFor="subarea"
            >
              Cities
            </label>
            <div className="flex flex-col lg:flex-row gap-2">
              <input
                className="flex h-10 w-[200px] lg:w-[150px] text-[17px] rounded-md border border-black/30 bg-transparent px-3 py-2 placeholder:text-gray-600 bg-white focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                type="text"
                value={subareaInput}
                onChange={(e) => setSubareaInput(e.target.value)}
                placeholder="Type Cities "
              />
              <select
                className="flex h-10 w-[200px] lg:w-[150px] text-[17px] rounded-md border border-black/30 bg-transparent px-3 py-2 placeholder:text-gray-600 bg-white focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                onChange={(e) => setstateab(e.target.value)}
              >
                <option value="" disabled selected>
                  Select State
                </option>
                {selectedstate.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>

              <button
                type="button"
                onClick={handleAddSubarea}
                className="lg:ml-3 rounded-md bg-green-800 px-4 py-1 text-white text-[1rem]"
              >
                Add
              </button>
            </div>
          </div>
          <div className="flex flex-wrap text-[17px] text-red-600 items-center">
            {subarea.map((subarea) => (
              <div
                key={subarea}
                className="flex m-2 p-2 items-center bg-gray-200 rounded-md px-1"
              >
                <span className="mr-2">{subarea}</span>
                <button
                  type="button"
                  onClick={() => removeSubarea(subarea)}
                  className="text-black"
                >
                  x
                </button>
              </div>
            ))}
          </div>
          <div className="flex items-center">
            <label
              className="min-w-[160px] text-[18px] ml-[5rem]"
              htmlFor="zipcode"
            >
              Zip & Codes
            </label>
            <input
              className="flex h-10 w-[300px] text-[17px] rounded-md border border-black/30 bg-transparent px-3 py-2 placeholder:text-gray-600 bg-white focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
              type="text"
              value={zipcodeInput}
              onChange={(e) => setZipcodeInput(e.target.value)}
              placeholder="Zip Code"
            />

            <button
              type="button"
              onClick={handleAddZipcode}
              className="lg:ml-3 rounded-md bg-green-800 px-4 py-2 text-white text-[1rem]"
            >
              Add
            </button>
          </div>
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
          <div className="flex flex-wrap text-[17px] text-red-600 items-center">
            {zipcode?.map((item) => (
              <div
                key={item}
                className="flex m-2 items-center bg-gray-200 rounded-md px-1"
              >
                <span className="mr-2">{item}</span>
                <button
                  type="button"
                  onClick={() => removezipcode(item)}
                  className="text-black"
                >
                  x
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center items-center mt-5">
          {editdata ? (
            <div className=" flex gap-2">
              <button
                className="rounded-md bg-gray-300 hover:bg-gray-400 font-bold text-black px-4 py-2 text-[1rem] self-center justify-center flex shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                type="button"
                onClick={() => navigate(`/admin/allarea`)}
              >
                Back
              </button>
              <button
                className="rounded-md bg-green-800 px-4 py-2 text-[1rem] self-center justify-center flex text-white shadow-sm hover:bg-green-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                type="submit"
              >
                Update Area
              </button>
            </div>
          ) : (
            <button
              className="rounded-md bg-green-800 px-4 py-2 text-[1rem] justify-center text-white shadow-sm hover:bg-green-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              type="submit"
            >
              Create Area
            </button>
          )}
        </div>
      </form>
      <p className="text-[18px] text-red-600 capitalize">
        * Primary state is a state where area is located
      </p>
      <p className="text-[18px] text-red-600 capitalize">
        * Whole state is where the entire state is listed after the subarea are
        done
      </p>
    </div>
  );
}

export default A;
