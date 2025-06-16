import React from 'react';
import {
  Card,
  Typography,
  Box,
  Avatar,
  Button,
  Chip,
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import VideocamIcon from '@mui/icons-material/Videocam';

const RecentAppliedJobs = ({ appliedJobs }) => {
  const filteredJobs = appliedJobs
    .filter((job) => job.status === 'Shortlisted' || job.status === 'Pending')
    .sort(
      (a, b) =>
        new Date(b.interviewDetails.date || 0) - new Date(a.interviewDetails.date || 0),
    );

  return (
    <Card sx={{ p: 3, boxShadow: 4, borderRadius: 3, mb: 3, backgroundColor: 'transparent' }}>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3, fontFamily: 'Poppins' }}>
        Here's a list of your recent job applications.
      </Typography>
      <Box>
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => (
            <Card
              key={job.jobTitle}
              sx={{
                mb: 2,
                p: 2,
                display: 'flex',
                alignItems: 'center',
                boxShadow: 1,
                borderRadius: 2,
                backgroundColor: '#f5f5f5',
              }}
            >
              <Avatar
                src={job.company.companyImgUrl}
                alt={job.company.companyName}
                sx={{ width: 56, height: 56, mr: 2 }}
              />
              <Box flexGrow={1}>
                <Typography variant="h6" sx={{ color: '#6a1b9a' }}>
                  {job.jobTitle}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {job.company.companyName} - {job.location}
                </Typography>
                <Box mt={1}>
                  {job.skills.map((skill) => (
                    <Chip
                      key={skill}
                      label={skill}
                      size="small"
                      variant="outlined"
                      sx={{
                        mr: 1,
                        mb: 1,
                        borderColor: '#6a1b9a',  // Purple border
                        color: '#6a1b9a',  // Purple text
                        backgroundColor: 'transparent', // Transparent background
                      }}
                    />
                  ))}
                </Box>
              </Box>
              <Box>
                <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#6a1b9a' }}>
                  Status: {job.status}
                </Typography>
                {job.interviewDetails.date ? (
                  <>
                    <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center' }}>
                      <CalendarTodayIcon sx={{ color: '#6a1b9a', mr: 1 }} />
                      Interview Date:{' '}
                      {new Date(job.interviewDetails.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </Typography>
                    <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center' }}>
                      <VideocamIcon sx={{ color: '#6a1b9a', mr: 1 }} />
                      Mode: {job.interviewDetails.mode}
                    </Typography>
                    {job.interviewDetails.mode === 'Online' && (
                      <Button
                        href={job.interviewDetails.meetLinkorLocation}
                        target="_blank"
                        rel="noopener noreferrer"
                        color="primary"
                        variant="contained"
                        size="small"
                        sx={{ mt: 1, backgroundColor: '#6a1b9a' }}
                      >
                        Join Meeting
                      </Button>
                    )}
                    {(job.interviewDetails.mode === 'Offline' ||
                      job.interviewDetails.mode === 'College') && (
                        <Typography variant="body2" sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
                          <LocationOnIcon sx={{ color: '#6a1b9a', mr: 1 }} />
                          Location: {job.interviewDetails.meetLinkorLocation}
                        </Typography>
                      )}
                  </>
                ) : (
                  <Typography variant="body2" color="text.secondary">
                    Interview Details Pending
                  </Typography>
                )}
              </Box>
            </Card>
          ))
        ) : (
          <Typography variant="body2" color="text.secondary">
            No recent applications found.
          </Typography>
        )}
      </Box>
    </Card>
  );
};

export default RecentAppliedJobs;
