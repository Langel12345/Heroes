import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AutContext } from '../auth/authContext';

export const PublicRoute = ({ children }) => {
    const {user}=  useContext(AutContext); // obtenemos el esado del usuario
  return user.logged 
  ? <Navigate to='/marvel' /> // si esta utenticado lo regresa a marvel
  : children // si no a login
};
