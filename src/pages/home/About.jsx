import React, { useEffect } from 'react';
import { FaRegHandshake, FaRegListAlt, FaChartLine, FaUniversity } from 'react-icons/fa'; // Icons for points
import AOS from 'aos';
import 'aos/dist/aos.css'; // AOS CSS for animations

const About = () => {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <section
      id="about"
      className="section py-16 px-4 bg-white"
      style={{ fontFamily: 'Poppins, sans-serif' }} // Apply Poppins font to the entire section
      data-aos="fade-up" 
      data-aos-duration="1000"
      data-aos-delay="200"
    >
      <div className="max-w-7xl mx-auto text-center">
        {/* Heading */}
        <h1
          className="text-3xl text-transparent bg-clip-text bg-gradient-to-r from-purple-700 via-purple-500 to-purple-300 tracking-widest mb-4"
          style={{ fontFamily: 'Poppins, sans-serif' }}
        >
          More About Us...
        </h1>

        {/* Paragraph */}
        <p className="text-gray-500 mb-12 px-4 md:px-0" style={{ fontFamily: 'Poppins, sans-serif' }}>
          The Placement Management System is a robust platform that bridges the gap between students, colleges, and recruiters.
          Our goal is to simplify the placement process by providing tools for registration, tracking, and analysis.
        </p>

        {/* Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Card 1 */}
          <div
            className="flex flex-col items-center justify-center p-6 bg-purple-100 text-center rounded-lg shadow-lg hover:shadow-xl hover:border-2 hover:border-purple-600 transition-all duration-500 ease-in-out"
            data-aos="fade-right"
          >
            <FaUniversity size={40} className="text-purple-500 mb-4" />
            <h3 className="text-2xl font-semibold text-purple-700 mb-2">University Collaboration</h3>
            <p className="text-gray-500">
              We partner with top universities to ensure a seamless placement process for students and recruiters alike.
            </p>
          </div>

          {/* Card 2 */}
          <div
            className="flex flex-col items-center justify-center p-6 bg-purple-100 text-center rounded-lg shadow-lg hover:shadow-xl hover:border-2 hover:border-purple-600 transition-all duration-500 ease-in-out"
            data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200"
          >
            <FaRegListAlt size={40} className="text-purple-500 mb-4" />
            <h3 className="text-2xl font-semibold text-purple-700 mb-2">Easy Registration</h3>
            <p className="text-gray-500">
              Our platform allows students and recruiters to register and track their progress with ease and efficiency.
            </p>
          </div>

          {/* Card 3 */}
          <div
            className="flex flex-col items-center justify-center p-6 bg-purple-100 text-center rounded-lg shadow-lg hover:shadow-xl hover:border-2 hover:border-purple-600 transition-all duration-500 ease-in-out"
            data-aos="fade-left" data-aos-duration="1000" data-aos-delay="200"
          >
            <FaChartLine size={40} className="text-purple-500 mb-4" />
            <h3 className="text-2xl font-semibold text-purple-700 mb-2">Tracking & Analytics</h3>
            <p className="text-gray-500">
              Our system offers real-time tracking and detailed analytics to help students and recruiters stay informed.
            </p>
          </div>

          {/* Card 4 */}
          <div
            className="flex flex-col items-center justify-center p-6 bg-purple-100 text-center rounded-lg shadow-lg hover:shadow-xl hover:border-2 hover:border-purple-600 transition-all duration-500 ease-in-out"
            data-aos="fade-left" data-aos-duration="1000" data-aos-delay="200"
          >
            <FaRegHandshake size={40} className="text-purple-500 mb-4" />
            <h3 className="text-2xl font-semibold text-purple-700 mb-2">Seamless Connections</h3>
            <p className="text-gray-500">
              We facilitate seamless connections between students, colleges, and recruiters for better placement outcomes.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
