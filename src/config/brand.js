/**
 * Single source of truth for US brand identity.
 * Every logo, name, domain and social link on the site reads from here,
 * so the US branding stays consistent and can be changed in one place.
 *
 * TODO (client): replace the social URLs below with the official
 * US Facebook page and US TikTok channel links before launch.
 */
export const BRAND = {
  name: 'TwistMS',
  fullName: 'TwistMS Properties',
  tagline: 'Land, Homes & Ranches Across the USA',
  market: 'USA',
  domain: 'twistmsproperties.com',
  siteUrl: 'https://twistmsproperties.com',
  supportEmail: 'support@twistmsproperties.com',
  whatsapp: '15550199000',

  logo: {
    color: '/logos/new-logo-removebg-preview.png',
    white: '/logos/new-logo-white-removebg-preview.png',
  },

  // US-only channels. Other regional pages are intentionally not linked.
  social: [
    { key: 'facebook', label: 'Facebook (US)', url: 'https://www.facebook.com/twistmsproperties' },
    { key: 'tiktok', label: 'TikTok (US)', url: 'https://www.tiktok.com/@twistmsproperties' },
  ],
};

export const whatsappLink = (text) =>
  `https://wa.me/${BRAND.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ''}`;
