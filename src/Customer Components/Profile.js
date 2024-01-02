// Import necessary dependencies
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Profile.css';
import ProfileEmail from './ProfileEmail.js';
import Button from 'react-bootstrap/Button';

const URL = process.env.REACT_APP_BACKEND_URL;
const Profile = () => {
    // State to store customer profile information
    const [customerProfile, setCustomerProfile] = useState({});
    const [newEmail, setNewEmail] = useState('');
    const [confirmEmail, setConfirmEmail] = useState('');
    const [updateError, setUpdateError] = useState(null);

    const customerId = '6589c1fa434bc81f79302f9b'; // Replace with the actual customer ID

    useEffect(() => {
        // Fetch customer profile information from the server
        const fetchCustomerProfile = async () => {
            try {
                const response = await axios.get(`${URL}/customers/${customerId}`);
                setCustomerProfile(response.data);
            } catch (error) {
                console.error('Error fetching customer profile:', error);
            }
        };

        fetchCustomerProfile(); // Call the fetch function
    }, [customerId]); // Dependency array ensures the effect runs only once on mount

    const handleEmailChange = (e) => {
        setNewEmail(e.target.value);
    };

    const handleConfirmEmailChange = (e) => {
        setConfirmEmail(e.target.value);
    };

    const handleUpdateEmail = async (e) => {
        e.preventDefault();
        console.log('New Email:', newEmail);
        console.log('Confirm Email:', confirmEmail);

        if (newEmail !== confirmEmail) {
            setUpdateError('Emails do not match');
            return;
        }

        try {
            const response = await axios.patch(`http://localhost:3000/customers/${customerId}`, { email: newEmail });
            console.log('Update Email Response:', response.data);
            // Update the local state with the updated customer data
            setCustomerProfile(response.data);
            // Reset the new email state
            setNewEmail('');
            setConfirmEmail('');
            setUpdateError(null);
        } catch (error) {
            console.error('Error updating email:', error);
            setUpdateError('Error updating email');
        }
    };

    return (
        <div className="checkout-container">
            {/* Go Back Button */}
            <Link to="/">
                <Button variant="secondary" size="sm">
                    Back
                </Button>
            </Link>
            <h1>Profile Update</h1>
            <div class="row-container">
                <div className="left-div">
                    <ProfileEmail
                        newEmail={newEmail}
                        confirmEmail={confirmEmail}
                        updateError={updateError}
                        onEmailChange={handleEmailChange}
                        onConfirmEmailChange={handleConfirmEmailChange}
                        onUpdateEmail={handleUpdateEmail}
                    />
                </div>
                <div className="right-div">
                    <div>
                        <h3>Profile Info</h3>
                        <p>Name: {customerProfile.name}</p>
                        <p>Email: {customerProfile.email}</p>
                        <p>DOB: {customerProfile.dob}</p>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Profile;
