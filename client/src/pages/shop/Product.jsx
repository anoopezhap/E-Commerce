import { useContext } from "react";
import ProductCSS from "./Product.module.css";
import { ShopContext } from "../../context/shopContext";

function Product({ product }) {
  const { addToCart, cartItems, getCartItemCount } = useContext(ShopContext);

  //console.log(cartItems);

  const { _id, productName, price, description, imageURL, stockQuantity } =
    product;

  const count = getCartItemCount(_id);

  return (
    <div className={ProductCSS.product}>
      <img src={imageURL} />
      <div className={ProductCSS.description}>
        <h3>{productName}</h3>
        <p>{description}</p>
        <p>${price}</p>
      </div>

      <div className={ProductCSS.stockQuantity}>
        {stockQuantity === 0 && <h1>OUT OF STOCK</h1>}
      </div>
      {stockQuantity !== 0 ? (
        <button
          onClick={() => addToCart(_id)}
          className={ProductCSS.addToCartBttn}
        >
          Add to cart
          {count > 0 && <> ({count})</>}
        </button>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Product;
