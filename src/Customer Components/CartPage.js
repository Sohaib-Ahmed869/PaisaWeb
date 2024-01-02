// CartPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './CartPage.css';
import Button from 'react-bootstrap/Button';
const URL = process.env.REACT_APP_BACKEND_URL;
const CartPage = ({ cart, setUpdateCart }) => {
    const [cartProducts, setCartProducts] = useState([]);

    const fetchProductById = async (productId) => {
        try {
            const response = await axios.get(`${URL}/customer/products/${productId}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching product with ID ${productId}:`, error.message);
            return null;
        }
    };

    const handleRemoveProduct = (productId) => {
        // Filter out the selected product and update the cart
        const updatedCart = cart.filter((id) => id !== productId);
        if (typeof setUpdateCart === 'function') {
            setUpdateCart(updatedCart);
        } else {
            console.error('updateCart is not a function');
        }
    };

    useEffect(() => {
        const fetchCartProducts = async () => {
            const products = await Promise.all(cart.map((productId) => fetchProductById(productId)));
            setCartProducts(products.filter((product) => product !== null));
        };

        fetchCartProducts();
    }, [cart]);

    // Calculate total price
    const total = cartProducts.reduce((acc, product) => acc + product.price, 0);

    return (
        <div>
            {/* Go Back Button */}
            <Link to="/customer">
                <Button variant="secondary" size="sm">
                    Back
                </Button>
            </Link>
            <h1>Shopping Cart</h1>
            <div className='CartDiv'>
                <div className="cart-product-list">
                    {cartProducts.map((product) => (
                        <div key={product._id} className="cart-product-card">
                            <img src={`data:image/png;base64,${product.img.data}`} alt={product.name} />
                            <h2>{product.name}</h2>
                            <p>{product.description}</p>
                            <p>Price: ${product.price}</p>
                            {/* Delete Button */}
                            <Button variant="secondary" size="sm" onClick={() => handleRemoveProduct(product._id)}>
                                Remove
                            </Button>
                        </div>
                    ))}
                </div>

                {/* Display Total Price */}
                <div className="total-price">
                    <p>Total: ${total}</p>
                </div>

                {/* Checkout Button */}
                <div id="checkoutButton">
                    <Link to="/checkout">
                        <div id='Button-long' className="d-grid gap-2">
                            <Button variant="primary" size="lg">
                                Proceed to Checkout
                            </Button>
                        </div>
                    </Link>
                </div>

            </div>

        </div>
    );
};

export default CartPage;