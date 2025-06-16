import React, { useEffect, useState } from 'react';
import { Box, CssBaseline, Container, Typography } from '@mui/material';
import { jwtDecode } from 'jwt-decode';
import { collegeNavLinks } from '../../utils/common';
import Sidebar from '../../components/header/Sidebar';
import StudentService from '../../service/StudentService';
import JobListing from './alreadyAppliedJobs/JobsList';

const StudentsAppliedJobsPage = () => {
  const [appliedJobs, setAppliedJobs] = useState([]);

  useEffect(() => {
    fetchAppliedJobs();
  }, []);

  const fetchAppliedJobs = async () => {
    try {
      const response = await StudentService.getStudentsAppliedJobs(0);
      setAppliedJobs(response);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };

  const token = localStorage.getItem('token');
  const decodedToken = jwtDecode(token);
  const { firstName, lastName, subTitle, imgUrl } = decodedToken;

  const profileData = {
    imgUrl: imgUrl,
    profileName: firstName + ' ' + lastName,
    role: subTitle,
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <CssBaseline />
      {/* Sidebar */}
      <Sidebar profile={profileData} sideBarLists={collegeNavLinks} />

      {/* Main Content */}
      <Box
        sx={{
          flex: 1,
          backgroundColor: '#f5f5f5',
          p: 3,
          overflowY: 'auto',
        }}
      >
        <Container sx={{ my: 3 }}>
          <Typography variant="h5" gutterBottom>
            Students Applied Jobs List
          </Typography>
          {appliedJobs?.allAppliedJobs?.map((job, index) => (
            <JobListing key={index} job={job} />
          ))}
        </Container>
      </Box>
    </Box>
  );
};

export default StudentsAppliedJobsPage;
