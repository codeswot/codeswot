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
  onSnapshot,
  serverTimestamp,
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

export interface ChatMessage {
  id: string;
  content: string;
  timestamp: Timestamp;
  user: string;
}

export const generateUserId = (): string => {
  // Device fingerprinting for consistent ID across browsers on same device
  const fingerprint = {
    // Screen characteristics (stable across browsers)
    screen: `${screen.width}x${screen.height}x${screen.colorDepth}`,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    language: navigator.language,
    platform: navigator.platform,
    // Hardware concurrency (CPU cores)
    cores: navigator.hardwareConcurrency || 'unknown',
    // Memory info if available
    memory: (navigator as any).deviceMemory || 'unknown',
    // Canvas fingerprint (more stable than user agent)
    canvas: getCanvasFingerprint(),
  };

  // Create a stable string from device characteristics
  const deviceString = Object.values(fingerprint).join('|');
  
  // Generate consistent hash
  let hash = 0;
  for (let i = 0; i < deviceString.length; i++) {
    const char = deviceString.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  
  return `device_${Math.abs(hash).toString(36)}`;
};

// Get or create a persistent device ID
export const getOrCreateDeviceId = (): string => {
  const STORAGE_KEY = 'deviceId';
  
  // Try to get existing device ID from localStorage
  let deviceId = localStorage.getItem(STORAGE_KEY);
  
  if (!deviceId) {
    // Generate new device ID and store it
    deviceId = generateUserId();
    localStorage.setItem(STORAGE_KEY, deviceId);
  }
  
  return deviceId;
};

// Canvas fingerprinting for additional uniqueness
const getCanvasFingerprint = (): string => {
  try {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return 'no_canvas';
    
    // Draw some text with specific styling
    ctx.textBaseline = 'top';
    ctx.font = '14px Arial';
    ctx.fillStyle = '#f60';
    ctx.fillRect(125, 1, 62, 20);
    ctx.fillStyle = '#069';
    ctx.fillText('Device fingerprint', 2, 15);
    ctx.fillStyle = 'rgba(102, 204, 0, 0.7)';
    ctx.fillText('Device fingerprint', 4, 17);
    
    return canvas.toDataURL().slice(-50); // Last 50 chars for uniqueness
  } catch (e) {
    return 'canvas_error';
  }
};

const GREETING_MESSAGES = [
  "Hello 👋 How may I be of help?",
  "Hey there! What can I do for you today?",  
  "Hi there! What would you like to know?",
  "Hey! Ready to have a conversation? 💬",
  "Hi! What's on your mind?",
  "Hello there! How can I be of service?"
];

export const initializeChat = async (userId: string): Promise<string> => {
  try {
    const chatRef = doc(db, 'chats', userId);
    const messagesRef = collection(chatRef, 'messages');
    
    
    const existingMessages = await getDocs(messagesRef);
    if (existingMessages.empty) {
      // Pick a random greeting message
      const randomGreeting = GREETING_MESSAGES[Math.floor(Math.random() * GREETING_MESSAGES.length)];
      
      await addDoc(messagesRef, {
        content: randomGreeting,
        timestamp: serverTimestamp(),
        user: "codeswot"
      });
    }
    
    return userId;
  } catch (error) {
    console.error('Error initializing chat:', error);
    throw error;
  }
};

export const sendMessage = async (userId: string, content: string): Promise<void> => {
  try {
    const chatRef = doc(db, 'chats', userId);
    const messagesRef = collection(chatRef, 'messages');
    
    await addDoc(messagesRef, {
      content,
      timestamp: serverTimestamp(),
      user: userId
    });
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
};

export const subscribeToMessages = (
  userId: string,
  callback: (messages: ChatMessage[]) => void
): (() => void) => {
  const chatRef = doc(db, 'chats', userId);
  const messagesRef = collection(chatRef, 'messages');
  const q = query(messagesRef, orderBy('timestamp', 'asc'));
  
  return onSnapshot(q, (snapshot) => {
    const messages = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as ChatMessage[];
    callback(messages);
  });
};