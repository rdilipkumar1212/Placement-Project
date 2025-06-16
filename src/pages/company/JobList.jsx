import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  TablePagination,
  TextField,
  Box,
  Chip,
} from '@mui/material';
import CompanyService from '../../service/CompanyService';
import { toast } from 'react-toastify';
import { FaEye, FaCheck, FaTimes } from 'react-icons/fa'; // React Icons for View and Status

const JobList = ({ fetchJobs, data }) => {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedJob, setSelectedJob] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  // Handle search filtering
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(0); // Reset pagination when search is applied
  };

  // Handle view job details
  const handleView = (job) => {
    setSelectedJob(job);
    setOpen(true);
  };

  // Handle toggle active status
  const handleToggleStatus = async (id, isActive) => {
    const action = isActive ? 'De-Active' : 'Active';
    if (window.confirm(`Are you sure you want to ${action} this job?`)) {
      try {
        await CompanyService.jobStatusChangeById(id, {
          status: action,
        });

        toast.success(`Job successfully ${action}d!`);
        fetchJobs();
      } catch (error) {
        console.error(`Error trying to ${action} job:`, error);
      }
    }
  };

  // Handle pagination changes
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Filter jobs based on search
  const filteredJobs = data?.filter((job) =>
    job?.jobTitle?.toLowerCase().includes(search?.toLowerCase())
  );

  // Paginated jobs
  const paginatedJobs = filteredJobs.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <TableContainer component={Paper} sx={{ padding: 2, borderRadius: 2 }}>
      {/* Search Bar */}
      <TextField
        label="Search by Job Title"
        variant="outlined"
        fullWidth
        margin="normal"
        value={search}
        onChange={handleSearchChange}
        sx={{
          marginBottom: 2,
          backgroundColor: '#fff',
          borderRadius: '8px',
          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
          fontFamily: 'Poppins' 
        }}
      />

      <Table>
        <TableHead>
          <TableRow sx={{ backgroundColor: '', color: '#fff' }}>
            <TableCell style={{ fontWeight: 'bold', fontFamily: 'Poppins' }}>
              Job Title
            </TableCell>
            <TableCell style={{ fontWeight: 'bold', fontFamily: 'Poppins' }}>
              Job Type
            </TableCell>
            <TableCell style={{ fontWeight: 'bold', fontFamily: 'Poppins' }}>
              Salary
            </TableCell>
            <TableCell style={{ fontWeight: 'bold', fontFamily: 'Poppins' }}>
              Deadline
            </TableCell>
            <TableCell
              style={{
                fontWeight: 'bold',
                fontFamily: 'Poppins',
                textAlign: 'center',
              }}
            >
              Status
            </TableCell>
            <TableCell style={{ fontWeight: 'bold', fontFamily: 'Poppins' }}>
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {paginatedJobs.map((job) => (
            <TableRow key={job._id}>
              <TableCell>{job.jobTitle}</TableCell>
              <TableCell>{job.type}</TableCell>
              <TableCell>{job.salary}</TableCell>
              <TableCell>{new Date(job.deadline).toLocaleDateString()}</TableCell>
              <TableCell style={{ textAlign: 'center', gap:"10px" }}>
                <Button
                  variant="contained"
                  color={job.status === 'Active' ? 'success' : 'error'}
                  onClick={() =>
                    handleToggleStatus(job._id, job.status === 'Active')
                  }
                  sx={{
                    backgroundColor: job.status === 'Active' ? 'green' : '#f44336',
                    color: '#fff',
                    '&:hover': {
                      backgroundColor: job.status === 'Active' ? '#5e00c3' : '#e53935',
                    },
                  }}
                >
                  {job.status === 'Active' ? <FaCheck /> : <FaTimes />} {job.status === 'Active' ? 'Activated' : 'De-Activated'}
                </Button>
              </TableCell>
              <TableCell>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => handleView(job)}
                  style={{ marginRight: '8px' }}
                >
                  <FaEye /> View
                </Button>
              </TableCell>
            </TableRow>
          ))}
          {!paginatedJobs?.length && (
            <TableRow>
              <TableCell colSpan={6} align="center">
                <Typography variant="h6" color="textSecondary">
                  No jobs posted
                </Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Pagination */}
      <TablePagination
        component="div"
        count={filteredJobs.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
        sx={{ marginTop: 2 }}
      />

      {/* Job Details Popup */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle style={{ fontWeight: 'bold' }}>Job Details</DialogTitle>
        <DialogContent>
          {selectedJob && (
            <div>
              <Typography variant="body1" style={{ marginBottom: '15px' }}>
                <strong>Title:</strong> {selectedJob.jobTitle}
              </Typography>
              <Typography variant="body1" style={{ marginBottom: '15px' }}>
                <strong>Type:</strong> {selectedJob.type}
              </Typography>
              <Typography variant="body1" style={{ marginBottom: '15px' }}>
                <strong>Skills:</strong>
                <Box
                  sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 1,
                    marginTop: 1,
                  }}
                >
                  {selectedJob.skills.map((skill, index) => (
                    <Chip key={index} label={skill} />
                  ))}
                </Box>
              </Typography>
              <Typography variant="body1" style={{ marginBottom: '15px' }}>
                <strong>Description:</strong> {selectedJob.description}
              </Typography>
              <Typography variant="body1" style={{ marginBottom: '15px' }}>
                <strong>Salary:</strong> {selectedJob.salary}
              </Typography>
              <Typography variant="body1" style={{ marginBottom: '15px' }}>
                <strong>Deadline:</strong>{' '}
                {new Date(selectedJob.deadline).toLocaleDateString()}
              </Typography>
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setOpen(false)}
            sx={{
              color: '#6200ea',
              fontWeight: 'bold',
              ':hover': { backgroundColor: '#EDE7F6' },
            }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </TableContainer>
  );
};

export default JobList;
