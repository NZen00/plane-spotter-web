import React, { useEffect, useState } from 'react';
import { Container, Table, Button, InputGroup, FormControl } from 'react-bootstrap';
import axios from '../axios';
import AirlineSightingOperations from './AirlineSightingOperations';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSearchParams, useNavigate } from 'react-router-dom';
import '../styles/AirlineSightings.css'

const AirlineSightings = () => {
    const [sightings, setSightings] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [currentSighting, setCurrentSighting] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();

    useEffect(() => {
        fetchSightings();
    }, [searchParams]);

    const fetchSightings = async () => {
        let url = 'AirlineSighting';
        if (searchQuery) {
            url = `${url}/search?query=${searchQuery}`;
        }
        try {
            const response = await axios.get(url);
            setSightings(response.data);
        } catch (error) {
            console.error('Failed to fetch airline sightings:', error);
        }
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleSearchSubmit = (event) => {
        if (event.key === 'Enter') {
            setSearchParams({ query: searchQuery });
        }
    };

    const handleAddClick = () => {
        setCurrentSighting(null);
        setShowModal(true);
    };

    const handleEditClick = (sighting) => {
        setCurrentSighting(sighting);
        setShowModal(true);
    };

    const handleClose = () => {
        setShowModal(false);
        setCurrentSighting(null);
        console.log(currentSighting)
    };

    const handleViewDetails = (sightingId) => {
        navigate(`/AirlineSightings/${sightingId}`);
    };

    const handleDeleteClick = async (sightingId) => {
        if (window.confirm('Are you sure you want to delete this sighting?')) {
            try {
                await axios.delete(`AirlineSighting/${sightingId}`);
                fetchSightings();
            } catch (error) {
                console.error('Failed to delete airline sighting:', error);
            }
        }
    };

    const extractTokenAndUserId = () => {
        const token = localStorage.getItem('user');
        if (token) {
            const decodedToken = JSON.parse(atob(token.split('.')[1]));
            console.log(decodedToken);
            return parseInt(decodedToken.unique_name);
        }
    };

    const handleSubmit = async (data, resetForm) => {
        try {
            if (currentSighting) {
                const updatedData = {
                    ...data,
                    createdDate: data.createdDate.toISOString(),
                    createdUserId: currentSighting.createdUserId,
                    modifiedUserId: extractTokenAndUserId(),
                };
                const modifiedUserId = extractTokenAndUserId();
                console.log(modifiedUserId);
                await axios.put(`AirlineSighting/${currentSighting.id}`, updatedData);
            } else {
                const updatedData = {
                    ...data,
                    createdUserId: extractTokenAndUserId(),
                };
                await axios.post('AirlineSighting', updatedData);
            }
            setShowModal(false);
            resetForm();
            fetchSightings();
        } catch (error) {
            console.error('Failed to save airline sighting:', error);
        }
    };

    return (
        <Container className="mt-5">
            <h2>Airline Sightings</h2>

            <div className="btn-sr-container">
                <InputGroup className="mb-3 search-box">
                    <FormControl
                        placeholder="Search Sightings..."
                        aria-label="Search Sightings"
                        aria-describedby="basic-addon2"
                        value={searchQuery} // Set input value
                        onChange={handleSearchChange}
                        onKeyDown={handleSearchSubmit}
                    />
                </InputGroup>
                <Button variant="primary" className="mb-3 float-end add-button" style={{marginLeft: "auto"}} onClick={handleAddClick}>
                    Add Sighting
                </Button>
            </div>

            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Short Name</th>
                    <th>Airline Code</th>
                    <th>Location</th>
                    <th>Created Date</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {sightings.map((sighting) => (
                    <tr key={sighting.id}>
                        <td>{sighting.name}</td>
                        <td>{sighting.shortName}</td>
                        <td>{sighting.airlineCode}</td>
                        <td>{sighting.location}</td>
                        <td>{new Date(sighting.createdDate).toLocaleString()}</td>
                        <td>
                            <Button variant="outline-info" onClick={() => handleDeleteClick(sighting.id)}>
                                <DeleteIcon />
                            </Button>
                            <Button variant="outline-info" style={{marginLeft: "5px"}} onClick={() => handleEditClick(sighting)}>
                                <EditIcon />
                            </Button>
                            <Button variant="outline-primary" className="ms-2" onClick={() => handleViewDetails(sighting.id)}>
                                Details
                            </Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>

            <AirlineSightingOperations
                showModal={showModal}
                handleClose={handleClose}
                onSubmit={handleSubmit}
                currentSighting={currentSighting}
            />
        </Container>
    );
};

export default AirlineSightings;
