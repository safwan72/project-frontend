import React from 'react'
import Navbar from './Navbar/Navbar'
import Footer from './Footer/Footer'
const HOC = ({children}) => {
  return (
<>
<Navbar/>
<div className='container px-5 mx-auto'>
{children}
</div>
<Footer/>
</>
    )
}

export default HOC