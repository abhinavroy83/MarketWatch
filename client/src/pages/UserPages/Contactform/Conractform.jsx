import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Modal from "react-modal";
import { FormInput } from "../../../components";
import { RxCross1 } from "react-icons/rx";
import { getScreenSizeHook } from "../../../../Hooks/GetScreenSizeHook";
import { useSelector } from "react-redux";
import axios from "axios";
function Conractform({ isOpen, onClose }) {
  const { register, handleSubmit } = useForm();
  const { windowSize } = getScreenSizeHook();
  const [data, setdata] = useState([]);
  const isMobile = windowSize.width < 800;

  const userId = useSelector((state) => state.auth.userID);

  const fetchuser = async () => {
    try {
      const res = await axios.get(
        ` https://api.verydesi.com/user/dashboard/profile/${userId}`
      );

      setdata(res.data.user);
    } catch (error) {
      console.log("error during fetcing userdetails");
    }
  };

  const onSubmit = async () => {
    console.log(first);
  };

  useEffect(() => {
    fetchuser();
  }, []);
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
        <div className="font-['udemy-regular'] items-center flex flex-col justify-center h-full w-full bg-white bg-cover">
          <RxCross1
            className="h-5 w-5 text-black absolute top-3 right-3 cursor-pointer hover:rotate-[360deg] transition-transform duration-300 "
            onClick={onClose}
          />{" "}
          <div className="flex items-center">
            {/* <FaEnvelopeOpenText className="items-center" size={30} /> */}
            <img
              className="h-8 w-8"
              src={
                "https://res.cloudinary.com/druohnmyv/image/upload/v1723819318/assests/i195e6ejjhwwwqhagw6t.png"
              }
              alt=""
            />
            <p className="text-[25px] text-black p-3 font-bold">Contact</p>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col font-['udemy-regular'] text-black justify-center items-center gap-1 mt-2"
          >
            <div className="flex font-['udemy-regular'] p-2 items-center">
              <label className="w-[120px] lg:w-[120px] flex text-[17px] items-center gap-2">
                <img
                  className="h-8 w-8"
                  src={
                    "https://res.cloudinary.com/druohnmyv/image/upload/v1723819321/assests/xvg4sjgqjgjilynyxs0a.png"
                  }
                  alt=""
                />
                Name
              </label>
              <p className="flex h-10 w-[200px] lg:w-[300px] text-black text-[17px] rounded-md border border-black/30 bg-transparent px-3 py-2 placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-40 ">
                {data?.firstName} {data?.lastName}
              </p>
            </div>
            <div className="flex font-['udemy-regular']  p-2 items-center">
              <label className="w-[120px] lg:w-[120px] flex text-[17px] items-center gap-2">
                <img
                  className="h-8 w-8"
                  src={
                    "https://res.cloudinary.com/druohnmyv/image/upload/v1723819316/assests/mt0cax1frqy37toddlr6.png"
                  }
                  alt=""
                />
                Email
              </label>
              <p className="flex h-10 w-[200px] lg:w-[300px] text-black text-[17px] border rounded-md border-black/30 bg-transparent px-3 py-2 placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-40 ">
                {data?.email}
              </p>
            </div>
            <div className="flex font-['udemy-regular'] p-2 items-center">
              <label className="w-[120px] lg:w-[120px] flex text-[17px] items-center gap-2">
                <img
                  className="h-8 w-8"
                  src={
                    "https://res.cloudinary.com/druohnmyv/image/upload/v1723819322/assests/fljdbb2rrycts9fmradi.png"
                  }
                  alt=""
                />
                Number
              </label>
              <p className="flex h-10 w-[200px] lg:w-[300px] text-black text-[17px] rounded-md border border-black/30 bg-transparent px-3 py-2 placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-40 ">
                {data?.phone_number}
              </p>
            </div>
            {/* <div className="flex font-['udemy-regular'] p-2">
              <label className="min-w-[130px] text-[22px]">Description:</label>
              <input
                className="flex h-[100px] font-['udemy-regular'] w-[300px] bg-white text-[19px] rounded-md border border-black/30 bg-transparent px-3 py-2 placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-40 "
                type="text"
              />
            </div> */}
           
          </form>
        </div>
      </Modal>
    </div>
  );
}

export default Conractform;
