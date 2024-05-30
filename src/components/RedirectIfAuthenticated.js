import React from 'react';
import { Navigate } from 'react-router-dom';
import authService from '../services/authService';

const RedirectIfAuthenticated = ({ children }) => {
    const user = authService.getCurrentUser();

    if (user) {
        return <Navigate to="/AirlineSightings" />;
    }

    return children;
};

export default RedirectIfAuthenticated;
