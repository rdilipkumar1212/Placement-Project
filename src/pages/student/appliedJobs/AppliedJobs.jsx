import React, { useEffect, useState } from 'react';
import { Box, CssBaseline, Container, Typography } from '@mui/material';
import Sidebar from '../../../components/header/Sidebar';
import { studentNavLinks } from '../../../utils/common';
import { useParams } from 'react-router-dom';
import StudentService from '../../../service/StudentService';
import { jwtDecode } from 'jwt-decode';
import RecentAppliedJobs from '../RecentAppliedJobs';

const AppliedJobsPage = () => {
  const { studentId } = useParams();
  const [appliedJobs, setAppliedJobs] = useState([]);

  // Fetch job data from backend
  useEffect(() => {
    fetchAppliedJobs();
  }, []);

  const fetchAppliedJobs = async () => {
    try {
      const response = await StudentService.getAppliedJobsByStudentId(studentId);

      setAppliedJobs(response.appliedJobs);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };

  const token = localStorage.getItem('token');
  const decodedToken = jwtDecode(token);
  const { firstName, lastName, userType, subTitle, imgUrl } = decodedToken;

  const profileData = {
    imgUrl: imgUrl,
    profileName: firstName + ' ' + lastName,
    role: subTitle,
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <CssBaseline />
      {/* Sidebar */}
      <Sidebar profile={profileData} sideBarLists={studentNavLinks} />
      {/* Main Content */}
      <Box
        sx={{
          flex: 1,
          backgroundColor: '#f5f5f5',
          p: 3,
          overflowY: 'auto',
        }}
      >
        {/* Recently Applied Jobs Section */}
        <Container sx={{ my: 3 }}>
          <Typography variant="h5" gutterBottom>
            Recently Applied Jobs
          </Typography>
          <RecentAppliedJobs appliedJobs={appliedJobs} />
        </Container>
      </Box>
    </Box>
  );
};

export default AppliedJobsPage;
