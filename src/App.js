import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import ReduxThunk from 'redux-thunk'
import reducers from './store/reducer'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import 'bootstrap/dist/js/bootstrap.min'
import './App.css'
import { loadState, saveState } from './util/helpers'
import Login from './components/Auth/Login'
import Dashboard from './components/Layout/Dashboard'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const persistedState = loadState();
const store = createStore(reducers, persistedState, composeEnhancers(applyMiddleware(ReduxThunk)))

store.subscribe(() => saveState({ auth: store.getState().auth }))

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