-- 0001_initial_schema.sql
-- Create Enum Types
CREATE TYPE user_role AS ENUM ('patient', 'clinician', 'pharmacist', 'care_coordinator', 'admin');
CREATE TYPE order_status AS ENUM ('pending', 'fulfilled', 'dispatched', 'delivered');
CREATE TYPE appointment_status AS ENUM ('scheduled', 'completed', 'cancelled', 'no_show');

-- 1. Country Configs
CREATE TABLE public.country_configs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    country_code VARCHAR(2) UNIQUE NOT NULL,
    currency VARCHAR(3) NOT NULL,
    compliance_region VARCHAR(50),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Profiles (extends auth.users)
CREATE TABLE public.profiles (
    id UUID PRIMARY KEY, -- References auth.users(id)
    role user_role NOT NULL DEFAULT 'patient',
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    country_id UUID REFERENCES public.country_configs(id),
    timezone VARCHAR(50) DEFAULT 'UTC',
    demographics_json JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Partners (Pharmacies, Clinics, Labs)
CREATE TABLE public.partners (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL, -- 'pharmacy', 'clinic', 'lab'
    country_id UUID REFERENCES public.country_configs(id),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Conditions Dictionary
CREATE TABLE public.conditions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    category VARCHAR(100),
    template_data_json JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Patient Conditions
CREATE TABLE public.patient_conditions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    patient_id UUID REFERENCES public.profiles(id) NOT NULL,
    condition_id UUID REFERENCES public.conditions(id) NOT NULL,
    diagnosed_at DATE,
    severity_level VARCHAR(50),
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Medications
CREATE TABLE public.medications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    patient_id UUID REFERENCES public.profiles(id) NOT NULL,
    name VARCHAR(255) NOT NULL,
    rx_norm_code VARCHAR(100),
    dosage VARCHAR(100),
    frequency VARCHAR(100),
    prescribed_by UUID REFERENCES public.profiles(id),
    refill_date DATE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. Vitals
CREATE TABLE public.vitals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    patient_id UUID REFERENCES public.profiles(id) NOT NULL,
    type VARCHAR(50) NOT NULL, -- BP, HR, Weight, O2, Glucose
    value_numeric NUMERIC,
    value_json JSONB, -- For multi-value like BP (systolic/diastolic)
    unit VARCHAR(20),
    recorded_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. Symptoms
CREATE TABLE public.symptoms (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    patient_id UUID REFERENCES public.profiles(id) NOT NULL,
    symptom_type VARCHAR(100) NOT NULL,
    severity_score INTEGER CHECK (severity_score >= 1 AND severity_score <= 10),
    notes TEXT,
    logged_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. Labs
CREATE TABLE public.labs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    patient_id UUID REFERENCES public.profiles(id) NOT NULL,
    lab_type VARCHAR(100) NOT NULL,
    result_value NUMERIC,
    unit VARCHAR(50),
    is_flagged BOOLEAN DEFAULT false,
    summary_text TEXT,
    date DATE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. Appointments
CREATE TABLE public.appointments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    patient_id UUID REFERENCES public.profiles(id) NOT NULL,
    clinician_id UUID REFERENCES public.profiles(id) NOT NULL,
    start_time TIMESTAMPTZ NOT NULL,
    status appointment_status DEFAULT 'scheduled',
    visit_summary TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 11. Care Plans
CREATE TABLE public.care_plans (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    patient_id UUID REFERENCES public.profiles(id) NOT NULL,
    created_by UUID REFERENCES public.profiles(id) NOT NULL,
    plan_details JSONB DEFAULT '{}'::jsonb,
    status VARCHAR(50) DEFAULT 'active',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 12. Pharmacy Orders
CREATE TABLE public.pharmacy_orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    patient_id UUID REFERENCES public.profiles(id) NOT NULL,
    medication_id UUID REFERENCES public.medications(id) NOT NULL,
    pharmacy_partner_id UUID REFERENCES public.partners(id),
    status order_status DEFAULT 'pending',
    tracking_info TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 13. Notifications
CREATE TABLE public.notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.profiles(id) NOT NULL,
    type VARCHAR(50) NOT NULL,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS (Row Level Security) on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.country_configs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.partners ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.conditions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.patient_conditions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.medications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vitals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.symptoms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.labs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.care_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pharmacy_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
