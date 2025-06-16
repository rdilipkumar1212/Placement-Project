import React, { useEffect, useRef, useState } from "react";
import { FaRegUser, FaBullhorn, FaCalendarCheck, FaBell, FaChartLine } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css"; // Make sure you import AOS CSS

// Custom Hook for Auto Scroll
const useAutoScroll = (scrollSpeed, scrollInterval, direction) => {
  const containerRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    let scrollIntervalId;

    const autoScroll = () => {
      if (containerRef.current && !isHovering) {
        if (direction === "right") {
          containerRef.current.scrollLeft += scrollSpeed;
          if (containerRef.current.scrollLeft >= containerRef.current.scrollWidth / 2) {
            containerRef.current.scrollLeft = 0;
          }
        } else if (direction === "left") {
          containerRef.current.scrollLeft -= scrollSpeed;
          if (containerRef.current.scrollLeft <= 0) {
            containerRef.current.scrollLeft = containerRef.current.scrollWidth / 2;
          }
        }
      }
    };

    scrollIntervalId = setInterval(autoScroll, scrollInterval);

    return () => clearInterval(scrollIntervalId);
  }, [scrollSpeed, scrollInterval, direction, isHovering]);

  const handleMouseEnter = () => setIsHovering(true);
  const handleMouseLeave = () => setIsHovering(false);

  return { containerRef, handleMouseEnter, handleMouseLeave };
};

const Features = () => {
  const scrollSpeed = 3;
  const scrollInterval = 30;

  const { containerRef: containerRef1, handleMouseEnter: handleMouseEnter1, handleMouseLeave: handleMouseLeave1 } =
    useAutoScroll(scrollSpeed, scrollInterval, "right");
  const { containerRef: containerRef2, handleMouseEnter: handleMouseEnter2, handleMouseLeave: handleMouseLeave2 } =
    useAutoScroll(scrollSpeed, scrollInterval, "left");

  const features = [
    { icon: <FaRegUser className="text-purple-600" size={32} />, title: "Student Registration" },
    { icon: <FaBullhorn className="text-purple-600" size={32} />, title: "Job Postings" },
    { icon: <FaCalendarCheck className="text-purple-600" size={32} />, title: "Placement Scheduling" },
    { icon: <FaBell className="text-purple-600" size={32} />, title: "Real-Time Notifications" },
    { icon: <FaChartLine className="text-purple-600" size={32} />, title: "Data Analytics" },
  ];

  useEffect(() => {
    AOS.init(); // Initialize AOS
  }, []);

  return (
    <section id="features" className="py-16 px-20 bg-gray-50">
      <h1
        className="text-3xl text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-700 via-purple-500 to-purple-300 tracking-widest mb-8"
        style={{ fontFamily: "Poppins, sans-serif" }}
        data-aos="fade-up" // AOS effect for title
      >
        Features
      </h1>
      <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
        {/* Left - Image */}
        <div className="lg:w-1/3 flex justify-center" data-aos="fade-right" data-aos-duration="1000">
          <img
            src="https://www.debutinfotech.com/images/web-development/Web%20Application%20Development%20Company.webp"
            alt="Features"
            className="w-full"
          />
        </div>

        {/* Right - Auto Scroll Sections */}
        <div className="lg:w-2/3 space-y-8 mt-12">
          {/* First Auto-Scroll */}
          <div
            ref={containerRef1}
            className="flex overflow-x-auto whitespace-nowrap space-x-8 py-4 px-6 bg-white border rounded-lg shadow-md scrollbar-hidden h-1/2"
            onMouseEnter={handleMouseEnter1}
            onMouseLeave={handleMouseLeave1}
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            data-aos="fade-up" // AOS effect for first scroll section
            data-aos-duration="1000"
          >
            {[...features, ...features].map((feature, index) => (
              <div
                key={`first-${index}`}
                className="flex-none w-96 h-32 bg-gradient-to-r from-purple-100 via-purple-50 to-purple-200 rounded-lg shadow-lg flex flex-col items-center justify-center gap-2 cursor-pointer transform transition-all duration-200 hover:scale-105"
              >
                <div className="flex items-center justify-center">{feature.icon}</div>
                <div className="text-center text-lg font-semibold text-purple-700">{feature.title}</div>
              </div>
            ))}
          </div>

          {/* Second Auto-Scroll */}
          <div
            ref={containerRef2}
            className="flex overflow-x-auto whitespace-nowrap space-x-8 py-4 px-6 bg-white border rounded-lg shadow-md scrollbar-hidden h-1/2"
            onMouseEnter={handleMouseEnter2}
            onMouseLeave={handleMouseLeave2}
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            data-aos="fade-up" // AOS effect for second scroll section
            data-aos-duration="1000"
            data-aos-delay="200"
          >
            {[...features, ...features].map((feature, index) => (
              <div
                key={`second-${index}`}
                className="flex-none w-96 h-32 bg-gradient-to-r from-purple-50 via-purple-100 to-purple-200 rounded-lg shadow-lg flex flex-col items-center justify-center gap-2 cursor-pointer transform transition-all duration-200 hover:scale-105"
              >
                <div className="flex items-center justify-center">{feature.icon}</div>
                <div className="text-center text-lg font-semibold text-purple-700">{feature.title}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
