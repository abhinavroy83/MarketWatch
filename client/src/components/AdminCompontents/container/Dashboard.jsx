import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
function AdminDashboard({ children }) {
  const navigate = useNavigate();
  const role = useSelector((state) => state.adminauth.role);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const dispatch = useDispatch();
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
    <div className="flex flex-col h-screen bg-gray-100">
      <header className=" bg-gray-700 shadow-md">
        <div className="max-w-screen mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="mr-4 text-gray-500 hover:text-gray-600 focus:outline-none focus:ring md:hidden"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
              <Link href="/" className="flex items-center space-x-2">
                <img
                  height={100}
                  width={150}
                  className="w-50 h-50"
                  src={
                    "https://res.cloudinary.com/druohnmyv/image/upload/v1723819327/assests/x31ydsmb8hkg05fqbkjf.png"
                  }
                  alt=""
                />
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 text-gray-500 hover:text-gray-600 focus:outline-none focus:ring"
                >
                  <span
                    onClick={() => {
                      dispatch(logout());
                      localStorage.removeItem("admindetails");
                      navigate("/admin/login");
                    }}
                    className="hidden md:inline-block px-4 py-2 rounded-lg text-white hover:bg-red-700 hover:text-white"
                  >
                    Logout
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className="flex flex-1 overflow-hidden">
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
    </div>
  );
}

export default AdminDashboard;
