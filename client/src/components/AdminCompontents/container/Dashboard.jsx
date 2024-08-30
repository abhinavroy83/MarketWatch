import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
function AdminDashboard({ children }) {
  const navigate = useNavigate();
  const role = useSelector((state) => state.adminauth.role);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const menuItems = [
    { name: "Dashboard", icon: "🏠", to: "/admin/dashboard" },
    { name: "Basic Users", icon: "👥", to: "/admin/alluser" },
    { name: "Admin Users", icon: "👤", to: "/admin/getalladminsuser" },
    { name: "Pending Requests", icon: "📋", to: "/admin/getapproval" },
    { name: "Area", icon: "🗺️", to: "/admin/allarea" },
    { name: "Rooms", icon: "🛏️", to: "/admin/allroom" },
    { name: "Customer Message", icon: "💬", to: "/admin/getHelp" },
  ];

  return (
    <div className="max-w-screen mx-auto flex max-h-full mt-16 justify-center  overflow-hidden font-['udemy-regular'] text-[20px]">
      <aside
        className={`${
          isSidebarOpen ? "block" : "hidden"
        } md:flex md:flex-col  bg-white border-r overflow-y-auto w-[16%]`}
      >
        <nav className="flex-1 px-2 py-4 space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              to={item.to}
              className="flex items-center space-x-2 px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100"
            >
              <span>{item.icon}</span>
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>
      </aside>

      <main className="w-auto h-screen lg:w-5/6 border  overflow-y-auto  mt-3 lg:mt-0">
        {children}
      </main>
    </div>
  );
}

export default AdminDashboard;
