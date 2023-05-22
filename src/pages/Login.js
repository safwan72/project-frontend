import React, { useState } from "react";
import * as actions from "../app/actionCreator";
import { connect } from "react-redux";
import axios from "axios";
import { HOSTURL } from "../utils/hostURL";
import { Formik } from "formik";
import toast, { Toaster } from "react-hot-toast";
const mapDispatchToProps = (dispatch) => {
  return {
    auth: (val) => dispatch(actions.authload(val)),
  };
};
const Login = (props) => {
  const [loginstate, setloginstate] = useState(false);
  const notify = (message) => toast(message);

  return (
    <div className="container mx-auto mt-7 pb-5 md:px-20 lg:px-40 px-5 min-h-full max-[400px]:px-[14px]">
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
      <h4 className="text-center text-4xl">Login/Signup</h4>
      <Formik
        initialValues={{ phone: "", password: "", cpassword: "", username: "" }}
        validate={(values) => {
          const errors = {};
          if (!values.phone) {
            errors.phone = "Required";
          }
          if (!values.password) {
            errors.password = "Required";
          }
          if (values.cpassword !== values.password && !loginstate) {
            errors.cpassword = "Passwords Must Match";
          }
          if (!values.username && !loginstate) {
            errors.username = "Required";
          }
          return errors;
        }}
        onSubmit={(values, actions) => {
          if (loginstate) {
            const data = {
              phone: values.phone,
              password: values.password,
            };
            props.auth(data);
            notify("Login Successful");
            actions.resetForm({
              phone: "", password: "", cpassword: "", username: ""
            });
          } else {
            const data = {
              phone: values.phone,
              password: values.password,
              username: values.username,
            };
            const header = {
              headers: {
                "Content-Type": "application/json",
              },
            };
            axios
              .post(`${HOSTURL}newuser/`, data, header)
              .then((response) => {
                if (response.data) {
                  actions.resetForm({
                    phone: "", password: "", cpassword: "", username: ""
                  });
                  notify("Account Creation Successful.Please Login Now.");
                  setloginstate(true)
                }
              })
              .catch((error) => {
                notify("Something Went Wrong. Try Again Please.");
              });
          }
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
            <div className="space-y-12">
              <div className="border-b border-gray-900/10 pb-12">
                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  {!loginstate && (
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
                        {errors.username && touched.username && errors.username}
                      </div>
                    </div>
                  )}
                  <div className="col-span-full">
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Phone Number
                    </label>
                    <div className="mt-2">
                      <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                        <span
                          className="flex select-none items-center px-2 text-gray-500 sm:text-sm"
                          style={{ borderRight: "2px solid #cfcaca" }}
                        >
                          +88
                        </span>
                        <input
                          type="tel"
                          name="phone"
                          id="phone"
                          className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                          placeholder="Your Phone Number"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.email}
                        />
                      </div>
                      {errors.phone && touched.phone && errors.phone}
                    </div>
                  </div>
                  <div className="col-span-full">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Password
                    </label>
                    <div className="mt-2">
                      <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-red-900">
                        <input
                          type="password"
                          name="password"
                          id="password"
                          className="block flex-1 border-0 bg-transparent py-1.5 pl-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                          placeholder="Enter your Password"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.email}
                        />
                      </div>
                      {errors.password && touched.password && errors.password}
                    </div>
                  </div>
                  {!loginstate && (
                    <div className="col-span-full">
                      <label
                        htmlFor="cpassword"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Confirm Password
                      </label>
                      <div className="mt-2">
                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-red-900">
                          <input
                            type="password"
                            name="cpassword"
                            id="cpassword"
                            className="block flex-1 border-0 bg-transparent py-1.5 pl-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                            placeholder="Confirm your Password"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.email}
                          />
                        </div>
                        {errors.cpassword &&
                          touched.cpassword &&
                          errors.cpassword}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-x-6">
              <button
                type="button"
                className="text-sm font-semibold leading-6 text-gray-900"
                onClick={() => {
                  setloginstate(!loginstate);
                }}
              >
                Change to {!loginstate ? "Login" : "Signup"}
              </button>
              <button
                type="submit"
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {loginstate ? "Login" : "Signup"}
              </button>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default connect(null, mapDispatchToProps)(Login);
