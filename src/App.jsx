import React, { useState } from 'react'
import { BrowserRouter, HashRouter } from 'react-router-dom'
import AppRoutes from './admin/routes/AppRoutes'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

const App = () => {

  return <>
    <HashRouter>
      <AppRoutes />
      <ToastContainer/>
    </HashRouter>

  </>
}

export default App