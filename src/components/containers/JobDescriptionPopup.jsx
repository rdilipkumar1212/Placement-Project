import React from 'react';
import { Dialog, DialogContent } from '@mui/material';
import JobDescription from './JobDescription';

const JobDescriptionPopup = ({ open, onClose, job, onApply }) => {

    if (!job) {
        return null;
    }

    return (
        <>
            <Dialog open={open} onClose={onClose} fullWidth maxWidth="md" >

                <DialogContent className="space-y-4 p-6  rounded-b-xl" style={{ background: "#f2f1f1" }}>
                    <JobDescription job={job} onApply={onApply} onClose={onClose} />
                </DialogContent>
            </Dialog>
        </>
    );
};

export default JobDescriptionPopup;
