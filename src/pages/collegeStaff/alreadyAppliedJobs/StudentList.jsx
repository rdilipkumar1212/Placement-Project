import React from 'react';
import { Card, CardContent, Typography, Grid, Box, Button } from '@mui/material';
import JobCard from './JobCard';

const StudentList = ({ appliedJobs }) => {

    return (
        <Box sx={{ padding: 3 }}>
            <Typography variant="h4" gutterBottom>
                Students and Their Applied Jobs
            </Typography>
            <Grid container spacing={2}>
                {appliedJobs?.map((student) => (
                    <Grid item xs={12} sm={6} md={4} key={student._id}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6">{student.firstName} {student.lastName}</Typography>
                                <Typography variant="body2">State: {student.state}</Typography>
                                <Typography variant="body2">Skills: {student.skills.join(', ')}</Typography>
                                <img src={student.studentImgURL} alt="Student" width="100" />

                                {/* Display applied jobs */}
                                <Box sx={{ marginTop: 2 }}>
                                    <Typography variant="subtitle1" gutterBottom>
                                        Applied Jobs:
                                    </Typography>
                                    {student.applicants.map((applicant, idx) => (
                                        <JobCard key={idx} job={applicant.job} status={applicant.status} />
                                    ))}
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default StudentList;
