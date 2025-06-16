import React, { useEffect, useState } from 'react';
import { Box, CssBaseline } from '@mui/material';
import Sidebar from '../../components/header/Sidebar';
import CompanyList from './CompanyList';
import { collegeNavLinks } from '../../utils/common';
import CollegeService from '../../service/CollegeService';
import { jwtDecode } from 'jwt-decode';

const CompanyDetailPage = () => {
    const [companiesList, setCompaniesList] = useState([]);
    const token = localStorage.getItem('token');
    const decodedToken = jwtDecode(token);
    const { firstName, lastName, subTitle, imgUrl } = decodedToken;

    const profileData = {
        imgUrl: imgUrl,
        profileName: firstName + ' ' + lastName,
        role: subTitle,
    };

    useEffect(() => {
        fetchCompaniesList();
    }, []);

    const fetchCompaniesList = async () => {
        try {
            const response = await CollegeService.getCompaniesList();
            setCompaniesList(response.companiesList);
        } catch (error) {
            console.error('Error fetching companies lists:', error);
        }
    };

    return (
        <Box sx={{ display: 'flex', height: '100vh' }}>
            <CssBaseline />
            {/* Sidebar */}
            <Sidebar profile={profileData} sideBarLists={collegeNavLinks} />

            {/* Main Content */}
            <Box sx={{ flex: 1, backgroundColor: '#f5f5f5', p: 3, overflowY: 'auto' }} >
                <CompanyList companies={companiesList} />
            </Box>
        </Box>
    );
};

export default CompanyDetailPage;
