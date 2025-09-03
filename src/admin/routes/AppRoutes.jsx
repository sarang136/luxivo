import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AdminLayout from '../AdminLayout';
import DashboardCards from '../pages/Dashboard';
import UserManagement from '../pages/UserManagement';
import UserDetails from '../pages/UserDetails';
import AddBanner from '../pages/AddBanner';
import Transactions from '../pages/Transactions';
import Categories from '../pages/Categories';
import LoginPage from '../pages/LoginPage';
import Orders from '../pages/Orders';
import TotalUsers from '../pages/TotalUsers';
import TotalProducts from '../pages/TotalProducts';
import OrderDetails from '../pages/OrderDetails';
import ProductDetails from '../pages/ProductDetails';
import AddProduct from '../pages/AddProduct';
import CategoryImages from '../pages/CategoryImages';
import PrivateRoutes from '../../protected/PrivateRoutes';
import Coupens from '../pages/Coupens';

const AppRoutes = () => {
  return (
    <Routes>
      
      <Route path="/LoginPage" element={<LoginPage />} />


      <Route path="/" element={<PrivateRoutes />}>
        <Route index element={<DashboardCards />} />
        <Route path="manage-users" element={<UserManagement />} />
        <Route path="categories" element={<Categories />} />
        <Route path="/user-details/:id" element={<UserDetails />} />
        <Route path="orders" element={<Orders />} />
        <Route path="transactions" element={<Transactions />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="add-banner" element={<AddBanner />} />
        <Route path="total-users" element={<TotalUsers />} />
        <Route path="total-products" element={<TotalProducts />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/orders/product-details" element={<OrderDetails/>} />
        <Route path="/category-images" element={<CategoryImages/>} />
        <Route path="/get-coupens" element={<Coupens/>} />

      </Route>
    </Routes>
  );
};

export default AppRoutes;
