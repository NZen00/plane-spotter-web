import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../axios';
import { Card, CardContent, Typography, Button } from '@mui/material';
import '../styles/AirlineSightingDetails.css';

const AirlineSightingDetails = () => {
    const { sightingId } = useParams();
    const [sighting, setSighting] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSightingDetails = async () => {
            try {
                const response = await axios.get(`AirlineSighting/${sightingId}`);
                setSighting(response.data);
            } catch (error) {
                console.error('Failed to fetch airline sighting details:', error);
            }
        };

        fetchSightingDetails();
    }, [sightingId]);

    const handleBack = () => {
        navigate('/AirlineSightings');
    };

    return (
        <div className="details-container">
            {sighting ? (
                <Card className="details-card">
                    <CardContent>
                        <Typography variant="h5" component="div" gutterBottom>
                            Airline Sighting Details
                        </Typography>
                        <Typography variant="body1">Name: {sighting.name}</Typography>
                        <Typography variant="body1">Short Name: {sighting.shortName}</Typography>
                        <Typography variant="body1">Airline Code: {sighting.airlineCode}</Typography>
                        <Typography variant="body1">Location: {sighting.location}</Typography>
                        <Typography variant="body1">Created Date: {new Date(sighting.createdDate).toLocaleString()}</Typography>
                    </CardContent>
                    <CardContent>
                        <Button variant="contained" color="primary" onClick={handleBack}>
                            Back to Sightings
                        </Button>
                    </CardContent>
                </Card>
            ) : (
                <Typography variant="h5" component="div">
                    Loading Sighting Details...
                </Typography>
            )}
        </div>
    );
};

export default AirlineSightingDetails;
