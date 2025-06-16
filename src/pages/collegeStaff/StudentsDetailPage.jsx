import React, { useEffect, useState } from 'react';
import { Box, CssBaseline } from '@mui/material';
import Sidebar from '../../components/header/Sidebar';
import StudentList from './StudentList';
import StudentProfilePopup from '../profile/StudentProfilePopup';
import { collegeNavLinks } from '../../utils/common';
import CollegeService from '../../service/CollegeService';
import { jwtDecode } from 'jwt-decode';

const CollegeStaffPage = () => {
    const [studentList, setStudentList] = useState();
    const [openEditPopup, setOpenEditPopup] = useState(false);
    const [currentStudent, setCurrentStudent] = useState(null);
    const token = localStorage.getItem('token');
    const decodedToken = jwtDecode(token);
    const { firstName, lastName, subTitle, imgUrl } = decodedToken;

    const profileData = {
        imgUrl: imgUrl,
        profileName: firstName + ' ' + lastName,
        role: subTitle,
    };

    useEffect(() => {
        fetchStudentsDetails();
    }, []);

    const fetchStudentsDetails = async () => {
        try {
            const response = await CollegeService.getStudentsList();

            setStudentList(response.studentsList);
        } catch (error) {
            console.error('Error fetching jobs:', error);
        }
    };

    // Handle Edit Student
    const handleEditStudent = (id) => {
        const studentToEdit = studentList.find((student) => student._id === id);
        setCurrentStudent(studentToEdit);
        setOpenEditPopup(true); // Open the popup
    };

    // Handle close popup
    const handleClosePopup = () => {
        setOpenEditPopup(false);
        setCurrentStudent(null);
    };

    return (
        <Box sx={{ display: 'flex', height: '100vh' }}>
            <CssBaseline />
            {/* Sidebar */}
            <Sidebar profile={profileData} sideBarLists={collegeNavLinks} />

            {/* Main Content */}
            <Box
                sx={{ flex: 1, backgroundColor: '#f5f5f5', p: 3, overflowY: 'auto' }}
            >
                <StudentList
                    students={studentList}
                    onEdit={handleEditStudent}
                />

                {/* Edit Popup */}
                {openEditPopup && (
                    <StudentProfilePopup
                        onClose={handleClosePopup}
                        initialData={currentStudent}
                        studentProfileId={currentStudent?._id}
                        fetchStudentsDetails={fetchStudentsDetails}
                    />
                )}
            </Box>
        </Box>
    );
};

export default CollegeStaffPage;
