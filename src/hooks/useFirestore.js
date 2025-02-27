import { useState, useEffect } from 'react';
import { 
  collection, addDoc, doc, deleteDoc, 
  query, where, getDocs, serverTimestamp 
} from 'firebase/firestore';
import { db } from '../utils/firebase';

export const useFirestore = (collectionName) => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);

  // Add a document
  const addDocument = async (data) => {
    setError(null);
    setIsPending(true);
    
    try {
      const docRef = await addDoc(collection(db, collectionName), {
        ...data,
        createdAt: serverTimestamp()
      });
      
      setIsPending(false);
      return docRef;
    } catch (err) {
      console.error('Error adding document:', err);
      setError('Could not add document');
      setIsPending(false);
      throw err;
    }
  };
  
  // Delete a document
  const deleteDocument = async (id) => {
    setError(null);
    setIsPending(true);
    
    try {
      await deleteDoc(doc(db, collectionName, id));
      setIsPending(false);
    } catch (err) {
      console.error('Error deleting document:', err);
      setError('Could not delete document');
      setIsPending(false);
      throw err;
    }
  };
  
  // Delete documents by IP address - MODIFIED to skip actual deletion
  const deleteDocumentsByIp = async (ipAddress) => {
    // Just return without doing anything - temporary fix
    return Promise.resolve();
    
    /* Original code commented out
    setError(null);
    setIsPending(true);
    
    try {
      // Query all documents with matching IP
      const q = query(
        collection(db, collectionName), 
        where("ipAddress", "==", ipAddress)
      );
      
      const querySnapshot = await getDocs(q);
      
      // Delete each document
      const deletePromises = querySnapshot.docs.map(doc => 
        deleteDoc(doc.ref)
      );
      
      await Promise.all(deletePromises);
      setIsPending(false);
    } catch (err) {
      console.error('Error deleting documents by IP:', err);
      setError('Could not delete documents');
      setIsPending(false);
      throw err;
    }
    */
  };
  
  // Check if IP has already submitted - MODIFIED to always return null
  const checkIpHasSubmission = async (ipAddress) => {
    // Return null to indicate no previous submission - temporary fix
    return null;
    
    /* Original code commented out
    try {
      const q = query(
        collection(db, collectionName), 
        where("ipAddress", "==", ipAddress)
      );
      
      const querySnapshot = await getDocs(q);
      return !querySnapshot.empty ? querySnapshot.docs[0].id : null;
    } catch (err) {
      console.error('Error checking IP submission:', err);
      setError('Could not check previous submissions');
      throw err;
    }
    */
  };

  return { 
    addDocument, 
    deleteDocument, 
    deleteDocumentsByIp, 
    checkIpHasSubmission, 
    error, 
    isPending 
  };
};