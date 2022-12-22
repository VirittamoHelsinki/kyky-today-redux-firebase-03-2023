import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const GuestRoute = ({ children }) => {
  const auth = useSelector((state) => state.user.user);

  return !auth ? { ...children } : <Navigate to="/" />;
};

export default GuestRoute;
