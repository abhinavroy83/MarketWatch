import axios from "axios";
import React, { useEffect, useState } from "react";
import { IoSettingsOutline } from "react-icons/io5";

function AdsNotification() {
  const [newRoomsCount, setNewRoomsCount] = useState(0);

  const fetchRooms = async () => {
    try {
      const res = await axios.get(
        `https://api.verydesi.com/api/admin/getallrooms`
      );
      const allRooms = res.data.Allroom;

      const now = new Date();
      const last24Hours = new Date(now.getTime() - 24 * 60 * 60 * 1000);

      const newRooms = allRooms.filter(
        (room) => new Date(room.postedon) > last24Hours
      );

      setNewRoomsCount(newRooms.length);
    } catch (error) {
      console.log("Error during fetching rooms", error);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  return (
    <div className="bg-white flex flex-col absolute bottom-0 top-[1.5rem] rounded-md right-[2px] w-[300px] border h-[220px] shadow-md shadow-gray-400">
      <div className="w-full justify-between flex items-center mt-[0.4rem] p-1">
        <p className="text-[1.2rem]">Notification</p>
        <IoSettingsOutline size={20} />
      </div>
      <hr />
      <div className="text-[1rem] px-2 flex gap-1 mt-2 flex-col">
        {newRoomsCount > 0 ? (
          <p>{newRoomsCount} new rooms added in the past 24 hours</p>
        ) : (
          <p>No new notifications</p>
        )}
      </div>
    </div>
  );
}

export default AdsNotification;
