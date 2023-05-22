import React from 'react'
import axios from "axios";
import {HOSTURL} from '../../utils/hostURL'
import { TagIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

const AllProducts = ({num,home}) => {
  const [allproducts, setallproducts] = React.useState(null);
  React.useEffect(() => {
      async function getPosts() {
          const request = await axios.get(`${HOSTURL}allproducts/${num}/`);
          setallproducts(request.data);
        }
        getPosts();
   }, [num]);


  return (
    <div className="bg-white my-16">
    <div className="mx-auto max-w-2xl px-4 py-5 sm:px-6 sm:py-10 lg:max-w-7xl lg:px-8">
      {home && (
      <h2 className="text-3xl font-bold text-center tracking-tight text-gray-900">View Some of our  Products</h2>
      )}

      <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        {allproducts?.map((product) => (
          <Link to={`/productDetail/${product?.id}`} key={product?.id} >          
          <div className="group relative">
            <div className="min-h-80 aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
              <img
                src={product?.product_picture}
                alt={product?.product_name}
                className="h-full w-full object-cover object-center lg:h-full lg:w-full"
              />
            </div>
            <div className="mt-4 flex justify-between flex-col">
              <div>
                <h3 className="text-sm text-gray-700">
                  <p>
                    <span aria-hidden="true" className="absolute inset-0" />
                    {product?.product_name}
                  </p>
                </h3>
              </div>
              <p className="text-sm font-medium text-gray-900">
                <span className='line-through'>{product?.price}&#2547;</span>
                <span className='ml-2'>{product?.new_price}&#2547;</span>
                </p>
                {!home && (
                <div className="text-sm text-gray-700 flex flex-row">
                  <TagIcon className='h-6 w-4 mr-1'/>
                    <p aria-hidden="true" className="absolute inset-0" />
                    {product?.product_category[0]?product?.product_category[0]?.name:""}

                </div>
                )}
            </div>
          </div>
          </Link>
        ))}
      </div>
    </div>
  </div>
  )
}

export default AllProducts