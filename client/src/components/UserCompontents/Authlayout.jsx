import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Login from "./Login";

export default function Protected({ children, authentication = true }) {
  const [isloginmodalopen, setloginmodeopen] = useState(false);
  const Navigate = useNavigate();
  const authstatus = useSelector((state) => state.auth.status);
  const [loader, setloader] = useState(true);

  const isloginmodelclose = () => {
    setloginmodeopen(false);
  };
  useEffect(() => {
    //false && false !=false ==ture
    if (authentication && authstatus !== authentication) {
      Navigate("/login");
      //false && true!==true
    } else if (!authentication && authstatus !== authentication) {
      Navigate("/");
    }
    setloader(false);
  }, [authentication, authstatus, Navigate]);
  return loader ? (
    <h1 className="h-screen flex items-center justify-center">Loading...</h1>
  ) : (
    <>{children}</>
  );
}
