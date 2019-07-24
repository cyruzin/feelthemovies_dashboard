import React, { PureComponent } from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import store from './redux/'
import Authentication from './components/Authentication/Authentication'
import Dashboard from './components/Layout/Dashboard'
import 'bootstrap/dist/js/bootstrap.min'
import './App.css'

class App extends PureComponent {

  render () {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <Route path='/' exact component={Authentication} />
            <Route path='/dashboard' component={Dashboard} />
            <Route render={() => <div><h3>Page Not Found</h3></div>} />
          </Switch>
        </BrowserRouter>
      </Provider>
    )
  }
}

export default App