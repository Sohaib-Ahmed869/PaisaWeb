import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import AdminDashboard from './components/AdminDashboard';
import AdminLogin from './components/AdminLogin';
import AdminProfile from './components/AdminProfile';
import BlockSeller from './components/BlockSeller';
import CategoriesPage from './components/Categories';
import CustomerHeader from './components/CustomerHeader';
import OrderStatus from './components/OrderStatus';
import ProductApproval from './components/ProductApproval';
import BlockCustomer from './components/blockCustomer';
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    
    <Router>
      <CustomerHeader/>
      <Routes>
        <Route path="/login/admin" element={<AdminLogin setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/admin/unapproved-products" element={<ProductApproval />} />
        <Route path="/admin/customers" element={<BlockCustomer />} />
        <Route path="/admin/sellers" element={<BlockSeller />} />
        <Route path="/admin/pending-orders" element={<OrderStatus />} />
        <Route path="/admin/edit-profile" element={<AdminProfile />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/admin/categories" element={<CategoriesPage />} />
      </Routes>
    </Router>
  );
}

export default App;
