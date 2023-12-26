import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import AdminLogin from './components/AdminLogin';
import BlockSeller from './components/BlockSeller';
import OrderStatus from './components/OrderStatus';
import ProductApproval from './components/ProductApproval';
import BlockCustomer from './components/blockCustomer';
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <Routes>
        <Route path="/login/admin" element={<AdminLogin setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/admin/unapproved-products" element={<ProductApproval />} />
        <Route path="/admin/customers" element={<BlockCustomer />} />
        <Route path="/admin/sellers" element={<BlockSeller />} />
        <Route path="/admin/pending-orders" element={<OrderStatus />} />
      </Routes>
    </Router>
  );
}

export default App;
