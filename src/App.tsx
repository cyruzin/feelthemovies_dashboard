import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import PrivateRoute from "./components/Route/PrivateRoute";
import store from "./redux";

import Authentication from "./components/Authentication/Authentication";
import Dashboard from "./components/Layout/Dashboard";

import ErrorBoundary from "./components/ErrorBoundary";
import NotFound from "./components/NotFound";

import "bootstrap/dist/js/bootstrap.min";
import "./App.css";

function App() {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <Router>
          <Switch>
            <Route path="/" exact component={Authentication} />
            <PrivateRoute path="/dashboard" component={Dashboard} />
            <Route render={() => <NotFound />} />
          </Switch>
        </Router>
      </Provider>
    </ErrorBoundary>
  );
}

export default App;
