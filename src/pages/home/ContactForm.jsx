import React, { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  // Initialize AOS
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration in ms
      easing: 'ease-in-out', // Easing function
      once: true, // Whether animation should only happen once
    });
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // Logic for submitting form data can be added here
  };

  return (
    <div className="font-sans max-w-6xl mx-auto relative rounded-lg py-16 -mt-20">
      <div className="flex justify-center gap-4 py-4">
        {/* Contact Info Section */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-1 gap-4 z-20 relative max-lg:px-4">
          {/* Visit Office */}
          <div
            data-aos="fade-up"
            className="flex flex-col items-center justify-center rounded-lg w-full h-44 p-4 text-center shadow-lg"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-7 fill-purple-600" viewBox="0 0 512 512">
              <path d="M341.476 338.285c54.483-85.493 47.634-74.827 49.204-77.056C410.516 233.251 421 200.322 421 166 421 74.98 347.139 0 256 0 165.158 0 91 74.832 91 166c0 34.3 10.704 68.091 31.19 96.446l48.332 75.84C118.847 346.227 31 369.892 31 422c0 18.995 12.398 46.065 71.462 67.159C143.704 503.888 198.231 512 256 512c108.025 0 225-30.472 225-90 0-52.117-87.744-75.757-139.524-83.715zm-194.227-92.34a15.57 15.57 0 0 0-.517-.758C129.685 221.735 121 193.941 121 166c0-75.018 60.406-136 135-136 74.439 0 135 61.009 135 136 0 27.986-8.521 54.837-24.646 77.671-1.445 1.906 6.094-9.806-110.354 172.918L147.249 245.945zM256 482c-117.994 0-195-34.683-195-60 0-17.016 39.568-44.995 127.248-55.901l55.102 86.463a14.998 14.998 0 0 0 25.298 0l55.101-86.463C411.431 377.005 451 404.984 451 422c0 25.102-76.313 60-195 60z" />
            </svg>
            <h4 className="text-gray-800 text-base font-bold mt-4">Visit Office</h4>
            <p className="text-sm text-gray-600 mt-2">123 College Lane, Knowledge City, India</p>
          </div>

          {/* Call Us */}
          <div
            data-aos="fade-up"
            data-aos-delay="200"
            className="flex flex-col items-center justify-center rounded-lg w-full h-44 p-4 text-center shadow-lg"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-7 fill-purple-600" viewBox="0 0 473.806 473.806">
              <path d="M374.456 293.506c-9.7-10.1-21.4-15.5-33.8-15.5-12.3 0-24.1 5.3-34.2 15.4l-31.6 31.5c-2.6-1.4-5.2-2.7-7.7-4-3.6-1.8-7-3.5-9.9-5.3-29.6-18.8-56.5-43.3-82.3-75-12.5-15.8-20.9-29.1-27-42.6 8.2-7.5 15.8-15.3 23.2-22.8 2.8-2.8 5.6-5.7 8.4-8.5 21-21 21-48.2 0-69.2l-27.3-27.3c-3.1-3.1-6.3-6.3-9.3-9.5-6-6.2-12.3-12.6-18.8-18.6-9.7-9.6-21.3-14.7-33.5-14.7s-24 5.1-34 14.7l-.2.2-34 34.3c-12.8 12.8-20.1 28.4-21.7 46.5-2.4 29.2 6.2 56.4 12.8 74.2 16.2 43.7 40.4 84.2 76.5 127.6 43.8 52.3 96.5 93.6 156.7 122.7 23 10.9 53.7 23.8 88 26 2.1.1 4.3.2 6.3.2 23.1 0 42.5-8.3 57.7-24.8.1-.2.3-.3.4-.5 5.2-6.3 11.2-12 17.5-18.1 4.3-4.1 8.7-8.4 13-12.9 9.9-10.3 15.1-22.3 15.1-34.6 0-12.4-5.3-24.3-15.4-34.3l-54.9-55.1z" />
            </svg>
            <h4 className="text-gray-800 text-base font-bold mt-4">Call Us</h4>
            <p className="text-sm text-gray-600 mt-2">+91 98765 43210</p>
          </div>
        </div>

        {/* Contact Form */}
        <div
          data-aos="fade-up"
          data-aos-delay="400"
          className="flex flex-col items-center justify-center max-w-3xl mx-auto px-4 py-10 shadow-lg rounded-lg w-full"
        >
          <h2 className="text-2xl font-bold text-purple-800">Contact Us</h2>
          <form className="w-full mt-6" onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm"
                required
              />
            </div>
            <div className="mb-4">
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm"
                required
              />
            </div>
            <div className="mb-6">
              <textarea
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                rows="4"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
