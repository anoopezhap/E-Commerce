import ProductCSS from "./Product.module.css";

function Product({ product }) {
  const { _id, productName, price, description, imageURL, stockQuantity } =
    product;
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
        <button className={ProductCSS.addToCartBttn}>Add to cart</button>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Product;
