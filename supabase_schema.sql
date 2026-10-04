-- ==============================================================================
-- PP LANDS & PLOTS - Supabase Database Setup & Schema
-- Run this SQL script in your Supabase SQL Editor:
-- https://ixeeledgwublgaqrzlnf.supabase.co
-- ==============================================================================

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ==============================================================================
-- 2. CREATE CATEGORIES TABLE
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.categories (
    id TEXT PRIMARY KEY,
    slug TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    description TEXT,
    image TEXT,
    badge TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==============================================================================
-- 3. CREATE PROPERTIES TABLE (Portfolio)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.properties (
    id TEXT PRIMARY KEY DEFAULT concat('pp-prop-', gen_random_uuid()),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    category TEXT NOT NULL,
    category_slug TEXT NOT NULL,
    location TEXT NOT NULL,
    size TEXT NOT NULL,
    price TEXT DEFAULT 'Price on Request',
    approval TEXT DEFAULT 'HMDA Approved',
    status TEXT DEFAULT 'Available',
    featured BOOLEAN DEFAULT false,
    description TEXT,
    images TEXT[] DEFAULT ARRAY[]::TEXT[], -- Store Cloudinary image URLs
    features TEXT[] DEFAULT ARRAY[]::TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==============================================================================
-- 4. CREATE BANNERS TABLE
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.banners (
    id TEXT PRIMARY KEY DEFAULT concat('banner-', gen_random_uuid()),
    title TEXT NOT NULL,
    highlight TEXT,
    subtitle TEXT,
    badge TEXT,
    image TEXT NOT NULL,
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==============================================================================
-- 5. CREATE SERVICES TABLE
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.services (
    id TEXT PRIMARY KEY DEFAULT concat('service-', gen_random_uuid()),
    name TEXT NOT NULL,
    short_desc TEXT NOT NULL,
    full_desc TEXT,
    icon TEXT DEFAULT 'MapPin',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==============================================================================
-- 6. CREATE ENQUIRIES / LEADS TABLE
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.enquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT,
    service_type TEXT,
    property_id TEXT REFERENCES public.properties(id) ON DELETE SET NULL,
    property_title TEXT,
    message TEXT,
    status TEXT DEFAULT 'New', -- 'New', 'Contacted', 'Closed'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_properties_category ON public.properties(category_slug);
CREATE INDEX IF NOT EXISTS idx_properties_featured ON public.properties(featured);
CREATE INDEX IF NOT EXISTS idx_properties_status ON public.properties(status);

-- Automatic Timestamp Triggers
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS update_categories_updated_at ON public.categories;
CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON public.categories FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_properties_updated_at ON public.properties;
CREATE TRIGGER update_properties_updated_at BEFORE UPDATE ON public.properties FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ==============================================================================
-- 7. ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.banners ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public categories" ON public.categories;
CREATE POLICY "Public categories" ON public.categories FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public properties" ON public.properties;
CREATE POLICY "Public properties" ON public.properties FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public banners" ON public.banners;
CREATE POLICY "Public banners" ON public.banners FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public services" ON public.services;
CREATE POLICY "Public services" ON public.services FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public enquiries" ON public.enquiries;
CREATE POLICY "Public enquiries" ON public.enquiries FOR ALL USING (true) WITH CHECK (true);

-- ==============================================================================
-- 8. SEED DATA
-- ==============================================================================

-- Banners Seed Data
INSERT INTO public.banners (id, title, highlight, subtitle, badge, image, active) VALUES
('banner-1', 'Find the Right Land.', 'Build Your Future.', 'Trusted Lands & Plots for Smart Buyers and Investors in Telangana.', 'Shankarpally • Hyderabad - Telangana', 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1000&q=80', true),
('banner-2', 'Residential Venture Plots', 'Clear Title Deeds.', 'Premium open plots in fast-developing corridors with legal safety.', 'HMDA & DTCP Layout Guidance', 'https://images.unsplash.com/photo-1592595896551-12b371d546d5?auto=format&fit=crop&w=1000&q=80', true),
('banner-3', 'Commercial & Highway Lands', 'Prime Business Zones.', 'Strategic commercial land parcels suited for long-term wealth growth.', 'High ROI Investment Opportunities', 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=80', true),
('banner-4', 'Agricultural Land Holdings', 'Secure Farm Ownership.', 'Fertile agricultural land options in high potential Telangana locations.', 'Agricultural & Farm Lands', 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80', true)
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, highlight = EXCLUDED.highlight, image = EXCLUDED.image;

-- Services Seed Data
INSERT INTO public.services (id, name, short_desc, full_desc, icon) VALUES
('land-sales', 'Land Sales', 'Assist customers in discovering suitable land opportunities for residential, agricultural, commercial and investment purposes.', 'PP LANDS & PLOTS guides families and investors through acquiring fertile agricultural land, strategic land parcels, and investment-grade land opportunities around Shankarpally and the greater Hyderabad zone. We prioritize clear legal title verification and transparent pricing.', 'MapPin'),
('plot-sales', 'Plot Sales', 'Help customers explore and purchase suitable open and venture plots.', 'Whether you are looking for an open plot to build your family home or a developed venture plot with layout approvals (HMDA, DTCP, GHMC, GP), we present verified plot choices tailored to your budget and future building timeline.', 'Layout'),
('property-buying', 'Property Buying', 'Assist buyers in finding properties that match their requirements, location preferences and investment goals.', 'We act as your trusted advisor when purchasing property. Our team evaluates plot dimensions, road widths, locality growth prospects, and documentation to ensure your family or business makes a safe and rewarding purchase.', 'Home'),
('property-selling', 'Property Selling', 'Assist property owners in marketing and selling their land and plots through a professional process.', 'Looking to sell your land or plot in Shankarpally or nearby areas? We connect property owners with genuine buyers through transparent, reliable offline and digital marketing processes without false promises.', 'TrendingUp'),
('real-estate-investments', 'Real Estate Investments', 'Help customers explore land and plot opportunities for long-term investment purposes.', 'Land remains one of Telangana''s most resilient wealth-building assets. We help modest families and seasoned investors identify high-growth corridors around Shankarpally and Hyderabad for long-term capital appreciation.', 'PieChart')
ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, short_desc = EXCLUDED.short_desc;
