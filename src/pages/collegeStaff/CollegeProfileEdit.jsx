import React, { useState, useEffect } from 'react';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { toast } from 'react-toastify';

const CollegeProfileEdit = ({ open, handleClose, collegeData, updateCollegeProfile }) => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        collegeName: '',
        location: '',
        staffID: '',
        staffImgURL: '',
        state: '',
        city: '',
    });

    useEffect(() => {
        if (collegeData) {
            setFormData(collegeData);
        }
    }, [collegeData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async () => {
        try {
            await updateCollegeProfile(formData);
            toast.success('College profile updated successfully!');
            handleClose();
        } catch (error) {
            toast.error('Failed to update profile. Try again.');
        }
    };

    return (
        <Modal open={open} onClose={handleClose}>
            <div className="bg-white w-11/12 max-w-2xl mx-auto mt-20 p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-semibold mb-4">Edit College Profile</h2>
                <div style={{ height: '30rem' }} className="overflow-y-auto p-2">
                    <div className="grid grid-cols-1 gap-4">
                        <TextField
                            label="First Name"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            fullWidth
                        />
                        <TextField
                            label="Last Name"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            fullWidth
                        />
                        <TextField
                            label="College Name"
                            name="collegeName"
                            value={formData.collegeName}
                            onChange={handleChange}
                            fullWidth
                        />
                        <TextField
                            label="Location"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            fullWidth
                        />
                        <TextField
                            label="Staff ID"
                            name="staffID"
                            value={formData.staffID}
                            onChange={handleChange}
                            fullWidth
                        />
                        <TextField
                            label="State"
                            name="state"
                            value={formData.state}
                            onChange={handleChange}
                            fullWidth
                        />
                        <TextField
                            label="City"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            fullWidth
                        />
                    </div>
                    <div className="flex justify-end mt-4">
                        <Button
                            onClick={handleClose}
                            className="mr-2"
                            color="secondary"
                            variant="outlined"
                        >
                            Cancel
                        </Button>
                        <Button onClick={handleSubmit} color="primary" variant="contained">
                            Save
                        </Button>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default CollegeProfileEdit;
