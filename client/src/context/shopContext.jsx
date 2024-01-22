import { createContext, useState } from "react";
import { useCookies } from "react-cookie";

//Create context

const ShopContext = createContext(null);

function ShopContextProvider({ children }) {
  const [cartItems, setCartItems] = useState({});

  const [cookies, _] = useCookies(["access_token"]);
  const access_token = cookies.access_token;
  const customerID = localStorage.getItem("userId");

  function getCartItemCount(itemId) {
    if (itemId in cartItems) {
      return cartItems[itemId];
    }

    return 0;
  }

  function addToCart(itemId) {
    if (!cartItems[itemId]) {
      setCartItems((curr) => ({ ...curr, [itemId]: 1 }));
    } else {
      setCartItems((curr) => ({ ...curr, [itemId]: curr[itemId] + 1 }));
    }
  }

  function removeFromCart(itemId) {
    setCartItems((curr) => ({ ...curr, [itemId]: curr[itemId] - 1 }));
  }

  function updateCartItemCount(newAmount, itemId) {
    setCartItems((curr) => ({ ...curr, [itemId]: newAmount }));
  }

  const value = {
    addToCart,
    removeFromCart,
    updateCartItemCount,
    cartItems,
    getCartItemCount,
    access_token,
    customerID,
    setCartItems,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export { ShopContext, ShopContextProvider };
