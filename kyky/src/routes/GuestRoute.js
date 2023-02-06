import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const GuestRoute = ({ children }) => {
  const _user = useSelector((state) => state.user);

  return !_user.uid ? { ...children } : <Navigate to="/" />;
};

GuestRoute.propTypes = {
  children: PropTypes.node.isRequired
};

export default GuestRoute;
