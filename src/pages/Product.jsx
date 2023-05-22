import React from 'react'
import HOC from '../components/HOC'
import AllProducts from '../components/Products/AllProducts'

const Product = () => {
  return (
    <HOC>
      <h1 className='text-4xl my-10 text-center'>
      View All of our Products
      </h1>
      <AllProducts num={0}/>
      </HOC>
  )
}

export default Product