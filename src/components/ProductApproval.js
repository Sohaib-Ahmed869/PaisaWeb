import React, { useEffect, useState } from 'react';
const URL = process.env.REACT_APP_BACKEND_URL;
const AdminDashboard = () => {
  const [unapprovedProducts, setUnapprovedProducts] = useState([]);
  const token = localStorage.getItem('token');
  
  useEffect(() => {
    const fetchUnapprovedProducts = async () => {
      try {
        const response = await fetch(`${URL}/admin/unapproved-products`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
        console.log(token);
        console.log(response);
        if (response.ok) {
          const data = await response.json();
          setUnapprovedProducts(data);
        } else {
          console.error('Failed to fetch unapproved products');
          console.log(await response.text());
        }
      } catch (error) {
        console.error('Error fetching unapproved products:', error);
        
      }
    };

    fetchUnapprovedProducts();
  }, []);

  const handleApproveClick = async (productId) => {
    try {
      const response = await fetch(`${URL}/admin/approve-product/${productId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ approval: true }),
      });

      if (response.ok) {
     
        setUnapprovedProducts((prevProducts) =>
          prevProducts.filter((product) => product._id !== productId)
        );
      } else {
        console.error('Failed to approve product');
      }
    } catch (error) {
      console.error('Error approving product:', error);
    }
  };

  return (
    <div>
      <h2>Unapproved Products</h2>
      <ul>
        {unapprovedProducts.map((product) => (
          <li key={product._id}>
            {product.name} - {product.approval ? 'Approved' : 'Not Approved'}
            <button onClick={() => handleApproveClick(product._id)}>
              Approve
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
