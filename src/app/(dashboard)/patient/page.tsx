"use client";

import React, { useState, useEffect } from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import { useDataStore } from '@/store/useDataStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Activity, Pill, CalendarDays, FlaskConical, MessageSquare } from 'lucide-react';
import Link from 'next/link';

export default function PatientDashboard() {
  const { user } = useAuthStore();
  const { patientData } = useDataStore();
  const [dateStr, setDateStr] = useState('');

  // Render date client-side only to avoid hydration mismatch
  useEffect(() => {
    setDateStr(new Date().toLocaleDateString('en-GB', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }));
  }, []);

  const latestVital = patientData.vitals[0];
  const activeMeds = patientData.medications.filter(m => m.status === 'active');

  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-6 py-4 border-b bg-card flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-primary">Overview</h1>
          <p className="text-sm text-muted-foreground">{dateStr}</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium">{user?.first_name} {user?.last_name}</p>
            <p className="text-xs text-muted-foreground">Patient</p>
          </div>
          <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary">
            {user?.first_name?.[0]}{user?.last_name?.[0]}
          </div>
        </div>
      </header>

      <main className="flex-1 p-6 lg:p-8 bg-background space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-semibold tracking-tight">Welcome back, {user?.first_name || 'John'}</h2>
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
                  <div className="text-2xl font-bold">{latestVital.value} <span className="text-sm font-normal text-muted-foreground">{latestVital.unit}</span></div>
                  <p className="text-xs text-muted-foreground">{latestVital.type} logged recently</p>
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
              <p className="text-xs text-muted-foreground">Adherence check needed</p>
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
