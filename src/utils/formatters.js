import { format } from 'date-fns';

// Format date for display
export const formatDate = (date) => {
  if (!date) return '';
  
  try {
    // Handle Firestore Timestamp objects
    if (date && typeof date === 'object' && date.seconds !== undefined) {
      // Convert Firestore Timestamp to JS Date
      return format(new Date(date.seconds * 1000), 'MM/dd/yyyy');
    }
    
    // Handle regular Date objects or date strings
    return format(new Date(date), 'MM/dd/yyyy');
  } catch (error) {
    console.error('Error formatting date:', error, date);
    return 'Invalid date';
  }
};

// Format time for display
export const formatTime = (time) => {
  if (!time) return '';
  
  try {
    // If it's already in HH:MM format as a string
    if (typeof time === 'string' && /^\d{1,2}:\d{2}$/.test(time)) {
      const [hours, minutes] = time.split(':').map(Number);
      const ampm = hours >= 12 ? 'PM' : 'AM';
      const displayHours = hours % 12 || 12; // Convert 0 to 12
      return `${displayHours}:${minutes.toString().padStart(2, '0')} ${ampm}`;
    }
    
    return time;
  } catch (error) {
    console.error('Error formatting time:', error, time);
    return time; // Return original time string on error
  }
};

// Format weight for display
export const formatWeight = (weight) => {
  if (!weight) return '';
  
  if (typeof weight === 'object' && weight !== null && weight.pounds !== undefined) {
    return `${weight.pounds} lbs ${weight.ounces} oz`;
  }
  return weight;
};

// Format length for display
export const formatLength = (length) => {
  if (!length) return '';
  
  if (typeof length === 'number') {
    return `${length} inches`;
  }
  return length;
};