import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet, useLocation } from "react-router-dom";
import { UserImage, login as authlogin, cities } from "./store/authslice";
import { Footer, Header } from "./components";
import { login as adminauth } from "./store/adminauthslice";
import Ads from "./pages/UserPages/Ads/Ads";
import Getlocations from "./components/SharedCompontents/Getlocations";

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    const storeused = JSON.parse(localStorage.getItem("userdetails"));
    if (storeused) {
      dispatch(
        authlogin({
          token: storeused.data.jwttoken,
          user: storeused.data.data.firstName,
          userID: storeused.data.data._id,
          bussinessac: storeused.data.data.bussinessac,
          isverified: storeused.data.data.isVerified,
          // userimg: storeused.data.data.userimg,
        })
      );
      dispatch(cities({ city: storeused.data.data.city }));
      dispatch(UserImage({ userimg: storeused.data.data.userimg }));
    }
    const adminstoredata = JSON.parse(localStorage.getItem("admindetails"));
    if (adminstoredata) {
      dispatch(
        adminauth({
          token: adminstoredata.data.jwttoken,
          role: adminstoredata.data.data.role,
        })
      );
    }
  });

  // const PathHandler = () => {
  //   const history = useHistorycd();
  //   const location = useLocation();

  //   // Save the current path to localStorage whenever it changes
  //   useEffect(() => {
  //     localStorage.setItem("currentPath", location.pathname);
  //   }, [location.pathname]);

  //   // Navigate to the saved path on component mount
  //   useEffect(() => {
  //     const savedPath = localStorage.getItem("currentPath");
  //     if (savedPath && savedPath !== location.pathname) {
  //       history.push(savedPath);
  //     }
  //   }, [history, location.pathname]);

  //   return null;
  // };

  const isAdminPanel = location.pathname.startsWith("/admin");
  const isAddRoomPage = location.pathname.includes("addroom");

  return (
    <div className={`flex flex-col ${isAddRoomPage && "bg-slate-100"}`}>
      <Getlocations />
      {/* {!isAdminPanel && <Ads />} */}
      {!isAdminPanel && <Header />}
      <Outlet />
      {!isAdminPanel && <Footer />}
    </div>
  );
}

export default App;
