import React, { useEffect, useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  IconButton,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Avatar,
  DialogContentText,
  TextField,
} from '@mui/material';
import { Event, Visibility } from '@mui/icons-material';
import { FaFileDownload } from 'react-icons/fa';
import CompanyService from '../../service/CompanyService';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import AOS styles

const JobApplications = () => {
  const [applications, setApplications] = useState([]);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [statusChangeDialogOpen, setStatusChangeDialogOpen] = useState(false); 
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedApplicationId, setSelectedApplicationId] = useState(null);
  const [scheduleDialogOpen, setScheduleDialogOpen] = useState(false);
  const [scheduleDetails, setScheduleDetails] = useState({
    date: '',
    time: '',
    mode: 'Online',
    meetLinkorLocation: '',
  });
  const { companyId } = useParams();

  useEffect(() => {
    AOS.init(); // Initialize AOS when the component mounts
    const fetchApplications = async () => {
      try {
        const response = await CompanyService.viewApplications(companyId);
        console.log('response', response);
        setApplications(response);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    fetchApplications();
  }, [companyId]);

  // Handle viewing application details
  const handleViewDetails = (application) => {
    setSelectedApplication(application);
    setDialogOpen(true);
  };

  // Handle closing the dialog
  const handleCloseDialog = () => {
    setSelectedApplication(null);
    setDialogOpen(false);
  };

  // Handle status change
  const handleStatusChange = (id, newStatus) => {
    setSelectedStatus(newStatus);
    setSelectedApplicationId(id);
    setStatusChangeDialogOpen(true); // Open the confirmation dialog
  };

  // Confirm the status change
  const confirmStatusChange = async () => {
    const updatedApplications = applications.map((app) =>
      app.id === selectedApplicationId
        ? { ...app, status: selectedStatus }
        : app,
    );
    await CompanyService.updateApplicationStatus(selectedApplicationId, {
      status: selectedStatus,
    });
    setApplications(updatedApplications);
    setStatusChangeDialogOpen(false);
  };

  // Cancel the status change
  const cancelStatusChange = () => {
    setStatusChangeDialogOpen(false);
  };

  const handleOpenScheduleDialog = (application) => {
    setSelectedApplication(application);
    setScheduleDialogOpen(true);
  };

  const handleCloseScheduleDialog = () => {
    setSelectedApplication(null);
    setScheduleDetails({
      date: '',
      time: '',
      mode: 'Online',
      meetLinkorLocation: '',
    });
    setScheduleDialogOpen(false);
  };

  const handleScheduleSubmit = async () => {
    const body = {
      date: scheduleDetails.date,
      time: scheduleDetails.time,
      mode: scheduleDetails.mode,
      meetLinkorLocation: scheduleDetails.meetLinkorLocation,
    };
    await CompanyService.updateScheduleInterview(selectedApplication.id, body);
    handleCloseScheduleDialog();
    toast.success(`Interview scheduled for ${selectedApplication.studentName}`);
  };

  const handleScheduleChange = (e) => {
    const { name, value } = e.target;
    setScheduleDetails((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Box className="p-6">
      <h1 className='text-3xl font-sans mb-4 text-purple-800'>Job Applications</h1>

      <TableContainer component={Paper} className="mb-6 font-sans">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><b className='font-sans text-purple-800 font-semibold'>Profile</b></TableCell>
              <TableCell><b className='font-sans text-purple-800 font-semibold'>Student Name</b></TableCell>
              <TableCell><b className='font-sans text-purple-800 font-semibold'>Position</b></TableCell>
              <TableCell><b className='font-sans text-purple-800 font-semibold'>Email</b></TableCell>
              <TableCell><b className='font-sans text-purple-800 font-semibold'>Phone</b></TableCell>
              <TableCell><b className='font-sans text-purple-800 font-semibold'>Status</b></TableCell>
              <TableCell><b className='font-sans text-purple-800 font-semibold'>Actions</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {applications.map((application) => (
              <TableRow key={application.id} data-aos="fade-up">
                <TableCell>
                  <Avatar src={application.profileImage} alt="Profile" />
                </TableCell>
                <TableCell className='font-sans'>{application.studentName}</TableCell>
                <TableCell className='font-sans'>{application.jobTitle}</TableCell>
                <TableCell className='font-sans'>{application.email}</TableCell>
                <TableCell className='font-sans'>{application.phone}</TableCell>
                <TableCell>
                  <Select
                    value={application.status}
                    onChange={(e) => handleStatusChange(application.id, e.target.value)}
                    variant="outlined"
                    size="small"
                  >
                    <MenuItem value="Pending" className='font-sans'>Pending</MenuItem>
                    <MenuItem value="Shortlisted" className='font-sans'>Shortlisted</MenuItem>
                    <MenuItem value="Selected" className='font-sans'>Selected</MenuItem>
                    <MenuItem value="Rejected" className='font-sans'>Rejected</MenuItem>
                  </Select>
                </TableCell>
                <TableCell>
                  {application.status === 'Shortlisted' && (
                    <IconButton color="primary" onClick={() => handleOpenScheduleDialog(application)}>
                      <Event />
                    </IconButton>
                  )}
                  <IconButton color="primary" onClick={() => handleViewDetails(application)}>
                    <Visibility />
                  </IconButton>
                  <IconButton
                    color="secondary"
                    component="a"
                    href={application.resumeLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaFileDownload />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
            {!applications?.length ? (
              <TableCell className='font-sans'>No job applications</TableCell>
            ) : null}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Details Dialog */}
      {selectedApplication && (
        <Dialog open={dialogOpen} onClose={handleCloseDialog} fullWidth maxWidth="md">
          <DialogTitle>Students List</DialogTitle>
          <DialogContent>
            <Box className="flex items-center mb-4">
              <Avatar src={selectedApplication.profileImage} alt="Profile" className="mr-4" style={{ width: 80, height: 80 }} />
              <Box>
                <Typography variant="h6">{selectedApplication.studentName}</Typography>
                <Typography variant="subtitle1">{selectedApplication.department}</Typography>
                <Typography variant="body2">Email: {selectedApplication.email}</Typography>
                <Typography variant="body2">Phone: {selectedApplication.phone}</Typography>
              </Box>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="primary">Close</Button>
          </DialogActions>
        </Dialog>
      )}

      {/* Status Change Confirmation Dialog */}
      <Dialog open={statusChangeDialogOpen} onClose={cancelStatusChange}>
        <DialogTitle>Confirm Status Change</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to change the status to <b>{selectedStatus}</b>?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelStatusChange} color="primary">Cancel</Button>
          <Button onClick={confirmStatusChange} color="secondary">Confirm</Button>
        </DialogActions>
      </Dialog>

      {/* Schedule Dialog */}
      <Dialog open={scheduleDialogOpen} onClose={handleCloseScheduleDialog} fullWidth maxWidth="sm">
        <DialogTitle>Schedule Interview for {selectedApplication?.studentName}</DialogTitle>
        <DialogContent>
          <TextField
            label="Date"
            type="date"
            value={scheduleDetails.date}
            onChange={handleScheduleChange}
            name="date"
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Time"
            type="time"
            value={scheduleDetails.time}
            onChange={handleScheduleChange}
            name="time"
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />
          <Select
            value={scheduleDetails.mode}
            onChange={handleScheduleChange}
            name="mode"
            fullWidth
            margin="normal"
          >
            <MenuItem value="Online">Online</MenuItem>
            <MenuItem value="Offline">Offline</MenuItem>
          </Select>
          <TextField
            label="Meet Link / Location"
            value={scheduleDetails.meetLinkorLocation}
            onChange={handleScheduleChange}
            name="meetLinkorLocation"
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseScheduleDialog} color="primary">Cancel</Button>
          <Button onClick={handleScheduleSubmit} color="secondary">Schedule</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default JobApplications;
