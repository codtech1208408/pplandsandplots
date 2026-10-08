// PP LANDS & PLOTS - Comprehensive SEO & Google Search Console Configuration

export const DEFAULT_SEO_CONFIG = {
  siteUrl: "https://pplandsandplots.com",
  siteName: "PP LANDS & PLOTS",
  defaultTitle: "PP LANDS & PLOTS | Trusted Real Estate in Shankarpally, Hyderabad",
  titleTemplate: "%s | PP LANDS & PLOTS",
  defaultDescription: "PP LANDS & PLOTS offers transparent, verified land and plot sales, HMDA venture plots, agricultural land & safe property investments in Shankarpally, Hyderabad, Telangana. Established in 2023.",
  keywords: [
    "PP LANDS & PLOTS",
    "plots in Shankarpally",
    "land for sale in Shankarpally",
    "plots in Hyderabad",
    "open plots in Hyderabad",
    "venture plots in Hyderabad",
    "HMDA plots Shankarpally",
    "DTCP approved plots Shankarpally",
    "agriculture land in Telangana",
    "commercial land Hyderabad",
    "real estate in Shankarpally",
    "real estate investment Hyderabad",
    "Mokila plots for sale",
    "Chevella lands"
  ],
  googleSiteVerification: "", // Configured via Admin or env VITE_GOOGLE_SITE_VERIFICATION
  googleAnalyticsId: "",       // e.g. G-XXXXXXXXXX
  ogImage: "https://pplandsandplots.com/logo.png",
  twitterHandle: "@pplandsandplots",
  author: "PP LANDS & PLOTS",
  geoRegion: "IN-TG",
  geoPlacename: "Shankarpally, Hyderabad, Telangana, India",
  geoCoordinates: {
    latitude: 17.4526,
    longitude: 78.1328
  },
  contactPhone: "+91 95534 28583",
  contactEmail: "pplp3008@gmail.com"
};

// Route-specific SEO Metadata
export const ROUTE_SEO_MAP = {
  '/': {
    title: "PP LANDS & PLOTS | Trusted Real Estate in Shankarpally, Hyderabad",
    description: "Discover verified open plots, HMDA layouts, agricultural lands & investment properties in Shankarpally, Hyderabad. Transparent legal titles & trusted guidance.",
    canonicalPath: "/",
    heading: "Find the Right Land. Build Your Future."
  },
  '/about': {
    title: "About Us | PP LANDS & PLOTS - Trusted Real Estate in Shankarpally",
    description: "Established in 2023 in Shankarpally, PP LANDS & PLOTS delivers transparent, safe and accessible real estate advisory for modest families and investors.",
    canonicalPath: "/about",
    heading: "Our Journey, Vision & Commitment"
  },
  '/services': {
    title: "Real Estate Services | Land & Plot Sales in Hyderabad - PP LANDS & PLOTS",
    description: "Expert services: Land Sales, Open & Venture Plot Sales, Property Buying, Selling, and High-ROI Real Estate Investment across Shankarpally and Telangana.",
    canonicalPath: "/services",
    heading: "Comprehensive Real Estate Services"
  },
  '/portfolio': {
    title: "Properties & Plots for Sale | Shankarpally, Hyderabad - PP LANDS & PLOTS",
    description: "Browse verified residential open plots, HMDA venture plots, and agricultural land listings in Shankarpally, Hyderabad. Filter by location and budget.",
    canonicalPath: "/portfolio",
    heading: "Explore Verified Land & Plot Listings"
  },
  '/contact': {
    title: "Contact Us | PP LANDS & PLOTS - Call +91 95534 28583 Shankarpally",
    description: "Get in touch with PP LANDS & PLOTS. Visit our Shankarpally office or schedule a site visit. Call or WhatsApp +91 95534 28583 or email pplp3008@gmail.com.",
    canonicalPath: "/contact",
    heading: "Contact PP LANDS & PLOTS"
  },
  '/admin': {
    title: "Admin Portal | PP LANDS & PLOTS",
    description: "Administrative dashboard for managing properties, services, banners, customer leads and SEO settings.",
    canonicalPath: "/admin",
    heading: "Admin Dashboard"
  }
};

// Top Local SEO Keywords for Hyderabad & Shankarpally Market
export const HIGH_VALUE_SEO_KEYWORDS = [
  { keyword: "plots in shankarpally", difficulty: "Medium", priority: "High", category: "Location" },
  { keyword: "land for sale in shankarpally", difficulty: "Medium", priority: "High", category: "Location" },
  { keyword: "hmda plots in shankarpally", difficulty: "High", priority: "High", category: "Approval" },
  { keyword: "dtcp approved plots hyderabad", difficulty: "High", priority: "High", category: "Approval" },
  { keyword: "open plots near mokila hyderabad", difficulty: "Medium", priority: "High", category: "Location" },
  { keyword: "agriculture land for sale in telangana", difficulty: "Medium", priority: "High", category: "Land Type" },
  { keyword: "venture plots in shankarpally hyderabad", difficulty: "Low", priority: "High", category: "Category" },
  { keyword: "real estate companies in shankarpally", difficulty: "Low", priority: "High", category: "Business" },
  { keyword: "budget plots near financial district hyderabad", difficulty: "High", priority: "Medium", category: "Investment" },
  { keyword: "pp lands and plots", difficulty: "Low", priority: "High", category: "Branded" }
];

// Helper to generate dynamic sitemap XML string including active properties
export function generateSitemapXml(properties = [], siteUrl = "https://pplandsandplots.com") {
  const currentDate = new Date().toISOString().split('T')[0];

  const staticRoutes = [
    { loc: `${siteUrl}/`, changefreq: 'daily', priority: '1.0' },
    { loc: `${siteUrl}/portfolio`, changefreq: 'daily', priority: '0.9' },
    { loc: `${siteUrl}/services`, changefreq: 'weekly', priority: '0.9' },
    { loc: `${siteUrl}/about`, changefreq: 'monthly', priority: '0.8' },
    { loc: `${siteUrl}/contact`, changefreq: 'monthly', priority: '0.8' }
  ];

  const propertyRoutes = properties.map(p => ({
    loc: `${siteUrl}/portfolio#${p.id || p.slug}`,
    changefreq: 'weekly',
    priority: p.featured ? '0.85' : '0.75'
  }));

  const allUrls = [...staticRoutes, ...propertyRoutes];

  const xmlUrls = allUrls.map(item => `  <url>
    <loc>${item.loc}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${item.changefreq}</changefreq>
    <priority>${item.priority}</priority>
  </url>`).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${xmlUrls}
</urlset>`;
}
