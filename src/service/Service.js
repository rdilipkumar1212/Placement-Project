import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API_URL = `${BACKEND_URL}/api/`;

const signup = async (userSignupData) => {
  const response = await axios.post(API_URL + 'signup', userSignupData);
  return response.data;
};

const signin = async (userData) => {
  const response = await axios.post(API_URL + 'signin', userData);
  return response.data;
};

const forgotPassword = async (body) => {
  const response = await axios.post(API_URL + 'forgot-password', body);
  return response;
};

const AuthService = {
  signup,
  signin,
  forgotPassword,
};

export default AuthService;
