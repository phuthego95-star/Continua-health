# Continua Health

A production-ready platform for chronic disease management, built with Next.js 14, Tailwind CSS, and Supabase.

## Features Scaffolded
- Patient & Clinician Dashboard Shells.
- Supabase SQL Schema for all data models (Users, Conditions, Medications, Vitals, Labs, Appointments, Care Plans, Pharmacy Orders).
- Base UI Components (shadcn-based).
- Global Health-Tech Theming.

## Local Setup

**1. Install Dependencies**
```bash
npm install
```

**2. Supabase Setup**
Ensure you have the Supabase CLI installed, or run these queries in your remote Supabase SQL Editor:
- Execute `supabase/migrations/0001_initial_schema.sql` to setup your tables.
- Execute `supabase/seed.sql` to populate initial mock data.

**3. Environment Variables**
Create a `.env.local` file:
```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

**4. Start the Application**
```bash
npm run dev
```
Open `http://localhost:3000/patient` or `/clinician` to see the dashboard shells.

## Connecting n8n Webhooks

The workflow automation (check-ins, refill prompts) relies on n8n.
To set this up:
1. In n8n, create a new workflow and add a `Webhook` node. Method: `POST`.
2. Copy the Webhook URL.
3. In this Next.js app, whenever a vital is logged or a task is triggered, make an API route or trigger directly from Supabase Database Webhooks that posts JSON to the n8n webhook URL:
```javascript
// Example Next.js trigger
await fetch('https://your-n8n-domain.com/webhook/your-id', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ event: 'high_glucose', patientId: '...' })
});
```
4. Configure n8n to parse this payload and dispatch emails/SMS accordingly.
