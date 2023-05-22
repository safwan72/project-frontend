import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Formik } from "formik";
import axios from "axios";
import { HOSTURL } from "../../utils/hostURL";

export default function Adduser({
  open,
  handleOpen,
  handlereload,
  handleNotify,
}) {
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={handleOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="">
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <Dialog.Title
                        as="h3"
                        className="text-base font-semibold leading-6 text-gray-900"
                      >
                        Add New user
                      </Dialog.Title>
                      <div className="mt-2">
                        <Formik
                          initialValues={{
                            phone: "",
                            password: "",
                            username: "",
                          }}
                          validate={(values) => {
                            const errors = {};
                            if (!values.phone) {
                              errors.phone = "Required";
                            }
                            if (!values.password) {
                              errors.password = "Required";
                            }
                            return errors;
                          }}
                          onSubmit={(values, actions) => {
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
                                    phone: "",
                                    password: "",
                                    cpassword: "",
                                    username: "",
                                  });
                                  handleNotify(
                                    "New User Added!!"
                                  );
                                  handlereload();
                                  handleOpen();
                                }
                              })
                              .catch((error) => {
                                handleNotify(
                                  "Something Went Wrong!!"
                                );
                                handlereload();
                                handleOpen();
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
                              <div className="space-y-12">
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
                                            placeholder="Customer Username"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.username}
                                          />
                                        </div>
                                        {errors.username &&
                                          touched.username &&
                                          errors.username}
                                      </div>
                                    </div>
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
                                            style={{
                                              borderRight: "2px solid #cfcaca",
                                            }}
                                          >
                                            +88
                                          </span>
                                          <input
                                            type="tel"
                                            name="phone"
                                            id="phone"
                                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                            placeholder="Customer Phone Number"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.phone}
                                          />
                                        </div>
                                        {errors.phone &&
                                          touched.phone &&
                                          errors.phone}
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
                                            placeholder="Customer Password"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.password}
                                          />
                                        </div>
                                        {errors.password &&
                                          touched.password &&
                                          errors.password}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="mt-6 flex items-center justify-end gap-x-6">
                                <button
                                  type="submit"
                                  className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                  Create
                                </button>
                              </div>
                            </form>
                          )}
                        </Formik>
                      </div>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
