import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import Modal from "react-modal";
import { useSelector } from "react-redux";

Modal.setAppElement("#root");

function PostProduct({ isOpen, onClose }) {
  const currentLocation = useSelector((state) => state.auth.location);
  const token = useSelector((state) => state.auth.token);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const onsubmit = async (data) => {
    const senddata = {
      Productname: data.Productname,
      Imageurl: data.Imageurl,
      location: {
        coordinates: [currentLocation.lat, currentLocation.lng],
      },
    };
    try {
      const res = await axios.post(
        "https://marketplace-8nn9.onrender.com/api/postProduct",
        senddata,
        {
          headers: {
            jwttoken: `${token}`,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (res) {
        console.log(res);
        alert("product added successfully");
        reset();
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="">
      <Modal
        isOpen={isOpen}
        onRequestClose={onClose}
        style={{
          content: {
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 500,
            zIndex: 1000,
            border: "none",
            borderradius: "10px",
            backgroundColor: "#FFF",
            boxShadow: "0px 0px 25px 0px rgba(0, 0, 0, 0.15)",
          },
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            zIndex: 999,
          },
        }}
      >
        <form
          onSubmit={handleSubmit(onsubmit)}
          className=" flex flex-col justify-center items-center h-full "
        >
          <div className="m-3">
            <label className=" text-s mb-4 font-semibold">
              Enter Product Name
            </label>
            <input
              type="text"
              className="flex h-10 rounded-md border border-black/30 bg-white px-3 py-3 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
              {...register("Productname", {
                required: "Productname is required",
              })}
            />
            {errors.Productname && (
              <p className=" text-red-500 text-sm">
                {errors.Productname.message}
              </p>
            )}
            <label className=" text-s mb-2 font-semibold">Enter ImageUrl</label>

            <input
              type="text"
              className="flex h-10  my-2 rounded-md border border-black/30 bg-white px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
              {...register("Imageurl", {
                required: "Imageurl is required",
              })}
            />
            {errors.Imageurl && (
              <p className=" text-red-500 text-sm">{errors.Imageurl.message}</p>
            )}
            <button
              type="submit"
              className="w-full text-center items-center rounded-md bg-black px-3 py-2 text-sm font-semibold text-white hover:bg-black/80"
            >
              Post
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default PostProduct;
