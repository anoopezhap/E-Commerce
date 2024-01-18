import { useQueryClient } from "@tanstack/react-query";
import CheckoutPagecss from "./CheckoutPage.module.css";
import { useContext } from "react";
import { ShopContext } from "../../context/shopContext";
import CartItem from "./CartItem";

function CheckoutPage() {
  const queryClient = useQueryClient();

  const products = queryClient.getQueryData(["productList"]);

  const { cartItems } = useContext(ShopContext);

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

  // console.log("cartList", cartList);

  //  return {cartList.length >0 ?() : ()}

  return (
    <div className={CheckoutPagecss.cart}>
      <div>
        <h1>Your Cart Items</h1>
      </div>

      {cartList?.length === 0 ? (
        <div>Please add product </div>
      ) : (
        <div className={CheckoutPagecss.cart}>
          {cartList?.map((product) => (
            <CartItem product={product} key={product._id} />
          ))}
        </div>
      )}
    </div>
  );
}

export default CheckoutPage;
