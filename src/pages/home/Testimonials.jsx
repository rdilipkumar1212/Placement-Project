import React, { useEffect } from 'react';
import { FaQuoteLeft } from 'react-icons/fa';
import { motion } from 'framer-motion';
import AOS from 'aos';
import 'aos/dist/aos.css';

const testimonials = [
  {
    quote: "This system has streamlined our college's placement process and made it highly efficient!",
    author: 'Placement Coordinator',
  },
  {
    quote: "As a recruiter, I found it very easy to post jobs and track candidates' progress.",
    author: 'Recruiter',
  },
  {
    quote: 'I got placed in my dream company thanks to the Placement Management System!',
    author: 'Student',
  },
];

const fadeVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const TestimonialCard = ({ quote, author }) => (
  <motion.div
    variants={fadeVariant}
    className="bg-purple-100 rounded-lg shadow-md p-6 text-center flex flex-col items-center gap-4"
    data-aos="fade-up" // Adding AOS animation
    data-aos-duration="600" // Optional: adjust the duration of the AOS animation
  >
    <FaQuoteLeft className="text-purple-600 text-2xl" />
    <p className="text-gray-700 font-medium">{quote}</p>
    <strong className="text-purple-700 font-semibold">{author}</strong>
  </motion.div>
);

const Testimonials = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration
      easing: 'ease-in-out', // Easing function
      once: true, // Animation occurs only once
    });
  }, []);

  return (
    <section id="testimonials" className="section px-10 py-16 bg-white">
      <h2
        className="text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-700 via-purple-500 to-purple-300 mb-8"
        style={{ fontFamily: 'Poppins, sans-serif' }}
      >
        What People Are Saying
      </h2>
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {testimonials.map((testimonial, index) => (
          <TestimonialCard key={index} {...testimonial} />
        ))}
      </motion.div>
    </section>
  );
};

export default Testimonials;
