import React, { useState, useEffect } from 'react';
import { Box, Typography, Avatar, Card, Button, Grid } from '@mui/material';
import { MdLocationOn, MdPhone, MdEmail, MdSchool } from 'react-icons/md'; // React Icons
import StudentProfilePopup from '../profile/StudentProfilePopup';
import { useParams } from 'react-router-dom';
import 'aos/dist/aos.css';
import AOS from 'aos';

const StudentInfoCard = ({ studentData, getStudentReport }) => {
  const [openEditPopup, setOpenEditPopup] = useState(false);
  const [currentStudent, setCurrentStudent] = useState(null);
  const { studentId } = useParams();

  const studentProfileId = studentData?._id || studentId;

  useEffect(() => {
    AOS.init({ duration: 1000 }); // Initialize AOS
  }, []);

  const handleEditProfile = (id) => {
    setOpenEditPopup(true);
  };

  const handleClosePopup = () => {
    setOpenEditPopup(false);
    setCurrentStudent(null);
  };

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        p: 3,
        mb: 3,
        backgroundColor: 'white', // Purple-50 for a light background
        borderRadius: '16px',
        boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
        fontFamily: 'Poppins, sans-serif',
      }}
      data-aos="fade-in" // AOS fading effect
    >
      {/* Edit Button */}
      <Box display="flex" justifyContent="flex-end">
        <Button
          onClick={() => handleEditProfile(1)}
          size="small"
          variant="contained"
          sx={{
            textTransform: 'none',
            backgroundColor: '#6a1b9a', // Purple-800
            color: '#fff',
            fontFamily: 'Poppins, sans-serif',
            '&:hover': {
              backgroundColor: '#4a148c', // Darker purple for hover
            },
          }}
        >
          Edit Profile
        </Button>
      </Box>

      <Grid container spacing={3} alignItems="center">
        {/* Avatar and Basic Info */}
        <Grid item xs={12}>
          <Box display="flex" alignItems="center" gap={2}>
            <Avatar
              sx={{
                width: 80,
                height: 80,
              }}
              src={studentData?.studentImgURL || '/path-to-profile-pic.jpg'}
              alt="Student profile image"
            />
            <Box>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 'bold',
                  color: '#6a1b9a', // Purple-800
                  fontFamily: 'Poppins, sans-serif',
                }}
              >
                {`${studentData?.firstName || ''} ${studentData?.lastName || ''}`}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: '#636363', // Lighter purple
                  fontFamily: 'Poppins, sans-serif',
                }}
              >
                {studentData?.profileHeadLine || ''}
              </Typography>
            </Box>
          </Box>
        </Grid>

        {/* Additional Info */}
        <Grid item xs={12}>
          <Box display="flex" justifyContent="space-between" flexWrap="wrap" gap={2}>
            {/* Location */}
            {studentData?.city && studentData?.state && (
              <Box display="flex" alignItems="center" gap={1}>
                <MdLocationOn color="#4a148c" size={20} />
                <Typography
                  variant="body2"
                  sx={{ fontFamily: 'Poppins, sans-serif', color: '#636363' }}
                >
                  {`${studentData.city}, ${studentData.state}`}
                </Typography>
              </Box>
            )}

            {/* College */}
            {studentData?.collegeName && (
              <Box display="flex" alignItems="center" gap={1}>
                <MdSchool color="#636363" size={20} />
                <Typography
                  variant="body2"
                  sx={{ fontFamily: 'Poppins, sans-serif', color: '#4a148c' }}
                >
                  {studentData.collegeName ||
                    studentData?.education[0]?.collegeName ||
                    ''}
                </Typography>
              </Box>
            )}

            {/* Phone */}
            <Box display="flex" alignItems="center" gap={1}>
              <MdPhone color="#6a1b9a" size={20} />
              <Typography
                variant="body2"
                sx={{ fontFamily: 'Poppins, sans-serif', color: '#636363' }}
              >
                {studentData?.phone || ''}
              </Typography>
            </Box>

            {/* Email */}
            <Box display="flex" alignItems="center" gap={1}>
              <MdEmail color="#6a1b9a" size={20} />
              <Typography
                variant="body2"
                sx={{ fontFamily: 'Poppins, sans-serif', color: '#636363' }}
              >
                {studentData?.emailID || ''}
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>

      {/* Edit Popup */}
      {openEditPopup && (
        <StudentProfilePopup
          onClose={handleClosePopup}
          initialData={currentStudent}
          studentProfileId={studentProfileId}
        />
      )}
    </Card>
  );
};

export default StudentInfoCard;
