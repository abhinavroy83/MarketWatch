import "./index.css";
import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/UserCompontents/Login.jsx";
import Signup from "./components/UserCompontents/Signup.jsx";
import Home from "./components/UserCompontents/Home.jsx";
import { Provider } from "react-redux";
import store from "./store/store.js";
import { Authlayout } from "./components/index.js";
import User from "./pages/User/User.jsx";
import Getuserroom from "./pages/User/UserRooms/Getuserroom.jsx";
import Getuserjobs from "./pages/User/Userjobs/Getuserjobs.jsx";
import Addrooms from "./pages/User/UserRooms/Addrooms.jsx";
import Addjob from "./pages/User/Userjobs/Addjob.jsx";
import AllRooms from "./pages/UserPages/Rooms/AllRooms.jsx";
import Rooms from "./pages/UserPages/Rooms/Rooms.jsx";
import Getuserbussiness from "./pages/User/Userbussines/Getuserbussiness.jsx";
import AllBusiness from "./pages/UserPages/Bussiness/AllBusiness.jsx";
import Bussiness from "./pages/UserPages/Bussiness/Bussiness.jsx";
import Adminlogin from "./components/AdminCompontents/Adminlogin.jsx";
import {
  Adminauthlayout,
  AdminHome,
} from "./components/AdminCompontents/index.js";
import Alluser from "./pages/AdminPage/User/Alluser.jsx";
import Allroom from "./pages/AdminPage/Rooms/Allroom.jsx";
import Allbussiness from "./pages/AdminPage/Bussiness/Allbussiness.jsx";
import AllEvents from "./pages/UserPages/Events/AllEvents.jsx";
import Allmovie from "./pages/UserPages/movie/Allmovie.jsx";
import Getapproval from "./pages/AdminPage/PendingApproval/Getapproval.jsx";
import Adminusers from "./pages/AdminPage/User/Adminusers.jsx";
import Pendingrequest from "./pages/AdminPage/PendingRequest/Pendingrequest.jsx";
import Events from "./pages/UserPages/Events/Events.jsx";
import Cnf_to_dltuser from "./pages/AdminPage/User/Cnf_to_dltuser.jsx";
import Userrooms from "./pages/AdminPage/User/Detailsofuser/Userrooms.jsx";
import Profile from "./pages/User/UserProfile/Profile.jsx";
import BussinessPages from "./pages/User/Bussinessprofile/BussinessPages.jsx";
import Addbussiness from "./pages/User/Userbussines/Addbussiness.jsx";
import AllArea from "./pages/AdminPage/Area/AllArea.jsx";
import AddArea from "./pages/AdminPage/Area/AddArea.jsx";
import ListAllwish from "./pages/User/Wishlist/ListAllwish.jsx";
import AboutUs from "./pages/AboutUs.jsx";
import Update_del_Area from "./pages/AdminPage/Area/Modify/Update_del_Area.jsx";
import Error from "./components/SharedCompontents/Error.jsx";
import Forgetpass from "./components/UserCompontents/Forgetpass.jsx";
import Editroom from "./pages/User/UserRooms/Editroom.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: (
          <Authlayout authentication={false}>
            <Login isOpen={true} />
          </Authlayout>
        ),
      },
      {
        path: "/signup",
        element: (
          <Authlayout authentication={false}>
            <Signup isOpen={true} />
          </Authlayout>
        ),
      },
      {
        path: "/myaccount/:userID",
        element: (
          <Authlayout authentication>
            <User />
          </Authlayout>
        ),
      },
      {
        path: "/dashboard/wishlist/:userID",
        element: (
          <Authlayout authentication>
            <ListAllwish />
          </Authlayout>
        ),
      },
      {
        path: "/user/room/:userID",
        element: (
          <Authlayout authentication>
            <Getuserroom />
          </Authlayout>
        ),
      },
      {
        path: "/addroom/:userID",
        element: (
          <Authlayout authentication>
            <Addrooms />
          </Authlayout>
        ),
      },
      {
        path: "/room/editroom/:userID",
        element: (
          <Authlayout authentication>
            <Editroom />
          </Authlayout>
        ),
      },
      {
        path: "/user/job/:userID",
        element: (
          <Authlayout authentication>
            <Getuserjobs />
          </Authlayout>
        ),
      },
      {
        path: "/addjobs/:userID",
        element: (
          <Authlayout authentication>
            <Addjob />
          </Authlayout>
        ),
      },

      {
        path: "/rooms",
        element: (
          <Authlayout authentication>
            <AllRooms />
          </Authlayout>
        ),
      },
      {
        path: "/rooms/:_id",
        element: <Rooms />,
      },

      {
        path: "/user/bussiness/:userID",
        element: (
          <Authlayout authentication>
            <Getuserbussiness />
          </Authlayout>
        ),
      },
      {
        path: "/bussiness/:_id",
        element: <Bussiness />,
      },
      {
        path: "/bussiness",
        element: (
          <Authlayout authentication>
            <AllBusiness />
          </Authlayout>
        ),
      },
      {
        path: "/addbussiness/:userID",
        element: (
          <Authlayout authentication>
            <Addbussiness />
          </Authlayout>
        ),
      },
      {
        path: "/Events",
        element: (
          <Authlayout authentication>
            <AllEvents />
          </Authlayout>
        ),
      },
      {
        path: "/events/:_id",
        element: <Events />,
      },
      {
        path: "/Movie",
        element: (
          <Authlayout authentication>
            <Allmovie />
          </Authlayout>
        ),
      },
      {
        path: "/events/:_id",
        element: <Events />,
      },
      {
        path: "/dashboard/profile/:userID",
        element: <Profile />,
      },
      {
        path: "/createbussinessprofile",
        element: <BussinessPages />,
      },
      {
        path: "/about-us",
        element: <AboutUs />,
      },
      {
        path: "/forget-password",
        element: <Forgetpass />,
      },
      // adminpanel components
      {
        path: "/admin/login",
        element: (
          <Adminauthlayout authentication={false}>
            <Adminlogin />
          </Adminauthlayout>
        ),
      },
      {
        path: "/admin/dashboard",
        element: (
          <Adminauthlayout authentication>
            <AdminHome />
          </Adminauthlayout>
        ),
      },
      {
        path: "/admin/alluser",
        element: (
          <Adminauthlayout authentication>
            <Alluser />
          </Adminauthlayout>
        ),
      },
      {
        path: "/admin/allroom",
        element: (
          <Adminauthlayout authentication>
            <Allroom />
          </Adminauthlayout>
        ),
      },
      {
        path: "/admin/allbussiness",
        element: (
          <Adminauthlayout authentication>
            <Allbussiness />
          </Adminauthlayout>
        ),
      },
      {
        path: "/admin/getalladminsuser",
        element: (
          <Adminauthlayout authentication>
            <Adminusers />
          </Adminauthlayout>
        ),
      },
      {
        path: "/admin/getapproval",
        element: (
          <Adminauthlayout authentication>
            <Getapproval />
          </Adminauthlayout>
        ),
      },
      {
        path: "/admin/requests",
        element: (
          <Adminauthlayout authentication>
            <Pendingrequest />
          </Adminauthlayout>
        ),
      },
      {
        path: "/admin/allarea",
        element: (
          <Adminauthlayout authentication>
            <AllArea />
          </Adminauthlayout>
        ),
      },
      {
        path: "/admin/addarea",
        element: (
          <Adminauthlayout authentication>
            <AddArea />
          </Adminauthlayout>
        ),
      },
      {
        path: "/admin/area/update/:area_name",
        element: (
          <Adminauthlayout authentication>
            <Update_del_Area />
          </Adminauthlayout>
        ),
      },
      {
        path: "/admin/confirmtodelete/:id",
        element: (
          <Adminauthlayout authentication>
            <Cnf_to_dltuser />
          </Adminauthlayout>
        ),
      },
      {
        path: "/admin/confirmtodelete/userrooms/:id",
        element: (
          <Adminauthlayout authentication>
            <Userrooms />
          </Adminauthlayout>
        ),
      },
      {
        path: "/*",
        element: <Error />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
