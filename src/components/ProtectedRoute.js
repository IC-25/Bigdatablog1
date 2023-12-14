import React from "react";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ component: Component, isAuthenticated, userRole, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAuthenticated && userRole === "user" ? (
        <Component {...props} />
      ) : (
        <Redirect to="/" />
      )
    }
  />
);

export default ProtectedRoute;
