import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Protected({ children, authentication = true }) {
  const Navigate = useNavigate();
  const authstatus = useSelector((state) => state.auth.status);
  const [loader, setloader] = useState(true);
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
  return loader ? <h1>Loading...</h1> : <>{children}</>;
}
