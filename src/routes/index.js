import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import Signin from '../screens/SigninSeller';
import CustomerSignup from '../screens/SignupCustomer';
import CustSignin from '../screens/CustomerSignin';
import Signup from '../screens/Signup';
import AddProduct from '../screens/AddProduct';
import SellerDashboard from '../screens/SellerDashboard';
import EditProduct from '../screens/editProduct';
import AddProduct2 from '../screens/AddProduct2';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from '../Main Screens/home';
import AdminLogin from '../Admin_Components/AdminLogin';
import AdminDashboard from '../Admin_Components/AdminDashboard';
import AdminProfile from '../Admin_Components/AdminProfile';
import BlockSeller from '../Admin_Components/BlockSeller';
import CategoriesPage from '../Admin_Components/Categories';
import OrderStatus from '../Admin_Components/OrderStatus';
import ProductApproval from '../Admin_Components/ProductApproval';
import BlockCustomer from '../Admin_Components/blockCustomer';
import Advertisement from '../SuperAdmin_Components/Adverisement';
import UpdateProfile from '../screens/updateProfile';
// ---------------------------SUPER ADMIN---------------------------------
import AdminManagement from '../SuperAdmin_Components/AdminManagement';
import ViewBlockedAdmin from '../SuperAdmin_Components/ViewBlockedAdmin';
import AdminLanding from '../SuperAdmin_Components/AdminM';
import VoucherLanding from '../SuperAdmin_Components/VoucherManagement';
import App from '../SuperAdmin_Components/AdminLanding';
import SuperAdminLogin from '../SuperAdmin_Components/SuperAdminLogin';
import BlockUnblock from '../SuperAdmin_Components/BlockUnblock';
import SocialMedia from '../SuperAdmin_Components/SocialMedia';

// ---------------------------CUSTOMER---------------------------------
import AddDesign from '../Customer Components/AddDesign';
import Home2 from '../Customer Components/Home';
import CartPage from '../Customer Components/CartPage';
import ProductDetail from '../Customer Components/ProductDetails';
import Checkout from '../Customer Components/Checkout';
import Profile from '../Customer Components/Profile';
import Store from '../Customer Components/Store';
import SellerDesign from '../screens/View';
import { Provider } from 'react-redux';


const Routerss = () => {
    const [cart, setCart] = useState([]);
    const [isCartVisible, setIsCartVisible] = useState(false);

    const updateCart = (newCart) => {
        setCart(newCart);
    };

    return (
        <React.Fragment>
            <Router>
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/signin/seller" component={Signin} />
                    <Route path="/signin/customer" component={CustSignin} />
                    <Route path="/signup" component={Signup} />
                    <Route path="/customer/signup" component={CustomerSignup} />
                    <Route path="/addproduct" component={AddProduct} />
                    <Route path="/addproduct2" component={AddProduct2} />
                    <Route path="/sellerdashboard" component={SellerDashboard} />
                    <Route path="/editProduct" component={EditProduct} />
                    <Route path="/seller/updateProfile" component={UpdateProfile} />
                    <Route path="/seller/view" component={SellerDesign} />
                    {/* ---------------------------CUSTOMER---------------------------------*/}
                    <Route path="/signin/customer" component={CustSignin} />


                    {/* ---------------------------ADMIN---------------------------------*/}
                    <Route path="/signin/admin" component={AdminLogin} />
                    <Route path="/admin/unapproved-products" component={ProductApproval} />
                    <Route path="/admin/customers" component={BlockCustomer} />
                    <Route path="/admin/sellers" component={BlockSeller} />
                    <Route path="/admin/pending-orders" component={OrderStatus} />
                    <Route path="/admin/edit-profile" component={AdminProfile} />
                    <Route path="/admin-dashboard" component={AdminDashboard} />
                    <Route path="/admin/categories" component={CategoriesPage} />

                    {/* ---------------------------SUPER ADMIN---------------------------------*/}
                    <Route path="/signin/superadmin" component={SuperAdminLogin} />
                    <Route path="/superadmin/addAdmin" component={AdminManagement} />
                    <Route path="/superadmin/getBlockedAdmins" component={ViewBlockedAdmin} />
                    <Route path="/superadmin/superAdminLanding" component={App} />
                    <Route path="/superadmin/voucherManagement" component={VoucherLanding} />
                    <Route path="/superadmin/blockUnblock" component={BlockUnblock} />
                    <Route path="/superadmin/addAdvertisement" component={Advertisement} />
                    <Route path="/superadmin/socialMedia" component={SocialMedia} />
                    <Route path="/superadmin/" component={AdminLanding} />


                    {/* ---------------------------CUSTOMER---------------------------------*/}
                    <Provider store={Store}>
                        <Route path="/customer/addDesign" component={AddDesign} />

                        <Route
                            path="/cart"
                            render={(routeProps) => (
                                <CartPage
                                    {...routeProps}
                                    cart={cart}
                                    updateCart={updateCart}
                                    isCartVisible={isCartVisible}
                                    setIsCartVisible={setIsCartVisible}
                                />
                            )}
                        />
                        <Route
                            path='/checkout'
                            render={(routeProps) => (
                                <Checkout cart={cart} setCartVisible={setIsCartVisible} {...routeProps} />
                            )}
                        />
                        <Route path='/profile' render={(routeProps) => <Profile {...routeProps} />} />
                        <Route path='/products/:id' render={(routeProps) => <ProductDetail {...routeProps} />} />

                        <Route
                            path="/customer/"
                            render={(routeProps) => (
                                <Home2
                                    {...routeProps}
                                    cart={cart}
                                    setCart={setCart}
                                    setIsCartVisible={setIsCartVisible}
                                />
                            )}
                        />
                    </Provider>
                </Switch>
            </Router>

        </React.Fragment>
    )
}

export default Routerss
