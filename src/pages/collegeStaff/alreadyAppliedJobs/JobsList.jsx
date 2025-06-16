import React from 'react';
import { Card, CardContent, Typography, Grid, Avatar, CardMedia } from '@mui/material';

const JobListing = ({ job }) => {
    return (
        <Card variant="outlined" sx={{ margin: 2 }}>
            <CardContent>
                <Grid container spacing={2}>
                    <Grid item xs={3}>
                        <CardMedia
                            component="img"
                            image={job.company?.companyImgUrl}
                            alt={job.company?.companyName}
                            sx={{ maxWidth: '150px' }}
                        />
                    </Grid>
                    <Grid item xs={9}>
                        <Typography variant="h5">{job.jobTitle}</Typography>
                        <Typography variant="body1" color="textSecondary">{job.company.companyName}</Typography>
                        <Typography variant="body2">{job.description}</Typography>
                        <Typography variant="body2"><strong>Location:</strong> {job.location}</Typography>
                        <Typography variant="body2"><strong>Salary:</strong> ₹{job.salary}</Typography>
                        <Typography variant="body2"><strong>Deadline:</strong> {new Date(job.deadline).toLocaleDateString()}</Typography>
                    </Grid>
                </Grid>

                <Grid container spacing={2} sx={{ marginTop: 2 }}>
                    {job.applicants.map((applicant, index) => (
                        <Grid item xs={12} md={6} key={index}>
                            <Card variant="outlined" sx={{ padding: 2 }}>
                                <Grid container spacing={2}>
                                    <Grid item xs={3}>
                                        <Avatar alt={applicant.student.firstName} src={applicant.student.studentImgURL} sx={{ width: 60, height: 60 }} />
                                    </Grid>
                                    <Grid item xs={9}>
                                        <Typography variant="body1">{applicant.student.firstName} {applicant.student.lastName}</Typography>
                                        <Typography variant="body2">Skills: {applicant.student.skills.join(", ")}</Typography>
                                        <Typography variant="body2">Status: {applicant.applicationStatus}</Typography>
                                        {applicant.interviewDetails && (
                                            <Typography variant="body2">
                                                <strong>Interview:</strong> {applicant.interviewDetails.date} at {applicant.interviewDetails.time} ({applicant.interviewDetails.mode})
                                            </Typography>
                                        )}
                                    </Grid>
                                </Grid>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </CardContent>
        </Card>
    );
};

export default JobListing;