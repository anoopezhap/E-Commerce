import "./styles.css";

function Product({ product }) {
  const { _id, productName, price, description, imageURL, stockQuantity } =
    product;
  return (
    <div className="product">
      <img src={imageURL} />
      <div className="description">
        <h3>{productName}</h3>
        <p>{description}</p>
        <p>${price}</p>
      </div>

      <button className="add-to-cart-bttn">Add to cart</button>

      <div className="stock-quantity">
        {stockQuantity === 0 && <h1>OUT OF STOCK</h1>}
      </div>
    </div>
  );
}

export default Product;
