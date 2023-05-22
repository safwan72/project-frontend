import React from 'react'
import { Route, Routes,Navigate } from "react-router-dom"
import PreAuth from '../../pages/PreAuth'
import Login from '../../pages/Login'
import { PrivateRoute } from './PrivateRoute';
import Home from '../../pages/Home';
import Product from '../../pages/Product';
import { PublicRoute } from './PublicRoute';
import Orders from '../../pages/Orders';
import Category from '../../pages/Category';
import ProductDetail from '../Products/ProductDetail';
import Checkout from '../Orders/Checkout';
import { AdminRoutes } from './AdminRoutes';
import AllUsers from '../Admin/AllUsers';
import AdminProductList from '../Admin/AdminProductList';
import CategoryProducts from '../../pages/CategoryProducts';
const RouteElement = ({isAdmin}) => {
  return (
    <Routes>
          <Route element={<PublicRoute/>}>
    <Route path="app" exact element={<PreAuth />} />
    <Route path="login" exact element={<Login />} />
    </Route>
          <Route element={<AdminRoutes isAdmin={isAdmin}/>}>
    <Route path="allusers"  element={<AllUsers />} />
    <Route path="adminProducts"  element={<AdminProductList />} />
    </Route>
    <Route element={<PrivateRoute/>}>
    <Route path="home" exact element={<Home/>}
/>
    <Route path="product" exact element={<Product/>}
/>
    <Route path="productDetail/:id/" exact element={<ProductDetail/>}
/>
    <Route path="order" exact element={<Orders/>}
/>
    <Route path="checkout" exact element={<Checkout/>}
/>
    <Route path="categories" exact element={<Category/>}
/>
    <Route path="category/:id/" exact element={<CategoryProducts/>}
/>
    </Route>
    <Route path="*" element={<Navigate to="/home" />} />
  </Routes>
  )
}

export default RouteElement