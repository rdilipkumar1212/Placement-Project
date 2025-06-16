import React, { useEffect, useState } from 'react';
import { Box, CssBaseline } from '@mui/material';
import Sidebar from '../../components/header/Sidebar';
import CollegeStaffProfile from './Profile';
import { collegeNavLinks } from '../../utils/common';
import CollegeService from '../../service/CollegeService';
import { useParams } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const CollegeStaffPage = () => {
    const [collegeData, setCollegeData] = useState();
    const [recentPlacementData, setRecentPlacementData] = useState();
    const [collegeChartData, setCollegeChartData] = useState();

    const { collegeId } = useParams();
    const token = localStorage.getItem('token');
    const decodedToken = jwtDecode(token);
    const { firstName, lastName, subTitle, imgUrl } = decodedToken;

    const profileData = {
        imgUrl: imgUrl,
        profileName: firstName + ' ' + lastName,
        role: subTitle,
    };

    useEffect(() => {
        getCollegeDetails();
    }, [])
    
    const getCollegeDetails = async () => {
        const result = await CollegeService.getCollegeDetails(collegeId)
        const chartData = await CollegeService.getCollegeSummaryDetails(collegeId)
        const overview = await CollegeService.getApplicationOverview(collegeId)
        const recentPlacement = await CollegeService.getRecentPlacements(collegeId)

        setCollegeChartData({ departmentChartData: chartData, overview: overview })
        setCollegeData(result.data)
        setRecentPlacementData(recentPlacement)
    }

    return (
        <Box sx={{ display: 'flex', height: '100vh' }}>
            <CssBaseline />
            {/* Sidebar */}
            <Sidebar profile={profileData} sideBarLists={collegeNavLinks} />
            {/* Main Content */}
            <Box
                sx={{ flex: 1, backgroundColor: '#f5f5f5', p: 3, overflowY: 'auto' }}
            >
                <CollegeStaffProfile recentPlacementData={recentPlacementData} setCollegeData={setCollegeData} collegeData={collegeData} collegeChartData={collegeChartData} />
            </Box>
        </Box>
    );
};

export default CollegeStaffPage;
