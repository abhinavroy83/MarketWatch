import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Container from "../Container/Container";
import { Link, useNavigate } from "react-router-dom";
import { logout as adminlogout } from "../../store/adminauthslice";
import AdminDashboard from "./container/Dashboard";
import AdminHeader from "./AdminHeader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AdminHome() {
  const role = useSelector((state) => state.adminauth.role);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const notify = () => toast("Coming Soon...");

  // Define menu items and restrict certain items for admin role only
  const menuItems = [
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

  return (
    <div className="font-['udemy-regular'] text-[20px]">
      <AdminDashboard>
        <main className="flex-1 overflow-y-auto bg-gray-100 h-screen min-w-full">
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <h1 className="text-2xl font-semibold text-gray-900 mb-6">
              Dashboard
            </h1>
            <h2 className="text-lg font-semibold mb-4">Welcome, Admin</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {menuItems.map((item) => (
                <div
                  onClick={() => {
                    if (!item.restricted || role === "Admin") {
                      navigate(item.to);
                    }
                  }}
                  key={item.name}
                  className={`bg-white overflow-hidden shadow rounded-lg cursor-pointer ${
                    item.restricted && role !== "admin"
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                >
                  <div className="px-4 py-5 sm:p-6">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 bg-red-100 rounded-md p-3">
                        <span className="text-2xl">{item.icon}</span>
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 truncate">
                            {item.name}
                          </dt>
                          <dd className="text-lg font-medium text-gray-900">
                            Manage {item.name.toLowerCase()}
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-4 sm:px-6">
                    <div className="text-sm">
                      {!item.restricted || role === "admin" ? (
                        <Link
                          to={item.to}
                          className="font-medium text-red-600 hover:text-red-500"
                        >
                          View all<span className="sr-only"> {item.name}</span>
                        </Link>
                      ) : (
                        <span className="text-gray-400">Restricted</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </AdminDashboard>
    </div>
  );
}

export default AdminHome;
