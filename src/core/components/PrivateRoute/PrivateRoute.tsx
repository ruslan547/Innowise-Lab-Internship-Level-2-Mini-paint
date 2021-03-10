import React from 'react';
import { Route } from 'react-router-dom';
import { RouteProps } from 'react-router';

export interface PrivateRouteProps {
  component: () => JSX.Element;
}

function PrivateRoute({ component: Component, ...rest }: PrivateRouteProps & RouteProps): JSX.Element {
  return <Route {...rest} render={(props) => <Component {...props} />}></Route>;
}

export default PrivateRoute;
