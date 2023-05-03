import React from 'react'
import { BrowserRouter, HashRouter, Switch, Route } from 'react-router-dom'


import Home from './core/Home'
import Login from './user/Login'
import Signup from './user/Signup'
import Dashboard from './user/Dashboard'
import Payment from './user/Payment'
import Info from './user/Info'
import PrivateRoutes from './auth/PrivateRoutes'

const Routes = () => {
    return (
        <HashRouter>
            <Switch>
                <Route path='/' exact component={ Home } />
                <Route path='/login' exact component={ Login } />
                <Route path='/signup' exact component={ Signup } />
                <Route path='/payment' exact component={ Payment } />
                <Route path ='/info' exact component = {Info}/>

                <PrivateRoutes path='/dashboard' exact component={ Dashboard } />

            </Switch>
        </HashRouter>
    )
}

export default Routes
