import React, { useState } from 'react';
import { Card, CardContent, Typography, Chip, Button } from '@mui/material';
import WorkIcon from '@mui/icons-material/Work';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import VideocamIcon from '@mui/icons-material/Videocam'; // Icon for Interview Mode
import moment from 'moment';
import JobDescriptionPopup from './JobDescriptionPopup';

const JobCard = ({ job, isCollegeUser }) => {
  const [openPopup, setOpenPopup] = useState(false);

  const {
    title,
    company,
    experience,
    salary,
    location,
    description,
    tags,
    datePosted,
    lastDateForApply,
    interviewMode,
    applicationStatus,
    logo,
    onApply,
  } = job;

  return (
    <Card 
      className="rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300 cursor-pointer mb-4"
      sx={{
        backgroundColor: '#fff', // White background for the card
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', // Light shadow
      }}
      data-aos="fade-up"
    >
      <CardContent>
        {/* Header Section */}
        <div className="flex justify-between items-center">
          <div>
            {/* Job Title and Company */}
            <Typography variant="h6" className="font-semibold text-lg" sx={{ color: '#6a1b9a' }}>
              {title}
            </Typography>
            <Typography variant="subtitle1" className="text-gray-600">
              {company}
            </Typography>
          </div>
          {/* Company Logo */}
          {logo && (
            <img
              src={logo}
              alt={`${company} logo`}
              className="w-12 h-12 rounded-full"
            />
          )}
        </div>

        {/* Description */}
        <Typography variant="body2" className="text-gray-700 mt-2">
          {description}
        </Typography>

        {/* Salary */}
        <div className="flex items-center text-gray-500 mt-1">
          <CurrencyRupeeIcon fontSize="small" sx={{ color: '#6a1b9a', mr: 1 }} />
          <span>{salary || '200000'}</span>
        </div>

        {/* Location */}
        <div className="flex items-center text-gray-500 mt-1">
          <LocationOnIcon fontSize="small" sx={{ color: '#6a1b9a', mr: 1 }} />
          <span>{location || 'Chennai'}</span>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-3">
          {tags.map((tag, index) => (
            <Chip
              key={index}
              label={tag}
              size="small"
              sx={{
                backgroundColor: '#e1bee7', // Light purple background for tags
                color: '#6a1b9a', // Purple text
              }}
            />
          ))}
        </div>

        {/* Additional Details */}
        <div className="flex flex-row mt-3 text-gray-500 justify-between">
          {/* Date Posted */}
          <div className="flex items-center">
            <CalendarTodayIcon fontSize="small" sx={{ color: '#6a1b9a', mr: 1 }} />
            <span>Date Posted: {moment(datePosted).format('DD-MMM-YYYY')}</span>
          </div>

          {/* Last Date to Apply */}
          <div className="flex items-center mt-1">
            <AssignmentTurnedInIcon fontSize="small" sx={{ color: '#6a1b9a', mr: 1 }} />
            <span>
              Last Date to Apply:{' '}
              {moment(lastDateForApply).format('DD-MMM-YYYY')}
            </span>
          </div>

          {/* Interview Mode */}
          <div className="flex items-center mt-1">
            <VideocamIcon fontSize="small" sx={{ color: '#6a1b9a', mr: 1 }} /> {/* Interview Icon */}
            <span className="font-medium">Interview Mode:</span>
            <span className="ml-2">{interviewMode || 'Not specified'}</span>
          </div>
        </div>

        {/* Apply Button */}
        {!isCollegeUser && (
          <div className="mt-4">
            <Button
              variant="contained"
              color="primary"
              className="w-full"
              sx={{
                backgroundColor: '#6a1b9a', // Purple background for the button
                '&:hover': {
                  backgroundColor: '#4a148c', // Darker purple on hover
                },
              }}
              disabled={applicationStatus === 'Applied'}
              onClick={() => setOpenPopup(true)}
            >
              {applicationStatus === 'Applied' ? 'Applied' : 'View Job Details'}
            </Button>
          </div>
        )}
      </CardContent>

      {/* Job Description Popup */}
      <JobDescriptionPopup
        open={openPopup}
        onClose={() => setOpenPopup(false)}
        job={job}
        onApply={onApply}
      />
    </Card>
  );
};

export default JobCard;
