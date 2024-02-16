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
          <Getuserroom authentication>
            <User />
          </Getuserroom>
        ),
      },
      {
        path: "/addroom/:userID",
        element: (
          <Addrooms authentication>
            <User />
          </Addrooms>
        ),
      },
      {
        path: "/user/job/:userID",
        element: (
          <Getuserjobs authentication>
            <User />
          </Getuserjobs>
        ),
      },
      {
        path: "/addjobs/:userID",
        element: (
          <Addjob authentication>
            <User />
          </Addjob>
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
