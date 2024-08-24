import "./index.css";
import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store.js";
import { Authlayout } from "./components/index.js";
import Updatepass from "./pages/User/Setting/Updatepass.jsx";
import Help from "./pages/User/Help/Help.jsx";

const Home = React.lazy(() => import("./components/UserCompontents/Home.jsx"));
const Login = React.lazy(() =>
  import("./components/UserCompontents/Login.jsx")
);
const Signup = React.lazy(() =>
  import("./components/UserCompontents/Signup.jsx")
);
const User = React.lazy(() => import("./pages/User/User.jsx"));
const Getuserroom = React.lazy(() =>
  import("./pages/User/UserRooms/Getuserroom.jsx")
);
const Getuserjobs = React.lazy(() =>
  import("./pages/User/Userjobs/Getuserjobs.jsx")
);
const Addrooms = React.lazy(() =>
  import("./pages/User/UserRooms/Addrooms.jsx")
);
const Addjob = React.lazy(() => import("./pages/User/Userjobs/Addjob.jsx"));
const AllRooms = React.lazy(() =>
  import("./pages/UserPages/Rooms/AllRooms.jsx")
);
const Rooms = React.lazy(() => import("./pages/UserPages/Rooms/Rooms.jsx"));
const Getuserbussiness = React.lazy(() =>
  import("./pages/User/Userbussines/Getuserbussiness.jsx")
);
const AllBusiness = React.lazy(() =>
  import("./pages/UserPages/Bussiness/AllBusiness.jsx")
);
const Bussiness = React.lazy(() =>
  import("./pages/UserPages/Bussiness/Bussiness.jsx")
);
const Adminlogin = React.lazy(() =>
  import("./components/AdminCompontents/Adminlogin.jsx")
);
const Adminauthlayout = React.lazy(() =>
  import("./components/AdminCompontents/index.js").then((module) => ({
    default: module.Adminauthlayout,
  }))
);
const AdminHome = React.lazy(() =>
  import("./components/AdminCompontents/index.js").then((module) => ({
    default: module.AdminHome,
  }))
);
const Alluser = React.lazy(() => import("./pages/AdminPage/User/Alluser.jsx"));
const Allroom = React.lazy(() => import("./pages/AdminPage/Rooms/Allroom.jsx"));
const Allbussiness = React.lazy(() =>
  import("./pages/AdminPage/Bussiness/Allbussiness.jsx")
);
const AllEvents = React.lazy(() =>
  import("./pages/UserPages/Events/AllEvents.jsx")
);
const Allmovie = React.lazy(() =>
  import("./pages/UserPages/movie/Allmovie.jsx")
);
const Getapproval = React.lazy(() =>
  import("./pages/AdminPage/PendingApproval/Getapproval.jsx")
);
const Help = React.lazy(() => import("./pages/AdminPage/Help/Help.jsx"));

const Adminusers = React.lazy(() =>
  import("./pages/AdminPage/User/Adminusers.jsx")
);
const Pendingrequest = React.lazy(() =>
  import("./pages/AdminPage/PendingRequest/Pendingrequest.jsx")
);
const Events = React.lazy(() => import("./pages/UserPages/Events/Events.jsx"));
const Cnf_to_dltuser = React.lazy(() =>
  import("./pages/AdminPage/User/Cnf_to_dltuser.jsx")
);
const Userrooms = React.lazy(() =>
  import("./pages/AdminPage/User/Detailsofuser/Userrooms.jsx")
);
const Profile = React.lazy(() =>
  import("./pages/User/UserProfile/Profile.jsx")
);
const BussinessPages = React.lazy(() =>
  import("./pages/User/Bussinessprofile/BussinessPages.jsx")
);
const Addbussiness = React.lazy(() =>
  import("./pages/User/Userbussines/Addbussiness.jsx")
);
const AllArea = React.lazy(() => import("./pages/AdminPage/Area/AllArea.jsx"));
const AddArea = React.lazy(() => import("./pages/AdminPage/Area/AddArea.jsx"));
const ListAllwish = React.lazy(() =>
  import("./pages/User/Wishlist/ListAllwish.jsx")
);
const AboutUs = React.lazy(() => import("./pages/AboutUs.jsx"));
const Update_del_Area = React.lazy(() =>
  import("./pages/AdminPage/Area/Modify/Update_del_Area.jsx")
);
const Error = React.lazy(() =>
  import("./components/SharedCompontents/Error.jsx")
);
const Editroom = React.lazy(() =>
  import("./pages/User/UserRooms/Editroom.jsx")
);
const Editarea = React.lazy(() =>
  import("./pages/AdminPage/Area/Modify/Editarea.jsx")
);
const ResetPassword = React.lazy(() =>
  import("./components/UserCompontents/ResetPassword.jsx")
);
const Forgetpassword = React.lazy(() =>
  import("./components/UserCompontents/Forgetpassword.jsx")
);
const AdminPostRooms = React.lazy(() =>
  import("./pages/AdminPage/Rooms/AdminPostRooms.jsx")
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: "/login",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Authlayout authentication={false}>
              <Login isOpen={true} />
            </Authlayout>
          </Suspense>
        ),
      },
      {
        path: "/signup",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Authlayout authentication={false}>
              <Signup isOpen={true} />
            </Authlayout>
          </Suspense>
        ),
      },
      {
        path: "/myaccount/:userID",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Authlayout authentication>
              <User />
            </Authlayout>
          </Suspense>
        ),
      },
      {
        path: "/setting/changepassword/:userID",
        element: (
          <Authlayout authentication>
            <Updatepass />
          </Authlayout>
        ),
      },
      {
        path: "/dashboard/wishlist/:userID",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Authlayout authentication>
              <ListAllwish />
            </Authlayout>
          </Suspense>
        ),
      },
      {
        path: "/user/room/:userID",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Authlayout authentication>
              <Getuserroom />
            </Authlayout>
          </Suspense>
        ),
      },
      {
        path: "/user/help/:userID",
        element: (
          <Authlayout authentication>
            <Help />
          </Authlayout>
        ),
      },
      {
        path: "/addroom/:userID",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Authlayout authentication>
              <Addrooms />
            </Authlayout>
          </Suspense>
        ),
      },
      {
        path: "/room/editroom/:_id",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Authlayout authentication>
              <Editroom />
            </Authlayout>
          </Suspense>
        ),
      },
      {
        path: "/user/job/:userID",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Authlayout authentication>
              <Getuserjobs />
            </Authlayout>
          </Suspense>
        ),
      },
      {
        path: "/addjobs/:userID",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Authlayout authentication>
              <Addjob />
            </Authlayout>
          </Suspense>
        ),
      },
      {
        path: "/rooms",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Authlayout authentication>
              <AllRooms />
            </Authlayout>
          </Suspense>
        ),
      },
      {
        path: "/rooms/:_id",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Rooms />
          </Suspense>
        ),
      },
      {
        path: "/user/bussiness/:userID",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Authlayout authentication>
              <Getuserbussiness />
            </Authlayout>
          </Suspense>
        ),
      },
      {
        path: "/bussiness/:_id",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Bussiness />
          </Suspense>
        ),
      },
      {
        path: "/bussiness",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Authlayout authentication>
              <AllBusiness />
            </Authlayout>
          </Suspense>
        ),
      },
      {
        path: "/addbussiness/:userID",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Authlayout authentication>
              <Addbussiness />
            </Authlayout>
          </Suspense>
        ),
      },
      {
        path: "/Events",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Authlayout authentication>
              <AllEvents />
            </Authlayout>
          </Suspense>
        ),
      },
      {
        path: "/events/:_id",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Events />
          </Suspense>
        ),
      },
      {
        path: "/Movie",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Authlayout authentication>
              <Allmovie />
            </Authlayout>
          </Suspense>
        ),
      },
      {
        path: "/dashboard/profile/:userID",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Profile />
          </Suspense>
        ),
      },
      {
        path: "/createbussinessprofile",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <BussinessPages />
          </Suspense>
        ),
      },
      {
        path: "/about-us",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <AboutUs />
          </Suspense>
        ),
      },
      {
        path: "/reset-password",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <ResetPassword />
          </Suspense>
        ),
      },
      {
        path: "/reset-password/:token",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Forgetpassword />
          </Suspense>
        ),
      },
      // adminpanel components
      {
        path: "/admin/login",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Adminauthlayout authentication={false}>
              <Adminlogin />
            </Adminauthlayout>
          </Suspense>
        ),
      },
      {
        path: "/admin/dashboard",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Adminauthlayout authentication>
              <AdminHome />
            </Adminauthlayout>
          </Suspense>
        ),
      },
      {
        path: "/admin/alluser",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Adminauthlayout authentication>
              <Alluser />
            </Adminauthlayout>
          </Suspense>
        ),
      },
      {
        path: "/admin/allroom",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Adminauthlayout authentication>
              <Allroom />
            </Adminauthlayout>
          </Suspense>
        ),
      },
      {
        path: "/admin/allbussiness",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Adminauthlayout authentication>
              <Allbussiness />
            </Adminauthlayout>
          </Suspense>
        ),
      },
      {
        path: "/admin/getHelp",
        element: (
          <Adminauthlayout authentication>
            <Help />
          </Adminauthlayout>
        ),
      },
      {
        path: "/admin/getalladminsuser",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Adminauthlayout authentication>
              <Adminusers />
            </Adminauthlayout>
          </Suspense>
        ),
      },
      {
        path: "/admin/getapproval",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Adminauthlayout authentication>
              <Getapproval />
            </Adminauthlayout>
          </Suspense>
        ),
      },
      {
        path: "/admin/requests",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Adminauthlayout authentication>
              <Pendingrequest />
            </Adminauthlayout>
          </Suspense>
        ),
      },
      {
        path: "/admin/allarea",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Adminauthlayout authentication>
              <AllArea />
            </Adminauthlayout>
          </Suspense>
        ),
      },
      {
        path: "/admin/addarea",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Adminauthlayout authentication>
              <AddArea />
            </Adminauthlayout>
          </Suspense>
        ),
      },
      {
        path: "/admin/area/update/:area_name",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Adminauthlayout authentication>
              <Editarea />
            </Adminauthlayout>
          </Suspense>
        ),
      },
      {
        path: "/admin/confirmtodelete/:id",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Adminauthlayout authentication>
              <Cnf_to_dltuser />
            </Adminauthlayout>
          </Suspense>
        ),
      },
      {
        path: "/admin/confirmtodelete/userrooms/:id",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Adminauthlayout authentication>
              <Userrooms />
            </Adminauthlayout>
          </Suspense>
        ),
      },
      {
        path: "/admin/postroom",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Adminauthlayout authentication>
              <AdminPostRooms />
            </Adminauthlayout>
          </Suspense>
        ),
      },
      {
        path: "/*",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Error />
          </Suspense>
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
