import talksData from './talks.json';

export interface TalkLink {
  href: string;
  text: string;
}

export interface Talk {
  date: string;
  title: string;
  event: string;
  description?: string;
  video?: string;
  slides?: string;
  audio?: string;
  image?: string;
  link?: TalkLink;
}

const talks = talksData as Talk[];

export default talks;
