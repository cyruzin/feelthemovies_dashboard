import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

import { resetAuthentication } from '../../redux/ducks/authentication';

function PrivateRoute({ component: Component, ...rest }) {
  const dispatch = useDispatch();
  const authentication = useSelector((state) => state.authentication);
  const { authorized } = authentication;

  // Checking token expiration time.
  if (authorized) {
    const { exp } = authentication.user;
    if (exp < new Date().getTime() / 1000) {
      dispatch(resetAuthentication());
      return <Redirect to={{ pathname: '/' }} />;
    }
  }

  return (
    <Route
      {...rest}
      render={(props) =>
        authorized ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/', state: { from: props.location } }} />
        )
      }
    />
  );
}

export default PrivateRoute;
