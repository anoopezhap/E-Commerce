import { createContext, useState } from "react";

//Create context

const ShopContext = createContext(null);

function ShopContextProvider({ children }) {
  const [cartItems, setCartItems] = useState({});

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
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export { ShopContext, ShopContextProvider };
