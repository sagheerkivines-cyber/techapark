import { TechCategory } from '../types/blog';

export interface CategoryMeta {
  id: TechCategory;
  num: number;
  slug: string;
  shortTitle: string;
  description: string;
  accentColor: string;
  badgeColor: string;
  icon: string;
  articleCount: number;
}

export const CATEGORIES_LIST: CategoryMeta[] = [
  {
    id: 'Cyber Security & Privacy',
    num: 1,
    slug: 'cyber-security-privacy',
    shortTitle: 'Security & Privacy',
    description: 'Cryptographic posture, endpoint hardening, threat intelligence, and zero-trust zero-knowledge personal protection architectures.',
    accentColor: '#5fdee7',
    badgeColor: 'border-[#5fdee7]/40 text-[#5fdee7]',
    icon: 'ShieldCheck',
    articleCount: 5
  },
  {
    id: 'Cloud Computing & Hosting',
    num: 2,
    slug: 'cloud-computing-hosting',
    shortTitle: 'Cloud & Hosting',
    description: 'Hyperscaler infrastructure, distributed storage engines, managed hypervisors, and multi-tenant high-availability deployments.',
    accentColor: '#38bdf8',
    badgeColor: 'border-sky-400/40 text-sky-400',
    icon: 'Cloud',
    articleCount: 4
  },
  {
    id: 'Freelancing & Remote Work',
    num: 3,
    slug: 'freelancing-remote-work',
    shortTitle: 'Freelancing & Remote',
    description: 'Contract negotiation frameworks, high-throughput asynchronous work systems, and decentralized global client pipelines.',
    accentColor: '#10b981',
    badgeColor: 'border-emerald-400/40 text-emerald-400',
    icon: 'Briefcase',
    articleCount: 4
  },
  {
    id: 'Gaming & Tech Culture',
    num: 4,
    slug: 'gaming-tech-culture',
    shortTitle: 'Gaming & Culture',
    description: 'Silicon benchmark metrics, thermal dissipation dynamics, optical tracking telemetry, and spatial VR immersion analysis.',
    accentColor: '#f43f5e',
    badgeColor: 'border-rose-400/40 text-rose-400',
    icon: 'Gamepad2',
    articleCount: 6
  },
  {
    id: 'Tech Tips & Troubleshooting',
    num: 5,
    slug: 'tech-tips-troubleshooting',
    shortTitle: 'Tech Tips & Fixes',
    description: 'Kernel diagnostic heuristics, battery discharge optimization, peripheral bus recovery, and low-level OS stabilization.',
    accentColor: '#f59e0b',
    badgeColor: 'border-amber-400/40 text-amber-400',
    icon: 'Wrench',
    articleCount: 4
  }
];
