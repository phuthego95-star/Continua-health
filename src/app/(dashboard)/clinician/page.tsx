import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, AlertTriangle, ClipboardList, CheckCircle } from 'lucide-react';

export default function ClinicianDashboard() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-6 py-4 border-b bg-card">
        <h1 className="text-2xl font-bold text-secondary">Continua Health Provider Portal</h1>
        <p className="text-sm text-muted-foreground">Clinician View</p>
      </header>

      <main className="flex-1 p-6 lg:p-8 bg-background space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-semibold tracking-tight">Overview - Dr. Sarah Smith</h2>
          <Button variant="secondary">Invite Patient</Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
              <Users className="w-4 h-4 text-secondary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">142</div>
              <p className="text-xs text-muted-foreground">+3 this week</p>
            </CardContent>
          </Card>
          
          <Card className="border-destructive/50 bg-destructive/5">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium text-destructive">Risk Flags</CardTitle>
              <AlertTriangle className="w-4 h-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-destructive">5 Action Required</div>
              <p className="text-xs text-destructive/80">Abnormal vitals logged today</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Pending Approvals</CardTitle>
              <CheckCircle className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12 Refills</div>
              <p className="text-xs text-muted-foreground">Awaiting signature</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Task Engine</CardTitle>
              <ClipboardList className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24 Active</div>
              <p className="text-xs text-muted-foreground">Automated follow-ups running</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Recent Patient Activity</CardTitle>
            <CardDescription>Patients requiring attention based on recent logs and care pathways.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg border-destructive/20 bg-destructive/5">
                <div>
                  <p className="font-semibold text-destructive">John Doe</p>
                  <p className="text-sm text-muted-foreground">High Glucose (180 mg/dL)</p>
                </div>
                <Button variant="destructive" size="sm">Review Logs</Button>
              </div>
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="font-semibold">Jane Smith</p>
                  <p className="text-sm text-muted-foreground">Care plan onboarding complete</p>
                </div>
                <Button variant="outline" size="sm">View Profile</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
