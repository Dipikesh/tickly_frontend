import React from 'react'
import { BrowserRouter, HashRouter, Switch, Route } from 'react-router-dom'


import Home from './core/Home'
import Login from './user/Login'
import Signup from './user/Signup'
import Dashboard from './user/Dashboard'
import Payment from './user/payment'
import Info from './user/Info'
import PrivateRoutes from './auth/PrivateRoutes'
import GoogleSignInPage from './component/GoogleSignInPage'
import ShortLink from './user/ShortLink'

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path='/' component={ Home } />
                <Route exact path='/login'  component={ Login } />
                <Route exact path='/signup'  component={ Signup } />
                <Route exact path='/payment'  component={ Payment } />
                <Route exact path ='/info'  component = {Info}/>
                <Route exact path = '/create-link'  component = {ShortLink}/>
                <Route exact path = '/google-signup'  component = {GoogleSignInPage}/>
                <PrivateRoutes exact path='/dashboard' component={ Dashboard } />

            </Switch>
    </BrowserRouter>
    
    )
}

export default Routes
