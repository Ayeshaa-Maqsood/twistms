/**
 * Extended listing information used by the Property Details page.
 * Kept separate from propertiesData so cards, search and favourites keep
 * the same data shape. Ordered the way a buyer evaluates a listing:
 * media → price & size → location → features → utilities → contact.
 */
const img = (id, w = 1600) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=75`;

const DETAILS = {
  'tx-101': {
    county: 'Travis County',
    status: 'Active',
    propertyType: 'Ranch / Residential Estate',
    yearBuilt: 2019,
    annualTaxes: 28400,
    zoning: 'Residential / Agricultural',
    topography: 'Gently rolling Hill Country',
    gallery: [
      '1600596542815-ffad4c1539a9', '1600607687939-ce8a6c25118c', '1600566753190-17f0baa2a6c3',
      '1600210492486-724fe5c67fb0', '1600573472550-8090b5e0745e', '1531218150217-54595bc2b934',
      '1564013799919-ab600027ffc6',
    ],
    features: ['Equestrian barn & paddocks', 'Floor-to-ceiling glass walls', 'Solar-assisted power', 'Smart-home automation', 'Pool & outdoor kitchen', 'Fenced & cross-fenced', 'Mature live oaks', 'Gated entry'],
    utilities: { Electric: 'Austin Energy + rooftop solar', Water: 'Private well', Sewer: 'Septic (aerobic)', Internet: 'Fiber available', Gas: 'Propane tank', 'Road Access': 'Paved county road frontage' },
    videos: [{ title: 'Drone tour of the ranch', poster: '1531218150217-54595bc2b934' }, { title: 'Main residence walkthrough', poster: '1600607687939-ce8a6c25118c' }],
  },
  'co-204': {
    county: 'Pitkin County',
    status: 'Active',
    propertyType: 'Recreational / Timber Land',
    yearBuilt: null,
    annualTaxes: 3150,
    zoning: 'Rural Residential (RR-35)',
    topography: 'Mountain meadow with timbered slopes',
    gallery: [
      '1500382017468-9049fed747ef', '1546587348-d12660c30c50', '1441974231531-c6227db76b6e',
      '1470071459604-3b5ec3a7fe05', '1472214103451-9374bd1c798e',
    ],
    features: ['Year-round spring creek', 'Cleared building envelope', 'Elk & mule deer habitat', 'Marketable timber', 'Panoramic mountain views', 'Full road frontage'],
    utilities: { Electric: 'At property line', Water: 'Spring creek + well permit', Sewer: 'Septic required', Internet: 'Satellite / Starlink', Gas: 'None (propane option)', 'Road Access': 'Maintained county road' },
    videos: [{ title: 'Creek & meadow aerial', poster: '1546587348-d12660c30c50' }],
  },
  'fl-305': {
    county: 'Miami-Dade County',
    status: 'Active',
    propertyType: 'Luxury Penthouse Rental',
    yearBuilt: 2016,
    annualTaxes: null,
    zoning: 'Mixed-use residential',
    topography: 'Waterfront high-rise',
    gallery: [
      '1512917774080-9991f1c4c750', '1506953823976-52e1fdc0149a', '1600210492486-724fe5c67fb0',
      '1600566753190-17f0baa2a6c3', '1502672260266-1c1ef2d93688',
    ],
    features: ['180° ocean views', 'Private elevator foyer', 'Deeded marina slip', 'Wrap-around terrace', 'Concierge & valet', 'Fitness & spa access'],
    utilities: { Electric: 'FPL (tenant)', Water: 'Municipal (included)', Sewer: 'Municipal', Internet: 'Gigabit fiber', Gas: 'Natural gas', 'Road Access': 'Brickell Bay Dr' },
    videos: [{ title: 'Penthouse terrace at sunset', poster: '1506953823976-52e1fdc0149a' }],
  },
  'ca-409': {
    county: 'Santa Clara County',
    status: 'Active',
    propertyType: 'Commercial / Office & Lab',
    yearBuilt: 2012,
    annualTaxes: 74800,
    zoning: 'Industrial Park (IP)',
    topography: 'Level',
    gallery: ['1486406146926-c627a92ad1ab', '1496442226666-8d4d0e62e6e9', '1497366216548-37526070297c', '1497366811353-6870744d04b2', '1497366754035-f200968a6e72'],
    features: ['LEED Platinum certified', 'Redundant fiber lines', 'EV fleet charging', 'Secured lab bays', 'High-ceiling workspace', 'Multi-tenant ready'],
    utilities: { Electric: 'PG&E 3-phase, 4,000A', Water: 'Municipal', Sewer: 'Municipal', Internet: 'Redundant fiber', Gas: 'Natural gas', 'Road Access': 'Technology Pkwy, near US-101' },
    videos: [{ title: 'Campus overview', poster: '1486406146926-c627a92ad1ab' }],
  },
  'mt-512': {
    county: 'Gallatin County',
    status: 'Active',
    propertyType: 'Farm & Ranch / Agricultural',
    yearBuilt: 2008,
    annualTaxes: 6900,
    zoning: 'Agricultural (A-1)',
    topography: 'River bottom & irrigated hay ground',
    gallery: ['1500076656116-558758c991c1', '1472214103451-9374bd1c798e', '1470071459604-3b5ec3a7fe05', '1441974231531-c6227db76b6e', '1449844908441-8829872d2607'],
    features: ['1.2 miles of river frontage', 'Certified organic hay fields', '4-stall timber barn', 'Custom log home', 'Senior water rights', 'Trout fishing'],
    utilities: { Electric: 'NorthWestern Energy', Water: 'Well + irrigation rights', Sewer: 'Septic', Internet: 'Fixed wireless', Gas: 'Propane', 'Road Access': 'Route 89 frontage' },
    videos: [{ title: 'River frontage drone flight', poster: '1500076656116-558758c991c1' }, { title: 'Log home tour', poster: '1449844908441-8829872d2607' }],
  },
  'ny-618': {
    county: 'New York County',
    status: 'Active',
    propertyType: 'Historic Townhouse',
    yearBuilt: 1854,
    annualTaxes: 41200,
    zoning: 'R7B Residential',
    topography: 'Urban',
    gallery: ['1600585154340-be6161a56a0c', '1496442226666-8d4d0e62e6e9', '1600573472550-8090b5e0745e', '1600566753190-17f0baa2a6c3', '1502672260266-1c1ef2d93688'],
    features: ['Private Gramercy Park key', 'Restored original mantels', "Chef's kitchen", 'Garden patio', 'Wine cellar', 'Five stories'],
    utilities: { Electric: 'Con Edison', Water: 'Municipal', Sewer: 'Municipal', Internet: 'Fiber', Gas: 'Natural gas', 'Road Access': 'Gramercy Park S' },
    videos: [{ title: 'Brownstone walkthrough', poster: '1600585154340-be6161a56a0c' }],
  },
};

export function getListingDetails(property) {
  const d = DETAILS[property.id] || {};
  const gallery = (d.gallery || []).map((id) => img(id));
  return {
    county: d.county || '',
    status: d.status || 'Active',
    propertyType: d.propertyType || property.category,
    yearBuilt: d.yearBuilt || null,
    annualTaxes: d.annualTaxes || null,
    zoning: d.zoning || '—',
    topography: d.topography || '—',
    features: d.features || [],
    utilities: d.utilities || {},
    // Main listing photo always comes first
    photos: [property.image, ...gallery.filter((g) => !g.includes(property.image.split('?')[0].split('photo-')[1]))],
    videos: (d.videos || []).map((v) => ({ ...v, poster: img(v.poster, 900) })),
  };
}
