import React, { Fragment, useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import PCRoute from './PCRoute';

// import DashboardScreen from "../screens/DashboardScreen";
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';
// import Warning from '../screens/Warning';

const RootRoutes = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Check
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);
    return (
        <Routes>
            <Route path="/" exact element={isLoggedIn ? <HomeScreen /> : <Navigate to="/login" /> } />
            <Route
                path="/login"
                exact
                element={!isLoggedIn ? <LoginScreen /> : <Navigate to="/" />}
            />
            <Route
                path="/register"
                exact
                element={!isLoggedIn ? <RegisterScreen /> : <Navigate to="/" />}
            />
        </Routes>
    );
};

export default RootRoutes;
