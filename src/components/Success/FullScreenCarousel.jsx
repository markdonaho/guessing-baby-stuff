// src/components/Success/FullScreenCarousel.jsx
import React, { useState, useEffect, useRef } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { preloadedImageUrls, firebaseStorageService } from '../../utils/firebaseStorageService';

const FullScreenCarousel = ({ onInteraction }) => {
  const [images, setImages] = useState(preloadedImageUrls);
  const [isLoading, setIsLoading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isUserInteracting, setIsUserInteracting] = useState(false);
  const carouselRef = useRef(null);
  const autoPlayRef = useRef(null);
  const userInteractionTimeoutRef = useRef(null);

  // Fetch additional images from Firebase Storage if needed
  useEffect(() => {
    const fetchAdditionalImages = async () => {
      setIsLoading(true);
      try {
        // Uncomment to fetch more images dynamically
        /*
        const additionalImages = await firebaseStorageService.fetchImagesFromFolder('baby-photos/');
        const existingUrls = new Set(preloadedImageUrls.map(img => img.url));
        const uniqueNewImages = additionalImages.filter(img => !existingUrls.has(img.url));
        
        setImages([...preloadedImageUrls, ...uniqueNewImages]);
        */
      } catch (error) {
        console.error('Error fetching additional images:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchAdditionalImages();
  }, []);

  // Handle user interaction
  const handleUserInteraction = () => {
    if (!isUserInteracting) {
      setIsUserInteracting(true);
      onInteraction && onInteraction();
    }
    
    // Reset the interaction timer
    if (userInteractionTimeoutRef.current) {
      clearTimeout(userInteractionTimeoutRef.current);
    }
    
    // Auto-hide controls after 5 seconds of inactivity
    userInteractionTimeoutRef.current = setTimeout(() => {
      setIsUserInteracting(false);
    }, 5000);
  };

  // Handle navigation
  const goToSlide = (index) => {
    if (isAnimating) return;
    handleUserInteraction();
    
    setIsAnimating(true);
    setCurrentIndex(index);
    
    // Reset animation state after transition completes
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };

  const nextSlide = () => {
    const newIndex = (currentIndex + 1) % images.length;
    goToSlide(newIndex);
  };

  const prevSlide = () => {
    const newIndex = (currentIndex - 1 + images.length) % images.length;
    goToSlide(newIndex);
  };

  // Auto play functionality
  useEffect(() => {
    // Only auto-advance if user is not interacting
    if (isUserInteracting) return;
    
    const play = () => {
      autoPlayRef.current = setTimeout(() => {
        nextSlide();
      }, 5000); // Change slide every 5 seconds when not interacting
    };

    play();

    return () => {
      if (autoPlayRef.current) {
        clearTimeout(autoPlayRef.current);
      }
    };
  }, [currentIndex, isUserInteracting]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (autoPlayRef.current) {
        clearTimeout(autoPlayRef.current);
      }
      if (userInteractionTimeoutRef.current) {
        clearTimeout(userInteractionTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div 
      ref={carouselRef}
      className="absolute inset-0 bg-black"
      onClick={handleUserInteraction}
      onMouseMove={handleUserInteraction}
      onTouchStart={handleUserInteraction}
    >
      {/* Loading spinner */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center z-50 bg-black bg-opacity-60">
          <div className="w-12 h-12 border-4 border-gray-600 border-t-white rounded-full animate-spin"></div>
        </div>
      )}
      
      {/* Images */}
      {images.map((image, index) => (
        <div
          key={image.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentIndex 
              ? 'opacity-100 z-10' 
              : 'opacity-0 z-0'
          }`}
          style={{
            // Use a subtle zoom effect for transitions
            transform: index === currentIndex ? 'scale(1)' : 'scale(1.05)',
            transition: 'opacity 1s ease-in-out, transform 10s ease-in-out'
          }}
        >
          <div className="w-full h-full flex items-center justify-center">
            <img 
              src={image.url} 
              alt={image.alt}
              className="w-full h-full object-cover"
              style={{
                objectPosition: 'center',
                filter: 'brightness(0.85)' // Slightly darken the image for better text visibility
              }}
            />
          </div>
        </div>
      ))}
      
      {/* Navigation controls - only visible during user interaction */}
      <div 
        className={`absolute inset-0 transition-opacity duration-300 ease-in-out ${
          isUserInteracting ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Navigation arrows */}
        <button
          onClick={(e) => { e.stopPropagation(); prevSlide(); }}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 rounded-full p-3 text-white transition-all duration-200 transform hover:scale-110"
          aria-label="Previous slide"
        >
          <FiChevronLeft size={32} />
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); nextSlide(); }}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 rounded-full p-3 text-white transition-all duration-200 transform hover:scale-110"
          aria-label="Next slide"
        >
          <FiChevronRight size={32} />
        </button>
        
        {/* Caption */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 pointer-events-none">
          <div className="container mx-auto">
            <h3 className="text-xl font-medium text-white">{images[currentIndex]?.alt || 'Image'}</h3>
            <p className="text-sm text-white/80">The Gooden Family</p>
          </div>
        </div>
        
        {/* Dots indicators */}
        <div className="absolute bottom-24 left-0 right-0">
          <div className="flex justify-center gap-3">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={(e) => { e.stopPropagation(); goToSlide(index); }}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-white w-8' 
                    : 'bg-white/40 hover:bg-white/70'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullScreenCarousel;