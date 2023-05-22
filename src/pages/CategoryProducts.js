import axios from 'axios';
import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { HOSTURL } from '../utils/hostURL';
import HOC from '../components/HOC';
import { TagIcon } from '@heroicons/react/24/outline';

const CategoryProducts = () => {
    let params = useParams();
    const id=params.id;
    const [myproduct, setmyproduct] = React.useState(null);
    const [categoryname, setcategoryname] = React.useState(null);

    React.useEffect(() => {
        async function getPosts() {
            if(id){
                const request = await axios.get(`${HOSTURL}category/${id}/`);
                setmyproduct(request?.data);
                setcategoryname(request?.data[0]?.product_category[0]?.name);
            }
          }
          getPosts();
     }, [id]);
  return (
    <HOC>
                  <div className="container mx-auto mt-7 pb-5 md:px-20 lg:px-40 px-5 min-h-full max-[400px]:px-[14px]">
                  <h1 className='text-4xl my-10 text-center'>
      View Different Products of {categoryname}
      </h1>
              <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        {myproduct?.map((product) => (
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
                <div className="text-sm text-gray-700 flex flex-row">
                  <TagIcon className='h-6 w-4 mr-1'/>
                    <p aria-hidden="true" className="absolute inset-0" />
                    {product?.product_category[0]?product?.product_category[0]?.name:""}

                </div>
            </div>
          </div>
          </Link>
        ))}
      </div>
      </div>
    </HOC>
  )
}

export default CategoryProducts