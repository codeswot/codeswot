export type Profile = {
  about: string;
  email: string;
  footTag: string;
  github: string;
  intro: string;
  twitter: string;
  resume: string;
  profilePhoto: string;
  linkedIn: string;
  favoriteTools: Array<string>;
};

export type Link = {
  id: string;
  link: string;
  type: string;
};

export type Tech = {
  description: string;
  icon: string;
  id: string;
  name: string;
  url: string;
};

export type Project = {
  id: string;
  description: string;
  icon: string;
  playStoreLink: string;
  technologies: Array<string>;
  title: string;
  webLink: string;
  links: Array<Link>;
};
export type Experience = {
  id: string;
  company: string;
  current: Boolean;
  location: string;
  desc: string;
  links: Array<string>;
  tasks: Array<string>;
  startDate: string;
  endDate: string;
  title: string;
};

export type Mentor = {
  id: string;
  bio: string;
  email: string;
  desc: string;
  github: string;
  linkedin: string;
  name: string;
  title: string;
  twitter: string;
  fName: string;
  lName: string;
};
export type Quote = {
  id: string;
  default: Boolean;
  quote: string;
  author: string;
};
