import React from 'react';
import { Card, CardContent, Typography, Box, Button } from '@mui/material';

const JobCard = ({ job, status }) => {
  return (
    <Card sx={{ marginBottom: 2 }}>
      <CardContent>
        <Typography variant="body2" color="textSecondary">
          Job Title: {job.jobTitle}
        </Typography>
        <Typography variant="body2">Company: {job.companyName}</Typography>
        <Typography variant="body2">Location: {job.location}</Typography>
        <Typography variant="body2" color="textSecondary">Status: {status}</Typography>

        {/* Conditional Rendering for Status */}
        {status === 'Shortlisted' && (
          <Button variant="outlined" sx={{ marginTop: 2 }}>
            Schedule Interview
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default JobCard;
