import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchAvailableMoney } from "../apiRequests/requests";
import { useContext } from "react";
import { ShopContext } from "../context/shopContext";
import { useCookies } from "react-cookie";

function Navbar() {
  const { access_token, customerID, isAuthenticated, setIsAuthenticated } =
    useContext(ShopContext);

  const [_, setCookies] = useCookies(["access_token"]);

  const queryClient = useQueryClient();

  const { isPending, isError, data, error } = useQuery({
    queryKey: ["availableMoney"],
    queryFn: () => fetchAvailableMoney(access_token, customerID),
  });

  console.log(data);

  function logout() {
    localStorage.clear();
    setCookies("access_token", null);
    setIsAuthenticated(false);
    queryClient.invalidateQueries({ queryKey: ["availableMoney"] });
  }

  return (
    <div className="navbar">
      <div className="navbar-title">
        <h1>BYD Shop</h1>
      </div>

      <div className="navbar-links">
        {access_token && (
          <>
            {" "}
            <Link to="/">Shop</Link>
            <Link to="/purchased-items">Purchases</Link>
            <Link to="/checkout">
              <FontAwesomeIcon icon={faShoppingCart}></FontAwesomeIcon>
            </Link>
            <Link to="/auth" onClick={logout}>
              LogOut
            </Link>
            <span>{isPending ? "loading" : `$ ${data}`}</span>
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;
