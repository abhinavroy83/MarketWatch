import React from "react";
import { useForm } from "react-hook-form";
import Modal from "react-modal";
import { FormInput } from "../../../components";
import { RxCross1 } from "react-icons/rx";
import { BsChatText } from "react-icons/bs";
import name from "../../../assets/name.png";
import email from "../../../assets/email.png";
import number from "../../../assets/number.png";
import info from "../../../assets/info.png";
import { FaEnvelopeOpenText } from "react-icons/fa6";
import { getScreenSizeHook } from "../../../../Hooks/GetScreenSizeHook";
function Conractform({ isOpen, onClose }) {
  const { register, handleSubmit } = useForm();
  const { windowSize } = getScreenSizeHook();
  const isMobile = windowSize.width < 800;

  const onSubmit = async () => {
    // console.log(data);
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
            width: isMobile ? 350 : 600,
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
        {/* <div className="font-['udemy-regular'] items-center flex flex-col justify-center h-full w-full bg-[url('https://img.freepik.com/free-vector/green-gradient-background-gradient-3d-design_343694-3667.jpg')] bg-cover"> */}
        <div className="font-['udemy-regular'] items-center flex flex-col justify-center h-full w-full bg-green-100 bg-cover">
          <RxCross1
            className="h-5 w-5 text-black absolute top-3 right-3 cursor-pointer hover:rotate-[360deg] transition-transform duration-300 "
            onClick={onClose}
          />{" "}
          <div className="flex items-center">
            {/* <FaEnvelopeOpenText className="items-center" size={30} /> */}
            <img className="h-8 w-8" src={info} alt="" />
            <p className="text-[25px] text-black p-3 font-bold">Your Details</p>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col font-['udemy-regular'] text-black justify-center items-center gap-1 mt-2"
          >
            <div className="flex font-['udemy-regular'] p-2 items-center">
              <label className="w-[120px] lg:w-[120px] flex text-[17px] items-center gap-2">
                <img className="h-8 w-8" src={name} alt="" />
                Name
              </label>
              <input
                className="flex h-10 w-[200px] lg:w-[300px] bg-white text-[17px] border border-black/30 bg-transparent px-3 py-2 placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-40 "
                type="text"
              />
            </div>
            <div className="flex font-['udemy-regular']  p-2 items-center">
              <label className="w-[120px] lg:w-[120px] flex text-[17px] items-center gap-2">
                <img className="h-8 w-8" src={email} alt="" />
                Email
              </label>
              <input
                className="flex h-10 w-[200px] lg:w-[300px] bg-white text-[17px] border border-black/30 bg-transparent px-3 py-2 placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-40 "
                type="text"
              />
            </div>
            <div className="flex font-['udemy-regular'] p-2 items-center">
              <label className="w-[120px] lg:w-[120px] flex text-[17px] items-center gap-2">
                <img className="h-8 w-8" src={number} alt="" />
                Number
              </label>
              <input
                className="flex h-10 w-[200px] lg:w-[300px] bg-white text-[17px] border border-black/30 bg-transparent px-3 py-2 placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-40 "
                type="text"
              />
            </div>
            {/* <div className="flex font-['udemy-regular'] p-2">
              <label className="min-w-[130px] text-[22px]">Description:</label>
              <input
                className="flex h-[100px] font-['udemy-regular'] w-[300px] bg-white text-[19px] rounded-md border border-black/30 bg-transparent px-3 py-2 placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-40 "
                type="text"
              />
            </div> */}
            <button
              className="flex mb-4 bg-green-800 mt-4 p-2 px-3 text-[20px] font-normal text-white shadow-sm hover:bg-green-900 hover:text-white"
              type="submit"
            >
              Send response
            </button>
          </form>
        </div>
      </Modal>
    </div>
  );
}

export default Conractform;
