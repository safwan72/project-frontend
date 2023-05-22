import React from 'react'
import FeaturedProduct from '../components/Products/FeaturedProduct'
import HOC from '../components/HOC';
import AllProducts from '../components/Products/AllProducts';
import Contact from '../components/Home/Contact';
const Home = () => {
  return (
    <HOC>
      <FeaturedProduct/>
      <AllProducts num={5} home={true}/>
      <Contact/>
    </HOC>
  )
}

export default Home