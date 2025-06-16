import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API_URL = `${BACKEND_URL}/api/`;

const getCollegeDetails = async (id) => {
  const response = await axios.get(
    API_URL + `college/get-college-details/${id}`,
  );
  return response.data;
};
const getCollegeSummaryDetails = async (id) => {
  const response = await axios.get(
    API_URL + `college/get-college-summary/${id}`,
  );
  return response.data;
};
const getApplicationOverview = async (id) => {
  const response = await axios.get(
    API_URL + `college/get-college-application-overview/${id}`,
  );
  return response.data;
};
const getRecentPlacements = async (id) => {
  const response = await axios.get(
    API_URL + `college/get-recent-placement/${id}`,
  );
  return response.data;
};

const getStudentsList = async () => {
  const response = await axios.get(API_URL + `college/get-students-list`);
  return response.data;
};

const getCompaniesList = async () => {
  const response = await axios.get(API_URL + `college/get-companies-list`);
  return response.data;
};

const updateCollegeProfile = async (id, body) => {
  const response = await axios.post(
    API_URL + `college/update-profile/${id}`,
    body,
  );
  return response.data;
};

const updateCollegeImgURL = async (id, body) => {
  const response = await axios.post(
    API_URL + `college/update-imageurl/${id}`,
    body,
  );
  return response.data;
};
const CollegeService = {
  getCollegeDetails,
  getCollegeSummaryDetails,
  getApplicationOverview,
  getStudentsList,
  getRecentPlacements,
  getCompaniesList,
  updateCollegeProfile,
  updateCollegeImgURL,
};

export default CollegeService;
