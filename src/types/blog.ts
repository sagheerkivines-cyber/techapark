export type TechCategory = 
  | 'Cyber Security & Privacy'
  | 'Cloud Computing & Hosting'
  | 'Freelancing & Remote Work'
  | 'Gaming & Tech Culture'
  | 'Tech Tips & Troubleshooting';

export interface InfographicPanel {
  id: string;
  title: string;
  iconName: string;
  bullets: string[];
}

export interface InfographicData {
  title: string;
  subtitle: string;
  centerpiece: string;
  centerpieceIcon: string;
  panels: InfographicPanel[];
  promptReference: string;
}

export interface ArticleSection {
  heading: string;
  subheading?: string;
  content: string[];
  codeBlock?: {
    language: string;
    code: string;
    caption?: string;
  };
  table?: {
    headers: string[];
    rows: string[][];
  };
}

export interface Author {
  name: string;
  role: string;
  avatar: string;
  institution: string;
}

export interface Article {
  id: string;
  slug: string;
  category: TechCategory;
  categoryNumber: number;
  articleNumber: string; // e.g. "1.1"
  title: string;
  subtitle: string;
  summary: string;
  author: Author;
  publishDate: string;
  readTime: string;
  viewCount: string;
  wordCount: number;
  featured?: boolean;
  trending?: boolean;
  imageUrl?: string;
  tags: string[];
  infographic: InfographicData;
  sections: ArticleSection[];
  keyTakeaways: string[];
  faq?: { question: string; answer: string; }[];
}
