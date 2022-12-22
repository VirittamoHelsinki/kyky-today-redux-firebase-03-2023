import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const UserRoute = ({ children }) => {
  const auth = useSelector((state) => state.user.user);

  return auth ? { ...children } : <Navigate to="/user-log-in" />;
};

export default UserRoute;
