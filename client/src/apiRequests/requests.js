import axios from "axios";
import { useCookies } from "react-cookie";

export async function fetchProducts(access_token) {
  console.log("TOKEN INSIDE FETCH", access_token);
  const res = await axios.get("http://localhost:3001/product", {
    headers: { authorization: access_token },
  });
  //console.log(res.data.products);
  return res.data.products;
}
