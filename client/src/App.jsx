import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { UserImage, login as authlogin, cities } from "./store/authslice";
import { Footer, Header } from "./components";
import { login as adminauth } from "./store/adminauthslice";
import Ads from "./pages/UserPages/Ads/Ads";
import Getlocations from "./components/SharedCompontents/Getlocations";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    const storeused = JSON.parse(localStorage.getItem("userdetails"));
    // console.log(storeused.user);
    if (storeused && storeused.data) {
      dispatch(
        authlogin({
          token: storeused?.data?.jwttoken,
          user: storeused?.data?.data?.firstName,
          userID: storeused?.data?.data?._id,
          bussinessac: storeused?.data?.data?.bussinessac,
          isverified: storeused?.data?.data?.isVerified,
          // userimg: storeused.data.data.userimg,
        })
      );
      dispatch(cities({ city: storeused?.data?.data?.city }));
      dispatch(UserImage({ userimg: storeused?.data?.data?.userimg }));
    }

    // oauth
    // console.log("storeused", storeused);
    if (storeused && storeused.user) {
      dispatch(
        authlogin({
          token: storeused?.token,
          user: storeused?.user?.firstName,
          userID: storeused?.user?._id,
          bussinessac: storeused?.user?.bussinessac,
          isverified: storeused?.user?.isVerified,
          // userimg: storeused.data.data.userimg,
        })
      );
      dispatch(cities({ city: storeused?.user?.city }));
      dispatch(UserImage({ userimg: storeused?.user?.userimg }));
    }
    const adminstoredata = JSON.parse(localStorage.getItem("admindetails"));
    if (adminstoredata) {
      dispatch(
        adminauth({
          token: adminstoredata?.data?.jwttoken,
          role: adminstoredata?.data?.data?.role,
        })
      );
    }
  });

  useEffect(() => {
    localStorage.setItem("currentPath", location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    const savedPath = localStorage.getItem("currentPath");
    if (savedPath && savedPath !== location.pathname) {
      navigate(savedPath);
    }
  }, [navigate, location.pathname]);

  const isAdminPanel = location.pathname.startsWith("/admin");
  const isAddRoomPage = location.pathname.includes("addroom");

  return (
    <div className={`flex flex-col ${isAddRoomPage && "bg-slate-100"}`}>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        toastClassName={() =>
          "w-80 font-medium text-gray-900 flex items-center gap-2 bg-green-100 fixed top-[7rem] right-4 py-2 border border-gray-100"
        }
      />
      <Getlocations />
      {/* {!isAdminPanel && <Ads />} */}
      {!isAdminPanel && <Header />}
      <Outlet />
      {!isAdminPanel && <Footer />}
    </div>
  );
}

export default App;
