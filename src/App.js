import React from 'react';
import './App.css';
import LoginPage from './pages/auth/LoginPage';
import SignupFormPage from './pages/auth/SignupPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from './utils/PrivateRoute';
import PageNotFound from './pages/PageNotFound';
import ProfilePage from './pages/profile/Profile';
import ProfileDetails from './pages/student/Profile';
import JobListPage from './pages/student/JobListPage';
import AppliedJobsPage from './pages/student/appliedJobs/AppliedJobs';
import CollegeStaffPage from './pages/collegeStaff/CollegeStaffPage';
import CompanyDetailPage from './pages/collegeStaff/CompanysDetailPage';
import StudentsDetailPage from './pages/collegeStaff/StudentsDetailPage';
import CompanyPage from './pages/company/CompanyPage';
import CreateJobPost from './pages/company/CreateJobPost';
import CreateJobPostPage from './pages/company/JobPostPage';
import JobApplicationPage from './pages/company/JobApplicationPag';
import HomePage from './pages/home/HomePage';
import StudentsAppliedJobsPage from './pages/collegeStaff/AppliedJobs';

function App() {
  return (
    <div>
      <ToastContainer
        bodyClassName={'text-sm'}
        autoClose={5000}
        style={{ top: '10%' }}
      />

      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/signin" element={<LoginPage />} />
          <Route path="/signup" element={<SignupFormPage />} />

          {/* Student Routes */}
          <Route
            path="/:studentId/student-profile"
            element={
              <PrivateRoute>
                <ProfileDetails />
              </PrivateRoute>
            }
          />
          <Route
            path="/:studentId/student-jobs-list"
            element={
              <PrivateRoute>
                <JobListPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/:studentId/student-applied-jobs"
            element={
              <PrivateRoute>
                <AppliedJobsPage />
              </PrivateRoute>
            }
          />

          {/* college route */}
          <Route
            path="/:collegeId/college-staff"
            element={
              <PrivateRoute>
                <CollegeStaffPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/:collegeId/college-students-applied-jobs"
            element={
              <PrivateRoute>
                <StudentsAppliedJobsPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/:collegeId/college-student-details"
            element={
              <PrivateRoute>
                <StudentsDetailPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/:collegeId/college-company-details"
            element={
              <PrivateRoute>
                <CompanyDetailPage />
              </PrivateRoute>
            }
          />

          {/* company route */}
          <Route
            path="/:companyId/company-create-job-posts"
            element={
              <PrivateRoute>
                <CreateJobPostPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/:companyId/company-job-applications"
            element={
              <PrivateRoute>
                <JobApplicationPage />
              </PrivateRoute>
            }
          />

          <Route
            path="/:companyId/company"
            element={
              <PrivateRoute>
                <CompanyPage />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
