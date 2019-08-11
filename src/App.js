import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import PrivateRoute from './components/Route/PrivateRoute'
import store from './redux/'

import Authentication from './components/Authentication/Authentication'
import Dashboard from './components/Layout/Dashboard'

import 'bootstrap/dist/js/bootstrap.min'
import './App.css'

function App () {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path='/' exact component={Authentication} />
          <PrivateRoute path='/dashboard' component={Dashboard} />
          <Route render={() => <><h3 className="text-center">Page Not Found</h3></>} />
        </Switch>
      </Router>
    </Provider>
  )
}

export default App