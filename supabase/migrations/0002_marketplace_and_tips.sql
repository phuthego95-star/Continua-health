-- 0002_marketplace_and_tips.sql

-- 1. Products Table
CREATE TABLE public.products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price NUMERIC(10, 2) NOT NULL,
    category VARCHAR(100), -- 'supplements', 'devices', 'wearables'
    image_url TEXT,
    stock_quantity INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Health Tips Library
CREATE TABLE public.health_tips (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    category VARCHAR(100), -- 'nutrition', 'exercise', 'mental_health', 'condition_specific'
    trigger_condition VARCHAR(100), -- e.g., 'high_hba1c', 'high_bp'
    trigger_threshold_min NUMERIC,
    trigger_threshold_max NUMERIC,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. User Interactions with Tips (to track 'Save' or 'Read' status)
CREATE TABLE public.user_tip_interactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.profiles(id) NOT NULL,
    tip_id UUID REFERENCES public.health_tips(id) NOT NULL,
    is_saved BOOLEAN DEFAULT false,
    is_read BOOLEAN DEFAULT false,
    interacted_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, tip_id)
);

-- 4. Cart Items (Mock for marketplace)
CREATE TABLE public.cart_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.profiles(id) NOT NULL,
    product_id UUID REFERENCES public.products(id) NOT NULL,
    quantity INTEGER DEFAULT 1,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, product_id)
);

-- Enable RLS
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.health_tips ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_tip_interactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cart_items ENABLE ROW LEVEL SECURITY;

-- Seed Data for Marketplace
INSERT INTO public.products (name, description, price, category, stock_quantity) VALUES
('Premium Omega-3', 'High-purity fish oil for heart health.', 29.99, 'supplements', 100),
('Smart Blood Pressure Monitor', 'Wireless sync with your Continua dashboard.', 89.00, 'devices', 25),
('CGM Sensor (Pack of 3)', 'Continuous glucose monitoring for diabetes management.', 145.00, 'devices', 10),
('Organic Ashwagandha', 'Stress relief and mental clarity support.', 24.50, 'supplements', 50),
('Sleep Tracker Ring', 'Deep sleep and recovery analysis.', 299.00, 'wearables', 15);

-- Seed Data for Health Tips
INSERT INTO public.health_tips (title, content, category, trigger_condition, trigger_threshold_min) VALUES
('Hydration Alert', 'Increasing water intake can stabilize blood pressure. Aim for 2.5L today.', 'nutrition', 'high_bp', 140),
('Low Glycemic Choices', 'Since your A1C is slightly elevated, consider switching to brown rice or quinoa.', 'nutrition', 'high_hba1c', 7.0),
('Daily Walk Benefit', 'A simple 15-minute walk after meals can help manage glucose spikes.', 'exercise', 'high_hba1c', 6.5);
