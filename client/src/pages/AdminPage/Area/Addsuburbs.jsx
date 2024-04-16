import React, { useState } from "react";
import Modal from "react-modal";

function Addsuburbs({ isOpen, onClose }) {
  const [status, setstatus] = useState("");
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
        <div className=" flex ">
          <div>
            <label>By Suburbs</label>
            <input
              type="radio"
              value="suburbs"
              checked={status === "suburbs"}
              onChange={(e) => setstatus(e.target.value)}
            />
          </div>
          <div>
            <label>By Area</label>
            <input
              type="radio"
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
              <input type="text" className=" border-2 border-red-500" />
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
}

export default Addsuburbs;
