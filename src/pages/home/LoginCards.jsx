import React, { useEffect } from 'react';
import { FaUserGraduate, FaUniversity, FaBriefcase } from 'react-icons/fa';
import AOS from 'aos';
import 'aos/dist/aos.css'; // AOS CSS for animations

const LoginCards = () => {
  const profiles = [
    {
      title: 'College Admin',
      description: 'Manage placements, view student registrations, and coordinate with recruiters.',
      link: '/signin',
      icon: <FaUniversity size={40} className="text-purple-600" />,
    },
    {
      title: 'Students',
      description: 'Access job listings, apply for opportunities, track application statuses.',
      link: '/signin',
      icon: <FaUserGraduate size={40} className="text-purple-600" />,
    },
    {
      title: 'Companies',
      description: 'Search for students, post job openings, and schedule interviews.',
      link: '/signin',
      icon: <FaBriefcase size={40} className="text-purple-600" />,
    },
  ];

  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <section
      id="loginCards"
      className="flex flex-col items-center gap-8 pt-28 pb-20 -mt-12 bg-white"
    >
      {/* Title */}
      <h1 className="text-4xl font-extraligth text-purple-600  text-center font-poppins -mt-12" style={{ fontFamily: 'Poppins, sans-serif' }}>
        User Profiles
      </h1>

      {/* Description */}
      <p className="text-lg text-gray-600 text-center  font-poppins px-20 -mt-4 mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
        Our platform provides different profiles for users involved in the college placement process. Whether you're a College Admin managing placements, a Student exploring job opportunities, or a Company looking for talent, each profile is tailored to your specific needs. Select your role below and get started with your placement journey!
      </p>

      {/* Profile Cards */}
      <div className="flex flex-wrap justify-center gap-16">
        {profiles.map((profile, index) => (
          <div
            key={index}
            className="border border-gray-300 rounded-lg shadow-lg text-center p-6 w-72 bg-white hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3"
            data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200"
          >
            {/* Icon and Title */}
            <div className="mb-4 ">
              {profile.icon}
            </div>
            <h3 className="text-2xl font-semibold text-purple-600 mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
              {profile.title}
            </h3>
            
            {/* Description */}
            <p className="text-gray-600 mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>{profile.description}</p>

            {/* Button */}
            <button
              className="bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 text-white py-2 px-6 rounded-lg hover:bg-gradient-to-l hover:from-purple-700 hover:to-purple-900 transition-all duration-300 ease-in-out transform hover:scale-105" style={{ fontFamily: 'Poppins, sans-serif' }}
              onClick={() => (window.location.href = profile.link)}
            >
              Login
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default LoginCards;
