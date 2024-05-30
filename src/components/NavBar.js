import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';

const NavBar = () => {
    const navigate = useNavigate();
    const user = authService.getCurrentUser();

    const handleLogout = () => {
        authService.logout();
        navigate('/login');
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Plane Spotter
                </Typography>
                {user && (
                    <>
                        <Button color="inherit" onClick={() => navigate('/AirlineSightings')}>
                            Airline Sightings
                        </Button>
                        <Box sx={{ marginLeft: 'auto' }}>
                            <Button color="inherit" onClick={handleLogout}>
                                Logout
                            </Button>
                        </Box>
                    </>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;
