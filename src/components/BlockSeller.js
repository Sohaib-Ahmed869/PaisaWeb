import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';

const URL = process.env.REACT_APP_BACKEND_URL;

const BlockSeller = () => {
  const [sellers, setSellers] = useState([]);

  useEffect(() => {
    const fetchSellers = async () => {
      try {
        const response = await fetch(`${URL}/admin/all-sellers`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setSellers(data);
        } else {
          console.error('Failed to fetch sellers');
        }
      } catch (error) {
        console.error('Error fetching sellers:', error);
      }
    };

    fetchSellers();
  }, []);

  const handleBlockStatusChange = async (sellerId, newBlockStatus) => {
    try {
      const response = await fetch(`${URL}/admin/seller-block-status/${sellerId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ block: newBlockStatus }),
      });

      if (response.ok) {
        // Update the local state to reflect the change
        setSellers((prevSellers) =>
          prevSellers.map((seller) =>
            seller._id === sellerId ? { ...seller, block: newBlockStatus } : seller
          )
        );
      } else {
        console.error('Failed to update seller block status');
      }
    } catch (error) {
      console.error('Error updating seller block status:', error);
    }
  };

  return (
    <div>
      <h2>Seller List</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th >Email</th>
            <th style={{width:'120px'}}>Status</th>
            <th style={{width:'150px'}}>Action</th>
          </tr>
        </thead>
        <tbody>
          {sellers.map((seller) => (
            <tr key={seller._id}>
              <td>{seller.name}</td>
              <td>{seller.email}</td>
              <td style={{ color: seller.block ? 'red' : 'green' ,fontWeight:'bolder', paddingTop:'12px'}}>{seller.block ? 'Blocked' : 'Not Blocked'}</td>
              <td>
                <Button
                  variant={seller.block ? 'primary' : 'primary'}
                  onClick={() => handleBlockStatusChange(seller._id, !seller.block)}
                >
                  {seller.block ? 'Unblock' : 'Block'}
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default BlockSeller;
