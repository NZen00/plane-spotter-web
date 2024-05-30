import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import AirlineSightings from './components/AirlineSightings';
import ProtectedRoute from './components/ProtectedRoute';
import AirlineSightingDetails from './components/AirlineSightingDetails';
import NavBar from './components/NavBar';
import RedirectIfAuthenticated from './components/RedirectIfAuthenticated';

function App() {
    return (
        <Router>
            <div>
                <NavBar />
                <Routes>
                    <Route
                        path="/login"
                        element={
                            <RedirectIfAuthenticated>
                                <Login />
                            </RedirectIfAuthenticated>
                        }
                    />
                    <Route
                        path="/register"
                        element={
                            <RedirectIfAuthenticated>
                                <Register />
                            </RedirectIfAuthenticated>
                        }
                    />
                    <Route
                        path="/AirlineSightings"
                        element={
                            <ProtectedRoute>
                                <AirlineSightings />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/AirlineSightings/:sightingId"
                        element={<AirlineSightingDetails />}
                    />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
