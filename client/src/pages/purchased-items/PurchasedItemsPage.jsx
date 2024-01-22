import { useQuery } from "@tanstack/react-query";
import { fetchPurchasedProducts } from "./../../apiRequests/requests";
import { useContext } from "react";
import { ShopContext } from "../../context/shopContext";
import Spinner from "../../components/Spinner";
import OrderItem from "./OrderItem";
import { Navigate, useNavigate } from "react-router-dom";

function PurchasedItemsPage() {
  const { access_token, customerID, isAuthenticated } = useContext(ShopContext);

  const navigate = useNavigate();

  const { isPending, isError, data, error } = useQuery({
    queryKey: ["purchasedProducts"],
    queryFn: () => fetchPurchasedProducts(access_token, customerID),
  });

  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    alert("Somethign Happend:Please login to continue");
    navigate("/auth");
    console.log(error);
    return <div>Is error</div>;
  }

  console.log("data", data?.length);

  return (
    <div>
      {data?.length === 0 ? (
        <h1>You have not purchased any product</h1>
      ) : (
        <div>
          {data.map((product) => (
            <OrderItem product={product} key={product._id} />
          ))}
        </div>
      )}
    </div>
  );
}

export default PurchasedItemsPage;

/* <div>
{data.map((product) => (
  <OrderItem product={product} key={product._id} />
))}
</div> */
