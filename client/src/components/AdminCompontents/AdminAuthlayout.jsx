import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Protected({ children, authentication = true }) {
  const Navigate = useNavigate();
  const adminauthstatus = useSelector((state) => state.auth.status);
  const [loader, setloader] = useState(true);

  useEffect(() => {
    //false && false !=false ==ture
    if (authentication && adminauthstatus !== authentication) {
      Navigate("/admin/login");
    } else if (!authentication && adminauthstatus !== authentication) {
      Navigate("/");
    }
    setloader(false);
  }, [authentication, authstatus, Navigate]);
  return loader ? <h1>Loading...</h1> : <>{children}</>;
}