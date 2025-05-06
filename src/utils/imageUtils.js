// Utility functions for handling images

/**
 * Gets a data URL from a file input
 * @param {File} file - The image file to convert to data URL
 * @returns {Promise<string>} A promise that resolves to the data URL
 */
export const getImageDataUrl = (file) => {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject(new Error('No file provided'));
      return;
    }
    
    const reader = new FileReader();
    
    reader.onload = () => {
      resolve(reader.result);
    };
    
    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };
    
    reader.readAsDataURL(file);
  });
};

/**
 * Resizes an image to the specified dimensions
 * @param {string} dataUrl - The data URL of the image
 * @param {number} maxWidth - Maximum width of the resized image
 * @param {number} maxHeight - Maximum height of the resized image
 * @returns {Promise<string>} A promise that resolves to the resized image data URL
 */
export const resizeImage = (dataUrl, maxWidth = 800, maxHeight = 600) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    
    img.onload = () => {
      const canvas = document.createElement('canvas');
      let width = img.width;
      let height = img.height;
      
      // Calculate new dimensions while maintaining aspect ratio
      if (width > maxWidth || height > maxHeight) {
        const ratio = Math.min(maxWidth / width, maxHeight / height);
        width = width * ratio;
        height = height * ratio;
      }
      
      canvas.width = width;
      canvas.height = height;
      
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, width, height);
      
      const resizedDataUrl = canvas.toDataURL('image/jpeg', 0.8);
      resolve(resizedDataUrl);
    };
    
    img.onerror = () => {
      reject(new Error('Failed to load image'));
    };
    
    img.src = dataUrl;
  });
};

/**
 * Compresses an image file to reduce its size
 * @param {File} file - The image file to compress
 * @param {number} quality - Quality of the compressed image (0-1)
 * @param {number} maxWidth - Maximum width of the compressed image
 * @param {number} maxHeight - Maximum height of the compressed image
 * @returns {Promise<Blob>} A promise that resolves to the compressed image blob
 */
export const compressImage = async (file, quality = 0.8, maxWidth = 1200, maxHeight = 900) => {
  try {
    const dataUrl = await getImageDataUrl(file);
    const resizedDataUrl = await resizeImage(dataUrl, maxWidth, maxHeight);
    
    return dataUrlToBlob(resizedDataUrl);
  } catch (error) {
    console.error('Error compressing image:', error);
    throw error;
  }
};

/**
 * Converts a data URL to a Blob
 * @param {string} dataUrl - The data URL to convert
 * @returns {Blob} The resulting Blob
 */
export const dataUrlToBlob = (dataUrl) => {
  const arr = dataUrl.split(',');
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  
  return new Blob([u8arr], { type: mime });
};

/**
 * Creates an object URL for a file
 * @param {File} file - The file to create an object URL for
 * @returns {string} The object URL
 */
export const createObjectURL = (file) => {
  return URL.createObjectURL(file);
};

/**
 * Revokes an object URL to free up memory
 * @param {string} url - The object URL to revoke
 */
export const revokeObjectURL = (url) => {
  URL.revokeObjectURL(url);
};

/**
 * Cleans up image URLs to prevent memory leaks
 * @param {Array<string>} urls - Array of URLs to clean up
 */
export const cleanupImageUrls = (urls) => {
  if (Array.isArray(urls)) {
    urls.forEach(url => {
      if (url && url.startsWith('blob:')) {
        revokeObjectURL(url);
      }
    });
  }
};

/**
 * Validates an image file (type and size)
 * @param {File} file - The image file to validate
 * @param {number} maxSizeMB - Maximum file size in MB
 * @returns {Object} Validation result with isValid and error message
 */
export const validateImage = (file, maxSizeMB = 5) => {
  const maxSizeBytes = maxSizeMB * 1024 * 1024;
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
  
  if (!file) {
    return { isValid: false, error: 'No file provided' };
  }
  
  if (!allowedTypes.includes(file.type)) {
    return { isValid: false, error: 'File type not supported. Please upload JPEG, PNG, GIF, or WebP images.' };
  }
  
  if (file.size > maxSizeBytes) {
    return { isValid: false, error: `File size exceeds the maximum limit of ${maxSizeMB}MB.` };
  }
  
  return { isValid: true };
};

export default {
  getImageDataUrl,
  resizeImage,
  compressImage,
  dataUrlToBlob,
  createObjectURL,
  revokeObjectURL,
  cleanupImageUrls,
  validateImage
}; 