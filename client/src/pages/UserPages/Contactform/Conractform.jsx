import React from "react";
import { useForm } from "react-hook-form";
import Modal from "react-modal";
import { FormInput } from "../../../components";

function Conractform({ isOpen, onClose }) {
  const { register, handleSubmit } = useForm();
  const onSubmit = async () => {
    console.log(data);
  };

  return (
    <div>
      <Modal
        isOpen={isOpen}
        onRequestClose={onClose}
        style={{
          content: {
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 1000,
            height: 750,
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
        <div>
          <p>for contact</p>
          <form onSubmit={handleSubmit(onSubmit)} className=" flex  flex-col">
            <FormInput label="Your name" type="text" />
            <FormInput label="Your Email Address " type="text" />
            <FormInput label="Number" type="text" />
            <FormInput label="Your name" type="text" />
            <button type="submit">Send response</button>
          </form>
        </div>
      </Modal>
    </div>
  );
}

export default Conractform;
