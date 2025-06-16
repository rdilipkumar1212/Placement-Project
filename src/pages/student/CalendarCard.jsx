import React, { useState } from 'react';
import {
  Box,
  Card,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Link,
} from '@mui/material';
import Calendar from 'react-calendar';
import { FaRegCalendarAlt, FaExternalLinkAlt } from 'react-icons/fa';
import 'react-calendar/dist/Calendar.css';

const CalendarCard = ({ appliedJobs }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [open, setOpen] = useState(false);

  const interviewDates = appliedJobs
    .filter((job) => job.interviewDetails && job.interviewDetails.date)
    .map((job) => ({
      date: job.interviewDetails.date,
      details: job,
    }));

  const handleDateClick = (date) => {
    const selectedInterview = interviewDates.find(
      (item) => item.date === date.toISOString().split('T')[0]
    );
    if (selectedInterview) {
      setSelectedDate(selectedInterview.details);
      setOpen(true);
    }
  };

  const handleViewApplication = (application) => {
    setSelectedDate(application);
    setOpen(true);
  };

  const formatSelectedDate = (date) =>
    new Date(date).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

  return (
    <Card
      sx={{
        p: 3,
        boxShadow: 4,
        borderRadius: 3,
        mb: 3,
        backgroundColor: '#fff', // White background
        fontFamily: 'Poppins, sans-serif',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          mb: 2,
        }}
      >
        <FaRegCalendarAlt
          style={{
            fontSize: '24px',
            color: '#6a1b9a',
            marginRight: '8px',
          }}
        />
        <Typography
          variant="h5"
          sx={{
            fontWeight: 'bold',
            color: '#6a1b9a',
            fontFamily: 'Poppins'
          }}
        >
          Upcoming Interviews
        </Typography>
      </Box>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3, fontFamily: 'Poppins' }}>
        Click on a highlighted date or view recent applications for details.
      </Typography>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-10">
        {/* Calendar Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <Calendar
            onClickDay={handleDateClick}
            tileClassName={({ date }) => {
              const isoDate = date.toISOString().split('T')[0];
              return interviewDates.some((item) => item.date === isoDate)
                ? 'highlight'
                : '';
            }}
          />
        </div>

        {/* Recent Applications Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <Typography
            variant="h6"
            sx={{ mb: 2, fontWeight: 'bold', color: '#6a1b9a', fontFamily: 'Poppins' }}
          >
            Recent Applications
          </Typography>
          <ul className="space-y-4">
            {appliedJobs?.map((application) => (
              <li
                key={application?.id}
                className="flex justify-between bg-gray-50 p-4 rounded-md shadow-sm"
              >
                <Box>
                  <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                    {application?.jobTitle}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Company: {application?.company?.companyName}
                  </Typography>
                </Box>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => handleViewApplication(application)}
                  sx={{
                    borderColor: '#6a1b9a',
                    color: '#6a1b9a',
                    fontFamily: 'Poppins, sans-serif',
                    '&:hover': {
                      backgroundColor: '#6a1b9a',
                      color: '#fff',
                    },
                  }}
                >
                  View
                </Button>
              </li>
            ))}
            {!appliedJobs?.length && <p>No recent applications</p>}
          </ul>
        </div>
      </div>

      {/* Dialog */}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ fontWeight: 'bold', color: '#6a1b9a', fontFamily: 'Poppins' }}>
          Interview Details
        </DialogTitle>
        <DialogContent sx={{ fontFamily: 'Poppins, sans-serif' }}>
          {selectedDate ? (
            <>
              <Typography variant="body1" sx={{ mb: 2 }}>
                <strong>Job Title:</strong> {selectedDate.jobTitle}
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                <strong>Company:</strong> {selectedDate.company.companyName}
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                <strong>Location:</strong> {selectedDate.company.location}
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                <strong>Salary:</strong> {selectedDate.salary}
              </Typography>

              {selectedDate.interviewDetails.date && (
                <Typography variant="body1" sx={{ mb: 2 }}>
                  <strong>Interview Date:</strong>{' '}
                  {formatSelectedDate(selectedDate.interviewDetails.date)}
                </Typography>
              )}

              {selectedDate.interviewDetails.time && (
                <Typography variant="body1" sx={{ mb: 2 }}>
                  <strong>Time:</strong> {selectedDate.interviewDetails.time}
                </Typography>
              )}

              {selectedDate.interviewDetails.mode && (
                <Typography variant="body1" sx={{ mb: 2 }}>
                  <strong>Mode:</strong> {selectedDate.interviewDetails.mode}
                </Typography>
              )}

              {selectedDate.interviewDetails.mode?.toLowerCase() ===
                'online' && (
                <Typography variant="body1" sx={{ mb: 2 }}>
                  <strong>Meet Link:</strong>{' '}
                  <Link
                    href={selectedDate.interviewDetails.meetLinkorLocation}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      color: '#6a1b9a',
                      fontWeight: 'bold',
                      textDecoration: 'none',
                      '&:hover': { textDecoration: 'underline' },
                    }}
                  >
                    Join Meeting <FaExternalLinkAlt style={{ marginLeft: 4 }} />
                  </Link>
                </Typography>
              )}

              {['offline', 'college'].includes(
                selectedDate.interviewDetails.mode
              ) && (
                <Typography variant="body1" sx={{ mb: 2 }}>
                  <strong>Location:</strong>{' '}
                  {selectedDate.interviewDetails.meetLinkorLocation}
                </Typography>
              )}
            </>
          ) : (
            <Typography>No details available for this date.</Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setOpen(false)}
            sx={{
              backgroundColor: '#6a1b9a',
              color: '#fff',
              fontFamily: 'Poppins, sans-serif',
              '&:hover': { backgroundColor: '#4a148c' },
            }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Inline Styles */}
      <style>
        {`
          .react-calendar {
            padding: 10px !important;
            background-color: #f9f9f9 !important;
            border: 1px solid #ddd !important;
            margin: 4px !important;
            border-radius: 8px !important;
            font-family: 'Poppins', sans-serif;
          }
          .highlight {
            background-color: #6a1b9a !important;
            color: white !important;
            border-radius: 50% !important;
            font-weight: bold !important;
          }
        `}
      </style>
    </Card>
  );
};

export default CalendarCard;
