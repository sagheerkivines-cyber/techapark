export interface EditorProfile {
  name: string;
  role: string;
  discipline: string;
  bio: string;
  email: string;
  phone: string;
  verifiedArticles: number;
  initials: string;
  avatarColor: string;
}

export const EDITORIAL_BOARD: EditorProfile[] = [
  {
    name: 'Sagheer Ahmad',
    role: 'Editor-in-Chief & Lead Systems Architect',
    discipline: 'Distributed Infrastructure & InfoSec',
    bio: 'Directs TechAPark editorial investigations, peer review pipelines, and system benchmarks. Specializes in defensive security topologies, enterprise cloud migrations, and decentralized operational protocols.',
    email: 'sagheerofficial21dnb@gmail.com',
    phone: '03069256639',
    verifiedArticles: 84,
    initials: 'SA',
    avatarColor: 'from-emerald-500 to-teal-700'
  },
  {
    name: 'Elena Rostova, Ph.D.',
    role: 'Principal Cybersecurity Investigator',
    discipline: 'Threat Modeling & Cryptanalysis',
    bio: 'Former security researcher at CERN networks. Leads research on cryptographic side-channel attacks, zero-trust architectures, and enterprise malware triage.',
    email: 'sagheerofficial21dnb@gmail.com',
    phone: '03069256639',
    verifiedArticles: 62,
    initials: 'ER',
    avatarColor: 'from-cyan-500 to-blue-700'
  },
  {
    name: 'Marcus Vance',
    role: 'Senior Cloud Systems Architect',
    discipline: 'IaaS/PaaS & Kubernetes Orchestration',
    bio: 'Site Reliability Engineering lead with 12+ years experience architecting multi-region failover fabrics and high-performance server clusters.',
    email: 'sagheerofficial21dnb@gmail.com',
    phone: '03069256639',
    verifiedArticles: 49,
    initials: 'MV',
    avatarColor: 'from-sky-500 to-indigo-700'
  },
  {
    name: 'Tariq Al-Mansoor',
    role: 'Digital Work & Economics Editor',
    discipline: 'Remote Systems & Contract Pipelines',
    bio: 'Analyzes decentralized labor economics, high-ticket technical freelance consultancies, and productivity telemetry for engineering teams worldwide.',
    email: 'sagheerofficial21dnb@gmail.com',
    phone: '03069256639',
    verifiedArticles: 38,
    initials: 'TA',
    avatarColor: 'from-teal-500 to-emerald-800'
  },
  {
    name: 'Devon Reed',
    role: 'Hardware Benchmarks & Systems Specialist',
    discipline: 'Silicon Architectures & Thermal Dynamics',
    bio: 'Conducts laboratory oscilloscope and acoustic chamber evaluations of high-performance GPUs, custom cooling loops, and VR optical pass-through engines.',
    email: 'sagheerofficial21dnb@gmail.com',
    phone: '03069256639',
    verifiedArticles: 45,
    initials: 'DR',
    avatarColor: 'from-amber-500 to-rose-700'
  }
];

export const OFFICIAL_CONTACT = {
  phone: '03069256639',
  phoneDisplay: '+92 306 9256639',
  whatsappUrl: 'https://wa.me/923069256639',
  email: 'sagheerofficial21dnb@gmail.com',
  address: 'TechAPark Engineering Newsroom, Cyber Systems Tower 4, Technology Park',
  pressDesk: 'Editorial Inquiries & Vulnerability Disclosures',
  hours: '24/7 Global Editorial Monitoring'
};
