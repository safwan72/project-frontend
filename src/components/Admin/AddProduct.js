import React,{ Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Formik } from "formik";
import axios from "axios";
import { HOSTURL } from "../../utils/hostURL";
import { PhotoIcon } from "@heroicons/react/24/outline";

const AddProduct=({
  open,
  handleOpen,
  handlereload,
  handleNotify,
}) =>{

const [picture, setpicture] = React.useState(null);
const [categories, setcategories] = React.useState([]);
React.useEffect(() => {
  async function getPosts() {
    const request = await axios.get(`${HOSTURL}allcategory/`);
    setcategories(request.data);
  }
  getPosts();
}, []);

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
                        Add New Product
                      </Dialog.Title>
                      <div className="mt-2">
                        <Formik
                          initialValues={{
                            product_name: "",
                            product_picture: "",
                            price: "",
                            discount: "",
                            product_description: "",
                            availability: false,
                            featured: false,
                            product_category: [categories?categories[0]?.id:''],
                          }}
                          onSubmit={(values, { resetForm }) => {
                            let formData = new FormData();
                            formData.append(
                              "product_name",
                              values.product_name
                            );
                            formData.append(
                              "product_description",
                              values.product_description
                            );
                            formData.append("price", values.price);
                            formData.append("discount", values.discount);
                            formData.append(
                              "availability",
                              values.availability
                            );
                            formData.append("featured", values.featured);
                            formData.append("product_category", JSON.stringify(values.product_category));
                            if (values.product_picture !== "") {
                              formData.append(
                                "product_picture",
                                values.product_picture
                              );
                            }
                            const header = {
                            headers: {
                            "Content-Type": "application/json",
                            },
                            };
                            axios.post(`${HOSTURL}addproduct/`, formData, header)
                            .then((response) => {
                            if(response){
                                handleNotify(
                                    "New User Added!!"
                                  );
                                  handlereload();
                                  handleOpen();
                              resetForm();

                            }
                            })
                            .catch((error) => {
                                handleNotify(
                                  "Something Went Wrong!!"
                                );
                              resetForm();
                              handlereload();
                              handleOpen();
                            });
                          }}
                        >
                          {(props) => (
                            <form onSubmit={props.handleSubmit}>
                              <div className="space-y-12">
                                <div className="border-b border-gray-900/10 pb-12">
                                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                    <div className="col-span-full">
                                      <label
                                        htmlFor="product_name"
                                        className="block text-sm font-medium leading-6 text-gray-900"
                                      >
                                        Product Name
                                      </label>
                                      <div className="mt-2">
                                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                                          <input
                                            type="text"
                                            name="product_name"
                                            id="product_name"
                                            className="block flex-1 border-0 bg-transparent py-1.5 pl-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                            placeholder="Enter Product Name"
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            value={props.values.product_name}
                                          />
                                        </div>
                                      </div>
                                    </div>

                                    <div className="col-span-full">
                                      <label
                                        htmlFor="product_picture"
                                        className="block text-sm font-medium leading-6 text-gray-900"
                                      >
                                        Product Picture 
                                      </label>
                                      {picture && (
                                      <img src={picture} className="w-16 h-16" alt="hello"/>
                                      )}
                                      <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                                        <div className="text-center">
                                          <PhotoIcon
                                            className="mx-auto h-12 w-12 text-gray-300"
                                            aria-hidden="true"
                                          />
                                          <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                            <label
                                              htmlFor="file-upload"
                                              className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                            >
                                              <span>Upload a file</span>
                                              <input
                                                id="file-upload"
                                                name="file-upload"
                                                type="file"
                                                className="sr-only"
                                                onChange={(event) => {
                                                  props.setFieldValue(
                                                    "product_picture",
                                                    event.target.files[0]
                                                  );
                                                  setpicture(URL.createObjectURL(event.target.files[0]))
                                                }}
                                              />
                                            </label>
                                            <p className="pl-1">
                                              or drag and drop
                                            </p>
                                          </div>
                                          <p className="text-xs leading-5 text-gray-600">
                                            PNG, JPG, GIF up to 5MB
                                          </p>
                                        </div>
                                      </div>
                                    </div>

                                    <div className="col-span-full">
              <label htmlFor="product_category" className="block text-sm font-medium leading-6 text-gray-900">
                Product Category
              </label>
              <div className="mt-2">
                <select
                  id="product_category"
                  name="product_category"
                  multiple
                  autoComplete="product_category-name"
                  onChange={(event) =>{
                    let values = [...event.target.selectedOptions].map(opt => opt.value);
                    props.setFieldValue('product_category',values)
                  }}
                  onBlur={props.handleBlur}
                  value={props.values.product_category}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                    {categories?.map((item)=>(
                  <option key={item?.id} value={item?.id}>{item?.name}</option>
                    ))}
                </select>
              </div>
            </div>


                                    <div className="col-span-full">
                                      <label
                                        htmlFor="price"
                                        className="block text-sm font-medium leading-6 text-gray-900"
                                      >
                                        Price
                                      </label>
                                      <div className="mt-2">
                                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                                          <input
                                            type="number"
                                            name="price"
                                            id="price"
                                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                            placeholder="Product Price"
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            value={props.values.price}
                                          />
                                        </div>
                                      </div>
                                    </div>

                                    <div className="col-span-full">
                                      <label
                                        htmlFor="discount"
                                        className="block text-sm font-medium leading-6 text-gray-900"
                                      >
                                        Discount
                                      </label>
                                      <div className="mt-2">
                                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                                          <input
                                            type="number"
                                            name="discount"
                                            id="discount"
                                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                            placeholder="Product Discount"
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            value={props.values.discount}
                                          />
                                        </div>
                                      </div>
                                    </div>

                                    <div className="col-span-full">
                                      <label
                                        htmlFor="product_description"
                                        className="block text-sm font-medium leading-6 text-gray-900"
                                      >
                                        Description
                                      </label>
                                      <div className="mt-2">
                                        <textarea
                                          id="product_description"
                                          name="product_description"
                                          rows={3}
                                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                          placeholder="Write your Product Description."
                                          onChange={props.handleChange}
                                          onBlur={props.handleBlur}
                                          value={
                                            props.values.product_description
                                          }
                                        />
                                      </div>
                                    </div>
                                    <div className="col-span-full">
                                      <fieldset>
                                        <div className="mt-6 space-y-6">
                                          <div className="relative flex gap-x-3">
                                            <div className="flex h-6 items-center">
                                              <input
                                                id="availability"
                                                name="availability"
                                                type="checkbox"
                                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                onChange={props.handleChange}
                                                onBlur={props.handleBlur}
                                                value={
                                                  props.values.availability
                                                }
                                              />
                                            </div>
                                            <div className="text-sm leading-6">
                                              <label
                                                htmlFor="availability"
                                                className="font-medium text-gray-900"
                                              >
                                                Available
                                              </label>
                                              <p className="text-gray-500">
                                                Check if product is available
                                              </p>
                                            </div>
                                          </div>
                                          <div className="relative flex gap-x-3">
                                            <div className="flex h-6 items-center">
                                              <input
                                                id="featured"
                                                name="featured"
                                                type="checkbox"
                                                onChange={props.handleChange}
                                                onBlur={props.handleBlur}
                                                value={props.values.featured}
                                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                              />
                                            </div>
                                            <div className="text-sm leading-6">
                                              <label
                                                htmlFor="featured"
                                                className="font-medium text-gray-900"
                                              >
                                                Featured
                                              </label>
                                              <p className="text-gray-500">
                                                Check if product is to be
                                                featured
                                              </p>
                                            </div>
                                          </div>
                                        </div>
                                      </fieldset>
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
export default AddProduct