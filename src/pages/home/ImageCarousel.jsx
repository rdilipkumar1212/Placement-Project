import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css'; // Make sure to import Swiper CSS
import 'swiper/css/pagination';

const ImageCarousel = () => {
    const images = [
        'https://www.svkm-iot.ac.in/wp-content/uploads/2022/05/ee-1-1143x800.jpg',
        'https://www.svkm-iot.ac.in/wp-content/uploads/2022/05/Mr.Parth-Punjabi-Infosys-V-TECH-Solutation-800x800.png',
        'https://www.svkm-iot.ac.in/wp-content/uploads/2022/05/Slide-1.jpg',
        'https://acpbhandara.edu.in/writereaddata/fckimagefile/IMG-20230606-WA0066.jpg',
    ];

    return (
        <div className="container mx-auto py-10">
            <Swiper
                modules={[Pagination, Autoplay]}
                spaceBetween={30}
                slidesPerView={3}  // Show 3 slides at once
                centeredSlides={true}  // Center the current slide
                autoplay={{ delay: 3000 }} // Automatic slide transition (every 3 seconds)
                pagination={{ clickable: true }} // Dots for navigation
                loop={true} // Infinite looping
                className="relative"
            >
                {images.map((image, index) => (
                    <SwiperSlide key={index} className="transform transition-all duration-500">
                        <div className="relative overflow-hidden rounded-lg shadow-lg transform transition-all duration-500 hover:scale-110 hover:shadow-xl">
                            <img
                                src={image}
                                alt={`Slide ${index + 1}`}
                                className="w-full h-64 object-cover rounded-lg"
                            />
                            {/* Add an overlay or text if desired */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-30"></div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default ImageCarousel;
