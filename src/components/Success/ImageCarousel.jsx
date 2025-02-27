import React, { useState, useEffect, useRef } from 'react';
import { preloadedImageUrls } from '../../utils/firebaseStorageService';

const ImageCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const autoPlayRef = useRef(null);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % preloadedImageUrls.length);
  };

  // Auto play functionality
  useEffect(() => {
    // Set new timeout
    autoPlayRef.current = setInterval(nextSlide, 3000); // 3 seconds

    // Cleanup interval on component unmount
    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, []);

  return (
    <div className="relative w-full max-w-4xl mx-auto overflow-hidden rounded-xl shadow-lg my-8 bg-white">
      <div className="relative h-72 md:h-96">
        {preloadedImageUrls.map((image, index) => (
          <div
            key={image.id}
            className={`absolute w-full h-full transition-all duration-500 ease-in-out ${
              index === currentIndex 
                ? 'opacity-100 translate-x-0 z-10' 
                : index < currentIndex 
                  ? 'opacity-0 -translate-x-full z-0' 
                  : 'opacity-0 translate-x-full z-0'
            }`}
          >
            <div className="w-full h-full flex items-center justify-center bg-black">
              <img 
                src={image.url} 
                alt={image.alt}
                className="max-w-full max-h-full object-contain"
              />
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-white">
              <h3 className="text-sm opacity-80">The Gooden Family</h3>
            </div>
          </div>
        ))}
      </div>
      
      {/* Dots indicators */}
      <div className="flex justify-center gap-2 my-4 pb-2">
        {preloadedImageUrls.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? 'bg-primary-600 w-6' 
                : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;