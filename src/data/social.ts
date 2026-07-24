export interface SocialItem {
  id: string;
  link: string;
  text: string;
}

export const socialItems: SocialItem[] = [
  {
    id: 'email',
    link: 'mailto:fassko@gmail.com',
    text: 'fassko@gmail.com',
  },
  {
    id: 'linkedin',
    link: 'https://www.linkedin.com/in/kristapsgrinbergs/',
    text: 'kristapsgrinbergs',
  },
  {
    id: 'x',
    link: 'https://x.com/fassko',
    text: '@fassko',
  },
  {
    id: 'github',
    link: 'https://github.com/fassko',
    text: 'fassko',
  },
  {
    id: 'telegram',
    link: 'https://t.me/kristapsgrinbergs',
    text: 'kristapsgrinbergs',
  },
];
