// // Fetch the user's IP address using a public API
// export const getUserIpAddress = async () => {
//     try {
//       const response = await fetch('https://api.ipify.org?format=json');
//       const data = await response.json();
//       return data.ip;
//     } catch (error) {
//       console.error('Error fetching IP address:', error);
//       // Fallback to session storage ID if we can't get the IP
//       return generateSessionId();
//     }
//   };
  
//   // Generate a unique session ID as fallback if IP detection fails
//   const generateSessionId = () => {
//     // Check if we already have a session ID stored
//     let sessionId = sessionStorage.getItem('baby_prediction_session_id');
    
//     if (!sessionId) {
//       // Generate a random session ID
//       sessionId = 'session_' + Math.random().toString(36).substring(2, 15);
//       sessionStorage.setItem('baby_prediction_session_id', sessionId);
//     }
    
//     return sessionId;
//   };


// Temporary fix for IP address issues
export const getUserIpAddress = async () => {
  // Return a fixed dummy value instead of fetching the real IP
  return "dummy-ip-123";
};

// Generate a unique session ID as fallback if IP detection fails
const generateSessionId = () => {
  // Check if we already have a session ID stored
  let sessionId = sessionStorage.getItem('baby_prediction_session_id');
  
  if (!sessionId) {
    // Generate a random session ID
    sessionId = 'session_' + Math.random().toString(36).substring(2, 15);
    sessionStorage.setItem('baby_prediction_session_id', sessionId);
  }
  
  return sessionId;
};