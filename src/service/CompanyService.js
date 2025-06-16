import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API_URL = `${BACKEND_URL}/api/`;

const createNewJob = async (body) => {
  const response = await axios.post(API_URL + 'company/jobs', body);
  return response.data;
};

const getJobsList = async () => {
  const response = await axios.get(API_URL + 'company/jobs');
  return response.data;
};

const jobStatusChangeById = async (id, body) => {
  const response = await axios.patch(
    `${API_URL}company/change-jobs-status/${id}`,
    body,
  );
  return response.data;
};

const companyDetailsById = async (id) => {
  const response = await axios.get(`${API_URL}company/${id}/details`);
  return response.data;
};
const overviewDetails = async (id) => {
  const response = await axios.get(
    `${API_URL}company/${id}/applications-overview`,
  );
  return response.data;
};
const recentApplicationsList = async (id) => {
  const response = await axios.get(
    `${API_URL}company/${id}/recent-applications`,
  );
  return response.data;
};

const applyJobByJobId = async (id, body) => {
  const response = await axios.post(`${API_URL}company/jobs/${id}/apply`, body);

  return response.data;
};

const viewApplications = async (id) => {
  const response = await axios.get(`${API_URL}company/jobs/${id}/applications`);

  return response.data;
};

const updateApplicationStatus = async (id, body) => {
  const response = await axios.put(
    `${API_URL}company/applications/${id}/status`,
    body,
  );

  return response.data;
};
const updateScheduleInterview = async (id, body) => {
  const response = await axios.patch(
    `${API_URL}company/applications/${id}/schedule-interview`,
    body,
  );

  return response.data;
};

const updateCompanyImgURL = async (id, body) => {
  const response = await axios.post(
    API_URL + `company/update-imageurl/${id}`,
    body,
  );
  return response.data;
};

const updateCompanyProfile = async (id, body) => {
  const response = await axios.post(
    API_URL + `company/update-profile/${id}`,
    body,
  );
  return response.data;
};

const CompanyService = {
  createNewJob,
  getJobsList,
  jobStatusChangeById,
  companyDetailsById,
  overviewDetails,
  recentApplicationsList,
  applyJobByJobId,
  viewApplications,
  updateApplicationStatus,
  updateCompanyImgURL,
  updateScheduleInterview,
  updateCompanyProfile
};

export default CompanyService;
