import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../../apiRequests/requests";
import Spinner from "./../../components/Spinner";

import { useCookies } from "react-cookie";
import Product from "./Product";

import ShopPageCSS from "./ShopPage.module.css";

function ShopPage() {
  const [cookies, _] = useCookies(["access_token"]);
  const access_token = cookies.access_token;

  const { isPending, isError, data, error } = useQuery({
    queryKey: ["productList"],
    queryFn: () => fetchProducts(access_token),
    staleTime: 0,
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
    <div className={ShopPageCSS.shop}>
      <div className={ShopPageCSS.products}>
        {data.map((product) => (
          <Product product={product} key={product._id} />
        ))}
      </div>
    </div>
  );
}

export default ShopPage;
