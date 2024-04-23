import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Modal from "react-modal";
import { useSelector } from "react-redux";

function Addsuburbs({ isOpen, onClose, ...selcedata }) {
  const [status, setstatus] = useState("");
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();
  const token = useSelector((state) => state.adminauth.token);

  const onclick = async (data) => {
    // console.log(data);
    const ardata = {
      country: selcedata.country,
      state: selcedata.state,
      city: selcedata.area,
      subarea: data.subarea ? data.subarea : "",
      zipcode: data.zipcode ? data.zipcode : "",
      area: data.area ? data.area : "",
    };
    // console.log("ardata", ardata);
    try {
      const res = await axios.post(
        `https://marketwatch-e3hc.onrender.com/api/admin/postcity`,
        ardata,
        {
          headers: {
            jwttoken: `${token}`,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (res) {
        alert("added area succesfully");
        reset();
        onClose(false);
      }
    } catch (error) {
      console.log("error during addign area", error);
    }
  };

  useEffect(() => {
    Modal.setAppElement("#root");
  }, []);

  return (
    <div>
      <Modal
        isOpen={isOpen}
        onRequestClose={onClose}
        style={{
          content: {
            position: "absolute",
            top: "40%",
            left: "40%",
            transform: "translate(-40%, -40%)",
            width: 700,
            height: 400,
            border: "none",
            padding: "0",
            backgroundColor: "#0b5e86",
            boxShadow: "0px 0px 25px 0px rgba(0, 0, 0, 0.1)",
            borderRadius: 10,
            zIndex: 1000,
          },
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.9)",
            zIndex: 111,
          },
        }}
      >
        <div className="w-50 px-20 items-center grow">
          <svg
            className="h-10 w-10 text-white absolute top-3 right-3 cursor-pointer hover:text-black"
            // onClick={() => handleModal(false, false)}
            onClick={() => onClose(false)}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            {" "}
            <circle cx="12" cy="12" r="10" />{" "}
            <line x1="15" y1="9" x2="9" y2="15" />{" "}
            <line x1="9" y1="9" x2="15" y2="15" />
          </svg>
        </div>
        <div className="flex flex-col justify-center items-center h-full font-roboto">
          <p className="text-white text-[30px] mt-3">
            Add a new suburb to "Greater Portland Area"
          </p>
          <form onSubmit={handleSubmit(onclick)}>
            {/* <div className="flex items-center justify-center">
              <div>
                <label className="text-[25px] text-white mr-2">By Suburbs</label>
                <input
                  type="radio"
                  id="suburbs"
                  value="suburbs"
                  checked={status === "suburbs"}
                  onChange={(e) => setstatus(e.target.value)}
                />
              </div>
              <div>
                <label className="text-[25px] text-white mr-2 ml-3">By Area</label>
                <input
                  type="radio"
                  id="area"
                  value="area"
                  checked={status === "area"}
                  onChange={(e) => setstatus(e.target.value)}
                />
              </div>
            </div> */}
            {/* <div>
              {status === "suburbs" && (
                <div>
                  <p className="text-[22px] text-white mt-3">You can Add Suburbs</p>
                  <input
                    type="text"
                    {...register("subarea")}
                    className="flex h-10 font-roboto w-[300px] text-[21px] rounded-md border border-black/30 bg-transparent px-3 py-2 placeholder:text-gray-600 bg-white focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 "
                  />
                </div>
              )}
            </div> */}

            <div>
              <div className="flex flex-col justify-center w-full ">
                <p className="text-[25px] text-white mt-3 text-center">
                  You can Add Area
                </p>
                <div className=" flex gap-8">
                  <div className=" ">
                    <label className="text-[20px] text-white">Zip Code</label>
                    <input
                      type="number"
                      {...register("zipcode", {
                        required: "Zipcode is required",
                      })}
                      className="flex h-10 font-roboto w-[300px] text-[21px] rounded-md border border-black/30 bg-transparent px-3 py-2 placeholder:text-gray-600 bg-white focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 "
                    />
                    {errors.zipcode && (
                      <p className=" text-white text-sm">
                        {errors.zipcode.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="text-[20px] text-white" htmlFor="">
                      Area
                    </label>
                    <input
                      type="text"
                      {...register("area", { required: "Area is required" })}
                      className="flex h-10 font-roboto w-[300px] text-[21px] rounded-md border border-black/30 bg-transparent px-3 py-2 placeholder:text-gray-600 bg-white focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 "
                    />
                    {errors.area && (
                      <p className=" text-white text-sm">
                        {errors.area.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="items-center flex justify-center">
              <button
                className="rounded-md bg-green-white my-7 px-4 py-2 text-[20px] self-center font-semibold text-white bg-green-800 border-2 border-white shadow-sm hover:bg-green-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                type="Submit"
              >
                Add Suburbs
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
}

export default Addsuburbs;
