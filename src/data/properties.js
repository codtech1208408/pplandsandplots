// PP LANDS & PLOTS - Dynamic Portfolio & Business Data
// Structured for seamless future API / Database / CMS integration

export const COMPANY_DETAILS = {
  name: "PP LANDS & PLOTS",
  established: 2023,
  establishmentType: "Offline business established in 2023",
  location: {
    area: "Shankarpally",
    city: "Hyderabad",
    state: "Telangana",
    country: "India",
    fullAddress: "Shankarpally, Hyderabad, Telangana, India"
  },
  contact: {
    phone: "9553428583",
    whatsapp: "9553428583",
    email: "pplp3008@gmail.com",
    formattedPhone: "+91 95534 28583",
    whatsappUrl: "https://wa.me/919553428583?text=Hello%20PP%20LANDS%20%26%20PLOTS%2C%20I%20am%20interested%20in%20learning%20more%20about%20your%20property%20listings.",
    telUrl: "tel:9553428583",
    mailtoUrl: "mailto:pplp3008@gmail.com"
  },
  vision: "To be the most trusted real estate partner in Telangana, making land and plot ownership achievable and affordable for every family, regardless of their financial background.",
  mission: "To empower the people of Telangana by providing transparent, reliable, and accessible real estate services, ensuring that everyone, from modest families to seasoned investors, can confidently buy, sell, and invest in property.",
  policy: {
    important: true,
    title: "Booking & Site Visit Policy",
    text: "Amounts taken are non-refundable after booking or site visits and are only refunded in case of clear documentation or legal title defects.",
    shortNotice: "Non-refundable after booking/site visits except in cases of clear documentation or legal title defects."
  }
};

export const PROPERTY_CATEGORIES = [
  {
    id: "open-plots",
    slug: "open-plots",
    name: "Open Plots",
    description: "Open plots suitable for residential purposes and property investment.",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80",
    badge: "Residential & Investment"
  },
  {
    id: "venture-plots",
    slug: "venture-plots",
    name: "Venture Plots",
    description: "Developed or planned venture plots suitable for residential and investment purposes.",
    image: "https://images.unsplash.com/photo-1592595896551-12b371d546d5?auto=format&fit=crop&w=1200&q=80",
    badge: "Gated & Planned Ventures"
  },
  {
    id: "agriculture-land",
    slug: "agriculture-land",
    name: "Agriculture Land",
    description: "Agricultural land opportunities suitable for agriculture and long-term land investment.",
    image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1200&q=80",
    badge: "Fertile & Long-Term Growth"
  },
  {
    id: "commercial-properties",
    slug: "commercial-properties",
    name: "Commercial Properties",
    description: "Commercial properties suitable for business and investment purposes.",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
    badge: "Prime Business Locations"
  }
];

export const APPROVAL_TYPES = [
  {
    name: "HMDA",
    fullName: "Hyderabad Metropolitan Development Authority",
    description: "Approval granted for layout developments within the HMDA jurisdiction."
  },
  {
    name: "DTCP",
    fullName: "Directorate of Town and Country Planning",
    description: "Layout approvals compliant with Telangana urban planning standards."
  },
  {
    name: "GHMC",
    fullName: "Greater Hyderabad Municipal Corporation",
    description: "Municipal boundary layout and construction approvals."
  },
  {
    name: "GP",
    fullName: "Gram Panchayat",
    description: "Local village body layout and land record registrations."
  }
];

export const INITIAL_PROPERTIES = [
  {
    id: "pp-plot-001",
    title: "Premium Residential Venture Plot - Shankarpally",
    slug: "premium-residential-venture-plot-shankarpally",
    category: "Venture Plots",
    categorySlug: "venture-plots",
    location: "Shankarpally, Hyderabad",
    size: "200 Sq. Yards",
    price: "Price on Request",
    approval: "HMDA Approved",
    status: "Available",
    featured: true,
    description: "Prime residential plot located in a fast-developing layout in Shankarpally. Excellent road connectivity, clear title, and close proximity to major transport hubs and schools.",
    images: [
      "https://images.unsplash.com/photo-1592595896551-12b371d546d5?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
    ],
    features: [
      "30ft & 40ft Wide Blacktop Roads",
      "Electricity & Street Lighting",
      "Underground Drainage System",
      "100% Clear Title & Spot Registration"
    ],
    created_at: "2026-01-15",
    updated_at: "2026-03-01",
    isDemo: true
  },
  {
    id: "pp-land-002",
    title: "Fertile Agriculture Land Parcel",
    slug: "fertile-agriculture-land-parcel-shankarpally",
    category: "Agriculture Land",
    categorySlug: "agriculture-land",
    location: "Shankarpally Outskirts, Hyderabad",
    size: "1.5 Acres",
    price: "Price on Request",
    approval: "Pattadar Passbook / GP Record",
    status: "Available",
    featured: true,
    description: "Highly fertile agricultural land with excellent soil quality and water access. Ideal for farming, farmhouse construction, or long-term land value appreciation.",
    images: [
      "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80"
    ],
    features: [
      "Borewell & Water Source Available",
      "Direct Road Access",
      "Clear Single Ownership Title",
      "Ideal for Organic Farming or Farmhouse"
    ],
    created_at: "2026-01-20",
    updated_at: "2026-02-10",
    isDemo: true
  },
  {
    id: "pp-plot-003",
    title: "Strategic Highway Facing Open Plot",
    slug: "strategic-highway-facing-open-plot",
    category: "Open Plots",
    categorySlug: "open-plots",
    location: "Shankarpally Road, Hyderabad",
    size: "300 Sq. Yards",
    price: "Price on Request",
    approval: "DTCP Layout",
    status: "Available",
    featured: true,
    description: "Corner open plot featuring dual road access on a major connecting corridor. Outstanding potential for both personal home building and long-term capital growth.",
    images: [
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1592595896551-12b371d546d5?auto=format&fit=crop&w=1200&q=80"
    ],
    features: [
      "Corner Plot with East & North Facing Roads",
      "Immediate Construction Readiness",
      "Clear Title Documentation",
      "Close to Shankarpally Railway Station"
    ],
    created_at: "2026-02-01",
    updated_at: "2026-03-05",
    isDemo: true
  },
  {
    id: "pp-comm-004",
    title: "Prime Commercial Plot on Main Road Corridor",
    slug: "prime-commercial-plot-main-road-corridor",
    category: "Commercial Properties",
    categorySlug: "commercial-properties",
    location: "Shankarpally Town Centre, Hyderabad",
    size: "450 Sq. Yards",
    price: "Price on Request",
    approval: "GHMC / Local Body Compliant",
    status: "Reserved",
    featured: false,
    description: "High-visibility commercial plot located directly on the main commercial stretch of Shankarpally. Perfect for showrooms, commercial complexes, or rental income generation.",
    images: [
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
    ],
    features: [
      "60ft Main Road Frontage",
      "High Footfall Area",
      "Suitable for Retail / Office Building",
      "Complete Verified Documentation"
    ],
    created_at: "2026-02-15",
    updated_at: "2026-03-12",
    isDemo: true
  },
  {
    id: "pp-plot-005",
    title: "Gated Venture Villa Plot - Phase 2",
    slug: "gated-venture-villa-plot-phase-2",
    category: "Venture Plots",
    categorySlug: "venture-plots",
    location: "Near Shankarpally, Hyderabad",
    size: "167 Sq. Yards",
    price: "Price on Request",
    approval: "HMDA Approved",
    status: "Available",
    featured: false,
    description: "Beautiful villa plot inside a master-planned residential venture with avenue plantation, compound wall, and 24/7 security arrangement.",
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1592595896551-12b371d546d5?auto=format&fit=crop&w=1200&q=80"
    ],
    features: [
      "Gated Community Concept",
      "Children's Play Area & Park Space",
      "Water Supply Pipeline Connection",
      "Bank Loan Facility Available"
    ],
    created_at: "2026-02-20",
    updated_at: "2026-03-15",
    isDemo: true
  },
  {
    id: "pp-land-006",
    title: "Greenery Agriculture Land Near Water Reservoir",
    slug: "greenery-agriculture-land-near-water-reservoir",
    category: "Agriculture Land",
    categorySlug: "agriculture-land",
    location: "Shankarpally Zone, Telangana",
    size: "2.5 Acres",
    price: "Price on Request",
    approval: "Gram Panchayat / Pattadar Recorded",
    status: "Coming Soon",
    featured: false,
    description: "Expansive agricultural plot surrounded by natural greenery and reliable water sources. Excellent choice for long-term real estate investment portfolios.",
    images: [
      "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80"
    ],
    features: [
      "Scenic Surroundings",
      "High Growth Potential Corridor",
      "Peaceful Environment",
      "Direct Seller Ownership"
    ],
    created_at: "2026-03-01",
    updated_at: "2026-03-18",
    isDemo: true
  }
];

export const SERVICES_LIST = [
  {
    id: "land-sales",
    name: "Land Sales",
    shortDesc: "Assist customers in discovering suitable land opportunities for residential, agricultural, commercial and investment purposes.",
    fullDesc: "PP LANDS & PLOTS guides families and investors through acquiring fertile agricultural land, strategic land parcels, and investment-grade land opportunities around Shankarpally and the greater Hyderabad zone. We prioritize clear legal title verification and transparent pricing.",
    icon: "MapPin"
  },
  {
    id: "plot-sales",
    name: "Plot Sales",
    shortDesc: "Help customers explore and purchase suitable open and venture plots.",
    fullDesc: "Whether you are looking for an open plot to build your family home or a developed venture plot with layout approvals (HMDA, DTCP, GHMC, GP), we present verified plot choices tailored to your budget and future building timeline.",
    icon: "Layout"
  },
  {
    id: "property-buying",
    name: "Property Buying",
    shortDesc: "Assist buyers in finding properties that match their requirements, location preferences and investment goals.",
    fullDesc: "We act as your trusted advisor when purchasing property. Our team evaluates plot dimensions, road widths, locality growth prospects, and documentation to ensure your family or business makes a safe and rewarding purchase.",
    icon: "Home"
  },
  {
    id: "property-selling",
    name: "Property Selling",
    shortDesc: "Assist property owners in marketing and selling their land and plots through a professional process.",
    fullDesc: "Looking to sell your land or plot in Shankarpally or nearby areas? We connect property owners with genuine buyers through transparent, reliable offline and digital marketing processes without false promises.",
    icon: "TrendingUp"
  },
  {
    id: "real-estate-investments",
    name: "Real Estate Investments",
    shortDesc: "Help customers explore land and plot opportunities for long-term investment purposes.",
    fullDesc: "Land remains one of Telangana's most resilient wealth-building assets. We help modest families and seasoned investors identify high-growth corridors around Shankarpally and Hyderabad for long-term capital appreciation.",
    icon: "PieChart"
  }
];

export const COMPANY_VALUES = [
  {
    title: "Transparency",
    description: "Clear legal verification, honest plot details, and direct communication without hidden terms."
  },
  {
    title: "Trust",
    description: "Building long-lasting relationships with families and investors through genuine guidance."
  },
  {
    title: "Reliability",
    description: "Dependable land identification, site visit arrangements, and title check assistance."
  },
  {
    title: "Accessibility",
    description: "Making land and plot ownership achievable for families from all financial backgrounds."
  },
  {
    title: "Customer Focus",
    description: "Understanding your specific goals whether buying a modest home plot or expanding an investment portfolio."
  },
  {
    title: "Professional Service",
    description: "Disciplined offline and online operations established in Shankarpally since 2023."
  }
];
