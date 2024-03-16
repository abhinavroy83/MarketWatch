import React, { Children } from "react";
import AdminDashboard from "./Dashboard";
import AdminHeader from "../AdminHeader";

function Userdashboardconatiner({ children }) {
  return (
    <div>
      <AdminHeader />
      <AdminDashboard>
        <div className="flex flex-col">
          <div>
            <button className="rounded-md bg-transparent px-3 py-2 text-sm font-semibold text-black hover:bg-black/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black">
              All Rooms
            </button>
            <button className="rounded-md bg-transparent px-3 py-2 text-sm font-semibold text-black hover:bg-black/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black">
              All Bussiness
            </button>
            <button className="rounded-md bg-transparent px-3 py-2 text-sm font-semibold text-black hover:bg-black/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black">
              Confirm to delete
            </button>
          </div>
          <aside>{children}</aside>
        </div>
      </AdminDashboard>
    </div>
  );
}

export default Userdashboardconatiner;
