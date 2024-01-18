import CartItemCss from "./CartItem.module.css";

function CartItem({ product }) {
  const { imageURL, productName, price, quantity } = product;
  return (
    <div className={CartItemCss.cartitem}>
      <img src={imageURL} />
      <div className={CartItemCss.description}>
        <h3>{productName}</h3>
        <p>Price : ${price}</p>
      </div>
    </div>
  );
}

export default CartItem;
