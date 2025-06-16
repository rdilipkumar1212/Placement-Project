import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API_URL = `${BACKEND_URL}/api/`;

const updateStudentProfile = async (id, body) => {
  const response = await axios.post(
    API_URL + `student/update-profile/${id}`,
    body,
  );
  return response.data;
};

const updateStudentResumeURL = async (id, body) => {
  const response = await axios.post(
    API_URL + `student/update-resumeurl/${id}`,
    body,
  );
  return response.data;
};

const updateStudentImgURL = async (id, body) => {
  const response = await axios.post(
    API_URL + `student/update-imageurl/${id}`,
    body,
  );
  return response.data;
};

const getStudentProfileById = async (id) => {
  const response = await axios.get(API_URL + `student/${id}`);
  return response.data;
};

const getJobsList = async (id) => {
  const response = await axios.get(API_URL + `student/job-list/${id}`);
  return response.data;
};

const getAppliedJobsByStudentId = async (id) => {
  const response = await axios.get(API_URL + `student/applied-jobs/${id}`);
  return response.data;
};
const getStudentsAppliedJobs = async (id) => {
  const response = await axios.get(
    API_URL + `student/students-applied-jobs/${id}`,
  );
  return response.data;
};

const StudentService = {
  updateStudentProfile,
  updateStudentResumeURL,
  getStudentProfileById,
  getJobsList,
  updateStudentImgURL,
  getAppliedJobsByStudentId,
  getStudentsAppliedJobs,
};

export default StudentService;
