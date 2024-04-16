import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Modal from "react-modal";

function Addsuburbs({ isOpen, onClose, ...selcedata }) {
  const [status, setstatus] = useState("");
  const { handleSubmit, register, reset } = useForm();
  // console.log(selcedata);

  const onclick = (data) => {
    console.log(data);
    reset();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={{
        content: {
          position: "absolute",
          top: "40%",
          left: "40%",
          transform: "translate(-40%, -40%)",
          width: 800,
          height: 540,
          border: "none",
          padding: "0",
          backgroundColor: "#FFF",
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
      <div className=" flex flex-col justify-center items-center h-full ">
        <p>Add a new suburb to "Greater Portland Area"</p>
        <form onSubmit={handleSubmit(onclick)}>
          <div className=" flex ">
            <div>
              <label>By Suburbs</label>
              <input
                type="radio"
                id="suburbs"
                value="suburbs"
                checked={status === "suburbs"}
                onChange={(e) => setstatus(e.target.value)}
              />
            </div>
            <div>
              <label>By Area</label>
              <input
                type="radio"
                id="area"
                value="area"
                checked={status === "area"}
                onChange={(e) => setstatus(e.target.value)}
              />
            </div>
          </div>
          <div>
            {status === "suburbs" && (
              <div>
                <p>You can Add Suburbs</p>
                <input
                  type="text"
                  {...register("suburbs")}
                  className=" border-2 border-red-500"
                />
              </div>
            )}
          </div>

          <div>
            {status === "area" && (
              <div className="flex flex-col justify-center w-full ">
                <p className=" text-center">You can Add Area</p>
                <div className=" flex">
                  <div className=" ">
                    <label>Zip Code</label>
                    <input
                      type="text"
                      {...register("Zipcode")}
                      className=" border-2 border-red-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="">Area</label>
                    <input
                      type="text"
                      {...register("area")}
                      className=" border-2 border-red-500"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
          <button type="Submit">Add </button>
        </form>
      </div>
    </Modal>
  );
}

export default Addsuburbs;
