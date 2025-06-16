import React, { useState, useEffect } from 'react';
import { Box, Typography, Card, Button, Grid, useTheme } from '@mui/material';
import CollegeDashboard from './Dashboard';
import CollegeProfileEdit from './CollegeProfileEdit';
import { useParams } from 'react-router-dom';
import CollegeService from '../../service/CollegeService';
import ProfileImageUpload from '../../components/inputField/ProfileImageUpload';
import { FaEdit } from 'react-icons/fa';
import AOS from 'aos';
import 'aos/dist/aos.css';

const CollegeStaffProfile = ({
  recentPlacementData,
  setCollegeData,
  collegeData,
  collegeChartData,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { collegeId } = useParams();
  const theme = useTheme(); // Access theme object

  useEffect(() => {
    AOS.init({ duration: 1000 }); // Initialize AOS
  }, []);

  const updateCollegeProfile = async (updatedData) => {
    const updatedProfile = await CollegeService.updateCollegeProfile(collegeId, updatedData);
    setCollegeData({ ...collegeData, collegeDetails: updatedProfile.data });
  };

  return (
    <>
      <Card
        sx={{
          display: 'flex',
          flexDirection: 'column',
          p: 3,
          mb: 3,
          backgroundColor: theme.palette.background.paper,
          borderRadius: '16px',
          boxShadow: 3,
        }}
        data-aos="fade-up" // Adding AOS animation
      >
        {/* Edit Button */}
        <Box display="flex" justifyContent="flex-end">
          <Button
            onClick={() => setIsModalOpen(true)}
            size="small"
            variant="text"
            sx={{
              textTransform: 'none',
              color: theme.palette.primary.main, // Using theme's primary color
            }}
          >
            <FaEdit style={{ marginRight: '8px' }} /> Edit Profile
          </Button>
        </Box>

        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12}>
            <Box display="flex" alignItems="center" gap={2}>
              <div className="flex-shrink-0">
                <ProfileImageUpload
                  type="college"
                  imgUrl={collegeData?.collegeDetails?.staffImgURL}
                />
              </div>
              <Box>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 'bold',
                    fontFamily: 'Poppins, sans-serif', // Applying Poppins font
                    color: theme.palette.text.primary,
                  }}
                >
                  {collegeData?.collegeDetails?.firstName +
                    ' ' +
                    collegeData?.collegeDetails.lastName}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {collegeData?.collegeDetails?.collegeName || ''}
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Card>

      <CollegeDashboard
        recentPlacementData={recentPlacementData}
        collegeChartData={collegeChartData}
        collegeData={collegeData}
      />

      <CollegeProfileEdit
        open={isModalOpen}
        handleClose={() => setIsModalOpen(false)}
        collegeData={collegeData?.collegeDetails}
        updateCollegeProfile={updateCollegeProfile}
      />
    </>
  );
};

export default CollegeStaffProfile;
