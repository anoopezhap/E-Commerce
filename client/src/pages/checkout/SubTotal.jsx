import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { checkout } from "../../apiRequests/requests";
import { useContext } from "react";
import { ShopContext } from "../../context/shopContext";

function SubTotal({ totalPrice }) {
  const navigate = useNavigate();

  const { access_token, cartItems, customerID, setCartItems } =
    useContext(ShopContext);

  const queryClient = useQueryClient();

  const { isError, isPending, mutate } = useMutation({
    mutationFn: ({ access_token, cartItems, customerID }) =>
      checkout(access_token, cartItems, customerID),
    onSuccess: () => {
      console.log("success");
      navigate("/");
      setCartItems({});
      queryClient.invalidateQueries(["productList", "availableMoney"]);
    },
  });

  return (
    <div className="mt-6  rounded-lg border bg-white p-6 shadow-md  mx-auto max-w-5xl justify-center  ">
      <div className="mb-2 flex justify-between">
        <p className="text-gray-700">Subtotal</p>
        <p className="text-gray-700">${totalPrice}</p>
      </div>
      <div className="flex justify-between">
        <p className="text-gray-700">Shipping</p>
        <p className="text-gray-700">$4.99</p>
      </div>
      <hr className="my-4" />
      <div className="flex justify-between">
        <p className="text-lg font-bold">Total</p>
        <div className="">
          <p className="mb-1 text-lg font-bold">${totalPrice + 4.99}</p>
        </div>
      </div>
      <button
        onClick={() => mutate({ access_token, cartItems, customerID })}
        className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600"
      >
        Check out
      </button>
      <button
        onClick={() => navigate("/")}
        className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600"
      >
        Continue Shopping
      </button>
    </div>
  );
}

export default SubTotal;
