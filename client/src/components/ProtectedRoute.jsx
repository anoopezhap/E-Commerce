import { Children, useContext } from "react";
import { ShopContext } from "../context/shopContext";
import { Navigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

function ProtectedRoute({ children }) {
  const { access_token } = useContext(ShopContext);
  const location = useLocation();

  return access_token ? (
    children
  ) : (
    <Navigate to="/auth" replace state={{ path: location.pathname }} />
  );
}

export default ProtectedRoute;
