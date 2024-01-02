// Checkout.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './CartPage.css';
import { clearCart } from './Action.js';
import CheckoutForm from './CheckoutForm.js';
import Button from 'react-bootstrap/Button';
const URL = process.env.REACT_APP_BACKEND_URL;
const Checkout = ({ cart, setCartVisible }) => {
    const dispatch = useDispatch();
    const [cartProducts, setCartProducts] = useState([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const fetchCartProducts = async () => {
            const products = await Promise.all(cart.map((productId) => fetchProductById(productId)));
            setCartProducts(products.filter((product) => product !== null));
        };

        const fetchProductById = async (productId) => {
            try {
                const response = await axios.get(`${URL}/customer/products/${productId}`);
                return response.data;
            } catch (error) {
                console.error(`Error fetching product with ID ${productId}:`, error.message);
                return null;
            }
        };

        fetchCartProducts();
    }, [cart]);

    useEffect(() => {
        // Calculate total price
        const newTotal = cartProducts.reduce((acc, product) => acc + product.price, 0);
        setTotal(newTotal);
    }, [cartProducts]);

    const handleCheckout = async () => {
        try {
            // Assuming /orders endpoint is correct on your server
            const response = await axios.post(`${URL}/customer/placeorder`, {
                customer: '659051ca99a9466bb2558126', // Replace with the actual customer ID
                customerName: 'Sohaib', // Replace with the actual customer ID
                products: [...cartProducts.map((product) => product.name)],
                price: total,
                sizes: ['M', 'L', 'XL'], // Replace with the actual sizes
                feedback: '',
                rating: 1,
            });
            alert('Your Order has been Placed Successfully');

            // Assuming the server returns the newly created order
            const newOrder = response.data.order;

            // Dispatch action to clear the cart
            dispatch(clearCart());

            // Do any additional actions, such as redirecting to a thank you page
            console.log('Order successful:', newOrder);

            // Clear the cart
            setCartVisible(false);
            window.location.reload();
        } catch (error) {
            console.error('Error processing order:', error);
        }
    };

    return (
        <div className="checkout-container">
            {/* Go Back Button */}
            <Link to="/cart">
                <Button variant="secondary" size="sm">
                    Back
                </Button>
            </Link>
            <h1>Checkout</h1>
            <div className='CartDiv'>
                <div class="row-container">
                    <div class="left-div">
                        {/* <CheckoutForm /> */}
                        {/* Display Total Price */}
                <div className="total-price">
                    <h3>Total: ${total}</h3>
                    <p id='Note'>The Amount will be Deducted from <br></br> Your Given Payment Method</p>
                    <br></br>
                </div>
                <div id='checkoutButton'>
                    <div id='Button-long' className="d-grid gap-2" onClick={handleCheckout}>
                        <Button variant="primary" size="lg">
                            Checkout
                        </Button>
                    </div>
                </div>
                    </div>
                    <div class="right-div">
                        <div className="product-container">
                            <div className="cart-product-list">
                                {cartProducts.map((product) => (
                                    <div key={product._id} className="cart-product-card">
                                        <img src={`data:image/png;base64,${product.img.data}`} alt={product.name} />
                                        <h2>{product.name}</h2>
                                        <p>{product.description}</p>
                                        <p>Price: ${product.price}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    );
};

export default Checkout;