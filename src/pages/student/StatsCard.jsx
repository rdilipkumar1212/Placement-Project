import React, { useEffect } from 'react';
import { Card, Box, Typography, Grid } from '@mui/material';
import { FaRegThumbsUp, FaClipboardCheck, FaBriefcase } from 'react-icons/fa';
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import AOS styles

const StatsCard = ({ appliedJobs = [] }) => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true, // Animation only triggers once
    });
  }, []);

  // Safely ensure appliedJobs is an array
  const totalCompaniesApplied = Array.isArray(appliedJobs)
    ? appliedJobs.length
    : 0;
  const resumeShortlisted = Array.isArray(appliedJobs)
    ? appliedJobs.filter((job) => job.status === 'Shortlisted').length
    : 0;
  const totalCompaniesSelected = Array.isArray(appliedJobs)
    ? appliedJobs.filter((job) => job.status === 'Selected').length
    : 0;

  const stats = [
    { title: 'Total Companies Applied', value: totalCompaniesApplied, icon: <FaBriefcase size={24} /> },
    { title: 'Resume Shortlisted', value: resumeShortlisted, icon: <FaRegThumbsUp size={24} /> },
    { title: 'Total Companies Selected', value: totalCompaniesSelected, icon: <FaClipboardCheck size={24} /> },
  ];

  return (
    <Card
      sx={{
        p: 3,
        boxShadow: 3,
        borderRadius: 2,
        backgroundColor: '#ffffff',
        maxWidth: '100%',
        mb: 3,
        fontFamily: 'Poppins, sans-serif', // Poppins font
      }}
    >
      <Typography variant="h6" gutterBottom sx={{ color: '#6a1b9a', fontFamily: 'Poppins', fontWeight: 'bold' }}>
        Application Summary
      </Typography>
      <Grid container spacing={3}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={4} key={index} data-aos="fade-up">
            <Box
              sx={{
                backgroundColor: '#ffffff', // White background
                borderRadius: 2,
                textAlign: 'center',
                fontFamily: 'Poppins',
                p: 3,
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                border: '1px solid transparent', // Initially transparent border
                transition: 'transform 0.3s ease, box-shadow 0.3s ease, border 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.05)',
                  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
                  border: '1px solid #6a1b9a', // Purple border on hover
                },
              }}
            >
              {/* Icon and Title (Flexbox row) */}
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mb: 2,
                }}
              >
                <Box sx={{ color: '#6a1b9a' }}> {/* Icon Color Change */}
                  {stat.icon}
                </Box>
                <Typography
                  variant="body2"
                  sx={{
                    fontSize: '16px', // Adjusted font size
                    color: '#6a1b9a',
                    fontWeight: 'normal', // Set font weight to normal (not bold)
                    ml: 1, // Margin left between icon and title
                    fontFamily: 'Poppins',
                  }}
                >
                  {stat.title}
                </Typography>
              </Box>

              {/* Value */}
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 'bold',
                  color: '#6a1b9a',
                  fontFamily: 'Poppins',
                  marginTop: '10px', // Add spacing between title and value
                }}
              >
                {stat.value}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Card>
  );
};

export default StatsCard;
