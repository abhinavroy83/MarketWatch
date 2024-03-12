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
import PostProduct from "./pages/PostProduct.jsx";
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

// const [isloginmodalopen, setloginmodeopen] = useState(false);
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
        path: "/Events",
        element: (
          <Authlayout authentication>
            <AllEvents />
          </Authlayout>
        ),
      },
      {
        path: "/Movie",
        element: (
          <Authlayout authentication>
            <Allmovie />
          </Authlayout>
        ),
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
