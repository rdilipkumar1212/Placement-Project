import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IoMdArrowBack } from 'react-icons/io';
import { FaSignOutAlt } from 'react-icons/fa';

const NavBack = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate('/');
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/signin');
  };

  return (
    <nav
      className="flex justify-between items-center h-20 w-screen px-20 backdrop-blur-sm backdrop-filter 
            max-sm:px-5 fixed top-0 left-0 max-sm:h-16 z-40 border-b-2 border-black bg-gray-900"
    >
      {/* Go Back Button */}
      <button
        onClick={goBack}
        className="text-white text-2xl hover:text-gray-300"
      >
        <IoMdArrowBack />
      </button>

      {/* Website Title */}
      <h1 className="text-white text-2xl font-bold flex-grow text-center">
        Placement Management System
      </h1>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="flex items-center text-white text-xl hover:text-gray-300"
      >
        <FaSignOutAlt className="mr-2" />
        Logout
      </button>
    </nav>
  );
};

export default NavBack;
