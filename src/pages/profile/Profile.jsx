import React, { useEffect, useState } from 'react';
import {
  TextField,
  MenuItem,
  Button,
  Stepper,
  Step,
  StepLabel,
  Card,
  Typography,
  Box,
  Grid,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  Select,
  FormHelperText,
} from '@mui/material';
import { FaLinkedin, FaGithub } from 'react-icons/fa';
import { CloudUpload } from '@mui/icons-material';
import ProfileImageUpload from '../../components/inputField/ProfileImageUpload';
import { toast } from 'react-toastify';
import axios from 'axios';
import StudentService from '../../service/StudentService';

const ProfilePage = ({
  studentId,
  studentData,
  handleClose,
  getStudentReport,
}) => {
  const [activeStep, setActiveStep] = useState(0);
  const [resumeFile, setResumeFile] = useState(null);
  const [educationDialogOpen, setEducationDialogOpen] = useState(false);
  const [projectDialogOpen, setProjectDialogOpen] = useState(false);
  const [newEducation, setNewEducation] = useState({
    educationType: '',
    collegeName: '',
    department: '',
    specialization: '',
    startYear: '',
    endYear: '',
  });
  const [newProject, setNewProject] = useState({
    projectTitle: '',
    projectDescription: '',
    projectSkills: '',
    projectLink: '',
  });
  const [formData, setFormData] = useState({
    displayName: studentData?.firstName + ' ' + studentData?.lastName || '',
    profileHeadLine: studentData?.profileHeadLine || '',
    gender: studentData?.gender || 'Male',
    state: studentData?.state || '',
    city: studentData?.city || '',
    phoneNumber: studentData?.phone || '',
    technicalSkills: studentData?.skills || [],
    newSkill: '',
    linkedIn: studentData?.socialProfile?.LinkedInUrl || '',
    github: studentData?.socialProfile?.GithubUrl || '',
    education: studentData?.education || [],
    projects: studentData?.projects || [],
  });

  useEffect(() => {

    setFormData({
      displayName: studentData?.firstName + ' ' + studentData?.lastName || '',
      profileHeadLine: studentData?.profileHeadLine || '',
      gender: studentData?.gender || 'Male',
      state: studentData?.state || '',
      city: studentData?.city || '',
      phoneNumber: studentData?.phone || '',
      technicalSkills: studentData?.skills || [],
      linkedIn: studentData?.socialProfile?.LinkedInUrl || '',
      github: studentData?.socialProfile?.GithubUrl || '',
      education: studentData?.education || [],
      projects: studentData?.projects || [],
    });

    setNewEducation(studentData?.education || []);
    setNewProject(studentData?.projects || []);
    setResumeFile({
      name: studentData?.firstName + ' ' + studentData?.lastName + ' Uploaded',
      resumeURL: studentData.resumeURL,
    });
  }, [studentData]);

  const steps = ['Basic Details', 'Education Details', 'Project Details'];

  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep((prevStep) => prevStep + 1);
    }
  };

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep((prevStep) => prevStep - 1);
    }
  };

  const handleSubmit = async () => {
    const body = {
      firstName: formData.displayName?.split(' ')[0] || '',
      lastName: formData.displayName?.split(' ')[1] || '',
      phone: formData.phoneNumber,
      profileHeadLine: formData.profileHeadLine,
      gender: formData.gender,
      state: formData.state,
      city: formData.city,
      skills: formData.technicalSkills,
      socialProfile: {
        LinkedInUrl: formData.linkedIn,
        GithubUrl: formData.github,
      },
      education: formData.education,
      projects: formData.projects,
    };

    try {
      const response = await StudentService.updateStudentProfile(
        studentId,
        body,
      );

      getStudentReport();
      handleClose();
      toast.success('Profile updated successfully');
    } catch (error) {
      toast.failure('Profile updated failure');
    }
  };

  const handleSkillAdd = () => {
    if (
      formData.newSkill &&
      !formData.technicalSkills.includes(formData.newSkill)
    ) {
      setFormData((prevData) => ({
        ...prevData,
        technicalSkills: [...prevData.technicalSkills, prevData.newSkill],
        newSkill: '',
      }));
    }
  };

  const handleEducationDialogClose = () => {
    setEducationDialogOpen(false);
    setNewEducation({
      educationType: '',
      collegeName: '',
      department: '',
      specialization: '',
      startYear: '',
      endYear: '',
    });
  };

  const handleEducationAdd = () => {
    setFormData((prevData) => ({
      ...prevData,
      education: [...prevData.education, newEducation],
    }));
    handleEducationDialogClose();
  };

  const handleProjectDialogClose = () => {
    setProjectDialogOpen(false);
    setNewProject({
      projectTitle: '',
      projectDescription: '',
      projectSkills: '',
      projectLink: '',
    });
  };

  const handleProjectAdd = () => {
    setFormData((prevData) => ({
      ...prevData,
      projects: [...prevData.projects, newProject],
    }));
    handleProjectDialogClose();
  };

  const isEducationValid =
    newEducation.educationType &&
    newEducation.collegeName &&
    newEducation.startYear &&
    newEducation.endYear;
  const isProjectValid =
    newProject.projectTitle &&
    newProject.projectDescription &&
    newProject.projectSkills;

  const handleResumeUpload = async (event) => {
    const file = event.target.files[0];
    const uploadPreset = process.env.REACT_APP_UPLOAD_PRESETS;
    const cloudName = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;


    if (file && file.type === 'application/pdf') {
      let formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', uploadPreset);
      formData.append('resource_type', 'auto');

      try {
        const { data } = await axios.post(
          `https://api.cloudinary.com/v1_1/${cloudName}/raw/upload`,
          formData,
        );

        const body = {
          resumeURL: data.secure_url,
        };

        const response = await StudentService.updateStudentResumeURL(
          studentId,
          body,
        );

        setResumeFile(file);
        toast.success('Resume Uploaded Successfully');
      } catch (error) {
        console.error('Error uploading resume:', error);
        toast.error('Failed to upload resume. Please try again.');
      }
    } else {
      toast.error('Please upload a valid PDF file');
    }
  };

  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Box mt={4}>
        {activeStep === 0 && (
          <Grid container spacing={4}>
            {/* Left Card */}
            <Grid item xs={12} md={4}>
              <Card sx={{ padding: 2 }}>
                <ProfileImageUpload
                  type="student"
                  imgUrl={studentData.studentImgURL}
                />
                <Typography variant="h6">Profile Details</Typography>
                <TextField
                  label="Display Name"
                  fullWidth
                  margin="normal"
                  value={formData.displayName}
                  onChange={(e) =>
                    setFormData({ ...formData, displayName: e.target.value })
                  }
                  required
                />
                <TextField
                  label="Profile Headline"
                  fullWidth
                  margin="normal"
                  value={formData.profileHeadLine}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      profileHeadLine: e.target.value,
                    })
                  }
                />
                <TextField
                  select
                  label="Gender"
                  fullWidth
                  margin="normal"
                  value={formData.gender}
                  onChange={(e) =>
                    setFormData({ ...formData, gender: e.target.value })
                  }
                >
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </TextField>
                <TextField
                  label="State"
                  fullWidth
                  margin="normal"
                  value={formData.state}
                  onChange={(e) =>
                    setFormData({ ...formData, state: e.target.value })
                  }
                />
                <TextField
                  label="City"
                  fullWidth
                  margin="normal"
                  value={formData.city}
                  onChange={(e) =>
                    setFormData({ ...formData, city: e.target.value })
                  }
                />
                <TextField
                  label="Phone Number"
                  fullWidth
                  margin="normal"
                  value={formData.phoneNumber}
                  onChange={(e) =>
                    setFormData({ ...formData, phoneNumber: e.target.value })
                  }
                />
              </Card>
            </Grid>

            {/* Right Card */}
            <Grid item xs={12} md={8}>
              <Card sx={{ padding: 2 }}>
                <h3>Resume Upload</h3>
                {resumeFile ? (
                  <div>
                    <p>{resumeFile.name}</p>
                  </div>
                ) : (
                  <div
                    style={{
                      width: '100%',
                      height: '200px',
                      backgroundColor: '#f0f0f0',
                      borderRadius: '8px',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <p>No Resume Uploaded</p>
                  </div>
                )}
                <input
                  accept="application/pdf"
                  type="file"
                  id="resume-upload"
                  style={{ display: 'none' }}
                  onChange={handleResumeUpload}
                />
                <label htmlFor="resume-upload">
                  <Button
                    variant="contained"
                    component="span"
                    sx={{ marginTop: '10px' }}
                    startIcon={<CloudUpload />}
                  >
                    Upload Resume
                  </Button>
                </label>

                <Typography variant="h6">Technical Skills</Typography>
                <Box
                  sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 1,
                    marginTop: 1,
                  }}
                >
                  {formData.technicalSkills.map((skill, index) => (
                    <Chip key={index} label={skill} />
                  ))}
                </Box>
                <Box mt={2} display="flex" gap={1}>
                  <TextField
                    label="Add Skill"
                    fullWidth
                    value={formData.newSkill}
                    onChange={(e) =>
                      setFormData({ ...formData, newSkill: e.target.value })
                    }
                  />
                  <Button variant="contained" onClick={handleSkillAdd}>
                    Add
                  </Button>
                </Box>

                <Box mt={4}>
                  <Typography variant="h6">Social Profiles</Typography>
                  <TextField
                    label="LinkedIn Profile"
                    fullWidth
                    margin="normal"
                    value={formData.linkedIn}
                    onChange={(e) =>
                      setFormData({ ...formData, linkedIn: e.target.value })
                    }
                    InputProps={{
                      startAdornment: (
                        <FaLinkedin
                          style={{ marginRight: 8, color: '#0077b5' }}
                        />
                      ),
                    }}
                  />
                  <TextField
                    label="GitHub Profile"
                    fullWidth
                    margin="normal"
                    value={formData.github}
                    onChange={(e) =>
                      setFormData({ ...formData, github: e.target.value })
                    }
                    InputProps={{
                      startAdornment: (
                        <FaGithub style={{ marginRight: 8, color: '#333' }} />
                      ),
                    }}
                  />
                </Box>
              </Card>
            </Grid>
          </Grid>
        )}
      </Box>

      {/* Education Section */}

      {activeStep === 1 && (
        <Card sx={{ padding: 4 }}>
          <Typography variant="h6" mt={4}>
            Education
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setEducationDialogOpen(true)}
          >
            Add Education
          </Button>
          <Box mt={2}>
            {formData.education.map((education, index) => (
              <Card key={index} sx={{ padding: 2, marginTop: 2 }}>
                <Typography>
                  {education.educationType} - {education.collegeName}
                </Typography>
                <Typography>
                  {education.department} - {education.specialization}
                </Typography>
                <Typography>
                  {education.startYear} - {education.endYear}
                </Typography>
              </Card>
            ))}
          </Box>
        </Card>
      )}

      {/* Projects Section */}
      {activeStep === 2 && (
        <Card sx={{ padding: 4 }}>
          <Typography variant="h6" mt={4}>
            Projects
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setProjectDialogOpen(true)}
          >
            Add Project
          </Button>
          <Box mt={2}>
            {formData.projects.map((project, index) => (
              <Card key={index} sx={{ padding: 2, marginTop: 2 }}>
                <Typography>{project.projectTitle}</Typography>
                <Typography>{project.projectDescription}</Typography>
                <Typography>{project.projectSkills}</Typography>
                <Typography>
                  <a
                    href={project.projectLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Project Link
                  </a>
                </Typography>
              </Card>
            ))}
          </Box>
        </Card>
      )}

      <Box mt={4} display="flex" justifyContent="space-between">
        <Button
          variant="outlined"
          onClick={handleBack}
          disabled={activeStep === 0}
        >
          Back
        </Button>

        {activeStep === steps.length - 1 ? (
          <Button variant="contained" onClick={handleSubmit}>
            Finish
          </Button>
        ) : (
          <Button variant="contained" onClick={handleNext}>
            Next
          </Button>
        )}
      </Box>

      {/* Education Dialog */}
      <Dialog open={educationDialogOpen} onClose={handleEducationDialogClose}>
        <DialogTitle>Add Education</DialogTitle>
        <DialogContent>
          <FormControl fullWidth margin="normal" error={!isEducationValid}>
            <InputLabel>Education Type</InputLabel>
            <Select
              value={newEducation.educationType}
              onChange={(e) =>
                setNewEducation({
                  ...newEducation,
                  educationType: e.target.value,
                })
              }
              required
            >
              <MenuItem value="Undergraduate">Undergraduate</MenuItem>
              <MenuItem value="Postgraduate">Postgraduate</MenuItem>
              <MenuItem value="PhD">PhD</MenuItem>
            </Select>
            {!isEducationValid && (
              <FormHelperText>Please fill all fields</FormHelperText>
            )}
          </FormControl>

          <TextField
            label="College Name"
            fullWidth
            margin="normal"
            value={newEducation.collegeName}
            onChange={(e) =>
              setNewEducation({ ...newEducation, collegeName: e.target.value })
            }
            required
          />
          <TextField
            label="Department"
            fullWidth
            margin="normal"
            value={newEducation.department}
            onChange={(e) =>
              setNewEducation({ ...newEducation, department: e.target.value })
            }
          />
          <TextField
            label="Specialization"
            fullWidth
            margin="normal"
            value={newEducation.specialization}
            onChange={(e) =>
              setNewEducation({
                ...newEducation,
                specialization: e.target.value,
              })
            }
          />
          <TextField
            label="Start Year"
            fullWidth
            margin="normal"
            value={newEducation.startYear}
            onChange={(e) =>
              setNewEducation({ ...newEducation, startYear: e.target.value })
            }
            required
          />
          <TextField
            label="End Year"
            fullWidth
            margin="normal"
            value={newEducation.endYear}
            onChange={(e) =>
              setNewEducation({ ...newEducation, endYear: e.target.value })
            }
            required
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEducationDialogClose}>Cancel</Button>
          <Button
            onClick={handleEducationAdd}
            color="primary"
            disabled={!isEducationValid}
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>

      {/* Project Dialog */}
      <Dialog open={projectDialogOpen} onClose={handleProjectDialogClose}>
        <DialogTitle>Add Project</DialogTitle>
        <DialogContent>
          <TextField
            label="Project Title"
            fullWidth
            margin="normal"
            value={newProject.projectTitle}
            onChange={(e) =>
              setNewProject({ ...newProject, projectTitle: e.target.value })
            }
          />
          <TextField
            label="Project Description"
            fullWidth
            margin="normal"
            value={newProject.projectDescription}
            onChange={(e) =>
              setNewProject({
                ...newProject,
                projectDescription: e.target.value,
              })
            }
          />
          <TextField
            label="Project Skills"
            fullWidth
            margin="normal"
            value={newProject.projectSkills}
            onChange={(e) =>
              setNewProject({ ...newProject, projectSkills: e.target.value })
            }
          />
          <TextField
            label="Project Link"
            fullWidth
            margin="normal"
            value={newProject.projectLink}
            onChange={(e) =>
              setNewProject({ ...newProject, projectLink: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleProjectDialogClose}>Cancel</Button>
          <Button
            onClick={handleProjectAdd}
            color="primary"
            disabled={!isProjectValid}
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ProfilePage;
