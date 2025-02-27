// Form validation utility functions
export const validateName = (name) => {
    if (!name.trim()) return 'Name is required';
    if (name.length < 2) return 'Name must be at least 2 characters';
    
    // Profanity filter - expand this list as needed
    const profanityList = [
      'ass', 'bastard', 'bitch', 'crap', 'damn', 'fuck', 'shit', 'piss', 
      'dick', 'douche', 'cunt', 'cock', 'pussy', 'whore', 'slut'
    ];
    
    const words = name.toLowerCase().split(/\s+/);
    for (const word of words) {
      if (profanityList.includes(word)) {
        return 'I wonder who\'s going to need to see this????? No!';
      }
    }
    
    return null;
  };
  
  export const validateRequired = (value, fieldName) => {
    return value ? null : `${fieldName} is required`;
  };