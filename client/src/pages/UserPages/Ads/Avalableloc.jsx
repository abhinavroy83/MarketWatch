import React from "react";
import Modal from "react-modal";

function Avalableloc({ isOpen, onClose }) {
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
          width: 600,
          height: 340,
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
      <div className=" flex justify-center mx-auto">
        <p>here we show Avalable location</p>
      </div>
    </Modal>
  );
}

export default Avalableloc;
