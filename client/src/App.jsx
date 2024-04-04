import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet, useLocation } from "react-router-dom";
import { login as authlogin, cities } from "./store/authslice";
import { Footer, Header } from "./components";
import { login as adminauth } from "./store/adminauthslice";
import Ads from "./pages/UserPages/Ads/Ads";
import Getlocations from "./components/SharedCompontents/Getlocations";

function App() {
  const dispatch = useDispatch();
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
          userimg: storeused.data.data.userimg,
        })
      );
      dispatch(cities({ city: storeused.data.data.city }));
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

  const isAdminPanel = location.pathname.startsWith("/admin");

  return (
    <div className="flex flex-col ">
      <Getlocations />
      {/* {!isAdminPanel && <Ads />} */}
      {!isAdminPanel && <Header />}
      <Outlet />
      {!isAdminPanel && <Footer />}
    </div>
  );
}

export default App;
