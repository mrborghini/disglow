import React from 'react';
import './Homepage.css'

const Homepage = () => {
  const scrollToNextPage = () => {
    window.scrollTo({
      top: window.innerHeight, 
      behavior: 'smooth'
    });
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source src="bgvideo.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
      {/* Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>

      {/* Logo and Subtitle Container */}
      <div className="absolute inset-0 flex flex-col items-center justify-center space-y-4">
        <img src="logo.svg" alt="Logo" className="w-2/4" />
        <h2 className="text-white text-2xl font-light">
          Discover Your Best Look with disGLOW
        </h2>
      </div>

      {/* Scroll Down Button */}
      <div className="absolute left-1/2 bottom-10 transform -translate-x-1/2">
        <div
          onClick={scrollToNextPage}
          className="scroll-down h-12 w-12 border-2 border-white rounded-full flex items-center justify-center cursor-pointer transition duration-300 relative"
        >
          {/* Optionally add an arrow or icon inside */}
        </div>
      </div>
    </div>
  );
};

export default Homepage;
