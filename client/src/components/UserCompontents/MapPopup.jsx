import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function MapPopup({ roomDetails }) {
  return (
    <div className="max-w-[200px] bg-white rounded-lg shadow-md overflow-hidden text-sm">
      <img
        src={roomDetails.Imgurl[0]}
        alt={roomDetails.Title}
        className="w-full h-24 object-cover"
      />
      <div className="p-2">
        <h3 className="font-semibold text-xs mb-1 line-clamp-1">
          {roomDetails.Title}
        </h3>
        <p className="text-xs text-gray-600 mb-1">{roomDetails.Propertytype}</p>
        <div className="flex justify-between items-center">
          <span className="font-bold text-xs">
            ${roomDetails.Expected_Rooms}
          </span>
          <button
            onClick={() => {
              onNavigate(`/rooms/${roomDetails._id}`);
            }}
            className="bg-blue-500 hover:bg-blue-600 text-white text-xs py-1 px-2 rounded"
          >
            View
          </button>
        </div>
      </div>
    </div>
  );
}
