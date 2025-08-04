import React from 'react'
import AdminLayout from '../admin/AdminLayout';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoutes = () => {
    const token = localStorage.getItem('token');
    if(!token){
        return <Navigate to="/LoginPage" replace />
    }
  return (
  <AdminLayout>
    <Outlet/>
  </AdminLayout>
  )
}

export default PrivateRoutes
