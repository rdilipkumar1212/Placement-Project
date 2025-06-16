import React from 'react';
import { Button, Typography, Divider, Chip, Box } from '@mui/material';
import moment from 'moment';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import VideocamIcon from '@mui/icons-material/Videocam'; // Icon for Interview Mode

const JobDescription = ({ job, onClose, onApply }) => {
  const handleApply = async () => {
    await onApply();
    onClose();
  };

  if (!job) {
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 shadow-lg rounded-xl" sx={{ fontFamily: 'Poppins, sans-serif', backgroundColor: 'transparent' }}>
      {/* Job Title and Company Info */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <div className="mr-4">
            <img src={job.logo} alt="Company Logo" className="w-12 h-12 object-cover rounded-full" />
          </div>
          <div>
            <Typography variant="h5" className="font-semibold" sx={{ color: '#6a1b9a' }}>
              {job.title}
            </Typography>
            <Typography variant="body1" className="text-gray-500">{job.company}</Typography>
          </div>
        </div>
        <div className="flex space-x-4">
          <Button
            variant="contained"
            color="primary"
            sx={{
              backgroundColor: '#6a1b9a',
              '&:hover': {
                backgroundColor: '#4a148c',
              },
            }}
            onClick={handleApply}
          >
            Apply
          </Button>
        </div>
      </div>

      {/* Job Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="flex items-center">
          <CalendarTodayIcon sx={{ color: '#6a1b9a', mr: 1 }} />
          <Typography variant="h6" className="font-semibold">Date Posted:</Typography>
          <Typography variant="body1" className="ml-2">{moment(job.datePosted).format('DD-MMM-YYYY')}</Typography>
        </div>
        <div className="flex items-center">
          <CurrencyRupeeIcon sx={{ color: '#6a1b9a', mr: 1 }} />
          <Typography variant="h6" className="font-semibold">Salary:</Typography>
          <Typography variant="body1" className="ml-2">₹{job.salary}</Typography>
        </div>
        <div className="flex items-center">
          <LocationOnIcon sx={{ color: '#6a1b9a', mr: 1 }} />
          <Typography variant="h6" className="font-semibold">Location:</Typography>
          <Typography variant="body1" className="ml-2">{job.location}</Typography>
        </div>
        <div className="flex items-center">
          <VideocamIcon sx={{ color: '#6a1b9a', mr: 1 }} />
          <Typography variant="h6" className="font-semibold">Interview Mode:</Typography>
          <Typography variant="body1" className="ml-2">{job.interviewMode}</Typography>
        </div>
      </div>

      {/* Skills */}
      <div className="mb-6">
        <Typography variant="h6" className="font-semibold" sx={{ color: '#6a1b9a' }}>Skills</Typography>
        <div className="flex space-x-4 mt-2">
          {/* Skills list */}
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {job.tags.map((skill, index) => (
              <Chip
                key={index}
                label={skill}
                variant="outlined"
                sx={{
                  fontSize: '0.875rem',
                  borderRadius: '16px',
                  padding: '4px 8px',
                  backgroundColor: '#f5f5f5', // Light gray background
                  color: '#6a1b9a', // Purple text
                  borderColor: '#6a1b9a', // Purple border
                }}
              />
            ))}
          </Box>
        </div>
      </div>

      {/* Job Description */}
      <Divider className="my-6" />
      <Typography variant="h6" className="font-semibold mb-2" sx={{ color: '#6a1b9a' }}>
        Job Description
      </Typography>
      <Typography variant="body1" className="mb-6">{job.description}</Typography>
    </div>
  );
};

export default JobDescription;
