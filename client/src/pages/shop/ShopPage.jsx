import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../../apiRequests/requests";
import Spinner from "./../../components/Spinner";

import { useCookies } from "react-cookie";
import Product from "./Product";

import "./styles.css";

function ShopPage() {
  const [cookies, _] = useCookies(["access_token"]);
  const access_token = cookies.access_token;

  const { isPending, isError, data, error } = useQuery({
    queryKey: ["productList"],
    queryFn: () => fetchProducts(access_token),
  });

  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    alert("Somethign Happend:Please login to continue");
    console.log(error);
    return <div>Is error</div>;
  }

  return (
    <div className="shop">
      <div className="products">
        {data.map((product) => (
          <Product product={product} key={product._id} />
        ))}
      </div>
    </div>
  );
}

export default ShopPage;
