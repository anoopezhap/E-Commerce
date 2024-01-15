import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import "./../../client/src/app.css";

import AuthPage from "./pages/auth/AuthPage";
import CheckoutPage from "./pages/checkout/CheckoutPage";
import PurchasedItemsPage from "./pages/purchased-items/PurchasedItemsPage";
import ShopPage from "./pages/shop/ShopPage";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<ShopPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/purchased-items" element={<PurchasedItemsPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
