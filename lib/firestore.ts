import { 
  collection, 
  doc, 
  addDoc, 
  updateDoc,   
  getDocs, 
  query, 
  where, 
  orderBy, 
  limit,
  Timestamp,  
} from 'firebase/firestore';
import { db } from './firebase';

export interface Profile {
  id: string;
  about: string;
  email: string;
  favoriteTools: string[];
  footTag: string;
  github: string;
  intro: string;
  introHeader: string;
  linkedIn: string;
  profilePhoto: string;
  resume: string;
  twitter: string;
}

export const getProfile = async (): Promise<Profile | null> => {
  const q = query(collection(db, 'codeswot'), limit(1));
  const snap = await getDocs(q);
  if (snap.empty) return null;
  const d = snap.docs[0];
  return { id: d.id, ...(d.data() as Omit<Profile, 'id'>) };
};

export interface Quote {
  id: string;
  author: string;
  quote: string;
  default?: boolean;
}

export const getQuotes = async (): Promise<Quote[]> => {
  const q = query(
    collection(db, 'quotes'),
    where('default', '==', true)
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<Quote, 'id'>) }));
};

export interface Mentor {
  id: string;
  name: string;
  fName?: string;
  lName?: string;
  title?: string;
  desc?: string;
  bio?: string;
  avatar?: string;
  github?: string;
  twitter?: string;
  linkedin?: string;
  email?: string;
}

export const getMentors = async (limitCount: number = 3): Promise<Mentor[]> => {
  const q = query(collection(db, 'mentors'), limit(limitCount));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<Mentor, 'id'>) }));
};

export interface ExperienceItem {
  id: string;
  company: string;
  title: string;
  desc: string;
  start: Timestamp | Date;
  end?: Timestamp | Date | null;
  current?: boolean;
  location?: string;
  links?: string[];
}

export const getExperience = async (): Promise<ExperienceItem[]> => {
  const q = query(collection(db, 'experience'), orderBy('start', 'desc'));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<ExperienceItem, 'id'>) }));
};

export interface Tech {
  id: string;
  name: string;
  icon?: string;
  url?: string;
  description?: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  icon?: string;
  techs?: string[];
}

export interface ProjectWithTechs extends Omit<ProjectItem, 'techs'> {
  technologies: Tech[];
}

export const getTechs = async (): Promise<Record<string, Tech>> => {
  const snap = await getDocs(collection(db, 'techs'));
  const map: Record<string, Tech> = {};
  snap.forEach((d) => {
    const t = { id: d.id, ...(d.data() as Omit<Tech, 'id'>) };
    map[t.id] = t;
  });
  return map;
};

export const getProjectsWithTechs = async (): Promise<ProjectWithTechs[]> => {
  const [projectsSnap, techMap] = await Promise.all([
    getDocs(collection(db, 'projects')),
    getTechs(),
  ]);

  return projectsSnap.docs.map((d) => {
    const p = { id: d.id, ...(d.data() as Omit<ProjectItem, 'id'>) };
    const techIds = Array.isArray(p.techs) ? p.techs : [];
    const technologies = techIds
      .map((id) => techMap[id])
      .filter(Boolean);
    const { techs, ...rest } = p;
    return { ...rest, technologies } as ProjectWithTechs;
  });
};

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

export const trackSectionView = async (section: string) => {
  try {
    await addDoc(collection(db, 'section_views'), {
      section,
      timestamp: Timestamp.now(),
      page: typeof location !== 'undefined' ? location.pathname : 'unknown',
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'unknown'
    });
  } catch (error) {
    console.error('Error tracking section view:', error);
  }
};

export const trackLinkClick = async (label: string, url: string) => {
  try {
    await addDoc(collection(db, 'link_clicks'), {
      label,
      url,
      timestamp: Timestamp.now(),
      page: typeof location !== 'undefined' ? location.pathname : 'unknown',
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'unknown'
    });
  } catch (error) {
    console.error('Error tracking link click:', error);
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