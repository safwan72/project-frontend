import React from 'react'
import HOC from '../HOC'
import AllProducts from '../Products/AllProducts'
import toast, { Toaster } from "react-hot-toast";
import AddProduct from './AddProduct';

const AdminProductList = () => {
    const [doreload, setdoreload] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    
const handleOpen=()=>{
    setOpen(!open)
}
const handlereload=()=>{
    setdoreload(!doreload)
}
const handleNotify=(message)=>{
    toast(message)
}
  return (
    <HOC>
            <div className="container px-10 py-16 sm:py-32">
            <AddProduct open={open} handleOpen={handleOpen} handlereload={handlereload} handleNotify={handleNotify}/>
    <Toaster
        position="top-right"
        toastOptions={{
          // Define default options
          className: "",
          duration: 5000,
          style: {
            background: "#FBBF24",
            color: "#fff",
          },
        }}
      />
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl text-center">
Admin All Products</h2>
<button
                type="button"
                onClick={handleOpen}
                className="rounded-md bg-amber-500 px-3 py-2 mt-10 w-full text-sm font-semibold text-white shadow-sm hover:bg-amber-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500"
              >
                Add a new Product
              </button>
<AllProducts num={0} admin={false}/>

            </div>


    </HOC>
  )
}

export default AdminProductList