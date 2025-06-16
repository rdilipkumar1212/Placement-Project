import React, { useEffect, useState } from 'react';
import { Box, CssBaseline, TextField, Typography } from '@mui/material';
import Sidebar from '../../components/header/Sidebar';
import FilterPanel from '../../components/containers/FilterPanel';
import JobCard from '../../components/containers/JobCard'; // Importing JobCard
import { collegeNavLinks, studentNavLinks } from '../../utils/common';
import CompanyService from '../../service/CompanyService';
import StudentService from '../../service/StudentService';
import { useParams } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { toast } from 'react-toastify';
import { FaSearch } from 'react-icons/fa'; // Import React Icon

const JobListPage = () => {
  const [filters, setFilters] = useState({ workMode: '', experience: [0, 20] });
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const { studentId } = useParams();
  const token = localStorage.getItem('token');
  const decodedToken = jwtDecode(token);

  const { firstName, lastName, userType, subTitle, imgUrl } = decodedToken;

  const profileData = {
    imgUrl: imgUrl,
    profileName: firstName + ' ' + lastName,
    role: subTitle,
  };

  // Fetch job data from backend
  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await StudentService.getJobsList(studentId);
      console.log('response', response);
      setJobs(response.jobs);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  // Handle Apply for a job
  const applyForJob = async (jobId) => {
    console.log('jobId', jobId);

    try {
      const body = {
        studentId: studentId, 
      };
      const response = await CompanyService.applyJobByJobId(jobId, body);
      toast.success(response.message);
      fetchJobs();
    } catch (error) {
      console.error('Error applying for job : ', error);
      toast.error('Failed to apply for the job');
    }
  };

  // Filter and search logic
  let filteredJobs = jobs.filter((job) =>
    job?.title?.toLowerCase()?.includes(searchTerm?.toLowerCase()),
  );

  if (filters.workMode) {
    filteredJobs = filteredJobs.filter(
      (job) => job?.location?.toLowerCase() === filters.workMode?.toLowerCase(),
    );
  }
  console.log('filteredJobs - ', filteredJobs);
  console.log('filters - ', filters);

  return (
    <Box sx={{ display: 'flex', height: '100vh', fontFamily: 'Poppins, sans-serif' }}>
      <CssBaseline />
      <Sidebar
        profile={profileData}
        sideBarLists={
          userType === 'college-staff' ? collegeNavLinks : studentNavLinks
        }
      />

      {/* Main Content */}
      <Box
        sx={{
          flex: 1,
          backgroundColor: '#f5f5f5',
          p: 3,
          overflowY: 'auto',
        }}
      >
        {/* Search Bar */}
        <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between' }}>
          <TextField
            label="Search Jobs"
            variant="outlined"
            fullWidth
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderColor: '#6a1b9a', // Purple border color
              },
              '& .MuiInputLabel-root': {
                color: '#6a1b9a', // Purple label color
              },
              '& .MuiInputBase-input': {
                color: '#6a1b9a', // Purple text color
              },
            }}
            InputProps={{
              startAdornment: (
                <FaSearch style={{ color: '#6a1b9a', marginRight: 8 }} />
              ),
            }}
          />
        </Box>

        <div className="container mx-auto p-4 grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Job Listings (Left Section) */}
          <div className="col-span-3">
            {loading ? (
              <Typography style={{ textAlign: 'center' }}>
                Loading jobs...
              </Typography>
            ) : filteredJobs?.length === 0 ? (
              <Typography style={{ textAlign: 'center' }}>
                No jobs found
              </Typography>
            ) : (
              filteredJobs?.length &&
              filteredJobs.map((job, index) => (
                <JobCard
                  key={index}
                  job={{
                    ...job,
                    onApply: () => applyForJob(job._id),
                  }}
                  isCollegeUser={userType === 'college-staff' ? true : false}
                />
              ))
            )}
          </div>

          {/* Filter Panel (Right Section) */}
          <div className="col-span-1">
            <FilterPanel filters={filters} setFilters={setFilters} />
          </div>
        </div>
      </Box>
    </Box>
  );
};

export default JobListPage;
