import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useForm, Controller } from 'react-hook-form';
import { TextField } from '@mui/material';
import { DesktopDateTimePicker } from '@mui/x-date-pickers/DesktopDateTimePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

const AirlineSightingOperations = ({ showModal, handleClose, onSubmit, currentSighting }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
        control,
    } = useForm();

    React.useEffect(() => {
        if (currentSighting) {
            setValue('name', currentSighting.name);
            setValue('shortName', currentSighting.shortName);
            setValue('airlineCode', currentSighting.airlineCode);
            setValue('location', currentSighting.location);
            setValue('createdDate', new Date(currentSighting.createdDate));
        } else {
            reset();
        }
    }, [currentSighting, setValue, reset]);

    const handleFormClose = () => {
        reset();
        handleClose();
    };

    return (
        <Modal show={showModal} onHide={handleFormClose}>
            <Modal.Header closeButton>
                <Modal.Title>{currentSighting ? 'Edit Sighting' : 'Add Sighting'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={handleSubmit((data) => onSubmit(data, reset))}>
                    <div className="mb-3">
                        <TextField
                            label="Name"
                            fullWidth
                            {...register('name', { required: 'Name is required', maxLength: 150 })}
                            error={!!errors.name}
                            helperText={errors.name ? errors.name.message : ''}
                        />
                    </div>
                    <div className="mb-3">
                        <TextField
                            label="Short Name"
                            fullWidth
                            {...register('shortName', {
                                required: 'Short Name is required. Maximum 5 characters',
                                maxLength: 5,
                            })}
                            error={!!errors.shortName}
                            helperText={errors.shortName ? errors.shortName.message : ''}
                        />
                    </div>
                    <div className="mb-3">
                        <TextField
                            label="Airline Code"
                            fullWidth
                            {...register('airlineCode', {
                                required: 'Airline Code is required. Expected format: ABC-1234',
                                pattern: {
                                    value: /^[A-Z]{3}-[A-Z0-9]{4}$/,
                                    message: 'Invalid Airline Code format. Expected format: ABC-1234',
                                },
                            })}
                            error={!!errors.airlineCode}
                            helperText={errors.airlineCode ? errors.airlineCode.message : ''}
                        />
                    </div>
                    <div className="mb-3">
                        <TextField
                            label="Location"
                            fullWidth
                            {...register('location', { required: 'Location is required', maxLength: 200 })}
                            error={!!errors.location}
                            helperText={errors.location ? errors.location.message : ''}
                        />
                    </div>
                    <div className="mb-3">
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <Controller
                                name="createdDate"
                                control={control}
                                defaultValue={currentSighting ? new Date(currentSighting.createdDate) : null}
                                rules={{
                                    required: 'Created Date is required',
                                    validate: {
                                        pastDate: (value) =>
                                            value && value < new Date() || 'Created Date must be a valid datetime in the past',
                                    },
                                }}
                                render={({ field: { onChange, value } }) => (
                                    <DesktopDateTimePicker
                                        label="Created Date"
                                        value={value}
                                        onChange={(date) => onChange(date)}
                                        textField={(params) => (
                                            <TextField
                                                {...params}
                                                fullWidth
                                                error={!!errors.createdDate}
                                                helperText={errors.createdDate ? errors.createdDate.message : ''}
                                            />
                                        )}
                                    />
                                )}
                            />
                        </LocalizationProvider>
                    </div>
                    <Button type="submit" variant="primary" className="me-2">
                        {currentSighting ? 'Update' : 'Add'} Sighting
                    </Button>
                    <Button variant="secondary" onClick={handleFormClose}>
                        Cancel
                    </Button>
                </form>
            </Modal.Body>
        </Modal>
    );
};

export default AirlineSightingOperations;
