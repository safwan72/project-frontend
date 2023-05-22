import React from "react";
import HOC from "../HOC";
import { Formik } from "formik";
import toast, { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import axios from "axios";
import { HOSTURL } from "../../utils/hostURL";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const notify = (message) => toast(message);
  const id = useSelector((state) => state.user_id);
  const [myorder, setmyorder] = React.useState([]);
  const navigate = useNavigate();

  React.useEffect(() => {
    async function getPosts() {
      if (id) {
        const request = await axios.get(`${HOSTURL}my_cart/${id}/`);
        setmyorder(request?.data?.order);
      }
    }
    getPosts();
  }, [id]);
  console.log(myorder)
  return (
    <HOC>
    <div className="container mx-auto mt-10 pb-5 md:px-20 lg:px-40 px-5 min-h-full max-[400px]:px-[14px]">
    <h2 className="text-3xl font-semibold leading-7 text-gray-900 text-center">
                  Checkout Page
                </h2>
    <h1 className="text-md my-5">Total Price : {myorder?.total_price_after_discount}</h1>
    
      <Toaster
        position="top-right"
        toastOptions={{
          // Define default options
          className: "",
          duration: 5000,
          style: {
            background: "#FBBF24",
            color: "#fff",
          },
        }}
      />
      <Formik
        initialValues={{ username: myorder?.user?myorder?.user?.username:"", phone: myorder?.user?myorder?.user?.phone:"", address: myorder?myorder?.shipping_address:"" }}
        enableReinitialize
        validate={(values) => {
          const errors = {};
          if (!values.address) {
            errors.address = "Required";
          }
          return errors;
        }}
        onSubmit={(values, actions) => {
              const data = {
                address: values.address,
              };
              const header = {
                headers: {
                  "Content-Type": "application/json",
                },
              };
              axios
                .post(`${HOSTURL}checkout/${id}/`, data, header)
                .then((response) => {
                  if (response.data) {
                    actions.resetForm({
                      phone: "", password: "", cpassword: "", username: ""
                    });
                    notify("Checkout Done!!");
                    setTimeout(() => {
                        navigate('/')
                    }, 5000);
                }
            })
            .catch((error) => {
                notify("Something Went Wrong. Try Again Please.");
                setTimeout(() => {
                    navigate('/')
                }, 5000);
                });
            
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          /* and other goodies */
        }) => (
          <form onSubmit={handleSubmit}>
              <div className="border-b border-gray-900/10 pb-12">
                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="col-span-full">
                    <label
                      htmlFor="username"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Username
                    </label>
                    <div className="mt-2">
                      <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                        <input
                          type="text"
                          name="username"
                          id="username"
                          className="block flex-1 border-0 bg-transparent py-1.5 pl-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                          placeholder="Your Desired Username"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.username}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-span-full">
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Phone
                    </label>
                    <div className="mt-2">
                      <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                        <input
                          type="text"
                          name="phone"
                          id="phone"
                          className="block flex-1 border-0 bg-transparent py-1.5 pl-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                          placeholder="Your Number"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.phone}
                        />
                      </div>
                      {errors.phone && touched.phone && errors.phone}
                    </div>
                  </div>

                  <div className="col-span-full">
                    <label
                      htmlFor="address"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Address
                    </label>
                    <div className="mt-2">
                      <textarea
                        id="address"
                        name="address"
                        rows={3}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        placeholder="Write down your shipping address."
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.address}
                      />
                    </div>
                  </div>
                </div>
              </div>

            <div className="mt-6 flex items-center justify-end gap-x-6">
              <button
                type="submit"
                className="rounded-md bg-amber-500 px-3 py-2 w-full text-sm font-semibold text-white shadow-sm hover:bg-amber-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500"
              >
                Proceed to Pay
              </button>
            </div>
          </form>
        )}
      </Formik>
                  </div>

    </HOC>
  );
};

export default Checkout;
