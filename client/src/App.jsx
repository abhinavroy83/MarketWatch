import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import { login as authlogin } from "./store/authslice";
import { Header } from "./components";
import Ads from "./pages/Ads/Ads";

function App() {
  console.log("first")
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

  return (
    <div className="flex flex-col h-screen">
      <Ads />
      <Header />
      <Outlet />
    </div>
  );
}

export default App;
