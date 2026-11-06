export const propertiesData = [
  {
    id: "tx-101",
    title: "The Glass Haven Sanctuary & Ranch",
    category: "Residential",
    type: "Sale",
    price: 1850000,
    address: "742 Evergreen Terrace",
    city: "Austin",
    state: "Texas",
    stateCode: "TX",
    zip: "78701",
    bedrooms: 5,
    bathrooms: 4.5,
    sqft: 4850,
    acreage: 12.5,
    featured: true,
    verified: true,
    plan: "Premium",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
    description: "Architectural masterpiece featuring panoramic floor-to-ceiling glass walls, solar-assisted energy grid, smart home automation, and private equine facilities.",
    agent: {
      name: "Marcus Vance",
      agency: "TwistMS Elite Advisory",
      phone: "+1 (512) 555-0199",
      email: "marcus.vance@twistmsproperties.com"
    }
  },
  {
    id: "co-204",
    title: "Aspen High-Country Evergreen Timber Land",
    category: "Land",
    type: "Sale",
    price: 890000,
    address: "Mile Marker 14, Silver Creek Pass",
    city: "Aspen",
    state: "Colorado",
    stateCode: "CO",
    zip: "81611",
    bedrooms: 0,
    bathrooms: 0,
    sqft: 0,
    acreage: 84.0,
    featured: true,
    verified: true,
    plan: "Premium",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80",
    description: "Premier recreational & timber investment parcel featuring year-round spring creek, majestic mountain vistas, and cleared building envelope with full road frontage.",
    agent: {
      name: "Elena Rostova",
      agency: "Highland Real Estate Partners",
      phone: "+1 (970) 555-0142",
      email: "elena@twistmsproperties.com"
    }
  },
  {
    id: "fl-305",
    title: "Biscayne Bay Sky Penthouse with Marina Slip",
    category: "Rental",
    type: "Rent",
    price: 9500, // per month
    pricePeriod: "/month",
    address: "1200 Brickell Bay Dr, Penthouse 42",
    city: "Miami",
    state: "Florida",
    stateCode: "FL",
    zip: "33131",
    bedrooms: 3,
    bathrooms: 3.5,
    sqft: 3100,
    acreage: 0,
    featured: true,
    verified: true,
    plan: "Paid",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
    description: "Ultra-luxury modern corner penthouse with 180-degree ocean views, wrap-around sunset terrace, private elevator foyer, and deeded deep-water yacht slip.",
    agent: {
      name: "David Sterling",
      agency: "Miami Luxury Coastal Group",
      phone: "+1 (305) 555-0188",
      email: "sterling@twistmsproperties.com"
    }
  },
  {
    id: "ca-409",
    title: "Silicon Valley Cyber Innovation Center",
    category: "Commercial",
    type: "Sale",
    price: 6400000,
    address: "450 Technology Parkway",
    city: "San Jose",
    state: "California",
    stateCode: "CA",
    zip: "95110",
    bedrooms: 0,
    bathrooms: 8,
    sqft: 22400,
    acreage: 2.1,
    featured: false,
    verified: true,
    plan: "Premium",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
    description: "LEED Platinum multi-tenant technology research park equipped with redundant fiber lines, EV fleet charging stations, high-ceiling workspaces, and secured laboratory bays.",
    agent: {
      name: "Sarah Chen, CCIM",
      agency: "Pacific Commercial Capital",
      phone: "+1 (408) 555-0167",
      email: "sarah.chen@twistmsproperties.com"
    }
  },
  {
    id: "mt-512",
    title: "Yellowstone Riverfront Grazing & Agricultural Estate",
    category: "Land",
    type: "Sale",
    price: 2450000,
    address: "Route 89 North",
    city: "Bozeman",
    state: "Montana",
    stateCode: "MT",
    zip: "59715",
    bedrooms: 4,
    bathrooms: 3,
    sqft: 3600,
    acreage: 320.0,
    featured: true,
    verified: true,
    plan: "Premium",
    image: "https://images.unsplash.com/photo-1500076656116-558758c991c1?auto=format&fit=crop&w=1200&q=80",
    description: "320 sprawling contiguous acres with 1.2 miles of private river frontage, certified organic hay fields, 4-stall timber barn, and turn-key custom log home.",
    agent: {
      name: "Cody MacIntyre",
      agency: "Rocky Mountain Land Group",
      phone: "+1 (406) 555-0122",
      email: "cody@twistmsproperties.com"
    }
  },
  {
    id: "ny-618",
    title: "Gramercy Park Heritage Brownstone Residence",
    category: "Residential",
    type: "Sale",
    price: 4950000,
    address: "38 Gramercy Park S",
    city: "New York",
    state: "New York",
    stateCode: "NY",
    zip: "10003",
    bedrooms: 6,
    bathrooms: 5.5,
    sqft: 5200,
    acreage: 0.1,
    featured: false,
    verified: true,
    plan: "Paid",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    description: "Historic 5-story Italianate brownstone with private key to Gramercy Park, restored original mantels, modern chef's kitchen, garden patio, and private wine cellar.",
    agent: {
      name: "Jonathan Pierce",
      agency: "Manhattan Prime Realty",
      phone: "+1 (212) 555-0155",
      email: "pierce@twistmsproperties.com"
    }
  }
];

export const platformStats = [
  { label: "Active US Listings", value: "500+" },
  { label: "Covered States", value: "All 50 States" },
  { label: "Verified Deeds", value: "100% Vetted" },
  { label: "Platform Members", value: "5,000+ Target" }
];

export const listingPlans = [
  {
    name: "Free Listing",
    price: "$0",
    period: "for 90 days",
    description: "Ideal for individual owners testing the US marketplace.",
    features: [
      "90-Day Listing Duration",
      "Up to 50 HD Photos",
      "Up to 5 HD Videos",
      "Public Search Display",
      "Direct Buyer Inquiries",
      "Standard Admin Review"
    ],
    highlight: false,
    badge: "Basic Entry"
  },
  {
    name: "Paid Verified",
    price: "$49",
    period: "for 150 days",
    description: "Enhanced exposure with verified badge and social promotion.",
    features: [
      "150-Day Listing Duration",
      "Verified Ownership Badge",
      "Prioritized Search Placement",
      "Up to 50 Photos + 5 Videos",
      "Official Social Media Spotlight",
      "Lead Management Analytics"
    ],
    highlight: true,
    badge: "Most Popular"
  },
  {
    name: "Premium Elite",
    price: "$129",
    period: "for 365 days (1 Year)",
    description: "Full-year premier syndicate with multi-channel video distribution.",
    features: [
      "365 Days Full Visibility",
      "Top Homepage Featured Spot",
      "Dedicated Social Campaign (FB, IG, TikTok)",
      "Interactive 360 Tour Embeds",
      "Dedicated Agent Advisory Lead",
      "Permanent Sold Record Storage"
    ],
    highlight: false,
    badge: "Ultimate Reach"
  }
];

