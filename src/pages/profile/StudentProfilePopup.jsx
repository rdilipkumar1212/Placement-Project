import React, { useEffect, useState } from 'react';
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ProfilePage from './Profile';
import StudentService from '../../service/StudentService';
import { useParams } from 'react-router-dom';

const StudentProfilePopup = ({
    onClose,
    studentProfileId,
    fetchStudentsDetails
}) => {
    const [studentData, setStudentData] = useState([]);
    const { studentId } = useParams();


    useEffect(() => {
        getStudentReport();
    }, [studentId, studentProfileId]);

    const getStudentReport = async () => {
        const response = await StudentService.getStudentProfileById(studentId || studentProfileId || 0);
        setStudentData(response);
    };

    const handleClose = () => {
        onClose();
    };

    return (
        <Dialog open={true} onClose={handleClose} fullWidth maxWidth="lg">
            <DialogTitle>
                Edit Student Profile
                {/* Close Button in the Top Right Corner */}
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <ProfilePage
                    studentId={studentId || studentProfileId || 0}
                    studentData={studentData}
                    handleClose={handleClose}
                    getStudentReport={studentId ? getStudentReport : fetchStudentsDetails}
                />
            </DialogContent>
        </Dialog>
    );
};

export default StudentProfilePopup;
