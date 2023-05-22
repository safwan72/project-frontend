import axios from "axios";
import React from "react";
import { useSelector } from "react-redux";
import { HOSTURL } from "../../utils/hostURL";
import { Link } from "react-router-dom";

const Cart = () => {
  const [myorder, setmyorder] = React.useState([]);
  const [doreload, setdoreload] = React.useState(false);
  const [myorderItems, setmyorderItems] = React.useState([]);
  const [couponCode, setcouponCode] = React.useState([]);
  const id = useSelector((state) => state.user_id);
  const val = {
    id: id,
  };
  const header = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  React.useEffect(() => {
    async function getPosts() {
      if (id) {
        const request = await axios.get(`${HOSTURL}my_cart/${id}/`);
        setmyorder(request?.data?.order);
        setmyorderItems(request?.data?.order?.items);
      }
    }
    getPosts();
  }, [id, doreload]);

  const handleClickIncrease = (product) => {
    async function getPosts() {
      const request = await axios.post(
        `${HOSTURL}add_product/${product}/`,
        val,
        header
      );
      setdoreload(!doreload);
      setmyorder(request?.data?.order);
      setmyorderItems(request?.data?.order?.items);
    }
    getPosts();
  };

  const handleClickDecrease = (product) => {
    async function getPosts() {
      const request = await axios.post(
        `${HOSTURL}decrease_product/${product}/`,
        val,
        header
      );
      setdoreload(!doreload);
      setmyorder(request?.data?.order);
      setmyorderItems(request?.data?.order?.items);
    }
    getPosts();
  };
  const handleCoupon = () => {
    const val = {
      coupon: couponCode,
    };
    async function getPosts() {
      const request = await axios.put(
        `${HOSTURL}add_coupon/${id}/`,
        val,
        header
      );
      setdoreload(!doreload);
      console.log(request);
      // setmyorder(request?.data?.order);
      // setmyorderItems(request?.data?.order?.items);
    }
    getPosts();
  };

  console.log(myorder);
  return (
    <>
      <div className="container mx-auto mt-10 px-2">
        <div className="flex shadow-md my-10 flex-col">
          <div className="bg-white  py-5">
            <div className="flex justify-between border-b pb-8">
              <h1 className="font-semibold text-2xl">Shopping Cart</h1>
              <h2 className="font-semibold text-2xl">
                {myorderItems?.length} Items
              </h2>
            </div>
            <div className="flex mt-10 mb-5 ml-2 justify-between text-center">
              <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">
                Product Details
              </h3>
              <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">
                Quantity
              </h3>
              <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">
                Price
              </h3>
              <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">
                Total
              </h3>
            </div>
            {myorderItems?.map((item) => (
              <div
                className="flex items-center hover:bg-gray-100 mx-8 px-6 py-5"
                key={item?.id}
              >
                <div className="flex w-2/5">
                  <div className="w-20">
                    <img
                      className="h-24"
                      src={item?.product?.product_picture}
                      alt={item?.product?.product_picture}
                    />
                  </div>
                  <div className="flex flex-col justify-center ml-4 flex-grow">
                    <span className="font-bold text-sm">
                      {item?.product?.product_name}
                    </span>
                  </div>
                </div>
                <div className="flex justify-center w-1/5">
                  <button
                    className=""
                    onClick={() => handleClickDecrease(item?.product?.id)}
                  >
                    <svg
                      className="fill-current text-gray-600 w-3"
                      viewBox="0 0 448 512"
                    >
                      <path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                    </svg>
                  </button>

                  <p className="mx-2 border text-center w-8 py-3">
                    {item?.quantity}
                  </p>

                  <button
                    className=""
                    onClick={() => handleClickIncrease(item?.product?.id)}
                  >
                    <svg
                      className="fill-current text-gray-600 w-3"
                      viewBox="0 0 448 512"
                    >
                      <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                    </svg>
                  </button>
                </div>
                <span className="text-center w-1/5 font-semibold text-sm">
                  {item?.product_total} &#2547;
                </span>
                <span className="text-center w-1/5 font-semibold text-sm">
                  {item?.product_total_discount} &#2547;
                </span>
              </div>
            ))}

            <Link
              to="/"
              className="flex font-semibold text-amber-400 text-sm mt-10 ml-2"
            >
              <svg
                className="fill-current mr-2 text-amber-600 w-4"
                viewBox="0 0 448 512"
              >
                <path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" />
              </svg>
              Continue Shopping
            </Link>
          </div>

          <div id="summary" className="px-8 py-10">
            <h1 className="font-semibold text-2xl border-b pb-8">
              Order Summary
            </h1>
            <div className="flex justify-between mt-10 mb-5">
              <span className="font-semibold text-sm uppercase">
                Items {myorderItems?.length}
              </span>
              <span className="font-semibold text-sm">
                {myorder?.total_price} &#2547;
              </span>
            </div>
            <div>
              <p className="font-bold">Shipping Charge is 50 &#2547;</p>
            </div>
            <p className="py-5 font-bold">
              {myorder?.coupon == null
                ? "No Coupon Added"
                : `Coupon Code Added (${myorder?.coupon?.code}): Total Discount ${myorder?.coupon?.amount}`}&#2547;
            </p>
            {myorder?.coupon == null ? (
                <>
              <div className="pb-10">
                <label
                  htmlFor="promo"
                  className="font-semibold inline-block mb-3 text-sm uppercase"
                >
                  Promo Code
                </label>
                <input
                  type="text"
                  id="promo"
                  placeholder="Enter your code"
                  className="p-2 text-sm w-full"
                  value={couponCode}
                  onChange={(e) => setcouponCode(e.target.value)}
                />
              </div>
                          <button
                          className="bg-green-600 w-full hover:bg-green-700 px-5 py-2 text-sm text-white uppercase"
                          onClick={() => handleCoupon()}
                        >
                          Apply
                        </button>
                        </>

            ) : (
              ""
            )}

            <div className="border-t mt-8">
              <div className="flex font-semibold justify-between py-6 text-sm uppercase">
                <span>Total cost</span>
                <span className="font-bold">{myorder?.total_price_after_discount} &#2547;</span>
              </div>
              <Link to='/checkout'>
              <button className="bg-amber-400 font-semibold hover:bg-amber-500 py-3 text-sm text-white uppercase w-full">
                Checkout
              </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
