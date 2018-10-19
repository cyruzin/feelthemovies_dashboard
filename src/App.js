import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import 'bootstrap/dist/js/bootstrap.min'
import './App.css'
import store from './store'
import Login from './components/Auth/Login'
import Dashboard from './components/Layout/Dashboard'

class App extends Component {

  render() {
    return (
      <div>
        <Provider store={store}>
          <BrowserRouter>
            <Switch>
              <Route path='/' exact component={Login} />
              <Route path='/dashboard' component={Dashboard} />
              <Route render={() => <div><h3>Page Not Found</h3></div>} />
            </Switch>
          </BrowserRouter>
        </Provider>
      </div>
    );
  }
}

export default App