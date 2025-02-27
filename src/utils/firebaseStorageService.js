// src/utils/firebaseStorageService.js
import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";

/**
 * Service for interacting with Firebase Storage
 */
export const firebaseStorageService = {
  /**
   * Fetch images from a specific folder in Firebase Storage
   * @param {string} folderPath - The folder path in storage (e.g., 'baby-photos/')
   * @returns {Promise<Array>} - Array of image objects with id, url, and alt properties
   */
  fetchImagesFromFolder: async (folderPath = '') => {
    try {
      const storage = getStorage();
      const imagesRef = ref(storage, folderPath);
      const result = await listAll(imagesRef);
      
      const urls = await Promise.all(
        result.items.map(async (itemRef) => {
          const url = await getDownloadURL(itemRef);
          // Extract file name without extension for the alt text
          const fileName = itemRef.name.split('.')[0].replace(/_/g, ' ');
          
          return { 
            id: itemRef.name, 
            url, 
            alt: fileName || `Baby photo` 
          };
        })
      );
      
      return urls;
    } catch (error) {
      console.error('Error fetching images from Firebase Storage:', error);
      return [];
    }
  },
  
  /**
   * Get a download URL for a specific file in Firebase Storage
   * @param {string} filePath - The complete file path in storage
   * @returns {Promise<string>} - The download URL
   */
  getImageUrl: async (filePath) => {
    try {
      const storage = getStorage();
      const imageRef = ref(storage, filePath);
      return await getDownloadURL(imageRef);
    } catch (error) {
      console.error(`Error fetching image URL for ${filePath}:`, error);
      return null;
    }
  }
};

// Pre-defined Firebase Storage image URLs for immediate use
export const preloadedImageUrls = [
  {
    id: 'ultrasound',
    url: 'https://firebasestorage.googleapis.com/v0/b/guessing-baby-stuff.firebasestorage.app/o/UltrasoundCropped.png?alt=media&token=fbd29754-f843-45ae-b96a-2e69725fbc8e',
    alt: 'Ultrasound Image'
  },
  {
    id: 'gooden-family',
    url: 'https://firebasestorage.googleapis.com/v0/b/guessing-baby-stuff.firebasestorage.app/o/Goodens.png?alt=media&token=3a396e7f-b8db-4c13-90a3-777e9d8fb60e',
    alt: 'Gooden Family'
  },
  {
    id: 'baby-photo-1',
    url: 'https://firebasestorage.googleapis.com/v0/b/guessing-baby-stuff.firebasestorage.app/o/IMG_0803.png?alt=media&token=0a065e65-5e3a-49b5-a466-7e26448a6937',
    alt: 'Baby Photo'
  },
  {
    id: 'baby-photo-2',
    url: 'https://firebasestorage.googleapis.com/v0/b/guessing-baby-stuff.firebasestorage.app/o/IMG_4126.png?alt=media&token=324e27c7-9062-4b35-9362-2e9cbf270ba9',
    alt: 'Baby Photo'
  }
  
];