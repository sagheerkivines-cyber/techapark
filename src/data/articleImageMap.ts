// Static filename mapping for all 23 article infographics
// Safe for both browser/Vite bundling and Node.js SSR/script execution
export const ARTICLE_IMAGE_FILENAMES: Record<string, string> = {
  'data-privacy-best-practices': 'data_privacy_infographic_1791555286138.jpg',
  'cyber-security-tools': 'cyber_security_tools_1791566201198.jpg',
  'malware-protection-guides': 'malware_protection_infographic_1791566216709.jpg',
  'secure-online-transactions': 'secure_transactions_infographic_1791566233665.jpg',
  'two-factor-authentication': 'two_factor_auth_infographic_1792586805495.jpg',

  'cloud-storage-solutions': 'cloud_storage_infographic_1791555298129.jpg',
  'best-web-hosting-providers': 'web_hosting_infographic_1791566250782.jpg',
  'server-management-tips': 'server_management_infographic_1791566266830.jpg',
  'cloud-infrastructure-services': 'cloud_infrastructure_infographic_1791566283509.jpg',

  'top-freelancing-platforms': 'freelancing_infographic_1791555313378.jpg',
  'remote-work-productivity': 'remote_productivity_infographic_1791566299199.jpg',
  'client-communication-skills': 'client_communication_infographic_1791566314002.jpg',
  'online-income-streams': 'online_income_infographic_1791566331927.jpg',

  'high-end-gaming-laptops': 'gaming_laptops_infographic_1791555325547.jpg',
  'pc-gaming-accessories': 'pc_accessories_infographic_1791566344713.jpg',
  'mobile-gaming-trends': 'mobile_gaming_infographic_1791566357906.jpg',
  'virtual-reality-headsets': 'vr_headsets_infographic_1791566373054.jpg',
  'cloud-gaming': 'cloud_gaming_infographic_1792816374348.jpg',
  'crossplay-games': 'crossplay_games_infographic_1793168957348.jpg',

  'windows-shortcut-tricks': 'windows_shortcuts_infographic_1791555335389.jpg',
  'mobile-battery-saving-tips': 'battery_saving_infographic_1791566387279.jpg',
  'fix-slow-laptop-issues': 'fix_slow_laptop_infographic_1791566404832.jpg',
  'common-tech-troubleshooting': 'tech_troubleshooting_infographic_1791566421177.jpg'
};

export function getArticleImageFilename(articleIdOrSlug: string, fallbackUrl?: string): string {
  if (ARTICLE_IMAGE_FILENAMES[articleIdOrSlug]) {
    return ARTICLE_IMAGE_FILENAMES[articleIdOrSlug];
  }
  if (fallbackUrl) {
    const clean = fallbackUrl.split('/').pop()?.split('?')[0].split('#')[0];
    if (clean && clean.endsWith('.jpg')) {
      return clean;
    }
  }
  return 'crossplay_games_infographic_1793168957348.jpg';
}
