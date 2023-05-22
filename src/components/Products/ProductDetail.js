import React from 'react'
import { StarIcon } from '@heroicons/react/20/solid'
import HOC from '../HOC'
import axios from 'axios';
import { useSelector } from 'react-redux';

import { HOSTURL } from '../../utils/hostURL'
import { Link, useParams } from 'react-router-dom'
import { useNavigate } from "react-router-dom";

const reviews = { href: '#', average: 4, totalCount: 117 }

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}
const ProductDetail = () => {
    const [myproduct, setmyproduct] = React.useState(null);
    let params = useParams();
    const navigate = useNavigate();
  const id=params.id;
  const user_id = useSelector(state => state.user_id);
  const val = {
    id: user_id,
  };
  const header = {
    headers: {
      "Content-Type": "application/json",
    },
  };
    React.useEffect(() => {
        async function getPosts() {
            if(id){
                const request = await axios.get(`${HOSTURL}products/${id}/`);
                setmyproduct(request?request.data[0]:[]);
            }
          }
          getPosts();
     }, [id]);

     const handleClickIncrease=(product)=>{

        async function getPosts() {
                const request = await axios.post(`${HOSTURL}add_product/${product}/`,val,header);
                console.log(request)
                navigate("/order");
          }
          getPosts();
    }
    

  return (
    <HOC>

    <div className="bg-white">
      <div className="pt-6">
        <nav aria-label="Breadcrumb">
          <ol  className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
          <li>
                <div className="flex items-center">
                  <Link to='/categories' className="mr-2 text-sm font-medium text-gray-900">
                  {myproduct?.product_category?myproduct?.product_category[0]?.name:''}
                  </Link>
                  <svg
                    width={16}
                    height={20}
                    viewBox="0 0 16 20"
                    fill="currentColor"
                    aria-hidden="true"
                    className="h-5 w-4 text-gray-300"
                  >
                    <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                  </svg>
                </div>
              </li>
            <li className="text-sm">
              <p  className="font-medium text-gray-500 hover:text-gray-600">
                {myproduct?.product_name}
              </p>
            </li>
          </ol>
        </nav>

        {/* Image gallery */}
        <div className="mx-auto mt-6 max-w-2xl sm:px-6  lg:max-w-5xl lg:gap-x-8 lg:px-8 h-1/3">
          <div className="aspect-h-4 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg flex justify-center">
            <img
              src={myproduct?.product_picture}
              alt={myproduct?.product_name}
              className="h-full w-2/3 object-cover object-center"
            />
          </div>
        </div>


        {/* Product info */}
        <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
          <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{myproduct?.product_name}</h1>
          </div>

          {/* Options */}
          <div className="mt-4 lg:row-span-3 lg:mt-0">
            <h2 className="sr-only">Product information</h2>
            <p className="text-3xl tracking-tight text-gray-900">
                <span className='line-through'>{myproduct?.price}&#2547;</span>
                <span className='ml-2'>{myproduct?.new_price}&#2547;</span>
                </p>
            {/* Reviews */}
            <div className="mt-6">
              <h3 className="sr-only">Reviews</h3>
              <div className="flex items-center">
                <div className="flex items-center">
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <StarIcon
                      key={rating}
                      className={classNames(
                        reviews.average > rating ? 'text-gray-900' : 'text-gray-200',
                        'h-5 w-5 flex-shrink-0'
                      )}
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <p className="sr-only">{reviews.average} out of 5 stars</p>
                <a href={reviews.href} className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                  {reviews.totalCount} reviews
                </a>
              </div>
            </div>
          <button
                type="submit"
                className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-amber-500 px-8 py-3 text-base font-medium text-white hover:bg-amber-400  focus:ring-offset-2"
                onClick={()=>handleClickIncrease(myproduct?.id)}
              >
                Add to Cart
              </button>
          </div>
          <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
            {/* Description and details */}
            <div>
              <h3 className="sr-only">Description</h3>

              <div className="space-y-6">
                <p className="text-base text-gray-900">{myproduct?.product_description}</p>
              </div>
            </div>

            <div className="mt-10">
              <h2 className="text-sm font-medium text-gray-900">Details</h2>

              <div className="mt-4 space-y-6">
                <p className="text-sm text-gray-600">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </HOC>
  )
}

export default ProductDetail