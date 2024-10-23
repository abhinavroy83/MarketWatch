import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../../store/adminauthslice";
import { LogOut, X } from "lucide-react";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
function AdminDashboard({ children }) {
  const navigate = useNavigate();
  const role = useSelector((state) => state.adminauth.role);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const menuItems = [
    { name: "Dashboard", icon: "🏠", to: "/admin/dashboard", restricted: false },
    { name: "Basic Users", icon: "👥", to: "/admin/alluser", restricted: true },
    {
      name: "Admin Users",
      icon: "👤",
      to: "/admin/getalladminsuser",
      restricted: true,
    },
    {
      name: "Pending Requests",
      icon: "📋",
      to: "/admin/getapproval",
      restricted: true,
    },
    { name: "Area", icon: "🗺️", to: "/admin/allarea", restricted: false },
    { name: "Rooms", icon: "🛏️", to: "/admin/allroom", restricted: false },
    {
      name: "Customer Message",
      icon: "💬",
      to: "/admin/getHelp",
      restricted: false,
    },
  ];

  const handlelogout = () => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="bg-white rounded-lg shadow-lg max-w-sm w-full overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Confirm Logout
                </h3>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                  aria-label="Close"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <p className="text-gray-600 mb-6">
                Are you sure you want to log out?
              </p>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={onClose}
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    dispatch(logout());
                    localStorage.removeItem("admindetails");
                    navigate("/admin/login");
                    onClose();
                  }}
                  className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </button>
              </div>
            </div>
          </div>
        );
      },
    });
  };

  return (
    <div className="flex flex-col bg-gray-100">
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
              <Link to="/rooms" className="flex items-center space-x-2">
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
                      handlelogout();
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
      <div className="flex">
        <aside
          className={`${
            isSidebarOpen ? "block" : "hidden"
          } md:flex md:flex-col  bg-white border-r overflow-y-auto lg:w-[16%] w-auto`}
        >
          <nav className="flex-1 px-2 py-4 space-y-2">
            {menuItems
              .filter((item) => !(item.restricted && role !== "Admin"))
              .map((item) => (
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

        <main className="w-full h-screen lg:w-5/6 border  overflow-y-auto  mt-3 lg:mt-0">
          {children}
        </main>
      </div>
    </div>
  );
}

export default AdminDashboard;
