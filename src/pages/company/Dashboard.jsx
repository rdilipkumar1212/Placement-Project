import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import CompanyService from "../../service/CompanyService";
import ProfileImageUpload from "../../components/inputField/ProfileImageUpload";
import { Button } from "@mui/material";
import CompanyProfileEdit from "./CompanyProfileEdit";
import { FaEdit, FaEye, FaTimes } from "react-icons/fa"; // React icons
import AOS from "aos";
import "aos/dist/aos.css";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const CompanyDashboard = ({ companyId }) => {
  const [companyDetails, setCompanyDetails] = useState({});
  const [stats, setStats] = useState({});
  const [applicationsOverview, setApplicationsOverview] = useState(null);
  const [recentApplications, setRecentApplications] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const detailsResponse = await CompanyService.companyDetailsById(companyId);
        const overviewResponse = await CompanyService.overviewDetails(companyId);
        const recentResponse = await CompanyService.recentApplicationsList(companyId);

        setCompanyDetails(detailsResponse.company);
        setStats(detailsResponse.applications);
        setApplicationsOverview(overviewResponse);
        setRecentApplications(recentResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [companyId]);

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Applications Received vs Students Selected",
      },
      legend: {
        position: "top",
      },
    },
    scales: {
      x: { stacked: true },
      y: { stacked: true, beginAtZero: true },
    },
  };

  const handleViewApplication = (application) => {
    setSelectedApplication(application);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedApplication(null);
  };

  const handleEdit = async (updatedData) => {
    const updatedProfile = await CompanyService.updateCompanyProfile(companyId, updatedData);
    setCompanyDetails(updatedProfile.data);
  };

  return (
    <div className="font-poppins text-gray-700">
      <h2
        className="text-3xl font-extralight text-purple-800 mb-6 font-sans"
        data-aos="fade-in"
      >
        Company Dashboard
      </h2>

      {/* Company Profile */}
      <section className="bg-purple-50 p-6 rounded-lg shadow-md mb-6" data-aos="fade-up">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-light text-gray-800 font-sans">Company Profile</h3>
          <Button
            onClick={() => setIsModalOpen(true)}
            className="mt-4 px-4 py-2 bg-purple-500 text-white rounded-lg font-sans"
          >
            <FaEdit className="inline mr-2 font-sans " />
            Edit Profile
          </Button>
        </div>
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-6">
          <div className="flex-shrink-0">
            <ProfileImageUpload type="company" imgUrl={companyDetails.companyLogoUrl} />
          </div>
          <div className="flex flex-col space-y-2 mt-2">
            <div>
              <p className="text-md font-extralight text-gray-500 font-sans">Company Name</p>
              <p className="text-purple-800 font-sans font-semibold">{companyDetails?.companyName}</p>
            </div>
            <div>
              <p className="text-md font-extralight text-gray-500 font-sans">Industry</p>
              <p className="text-purple-800 font-sans font-semibold">{companyDetails?.industry}</p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-md font-extralight text-gray-500 font-sans">Location</p>
            <p className="text-purple-800 font-sans font-extralight">{companyDetails?.location}</p>
          </div>
          <div>
            <p className="text-md font-extralight text-gray-500 font-sans">Total Employees</p>
            <p className="text-purple-800 font-sans font-semibold">{companyDetails?.totalEmployees}</p>
          </div>
        </div>
      </section>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 mb-6 " data-aos="fade-right">
        {[
          { label: "Applications Received", value: stats?.totalReceived, color: "text-blue-600" },
          { label: "Shortlisted Candidates", value: stats?.totalShortlisted, color: "text-purple-600" },
          { label: "Students Selected", value: stats?.totalSelected, color: "text-green-600" },
          { label: "Applications Rejected", value: stats?.totalRejected, color: "text-red-600" },
        ].map(({ label, value, color }, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center text-md font-extralight text-gray-500 font-sans">
            <p className="font-semibold text-purple-800">{label}</p>
            <p className={`text-2xl font-bold ${color}`}>{value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6" data-aos="fade-left">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-extralight text-purple-800 font-sans mb-4">
            Applications Overview
          </h3>
          {applicationsOverview && <Bar data={applicationsOverview} options={options} />}
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-extralight text-purple-800 font-sans mb-4">
            Recent Applications
          </h3>
          <ul className="space-y-4 font-sans">
            {recentApplications?.map((application) => (
              <li
                key={application?.id}
                className="flex justify-between items-center bg-purple-50 p-4 rounded-md shadow-sm font-sans"
              >
                <p className="text-lg">{application?.jobTitle}</p>
                <p className="text-sm text-gray-500 font-sans">
                  Student: {application?.studentName}
                </p>
                <button
                  onClick={() => handleViewApplication(application)}
                  className="text-purple-600 hover:text-purple-800 flex items-center font-sans"
                >
                  <FaEye className="mr-2" /> View
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Modal */}
      {showModal && selectedApplication && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50 font-sans">
          <div className="bg-white p-8 rounded-lg shadow-lg w-96 font-sans" >
            <h3 className="text-2xl font-extralight text-purple-800 mb-4 font-sans">
              Application Details
            </h3>
            <p>
              <strong className="font-sans font-semibold ">Job Title:</strong> {selectedApplication.jobTitle}
            </p>
            <p>
              <strong className="font-sans font-semibold">Student Name:</strong> {selectedApplication.studentName}
            </p>
            <div className="mt-4 font-sans font-semibold">
              <button
                onClick={handleCloseModal}
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 flex items-center font-sans"
              >
                <FaTimes className="mr-2 font-sans font-semibold" /> Close
              </button>
            </div>
          </div>
        </div>
      )}

      <CompanyProfileEdit
        open={isModalOpen}
        handleClose={() => setIsModalOpen(false)}
        companyData={companyDetails}
        updateCompanyProfile={handleEdit}
      />
    </div>
  );
};

export default CompanyDashboard;
