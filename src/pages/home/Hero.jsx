import React, { useEffect } from 'react';
import { FaSignInAlt, FaUserPlus } from 'react-icons/fa'; // Import icons
import { Link } from 'react-router-dom'; // Import Link from React Router
import Banner from '../../assets/Banner.png';
import HeroImage from '../../assets/h.png';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Hero = () => {
  useEffect(() => {
    // Initialize AOS when the component mounts
    AOS.init();
  }, []);

  return (
    <div
      className="relative bg-cover bg-center py-16 px-4"
      style={{
        backgroundImage: `url(${Banner})`,
      }}
    >
      <div className="max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center justify-center gap-44">
        {/* Left Content (Text) */}
        <div
          className="lg:w-1/2 text-center lg:text-left flex flex-col"
          data-aos="fade-right"  data-aos-duration="1000" data-aos-delay="200"
          // AOS fade-right animation for left content
        >
          <h1
            className="text-4xl text-transparent bg-clip-text bg-gradient-to-r from-purple-700 via-purple-500 to-purple-300 tracking-tight mb-4"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            Welcome to{' '}
            <span className="text-5xl text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 mb-4 tracking-widest font-semibold">
              AlwaysApply
            </span>
          </h1>

          <h1
            className="text-3xl text-transparent bg-clip-text bg-gradient-to-r from-purple-700 via-purple-500 to-purple-300 tracking-widest mb-4"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            Your Campus Placement Partner
          </h1>
          <p className="text-gray-600 mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Empower your career journey with exclusive campus placement opportunities tailored to your aspirations.
          </p>
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-2 mb-6">
            {/* Log In Button */}
            <Link
              to="/signin"  // Using Link for React Router navigation
              className="flex items-center justify-center gap-2 bg-purple-500 text-white font-semibold rounded-md px-6 py-2 hover:bg-purple-600"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              <FaSignInAlt size={20} /> Log In
            </Link>
            {/* Register Button */}
            <Link
              to="/signup"  // Using Link for React Router navigation
              className="flex items-center justify-center gap-2 bg-gray-200 text-purple-500 font-semibold rounded-md px-6 py-2 hover:bg-gray-300"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              <FaUserPlus size={20} /> Register
            </Link>
          </div>
          <p className="mt-4 text-sm text-gray-500" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Ready to start? Join thousands of students already shaping their future with Always Apply.
          </p>
        </div>

        {/* Right Content (Image) */}
        <div
          className="lg:w-[500px] mb-10 lg:mb-0"
          data-aos="fade-left"  data-aos-duration="1000" data-aos-delay="200"
          // AOS fade-left animation for right content
        >
          <img src={HeroImage} alt="Campus placement illustration" className="w-full" />
        </div>
      </div>
    </div>
  );
};

export default Hero;
