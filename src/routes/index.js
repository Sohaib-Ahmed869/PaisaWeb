import React from 'react'
import Signin from '../screens/SigninSeller';
import CustomerSignup from '../screens/SignupCustomer';
import CustSignin from '../screens/CustomerSignin';
import Signup from '../screens/Signup';
import AddProduct from '../screens/AddProduct';
import SellerDashboard from '../screens/SellerDashboard';
import EditProduct from '../screens/editProduct';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';


const Routerss = () => {
    return (
        <React.Fragment>
            <Router>
                <Switch>
                    <Route path="/signin/seller" component={Signin} />
                    <Route path="/signin/customer" component={CustSignin} />
                    <Route path="/signup" component={Signup} />
                    <Route path="/customer/signup" component={CustomerSignup} />
                    <Route path="/addproduct" component={AddProduct} />
                    <Route path="/sellerdashboard" component={SellerDashboard} />
                    <Route path="/editProduct" component={EditProduct} />
                    
                    {/* <Route path="/edit-product/:productId" render={(props) => <EditProduct {...props} />} /> */}
                </Switch>
            </Router>
        </React.Fragment>
    )
}

export default Routerss
