export interface NavigationItem {
  key: string;
  label: string;
  section: string;
  number: string;
}

export interface Experience {
  company: string;
  position: string;
  period: string;
  description: string;
  current?: boolean;
}

export interface Project {
  title: string;
  description: string;
  technologies: string[];
  link: string;
  github?: string;
}

export interface BlogPost {
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  link: string;
}

export interface Mentor {
  name: string;
  role: string;
  description: string;
  light?: boolean;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: React.ReactNode;
}
