import React from 'react';
import { Card, Typography, Avatar, Chip } from '@mui/material';

const JobsList = ({ companies }) => {

  return (
    <Card className="bg-white shadow-md p-6">
      <Typography variant="h6" className="mb-4">
        Company Details
      </Typography>
      <div className="space-y-4">
        {companies.map((company) => (
          <div
            key={company.id}
            className="flex justify-between items-center p-2 border-b"
          >
            <div className="flex items-center space-x-4">
              <Avatar
                src={company.logo}
                alt={company.name}
                className="w-16 h-16"
              />
              <div>
                <Typography variant="body1">{company.jobTitle}</Typography>
                <Typography variant="body2">
                  Skills: {company.skills.join(', ')}
                </Typography>
                <Typography variant="body2">
                  Salary: {company.salary}
                </Typography>
                <Typography variant="body2">
                  Positions: {company.positionsAvailable}
                </Typography>
              </div>
            </div>
            <Chip
              label={company.status === 'active' ? 'Active' : 'Inactive'}
              color={company.status === 'active' ? 'success' : 'default'}
            />
          </div>
        ))}
      </div>
    </Card>
  );
};

export default JobsList;
