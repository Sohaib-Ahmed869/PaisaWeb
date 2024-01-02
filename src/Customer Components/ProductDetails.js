// ProductDetail.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const URL = process.env.REACT_APP_BACKEND_URL;
const ProductDetail = ({ match }) => {
  const [product, setProduct] = useState(null);
  console.log(match);

  useEffect(() => {
    console.log('Product ID:', match.params.id);
  
    const fetchProduct = async () => {
      try {
          const response = await axios.get(`${URL}/products/${match.params.id}`);
          setProduct(response.data);
      } catch (error) {
          console.error('Error fetching product details:', error.message);
      }
  };
  
    fetchProduct();
  }, [match.params.id]);
  

  if (!product) {
    return <p>Loading...</p>;
  }

  return (
    <div>
        <h1>Heading</h1>
      <h2>{product.name}</h2>
      <p>Description: {product.description}</p>
      <p>Price: ${product.price}</p>
      {/* Add more details as needed */}
    </div>
  );
};

export default ProductDetail;
