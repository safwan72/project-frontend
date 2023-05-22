import React from 'react'
import HOC from '../components/HOC'
import Categories from '../components/Categories/Categories'

const Category = () => {
  return (
    <HOC>
          <div className="container mx-auto mt-7 pb-5 md:px-20 lg:px-40 px-5 min-h-full max-[400px]:px-[14px]">
          <h1 className='text-4xl my-10 text-center'>
      View Different Products of Different Categories
      </h1>

</div>
      <Categories/>
      </HOC>
  )
}

export default Category