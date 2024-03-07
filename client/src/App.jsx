import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet, useLocation } from "react-router-dom";
import { login as authlogin } from "./store/authslice";
import { Footer, Header } from "./components";
import Ads from "./pages/Ads/Ads";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const storeused = JSON.parse(localStorage.getItem("userdetails"));
    if (storeused) {
      dispatch(
        authlogin({
          token: storeused.data.jwttoken,
          user: storeused.data.data.name,
          userID: storeused.data.data._id,
        })
      );
    }
  });

  const isAdminPanel = location.pathname.startsWith("/admin");

  return (
    <div className="flex flex-col h-screen">
      {!isAdminPanel && <Ads />}
      {!isAdminPanel && <Header />}
      <Outlet />
      {/* {!isAdminPanel && <Footer />} */}
    </div>
  );
}

export default App;
