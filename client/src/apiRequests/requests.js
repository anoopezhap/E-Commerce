import axios from "axios";
import { useCookies } from "react-cookie";

export async function fetchProducts(access_token) {
  //console.log("TOKEN INSIDE FETCH", access_token);
  const res = await axios.get("http://localhost:3001/product", {
    headers: { authorization: access_token },
  });
  //console.log(res.data.products);
  return res.data.products;
}

export async function checkout(access_token, cartItems, customerID) {
  // console.log("accesstkn", access_token);
  // console.log("id", customerID);
  // console.log("cartitems", cartItems);

  const body = { customerID, cartItems };

  await axios.post("http://localhost:3001/product/checkout", body, {
    headers: { authorization: access_token },
  });
}

export async function fetchAvailableMoney(access_token, customerID) {
  const availableMoney = await axios.get(
    `http://localhost:3001/user/getavailablemoney/${customerID}`,
    {
      headers: { authorization: access_token },
    }
  );

  //console.log(availableMoney.data.availableMoney);
  return availableMoney.data.availableMoney;
}

export async function fetchPurchasedProducts(access_token, customerID) {
  const purchasedProducts = await axios.get(
    `http://localhost:3001/product/purchased-items/${customerID}`,
    {
      headers: { authorization: access_token },
    }
  );

  return purchasedProducts.data.products;
}
