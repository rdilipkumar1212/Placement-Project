import React from 'react';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa';
import { MdLocationOn, MdEmail, MdPhone } from 'react-icons/md';

import logo from '../../assets/logo.png'; 

const Footer = () => {
    return (
        <footer className="bg-purple-800 text-white py-8 px-20 -mt-10 font-poppins">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
                {/* About Section */}
                <div className="flex flex-col items-start">
                    <img
                        src={logo}
                        alt="College Placement Logo"
                        className=" mb-5 mt-4 filter invert brightness-0"
                    />
                    <h3 className="text-lg font-bold mb-3">College Placement Portal</h3>
                    <p className="text-sm">
                        Our platform bridges the gap between students and recruiters, empowering career growth by connecting talent with opportunities.
                    </p>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="text-lg font-bold mb-3">Quick Links</h3>
                    <ul className="list-disc pl-4">
                        <li className="mb-2">
                            <a href="/" className="hover:underline">Dashboard</a>
                        </li>
                        <li className="mb-2">
                            <a href="/about" className="hover:underline">About Us</a>
                        </li>
                        <li className="mb-2">
                            <a href="/jobs" className="hover:underline">Job Listings</a>
                        </li>
                        <li className="mb-2">
                            <a href="/resources" className="hover:underline">Student Resources</a>
                        </li>
                        <li className="mb-2">
                            <a href="/contact" className="hover:underline">Contact</a>
                        </li>
                    </ul>
                </div>

                {/* Services */}
                <div>
                    <h3 className="text-lg font-bold mb-3">Services</h3>
                    <ul className="list-disc pl-4">
                        <li className="mb-2">Placement Training</li>
                        <li className="mb-2">Resume Building</li>
                        <li className="mb-2">Interview Preparation</li>
                        <li className="mb-2">Job Alerts</li>
                        <li className="mb-2">Industry Insights</li>
                    </ul>
                </div>

                {/* Contact Section */}
                <div>
                    <h3 className="text-lg font-bold mb-3">Contact Us</h3>
                    <ul className="space-y-2">
                        <li className="flex items-center gap-2">
                            <MdEmail size={20} className="text-white" />
                            <a href="mailto:placement@college.com" className="hover:underline">
                                placement@college.com
                            </a>
                        </li>
                        <li className="flex items-center gap-2">
                            <MdPhone size={20} className="text-white" />
                            +91 98765 43210
                        </li>
                        <li className="flex items-center gap-2">
                            <MdLocationOn size={20} className="text-white" />
                            123 College Lane, Knowledge City, India
                        </li>
                    </ul>
                    <div className="flex gap-4 mt-4">
                        <a
                            href="https://facebook.com"
                            target="_blank"
                            rel="noreferrer"
                            className="hover:text-gray-300"
                        >
                            <FaFacebookF size={20} />
                        </a>
                        <a
                            href="https://twitter.com"
                            target="_blank"
                            rel="noreferrer"
                            className="hover:text-gray-300"
                        >
                            <FaTwitter size={20} />
                        </a>
                        <a
                            href="https://linkedin.com"
                            target="_blank"
                            rel="noreferrer"
                            className="hover:text-gray-300"
                        >
                            <FaLinkedinIn size={20} />
                        </a>
                        <a
                            href="https://instagram.com"
                            target="_blank"
                            rel="noreferrer"
                            className="hover:text-gray-300"
                        >
                            <FaInstagram size={20} />
                        </a>
                    </div>
                </div>
            </div>

            <hr className='mt-3' />

            {/* Footer Bottom Section */}
            <div className="border-t border-gray-600 mt-3 pt-4 text-center text-sm">
                <p>
                    © {new Date().getFullYear()} College Placement Portal. All rights reserved.
                    <span className="ml-2">|</span>
                    <a href="/privacy-policy" className="hover:underline ml-2">Privacy Policy</a>
                    <span className="mx-2">|</span>
                    <a href="/terms" className="hover:underline">Terms & Conditions</a>
                </p>
            </div>
        </footer>
    );
};

export default Footer;
