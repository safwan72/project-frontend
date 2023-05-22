import React from "react";
import axios from "axios";
import { HOSTURL } from "../../utils/hostURL";
import { Link } from "react-router-dom";

  
  export default function Categories() {
    const [categories, setcategories] = React.useState([]);
React.useEffect(() => {
  async function getPosts() {
    const request = await axios.get(`${HOSTURL}allcategory/`);
    setcategories(request.data);
  }
  getPosts();
}, []);
    return (
      <>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32">  
            <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 ">
              {categories.map((callout) => (
                <div key={callout?.id} className="group relative">
                  <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-64">
                    <img
                      src='https://tailwindui.com/img/ecommerce-images/home-page-02-edition-02.jpg'
                      alt={callout?.name}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                  <h3 className="mt-6 text-sm text-gray-500">
                    <Link to={`/category/${callout?.id}/`}>
                      <span className="absolute inset-0" />
                      {callout?.name}
                    </Link>
                  </h3>
                  <p className="text-base font-semibold text-gray-900">{callout?.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </>
    )
  }
  