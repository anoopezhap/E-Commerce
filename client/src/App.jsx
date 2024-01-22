import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import "./../../client/src/app.css";

import AuthPage from "./pages/auth/AuthPage";
import CheckoutPage from "./pages/checkout/CheckoutPage";
import PurchasedItemsPage from "./pages/purchased-items/PurchasedItemsPage";
import ShopPage from "./pages/shop/ShopPage";
import Navbar from "./components/Navbar";
import { ShopContextProvider } from "./context/shopContext";
import ProtectedRoute from "./components/ProtectedRoute";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

function App() {
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <BrowserRouter>
          <ShopContextProvider>
            <Navbar />
            <Routes>
              <Route path="/auth" element={<AuthPage />} />

              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <ShopPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/checkout"
                element={
                  <ProtectedRoute>
                    <CheckoutPage />{" "}
                  </ProtectedRoute>
                }
              />
              <Route
                path="/purchased-items"
                element={
                  <ProtectedRoute>
                    <PurchasedItemsPage />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </ShopContextProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </div>
  );
}

export default App;
