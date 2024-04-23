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
        
        <div className="font-['udemy-regular'] items-center flex flex-col justify-center h-full bg-[#0b5e86]">
        <svg
              className="h-10 w-10 text-white absolute top-3 right-3 cursor-pointer hover:text-red-800"
              onClick={onClose}
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
        <p className="text-[30px] p-3 text-white">Send Us A Message</p>
          <hr/>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col font-['udemy-regular'] text-white font-medium justify-center items-center gap-3 mt-4">
            {/* <div className="flex font-['udemy-regular']  p-2 items-center">
                <label className="min-w-[190px] text-[19px]">Your Name:</label>
                  <input className="flex h-10 font-['udemy-regular'] w-[300px] bg-white text-[19px] rounded-md border border-black/30 bg-transparent px-3 py-2 placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-40 "
                    type="text" 
                  />    
            </div>  
            <div className="flex font-['udemy-regular']  p-2 items-center">
                <label className="min-w-[190px] text-[19px]">Your Email Address:</label>
                  <input className="flex h-10 font-['udemy-regular'] w-[300px] bg-white text-[19px] rounded-md border border-black/30 bg-transparent px-3 py-2 placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-40 "
                    type="text" 
                  />    
            </div> 
            <div className="flex font-['udemy-regular']  p-2 items-center">
                <label className="min-w-[190px] text-[19px]">Contact Number:</label>
                  <input className="flex h-10 font-['udemy-regular'] w-[300px] bg-white text-[19px] rounded-md border border-black/30 bg-transparent px-3 py-2 placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-40 "
                    type="text" 
                  />    
            </div>  */}
            <div className="flex font-['udemy-regular'] p-2">
                <label className="min-w-[130px] text-[22px]">Description:</label>
                  <input className="flex h-[100px] font-['udemy-regular'] w-[300px] bg-white text-[19px] rounded-md border border-black/30 bg-transparent px-3 py-2 placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-40 "
                    type="text" 
                  />    
            </div>  
            <button className="flex rounded-md bg-green-800 mt-2 p-2 px-3 text-[22px] border-2 border-white text-white shadow-sm hover:bg-green-900 hover:text-white" type="submit">Send response</button>
          </form>
        </div>
      </Modal>
    </div>
  );
}

export default Conractform;
