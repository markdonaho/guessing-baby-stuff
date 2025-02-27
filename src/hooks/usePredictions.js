import { useState, useEffect, useCallback } from 'react';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';
import { db } from '../utils/firebase';

export const usePredictions = () => {
  const [predictions, setPredictions] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Use useCallback to memoize the function
  const getPredictions = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const q = query(
        collection(db, 'predictions'),
        orderBy('createdAt', 'desc')
      );
      
      const querySnapshot = await getDocs(q);
      const docs = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        // Convert timestamp to JS Date
        createdAt: doc.data().createdAt?.toDate() || new Date()
      }));
      
      setPredictions(docs);
      setIsLoading(false);
      return docs;
    } catch (err) {
      console.error('Error getting predictions:', err);
      setError('Could not load predictions');
      setIsLoading(false);
      throw err;
    }
  }, []); // Empty dependency array means this function is only created once

  return { predictions, error, isLoading, getPredictions };
};