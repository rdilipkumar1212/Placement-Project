import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const TopCompanies = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 }); // Initialize AOS with a 1000ms animation duration
  }, []);

  return (
    <div className="bg-white py-12 -mt-10">
      <div 
        className="flex justify-center gap-8 items-center flex-wrap"
        data-aos="fade-up" // AOS attribute for fade-up animation
      >
        <img
          src={require("../../assets/TopCompanies.png")}
          alt="Top Companies"
          className="w-3/4 max-w-4xl"
        />
      </div>
    </div>
  );
};

export default TopCompanies;
