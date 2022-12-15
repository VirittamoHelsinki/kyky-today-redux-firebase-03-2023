import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Route } from 'react-router-dom';

const UserRoute = ({ path, exact, children }) => {
  const auth = useSelector((state) => state.user.uid);

  return auth ? (
    <Route path={path} exact={exact}>
      {children}
    </Route>
  ) : (
    <Navigate to="/" />
  );
};

export default UserRoute;
