import React, { useState, useEffect } from 'react';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { toast } from 'react-toastify';

const CompanyProfileEdit = ({
  open,
  handleClose,
  companyData,
  updateCompanyProfile,
}) => {
  const [formData, setFormData] = useState({
    companyName: '',
    companyImgUrl: '',
    industry: '',
    location: '',
    totalEmployees: '',
    hrName: '',
    companyPhoneNumber: '',
    companyDescription: '',
  });

  useEffect(() => {
    if (companyData) {
      setFormData(companyData);
    }
  }, [companyData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      await updateCompanyProfile(formData);
      toast.success('Profile updated successfully!');
      handleClose();
    } catch (error) {
      toast.error('Failed to update profile. Try again.');
    }
  };
  console.log('companyData', companyData);

  return (
    <Modal open={open} onClose={handleClose}>
      <div className="bg-white w-11/12 max-w-2xl mx-auto mt-20 p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Edit Company Profile</h2>
        <div style={{ height: '30rem' }} className="overflow-y-auto p-2">
          <div className="grid grid-cols-1 gap-4">
            <TextField
              label="Company Name"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Industry"
              name="industry"
              value={formData.industry}
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
              label="Total Employees"
              name="totalEmployees"
              type="number"
              value={formData.totalEmployees}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="HR Name"
              name="hrName"
              value={formData.hrName}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Company Phone Number"
              name="companyPhoneNumber"
              value={formData.companyPhoneNumber}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Company Description"
              name="companyDescription"
              value={formData.companyDescription}
              onChange={handleChange}
              multiline
              rows={4}
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

export default CompanyProfileEdit;
