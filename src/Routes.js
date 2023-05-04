import React from 'react'
import { BrowserRouter, HashRouter, Switch, Route } from 'react-router-dom'


import Home from './core/Home'
import Login from './user/Login'
import Signup from './user/Signup'
import Dashboard from './user/Dashboard'
import Payment from './user/payment'
import Info from './user/Info'
import PrivateRoutes from './auth/PrivateRoutes'
import ShortLink from './user/ShortLink'

const Routes = () => {
    return (
        <HashRouter>
            <Switch>
                <Route path='/' exact component={ Home } />
                <Route path='/login' exact component={ Login } />
                <Route path='/signup' exact component={ Signup } />
                <Route path='/payment' exact component={ Payment } />
                <Route path ='/info' exact component = {Info}/>
                <Route path = '/create-link' exact component = {ShortLink}/>

                <PrivateRoutes path='/dashboard' exact component={ Dashboard } />

            </Switch>
        </HashRouter>
    )
}

export default Routes
