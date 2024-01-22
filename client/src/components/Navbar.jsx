import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { useQuery } from "@tanstack/react-query";
import { fetchAvailableMoney } from "../apiRequests/requests";
import { useContext } from "react";
import { ShopContext } from "../context/shopContext";

function Navbar() {
  const { access_token, customerID } = useContext(ShopContext);

  const { isPending, isError, data, erro } = useQuery({
    queryKey: ["availableMoney"],
    queryFn: () => fetchAvailableMoney(access_token, customerID),
  });

  return (
    <div className="navbar">
      <div className="navbar-title">
        <h1>Pedrotech Shop</h1>
      </div>

      <div className="navbar-links">
        <Link to="/">Shop</Link>
        <Link to="/purchased-items">Purchases</Link>
        <Link to="/checkout">
          <FontAwesomeIcon icon={faShoppingCart}></FontAwesomeIcon>
        </Link>
        <span>{data}</span>
      </div>
    </div>
  );
}

export default Navbar;
