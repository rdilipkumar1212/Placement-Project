import React, { useEffect, useState } from 'react';
import './MainContent.css';
import Navbar from './Navbar';
import Hero from './Hero';
import TopCompanies from './TopCompanies';
import About from './About';
import Testimonials from './Testimonials';
import LoginCards from './LoginCards'
import Features from './Features';
import ContactForm from './ContactForm';
import StudentService from '../../service/StudentService';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';

function HomePage() {
    const [jobsList, setJobsList] = useState([]);
    const navigate = useNavigate();

    // Fetch job data from backend
    useEffect(() => {
        fetchJobs();
    }, []);

    const fetchJobs = async () => {
        try {
            const response = await StudentService.getJobsList(0);
            console.log('Fetched jobs:', response);
            setJobsList(response.jobs || []); // Ensure it's an array
        } catch (error) {
            console.error('Error fetching jobs:', error);
        }
    };

    const applyForJob = (id) => {
        navigate('/signin'); // Redirect to sign-in page
    };

    return (
        <main className="main-content">
            <Navbar />

            {/* Hero Section */}
            <Hero />

          

            {/* About Section */}
            <About />

            <TopCompanies />
            
            {/* User Profiles */}
            <LoginCards />


            {/* Features Section */}

            <Features />


            {/* Testimonials Section */}
            <Testimonials />

            <ContactForm />

            <Footer />
        </main>
    );
}

export default HomePage;
