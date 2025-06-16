import React from 'react';
import { Card, Typography, Avatar } from '@mui/material';

const CompanyList = ({ companies }) => {

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
                src={company.companyImgUrl}
                alt={company.companyName}
                className="w-16 h-16"
              />
              <div>
                <Typography variant="body1">{company.companyName}</Typography>
                <Typography variant="body2">Mobile: {company.phone}</Typography>
                <Typography variant="body2">
                  Email: {company.emailID}
                </Typography>
                <Typography variant="body2">
                  Location: {company.location}
                </Typography>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default CompanyList;
