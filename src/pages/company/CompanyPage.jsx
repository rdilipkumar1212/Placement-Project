import React from 'react';
import { Box, CssBaseline } from '@mui/material';
import Sidebar from '../../components/header/Sidebar';
import { jwtDecode } from 'jwt-decode';
import CompanyDashboard from './Dashboard';
import { useParams } from 'react-router-dom';
import { companyNavLinks } from '../../utils/common';

const CompanyPage = () => {
  const { companyId } = useParams();
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
      <Sidebar profile={profileData} sideBarLists={companyNavLinks} />
      {/* Main Content */}
      <Box
        sx={{ flex: 1, backgroundColor: '#f5f5f5', p: 3, overflowY: 'auto' }}
      >
        <CompanyDashboard companyId={companyId} />
      </Box>
    </Box>
  );
};

export default CompanyPage;
