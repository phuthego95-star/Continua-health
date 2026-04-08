-- supabase/seed.sql
-- Seed data for Continua Health

INSERT INTO public.country_configs (id, country_code, currency, compliance_region)
VALUES 
  ('11111111-1111-1111-1111-111111111111', 'US', 'USD', 'HIPAA'),
  ('22222222-2222-2222-2222-222222222222', 'GB', 'GBP', 'GDPR');

-- We leave auth.users mock out for now as this is just business logic seed
-- In a real scenario, you'd create users via Supabase Auth API first, then trigger profiles creation.
-- Here we create a mock profile ID assuming it exists in auth.users
INSERT INTO public.profiles (id, role, first_name, last_name, country_id)
VALUES 
  ('00000000-0000-0000-0000-000000000001', 'patient', 'John', 'Doe', '11111111-1111-1111-1111-111111111111'),
  ('00000000-0000-0000-0000-000000000002', 'clinician', 'Dr. Sarah', 'Smith', '11111111-1111-1111-1111-111111111111');

INSERT INTO public.conditions (id, name, category)
VALUES
  ('33333333-3333-3333-3333-333333333331', 'Type 2 Diabetes', 'Metabolic'),
  ('33333333-3333-3333-3333-333333333332', 'Hypertension', 'Cardiovascular');

INSERT INTO public.patient_conditions (patient_id, condition_id, diagnosed_at, severity_level)
VALUES
  ('00000000-0000-0000-0000-000000000001', '33333333-3333-3333-3333-333333333331', '2023-01-15', 'Moderate');

INSERT INTO public.medications (id, patient_id, name, dosage, frequency, prescribed_by)
VALUES
  ('44444444-4444-4444-4444-444444444441', '00000000-0000-0000-0000-000000000001', 'Metformin', '500mg', 'Twice daily', '00000000-0000-0000-0000-000000000002');

INSERT INTO public.vitals (patient_id, type, value_numeric, unit)
VALUES
  ('00000000-0000-0000-0000-000000000001', 'Weight', 85.5, 'kg'),
  ('00000000-0000-0000-0000-000000000001', 'Glucose', 110, 'mg/dL');

INSERT INTO public.partners (id, name, type, country_id)
VALUES
  ('55555555-5555-5555-5555-555555555551', 'HealthPlus Pharmacy', 'pharmacy', '11111111-1111-1111-1111-111111111111');
