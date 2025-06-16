import React, { useState } from 'react';
import { IconButton, Avatar, Tooltip, Input } from '@mui/material';
import { Edit } from '@mui/icons-material';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import StudentService from '../../service/StudentService';
import CompanyService from '../../service/CompanyService';
import CollegeService from '../../service/CollegeService';

const ProfileImageUpload = ({ type, imgUrl }) => {
  const [image, setImage] = useState(null);
  const { studentId, companyId, collegeId } = useParams();

  const apiMap = {
    student: {
      service: StudentService.updateStudentImgURL,
      id: studentId,
    },
    company: {
      service: CompanyService.updateCompanyImgURL,
      id: companyId,
    },
    college: {
      service: CollegeService.updateCollegeImgURL,
      id: collegeId,
    },
  };

  // Handle the image selection
  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    const uploadPreset = process.env.REACT_APP_UPLOAD_PRESETS;
    const cloudName = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;

    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result); // Set image preview
      };
      reader.readAsDataURL(file); // Convert the image to base64 format
      let formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', uploadPreset);

      try {
        const { data } = await axios.post(
          `https://api.cloudinary.com/v1_1/${cloudName}/raw/upload`,
          formData,
        );

        const body = {
          imgURL: data.secure_url,
        };

        const { service, id } = apiMap[type];
        if (service && id) {
          await service(id, body);
          toast.success('Profile Image Uploaded Successfully');
        } else {
          throw new Error('Invalid type or missing ID');
        }
      } catch (error) {
        toast.error('Failed to upload profile image. Please try again.');
      }
    } else {
      toast.error('Please upload a valid image file');
    }
  };

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      {/* Profile Image */}
      <Avatar
        src={image || imgUrl} 
        sx={{ width: 100, height: 100, borderRadius: '50%' }}
      />

      <Tooltip title="Edit profile image">
        <IconButton
          color="primary"
          component="label"
          sx={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            transform: 'translate(25%, 25%)',
            backgroundColor: 'white',
          }}
        >
          <input
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={handleImageChange}
          />
          <Edit />
        </IconButton>
      </Tooltip>
    </div>
  );
};

export default ProfileImageUpload;
