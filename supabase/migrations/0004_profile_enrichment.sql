-- 0004_profile_enrichment.sql

-- Add additional demographic and lifestyle fields to profiles
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS blood_type VARCHAR(5),
ADD COLUMN IF NOT EXISTS allergies TEXT[],
ADD COLUMN IF NOT EXISTS chronic_conditions TEXT[],
ADD COLUMN IF NOT EXISTS emergency_contact_name VARCHAR(255),
ADD COLUMN IF NOT EXISTS emergency_contact_phone VARCHAR(50),
ADD COLUMN IF NOT EXISTS smoking_status VARCHAR(50),
ADD COLUMN IF NOT EXISTS alcohol_consumption VARCHAR(50);

-- Update the handle_new_user trigger to handle these if they come from metadata (optional)
-- But for now, we'll let users update these manually on the profile page.
