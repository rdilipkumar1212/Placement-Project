import React, { useEffect, useState } from 'react';
import { Box, CssBaseline } from '@mui/material';
import './index.css';
import Sidebar from '../../components/header/Sidebar';
import StudentInfoCard from './StudentInfoCard';
import CalendarCard from './CalendarCard';
import StatsCard from './StatsCard';
import { studentNavLinks } from '../../utils/common';
import StudentService from '../../service/StudentService';
import { useParams } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const ProfileDetails = () => {
  const [studentData, setStudentData] = useState();
  const [jobsListData, setJobsListData] = useState([]);
  const { studentId } = useParams();

  const token = localStorage.getItem('token');
  const decodedToken = jwtDecode(token);
  const { firstName, lastName, userType, subTitle, imgUrl } = decodedToken;

  const profileData = {
    imgUrl: imgUrl,
    profileName: firstName + ' ' + lastName,
    role: subTitle,
  };

  useEffect(() => {
    getStudentReport();
  }, []);

  const getStudentReport = async () => {
    const response = await StudentService.getStudentProfileById(studentId);
    const { appliedJobs } =
      await StudentService.getAppliedJobsByStudentId(studentId);
    setStudentData(response);
    setJobsListData(appliedJobs);
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
        <StudentInfoCard
          studentData={studentData}
          getStudentReport={getStudentReport}
        />
        <StatsCard studentData={studentData} appliedJobs={jobsListData} />
        <CalendarCard studentData={studentData} appliedJobs={jobsListData} />
      </Box>
    </Box>
  );
};

export default ProfileDetails;
