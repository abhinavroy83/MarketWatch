import axios from "axios";
import React, { useEffect, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { useSelector } from "react-redux";

const ConfirmationDialog = ({
  onConfirm,
  onCancel,
  Heading,
  Para,
  onClose,
}) => {
  const userID = useSelector((state) => state.auth.userID);
  const [password, setPassword] = useState("");
  const [isPasswordVerified, setIsPasswordVerified] = useState(false);
  const handlePasswordVerification = async () => {
    try {
      const verifyResponse = await axios.post(
        `https://api.verydesi.com/user/verifypassword`,
        { userID, password }
      );

      if (verifyResponse.data.success) {
        setIsPasswordVerified(true);
      } else {
        alert("Incorrect password. Please try again.");
      }
    } catch (error) {
      console.log(error);
      alert("An error occurred. Please try again.");
    }
  };

  useEffect(() => {
    function handleCloseOnOutsideClick(e) {
      if (e.target.id === "modalOuter") onClose();
    }

    window.addEventListener("click", handleCloseOnOutsideClick);
    return () => window.removeEventListener("click", handleCloseOnOutsideClick);
  }, []);

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10"
      id="modalOuter"
    >
      <div className="bg-white p-8 shadow-2xl relative rounded-md">
        <RxCross1
          className="h-5 w-5 text-black absolute top-3 right-5 cursor-pointer hover:rotate-[360deg] transition-transform duration-300 "
          onClick={onClose}
        />
        <div className="flex gap-1">
          <img
            className="h-7 w-7"
            src={
              "https://res.cloudinary.com/druohnmyv/image/upload/v1723819315/assests/ypojptmu0i6hqvvsjd1r.png"
            }
            alt=""
          />
          <h2 className="text-[1.4rem] font-bold ">{Heading}</h2>
        </div>
        <p className="mt-2 text-[1.1rem] text-gray-500">{Para}</p>

        <input
          type="password"
          className="mt-4 font-['udemy-regular'] h-10 w-[340px] text-[1rem] rounded-md border border-black/20 bg-transparent px-3 py-2 placeholder:text-gray-400 bg-white focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
        />

        <div className="mt-6 lg:mt-2 flex gap-3 justify-end">
          <button
            type="button"
            onClick={onCancel}
            className="rounded bg-gray-100 border px-6 py-2 text-[1rem] font-medium text-black"
          >
            Cancel
          </button>

          {!isPasswordVerified && (
            <p
              onClick={handlePasswordVerification}
              className="rounded bg-gray-300 px-6 py-2 text-[1rem] font-medium text-black cursor-pointer"
            >
              Verify Password
            </p>
          )}
          {isPasswordVerified && (
            <p
              onClick={onConfirm}
              className="rounded bg-red-600 px-6 py-2 text-[1rem] font-medium text-white cursor-pointer"
            >
              Delete Account
            </p>
          )}
          {/* <button
            type="button"
            onClick={onConfirm}
            className="rounded bg-red-600 px-6 text-[1rem] font-medium text-white"
          >
            Delete
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default ConfirmationDialog;
