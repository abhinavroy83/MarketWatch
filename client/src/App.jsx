import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import { login as authlogin } from "./store/authslice";
import { Header } from "./components";
import Ads from "./pages/Ads/Ads";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const storeused = JSON.parse(localStorage.getItem("userdetails"));
    if (storeused) {
      dispatch(authlogin({ token: storeused.data.jwttoken }));
    }
  });

  return (
    <div className="flex flex-col  min-h-screen">
      <Ads />
      <Header />
      <Outlet />
    </div>
  );
}

export default App;
