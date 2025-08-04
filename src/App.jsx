import React, { useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './admin/routes/AppRoutes'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

const App = () => {

  return <>
    <BrowserRouter>
      <AppRoutes />
      <ToastContainer/>
    </BrowserRouter>

  </>
}

export default App