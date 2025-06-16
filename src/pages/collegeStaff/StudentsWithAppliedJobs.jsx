import React from 'react';
import {
    Card,
    Typography,
    Grid,
    Avatar,
    Box,
    Chip,
    Divider,
} from '@mui/material';

const StudentsWithAppliedJobs = ({ studentsWithJobs }) => {
    return (
        <Box>
            {studentsWithJobs?.length > 0 ? (
                studentsWithJobs?.map(({ student, appliedJobs }) => (
                    <Card
                        key={student._id}
                        sx={{ mb: 3, p: 3, boxShadow: 3, borderRadius: 2 }}
                    >
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                            <Avatar sx={{ mr: 2 }}>{student.name[0]}</Avatar>
                            <Box>
                                <Typography variant="h6">{student.name}</Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {student.email}
                                </Typography>
                            </Box>
                        </Box>
                        <Divider sx={{ mb: 2 }} />
                        {appliedJobs.map((job, index) => (
                            <Box key={index} sx={{ mb: 2 }}>
                                <Typography variant="subtitle1">
                                    {job.jobTitle} - {job.company.companyName}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Location: {job.company.location}
                                </Typography>
                                <Typography variant="body2">
                                    Status: <strong>{job.status}</strong>
                                </Typography>
                                {job.interviewDetails && (
                                    <Typography variant="body2">
                                        Interview Date: {new Date(job.interviewDetails.date).toLocaleDateString()}
                                    </Typography>
                                )}
                                <Box mt={1}>
                                    {job.skills?.map((skill, i) => (
                                        <Chip
                                            key={i}
                                            label={skill}
                                            color="primary"
                                            size="small"
                                            sx={{ mr: 1 }}
                                        />
                                    ))}
                                </Box>
                                <Divider sx={{ mt: 2 }} />
                            </Box>
                        ))}
                    </Card>
                ))
            ) : (
                <Typography variant="body2" color="text.secondary">
                    No applications found.
                </Typography>
            )}
        </Box>
    );
};

export default StudentsWithAppliedJobs;
