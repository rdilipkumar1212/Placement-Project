import React from 'react';
import { FaSignInAlt, FaUserPlus } from 'react-icons/fa';
import logo from '../../assets/logo.png'; 

const Header = () => {
  return (
    <header className="bg-white sticky top-0 flex justify-between items-center px-20 py-4 shadow-md z-50">
      {/* Logo Section */}
      <div className="flex items-center space-x-2">
        <img src={logo} alt="AlwaysApply Logo" className="w-h-8" />
      </div>

      {/* Navigation Section */}
      <nav>
        <ul className="flex space-x-8 text-black text-sm" style={{ fontFamily: 'Poppins, sans-serif' }}>
          <li className="hover:text-[#6300B3] hover:underline font-semibold">
            <a href="/" className="transition-colors duration-300">
              Home
            </a>
          </li>
          <li className="hover:text-[#6300B3] hover:underline font-semibold">
            <a href="#findJobs" className="transition-colors duration-300">
              About
            </a>
          </li>
          <li className="hover:text-[#6300B3] hover:underline font-semibold">
            <a href="#employers" className="transition-colors duration-300">
              User Profiles
            </a>
          </li>
          <li className="hover:text-[#6300B3] hover:underline font-semibold">
            <a href="#admin" className="transition-colors duration-300">
              Features
            </a>
          </li>
          <li className="hover:text-[#6300B3] hover:underline font-semibold">
            <a href="#about" className="transition-colors duration-300">
              Testimonials
            </a>
          </li>
        </ul>
      </nav>

      {/* Buttons Section */}
      <div className="flex space-x-4">
        <a
          href="/signup"
          className="border-2 border-[#6300B3] text-[#6300B3] flex items-center gap-2 font-semibold text-sm px-4 py-2 rounded-md hover:bg-[#6300B3] hover:text-white transition-all duration-300"
          style={{ fontFamily: 'Poppins, sans-serif' }}
        >
          <FaUserPlus size={20} />
          Register
        </a>
        <a
          href="/signin"
          className="bg-[#6300B3] text-white font-semibold text-sm px-4 py-2 rounded-md hover:bg-[#4f0095] transition-all duration-300 flex items-center space-x-2"
          style={{ fontFamily: 'Poppins, sans-serif' }}
        >
          <FaSignInAlt />
          <span>Login</span>
        </a>
      </div>
    </header>
  );
};

export default Header;
