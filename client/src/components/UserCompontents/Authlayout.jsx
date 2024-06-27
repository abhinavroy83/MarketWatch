import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Login from "./Login";
import { modalopen } from "../../store/modalslice";

export default function Protected({ children, authentication = true }) {
  const [isloginmodalopen, setloginmodeopen] = useState(false);
  const Navigate = useNavigate();
  const authstatus = useSelector((state) => state.auth.status);
  const [loader, setloader] = useState(true);
  const dispatch = useDispatch();

  const isloginmodelclose = () => {
    setloginmodeopen(false);
  };
  useEffect(() => {
    //false && false !=false ==ture
    if (authentication && authstatus !== authentication) {
      Navigate("/login");
      // dispatch(modalopen({ isloginmodalopen: true }));

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
