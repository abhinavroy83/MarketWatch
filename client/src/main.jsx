import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/Login.jsx";
import Signup from "./components/Signup.jsx";
import Home from "./components/Home.jsx";
import { Provider } from "react-redux";
import store from "./store/store.js";
import { Authlayout } from "./components/index.js";
import PostProduct from "./pages/PostProduct.jsx";
import User from "./pages/User/User.jsx";
import Getuserroom from "./pages/User/UserRooms/Getuserroom.jsx";
import Getuserjobs from "./pages/User/Userjobs/Getuserjobs.jsx";
import Addrooms from "./pages/User/UserRooms/Addrooms.jsx";
import Addjob from "./pages/User/Userjobs/Addjob.jsx";
import AllRooms from "./pages/Rooms/AllRooms.jsx";
import Rooms from "./pages/Rooms/Rooms.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: (
          <Authlayout authentication>
            <Home />
          </Authlayout>
        ),
      },
      {
        path: "/login",
        element: (
          <Authlayout authentication={false}>
            <Login />
          </Authlayout>
        ),
      },
      {
        path: "/signup",
        element: (
          <Authlayout authentication={false}>
            <Signup />
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
