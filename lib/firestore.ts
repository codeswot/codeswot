import { 
  collection, 
  doc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  getDoc, 
  getDocs, 
  query, 
  where, 
  orderBy, 
  limit,
  Timestamp,
  DocumentReference,
  QueryConstraint
} from 'firebase/firestore';
import { db } from './firebase';

// Contact form submission
export interface ContactFormData {
  name: string;
  email: string;
  message: string;
  timestamp: Timestamp;
  read: boolean;
}

// Analytics/visitor tracking
export interface VisitorData {
  timestamp: Timestamp;
  userAgent: string;
  referrer: string;
  page: string;
}

// Project views tracking
export interface ProjectView {
  projectId: string;
  timestamp: Timestamp;
  userAgent: string;
}

// Contact form functions
export const submitContactForm = async (formData: Omit<ContactFormData, 'timestamp' | 'read'>) => {
  try {
    const docRef = await addDoc(collection(db, 'contacts'), {
      ...formData,
      timestamp: Timestamp.now(),
      read: false
    });
    return docRef.id;
  } catch (error) {
    console.error('Error submitting contact form:', error);
    throw error;
  }
};

export const getContactMessages = async () => {
  try {
    const q = query(
      collection(db, 'contacts'),
      orderBy('timestamp', 'desc')
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as (ContactFormData & { id: string })[];
  } catch (error) {
    console.error('Error getting contact messages:', error);
    throw error;
  }
};

export const markMessageAsRead = async (messageId: string) => {
  try {
    const messageRef = doc(db, 'contacts', messageId);
    await updateDoc(messageRef, {
      read: true
    });
  } catch (error) {
    console.error('Error marking message as read:', error);
    throw error;
  }
};

// Analytics functions
export const trackVisitor = async (visitorData: Omit<VisitorData, 'timestamp'>) => {
  try {
    await addDoc(collection(db, 'visitors'), {
      ...visitorData,
      timestamp: Timestamp.now()
    });
  } catch (error) {
    console.error('Error tracking visitor:', error);
    // Don't throw error for analytics to avoid breaking user experience
  }
};

export const trackProjectView = async (projectId: string) => {
  try {
    await addDoc(collection(db, 'project_views'), {
      projectId,
      timestamp: Timestamp.now(),
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'unknown'
    });
  } catch (error) {
    console.error('Error tracking project view:', error);
    // Don't throw error for analytics
  }
};

// Get analytics data (for admin use)
export const getVisitorStats = async (days: number = 30) => {
  try {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);
    
    const q = query(
      collection(db, 'visitors'),
      where('timestamp', '>=', Timestamp.fromDate(cutoffDate)),
      orderBy('timestamp', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as (VisitorData & { id: string })[];
  } catch (error) {
    console.error('Error getting visitor stats:', error);
    throw error;
  }
};

export const getProjectViewStats = async (days: number = 30) => {
  try {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);
    
    const q = query(
      collection(db, 'project_views'),
      where('timestamp', '>=', Timestamp.fromDate(cutoffDate)),
      orderBy('timestamp', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as (ProjectView & { id: string })[];
  } catch (error) {
    console.error('Error getting project view stats:', error);
    throw error;
  }
};