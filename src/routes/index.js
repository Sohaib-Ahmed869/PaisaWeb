import React from 'react'
import Signin from '../screens/SigninSeller';
import Signup from '../screens/Signup';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';


const Routerss = () => {
    return (
        <React.Fragment>
            <Router>
                <Switch>
                    <Route path="/signin" component={Signin} />
                    <Route path="/signup" component={Signup} />
                </Switch>
            </Router>
        </React.Fragment>
    )
}

export default Routerss
