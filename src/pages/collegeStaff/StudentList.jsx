import React from 'react';
import { Card, Typography, Button, Avatar } from '@mui/material';

const StudentList = ({ students, onEdit }) => {

  return (
    <Card className="bg-white shadow-md p-6">
      <Typography variant="h6" className="mb-4">
        Student Lists
      </Typography>
      <div className="space-y-4">
        {students?.map((student) => (
          <div
            key={student.id}
            className="flex justify-between items-center p-2 border-b"
          >
            <div>
              <Typography variant="body1">
                {`${student.firstName} ${student.lastName}`}
              </Typography>

              {student.education?.length ? (
                <Typography variant="body2">
                  Department: {student.education[0]?.department} (
                  {`${student.education[0]?.startYear}-${student.education[0]?.endYear}`}
                  )
                </Typography>
              ) : null}

              <Typography variant="body2">Phone: {student.phone}</Typography>
              <Typography variant="body2">Email: {student.emailID}</Typography>
            </div>
            <div className="space-x-2">
              <Button
                variant="outlined"
                color="primary"
                onClick={() => onEdit(student._id)}
              >
                Edit
              </Button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default StudentList;
