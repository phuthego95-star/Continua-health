"use client";

import React, { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Activity, Pill, CalendarDays, FlaskConical, MessageSquare, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { HealthTips } from '@/components/dashboard/HealthTips';

export default function PatientDashboard() {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [vitals, setVitals] = useState<any[]>([]);
  const [medications, setMedications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [dateStr, setDateStr] = useState('');

  const supabase = createClient();

  useEffect(() => {
    setDateStr(new Date().toLocaleDateString('en-GB', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }));

    async function fetchData() {
      const { data: { user: authUser } } = await supabase.auth.getUser();
      if (authUser) {
        setUser(authUser);
        
        // Parallel fetch for speed
        const [profileRes, vitalsRes, medsRes] = await Promise.all([
          supabase.from('profiles').select('*').eq('id', authUser.id).single(),
          supabase.from('vitals').select('*').eq('patient_id', authUser.id).order('recorded_at', { ascending: false }).limit(1),
          supabase.from('medications').select('*').eq('patient_id', authUser.id)
        ]);

        if (profileRes.data) setProfile(profileRes.data);
        if (vitalsRes.data) setVitals(vitalsRes.data);
        if (medsRes.data) setMedications(medsRes.data);
      }
      setLoading(false);
    }
    fetchData();
  }, []);

  if (loading) return (
    <div className="h-full w-full flex flex-col items-center justify-center space-y-4 pt-40">
      <Loader2 className="h-10 w-10 animate-spin text-primary opacity-20" />
      <p className="text-muted-foreground text-sm animate-pulse">Syncing clinical records...</p>
    </div>
  );

  const latestVital = vitals[0];
  const activeMeds = medications.filter(m => m.status === 'active' || !m.status); // Default to active if status col missing

  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-6 py-4 border-b bg-card flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-primary">Overview</h1>
          <p className="text-sm text-muted-foreground">{dateStr}</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium">{profile?.first_name} {profile?.last_name}</p>
            <p className="text-xs text-muted-foreground">Patient ID: {user?.id.slice(0, 8)}</p>
          </div>
          <Link href="/patient/profile">
            <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary cursor-pointer hover:bg-primary/30 transition-colors">
                {profile?.first_name?.[0]}{profile?.last_name?.[0]}
            </div>
          </Link>
        </div>
      </header>

      <main className="flex-1 p-6 lg:p-8 bg-background space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-semibold tracking-tight">Welcome back, {profile?.first_name || 'Patient'}</h2>
          <Button>Book Appointment</Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Latest Vitals</CardTitle>
              <Activity className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              {latestVital ? (
                <>
                  <div className="text-2xl font-bold">{latestVital.value_numeric} <span className="text-sm font-normal text-muted-foreground">{latestVital.unit}</span></div>
                  <p className="text-xs text-muted-foreground">{latestVital.type} logged on {new Date(latestVital.recorded_at).toLocaleDateString()}</p>
                </>
              ) : (
                <p className="text-sm text-muted-foreground">No vitals logged yet.</p>
              )}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Active Medications</CardTitle>
              <Pill className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activeMeds.length} Prescriptions</div>
              <p className="text-xs text-muted-foreground">All synced from Cloud Labs</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Upcoming Visits</CardTitle>
              <CalendarDays className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Oct 15</div>
              <p className="text-xs text-muted-foreground">Dr. Sarah Smith</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Recent Labs</CardTitle>
              <FlaskConical className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">A1C: 6.5%</div>
              <p className="text-xs text-muted-foreground">Normal range. View trend.</p>
            </CardContent>
          </Card>
        </div>

        <HealthTips />

        <div className="p-6 mt-8 rounded-xl bg-accent text-accent-foreground flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <MessageSquare className="h-5 w-5" /> AI Health Navigator
            </h3>
            <p className="mt-2 text-sm max-w-xl">
              I am here to help explain your latest lab results or prepare questions for your upcoming appointment with Dr. Smith.
            </p>
          </div>
          <Link href="/patient/navigator">
            <Button variant="outline" className="bg-background shrink-0">Chat Now</Button>
          </Link>
        </div>
      </main>
    </div>
  );
}
