import React from "react";
import { useNavigate } from "react-router-dom";

function Error() {
  const navigate = useNavigate();
  return (
    <div className="h-screen justify-center items-center font-['udemy-regular'] flex flex-col">
      <img
        className="w-50 h-50"
        src={`https://img.freepik.com/free-vector/oops-404-error-with-broken-robot-concept-illustration_114360-1932.jpg`}
        alt="logo"
      />
      {/* <p className="text-[55px] text-[#232f3e] font-bold">Oops!</p> */}
      <p className="text-[30px]">Page not found</p>
      <button
        className="self-center justify-center items-center rounded-md bg-blue-600 mt-5 py-2 px-4 text-[20px] text-white shadow-sm hover:bg-black"
        onClick={() => {
          navigate("/");
        }}
      >
        Home Page{" "}
      </button>
    </div>
  );
}

export default Error;
