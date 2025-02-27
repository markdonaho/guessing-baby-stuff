// src/components/Success/ImageCarousel.jsx
import React, { useState, useEffect, useRef } from 'react';
import { FiChevronLeft, FiChevronRight, FiX, FiPause, FiPlay } from 'react-icons/fi';
import { preloadedImageUrls, firebaseStorageService } from '../../utils/firebaseStorageService';

const ImageCarousel = () => {
  const [images, setImages] = useState(preloadedImageUrls);
  const [isLoading, setIsLoading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [autoScrollPaused, setAutoScrollPaused] = useState(false);
  const [userInteractionCount, setUserInteractionCount] = useState(0);
  const [showAutoScrollToggle, setShowAutoScrollToggle] = useState(false);
  
  const carouselRef = useRef(null);
  const autoPlayRef = useRef(null);
  const resumeTimeoutRef = useRef(null);
  const lastInteractionRef = useRef(Date.now());

  // Fetch additional images from Firebase Storage if needed
  useEffect(() => {
    const fetchAdditionalImages = async () => {
      setIsLoading(true);
      try {
        // Using the existing preloaded images for now
        // We can uncomment the following to fetch more images dynamically
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
      // We don't want to track this state since it's not defined
      // setIsUserInteracting(true);
      // onInteraction && onInteraction();
    }
    
    // Reset the interaction timer
    if (resumeTimeoutRef.current) {
      clearTimeout(resumeTimeoutRef.current);
    }
    
    // Track user interactions
    const newCount = userInteractionCount + 1;
    setUserInteractionCount(newCount);
    
    // Show toggle button after 3 interactions
    if (newCount >= 3 && !showAutoScrollToggle) {
      setShowAutoScrollToggle(true);
    }
    
    // Auto-hide controls after 5 seconds of inactivity (removed since we don't have isUserInteracting)
    resumeTimeoutRef.current = setTimeout(() => {
      if (!autoScrollPaused) {
        resumeAutoScroll();
      }
    }, 15000); // 15 seconds
  };

  const toggleAutoScroll = () => {
    if (autoScrollPaused) {
      resumeAutoScroll();
    } else {
      pauseAutoScroll(true); // Permanent pause
    }
  };

  const pauseAutoScroll = (permanent = false) => {
    if (autoPlayRef.current) {
      clearTimeout(autoPlayRef.current);
    }
    
    if (permanent) {
      setAutoScrollPaused(true);
    }
  };

  const resumeAutoScroll = () => {
    setAutoScrollPaused(false);
    startAutoPlay();
  };

  const nextSlide = (userInitiated = false) => {
    if (userInitiated) {
      handleUserInteraction();
    }
    
    const newIndex = (currentIndex + 1) % images.length;
    goToSlide(newIndex);
  };

  const prevSlide = (userInitiated = false) => {
    if (userInitiated) {
      handleUserInteraction();
    }
    
    const newIndex = (currentIndex - 1 + images.length) % images.length;
    goToSlide(newIndex);
  };

  // Handle navigation
  const goToSlide = (index) => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setCurrentIndex(index);
    
    // Reset animation state after transition completes
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };

  const startAutoPlay = () => {
    // Don't start if auto-scroll is paused
    if (autoScrollPaused) return;
    
    // Clear existing timeout
    if (autoPlayRef.current) {
      clearTimeout(autoPlayRef.current);
    }
    
    // Set new timeout
    autoPlayRef.current = setTimeout(() => {
      nextSlide();
    }, 1500); // 1.5 seconds
  };

  // Toggle fullscreen mode
  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
    // Pause autoplay when entering fullscreen
    if (!isFullScreen) {
      pauseAutoScroll();
    } else if (!autoScrollPaused) {
      resumeAutoScroll();
    }
  };

  // Handle escape key to exit fullscreen
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === 'Escape' && isFullScreen) {
        setIsFullScreen(false);
      }
    };

    window.addEventListener('keydown', handleEscKey);
    return () => window.removeEventListener('keydown', handleEscKey);
  }, [isFullScreen]);

  // Auto play functionality - only when not in fullscreen
  useEffect(() => {
    if (isFullScreen) return;

    startAutoPlay();

    // Pause on hover
    const carousel = carouselRef.current;
    
    const pauseOnHover = () => {
      if (autoPlayRef.current) {
        clearTimeout(autoPlayRef.current);
      }
    };
    
    const resumeAfterHover = () => {
      if (!autoScrollPaused) {
        startAutoPlay();
      }
    };

    if (carousel) {
      carousel.addEventListener('mouseenter', pauseOnHover);
      carousel.addEventListener('mouseleave', resumeAfterHover);
    }

    return () => {
      if (autoPlayRef.current) {
        clearTimeout(autoPlayRef.current);
      }
      
      if (resumeTimeoutRef.current) {
        clearTimeout(resumeTimeoutRef.current);
      }
      
      if (carousel) {
        carousel.removeEventListener('mouseenter', pauseOnHover);
        carousel.removeEventListener('mouseleave', resumeAfterHover);
      }
    };
  }, [isFullScreen, autoScrollPaused, images.length, currentIndex]); // Added currentIndex as dependency

  // Handle click events inside fullscreen mode
  const handleFullScreenClick = (e) => {
    // Prevent clicks on the image from closing fullscreen
    if (e.target.tagName.toLowerCase() === 'img') {
      e.stopPropagation();
    }
  };

  return (
    <>
      {/* Regular carousel view */}
      <div 
        ref={carouselRef}
        className="relative w-full max-w-4xl mx-auto overflow-hidden rounded-xl shadow-lg my-8 bg-white cursor-pointer"
        onClick={toggleFullScreen}
      >
        {/* Main carousel container */}
        <div className="relative h-72 md:h-96">
          {/* Loading spinner */}
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center z-20 bg-white bg-opacity-80">
              <div className="w-12 h-12 border-4 border-gray-200 border-t-primary-600 rounded-full animate-spin"></div>
            </div>
          )}
          
          {/* Images */}
          {images.map((image, index) => (
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
                <h3 className="text-lg font-medium">{image.alt}</h3>
                <p className="text-sm opacity-80">The Gooden Family</p>
              </div>
            </div>
          ))}
          
          {/* Navigation arrows */}
          <button
            onClick={(e) => { e.stopPropagation(); prevSlide(true); }}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-white/30 hover:bg-white/70 backdrop-blur-sm rounded-full p-2 text-white hover:text-primary-800 shadow-lg transition-all duration-200 transform hover:scale-110"
            aria-label="Previous slide"
          >
            <FiChevronLeft size={24} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); nextSlide(true); }}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-white/30 hover:bg-white/70 backdrop-blur-sm rounded-full p-2 text-white hover:text-primary-800 shadow-lg transition-all duration-200 transform hover:scale-110"
            aria-label="Next slide"
          >
            <FiChevronRight size={24} />
          </button>
          
          {/* Auto-scroll toggle button (shows after 3 user interactions) */}
          {showAutoScrollToggle && (
            <button
              onClick={(e) => { e.stopPropagation(); toggleAutoScroll(); }}
              className="absolute top-2 right-2 z-20 bg-white/30 hover:bg-white/70 backdrop-blur-sm rounded-full p-2 text-white hover:text-primary-800 shadow-lg transition-all duration-200"
              aria-label={autoScrollPaused ? "Resume auto-scroll" : "Pause auto-scroll"}
            >
              {autoScrollPaused ? <FiPlay size={18} /> : <FiPause size={18} />}
            </button>
          )}
        </div>
        
        {/* Dots indicators */}
        <div className="flex justify-center gap-2 my-4 pb-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={(e) => { e.stopPropagation(); goToSlide(index); handleUserInteraction(); }}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-primary-600 w-6' 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
      
      {/* Fullscreen carousel view */}
      {isFullScreen && (
        <div 
          className="fixed inset-0 bg-black z-50 flex items-center justify-center"
          onClick={toggleFullScreen}
          onKeyDown={(e) => e.key === 'Escape' && toggleFullScreen()}
          tabIndex={0}
        >
          {/* Close button */}
          <button
            onClick={toggleFullScreen}
            className="absolute top-4 right-4 z-50 bg-white/20 hover:bg-white/50 rounded-full p-2 text-white transition-all duration-200"
            aria-label="Close fullscreen"
          >
            <FiX size={28} />
          </button>
          
          {/* Auto-scroll toggle button in fullscreen (always visible) */}
          <button
            onClick={(e) => { e.stopPropagation(); toggleAutoScroll(); }}
            className="absolute top-4 left-4 z-50 bg-white/20 hover:bg-white/50 rounded-full p-2 text-white transition-all duration-200"
            aria-label={autoScrollPaused ? "Resume auto-scroll" : "Pause auto-scroll"}
          >
            {autoScrollPaused ? <FiPlay size={24} /> : <FiPause size={24} />}
          </button>
          
          {/* Fullscreen image container */}
          <div 
            className="relative w-full h-full flex items-center justify-center"
            onClick={handleFullScreenClick}
          >
            {images.map((image, index) => (
              <div
                key={image.id}
                className={`absolute inset-0 transition-all duration-500 ease-in-out ${
                  index === currentIndex 
                    ? 'opacity-100 translate-x-0 z-10' 
                    : index < currentIndex 
                      ? 'opacity-0 -translate-x-full z-0' 
                      : 'opacity-0 translate-x-full z-0'
                }`}
              >
                <div className="w-full h-full flex items-center justify-center p-4 md:p-12">
                  <img 
                    src={image.url} 
                    alt={image.alt}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
              </div>
            ))}
            
            {/* Fullscreen navigation */}
            <button
              onClick={(e) => { e.stopPropagation(); prevSlide(true); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-white/20 hover:bg-white/50 rounded-full p-3 text-white transition-all duration-200 transform hover:scale-110"
              aria-label="Previous slide"
            >
              <FiChevronLeft size={32} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); nextSlide(true); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-white/20 hover:bg-white/50 rounded-full p-3 text-white transition-all duration-200 transform hover:scale-110"
              aria-label="Next slide"
            >
              <FiChevronRight size={32} />
            </button>
            
            {/* Fullscreen caption */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6 text-white">
              <h2 className="text-2xl font-medium">{images[currentIndex]?.alt || 'Image'}</h2>
              <p className="text-lg opacity-80">The Gooden Family</p>
              
              {/* Fullscreen dots indicators */}
              <div className="flex justify-center gap-3 mt-4">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={(e) => { e.stopPropagation(); goToSlide(index); handleUserInteraction(); }}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
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
      )}
    </>
  );
};

export default ImageCarousel;