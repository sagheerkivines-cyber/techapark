// Direct bundled asset imports ensuring Vite serves all 20 images in both dev and prod
import img1_1 from '../assets/images/data_privacy_infographic_1791555286138.jpg';
import img1_2 from '../assets/images/cyber_security_tools_1791566201198.jpg';
import img1_3 from '../assets/images/malware_protection_infographic_1791566216709.jpg';
import img1_4 from '../assets/images/secure_transactions_infographic_1791566233665.jpg';

import img2_1 from '../assets/images/cloud_storage_infographic_1791555298129.jpg';
import img2_2 from '../assets/images/web_hosting_infographic_1791566250782.jpg';
import img2_3 from '../assets/images/server_management_infographic_1791566266830.jpg';
import img2_4 from '../assets/images/cloud_infrastructure_infographic_1791566283509.jpg';

import img3_1 from '../assets/images/freelancing_infographic_1791555313378.jpg';
import img3_2 from '../assets/images/remote_productivity_infographic_1791566299199.jpg';
import img3_3 from '../assets/images/client_communication_infographic_1791566314002.jpg';
import img3_4 from '../assets/images/online_income_infographic_1791566331927.jpg';

import img4_1 from '../assets/images/gaming_laptops_infographic_1791555325547.jpg';
import img4_2 from '../assets/images/pc_accessories_infographic_1791566344713.jpg';
import img4_3 from '../assets/images/mobile_gaming_infographic_1791566357906.jpg';
import img4_4 from '../assets/images/vr_headsets_infographic_1791566373054.jpg';

import img5_1 from '../assets/images/windows_shortcuts_infographic_1791555335389.jpg';
import img5_2 from '../assets/images/battery_saving_infographic_1791566387279.jpg';
import img5_3 from '../assets/images/fix_slow_laptop_infographic_1791566404832.jpg';
import img5_4 from '../assets/images/tech_troubleshooting_infographic_1791566421177.jpg';

export const ARTICLE_IMAGES: Record<string, string> = {
  'data-privacy-best-practices': img1_1,
  'cyber-security-tools': img1_2,
  'malware-protection-guides': img1_3,
  'secure-online-transactions': img1_4,

  'cloud-storage-solutions': img2_1,
  'best-web-hosting-providers': img2_2,
  'server-management-tips': img2_3,
  'cloud-infrastructure-services': img2_4,

  'top-freelancing-platforms': img3_1,
  'remote-work-productivity': img3_2,
  'client-communication-skills': img3_3,
  'online-income-streams': img3_4,

  'high-end-gaming-laptops': img4_1,
  'pc-gaming-accessories': img4_2,
  'mobile-gaming-trends': img4_3,
  'virtual-reality-headsets': img4_4,

  'windows-shortcut-tricks': img5_1,
  'mobile-battery-saving-tips': img5_2,
  'fix-slow-laptop-issues': img5_3,
  'common-tech-troubleshooting': img5_4
};
