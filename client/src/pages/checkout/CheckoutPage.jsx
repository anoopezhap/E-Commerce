import { useQueryClient } from "@tanstack/react-query";
import CheckoutPagecss from "./CheckoutPage.module.css";
import { useContext } from "react";
import { ShopContext } from "../../context/shopContext";
import CartItem from "./CartItem";
import SubTotal from "./SubTotal";
import { Navigate, useNavigate } from "react-router-dom";

function CheckoutPage() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const products = queryClient.getQueryData(["productList"]);

  const { cartItems, isAuthenticated, setIsAuthenticated } =
    useContext(ShopContext);

  // console.log(products);
  // console.log(cartItems);

  //to find the list of purchased products
  const purchasedProducts = products?.filter(
    (product) => cartItems[product._id]
  );

  //to create the list of purchased products with quantity
  const cartList = purchasedProducts?.map((product) => ({
    ...product,
    quantity: cartItems[product._id],
  }));

  console.log(cartList);

  const totalPrice = cartList?.reduce((accu, product) => {
    return accu + product.price * product.quantity;
  }, 0);

  // console.log("cartList", cartList);
  // console.log("cartItems", cartItems.length);

  return (
    <div className={CheckoutPagecss.cart}>
      <div>
        <h1 className="mb-10 text-center text-2xl font-bold">
          Your Cart Items
        </h1>
      </div>

      {cartList?.length === 0 ? (
        <div>Your cart is empty. Please add products to contirnue </div>
      ) : (
        <>
          <div className={CheckoutPagecss.cart}>
            {cartList?.map((product) => (
              <CartItem product={product} key={product._id} />
            ))}
          </div>
          <SubTotal totalPrice={totalPrice} />
        </>
      )}
    </div>
  );
}

export default CheckoutPage;
