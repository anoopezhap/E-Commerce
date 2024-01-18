import { useContext } from "react";
import CartItemCss from "./CartItem.module.css";
import { ShopContext } from "../../context/shopContext";

function CartItem({ product }) {
  const { imageURL, productName, price, quantity, _id } = product;

  const { addToCart, removeFromCart, updateCartItemCount } =
    useContext(ShopContext);

  return (
    <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
      <div className="rounded-lg md:w-2/3">
        <div className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
          <img
            src={imageURL}
            alt="product-image"
            className="w-full rounded-lg sm:w-40"
          />
          <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
            <div className="mt-5 sm:mt-0">
              <h2 className="text-lg font-bold text-gray-900">{productName}</h2>
            </div>
            <div className="mt-4 flex justify-between im sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
              <div className="flex items-center border-gray-100">
                <button
                  className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50"
                  onClick={() => removeFromCart(_id)}
                >
                  -
                </button>
                <input
                  className="h-8 w-8 border bg-white text-center text-xs outline-none"
                  type="number"
                  value={quantity}
                  min="0"
                  onChange={(e) =>
                    updateCartItemCount(Number(e.target.value), _id)
                  }
                />
                <button
                  className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50"
                  onClick={() => addToCart(_id)}
                >
                  +
                </button>
              </div>
              <div className="flex items-center space-x-4">
                <p className="text-sm">${price}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // return (
  //   <div className={CartItemCss.cartitem}>
  //     <img src={imageURL} />
  //     <div className={CartItemCss.description}>
  //       <h3>{productName}</h3>
  //       <p>Price : ${price}</p>
  //     </div>
  //   </div>
  // );
}

export default CartItem;
