import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const UserRoute = ({ children }) => {
  const _user = useSelector((state) => state.user);

  return _user.uid ? { ...children } : <Navigate to="/user-log-in" />;
};

export default UserRoute;
