"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, UserPlus, AlertTriangle } from 'lucide-react';

const patients = [
  { id: '1', name: 'John Doe', age: 45, condition: 'Type 2 Diabetes', status: 'critical', lastVisit: '2023-10-01' },
  { id: '2', name: 'Jane Smith', age: 32, condition: 'Hypertension', status: 'stable', lastVisit: '2023-10-05' },
  { id: '3', name: 'Robert Johnson', age: 60, condition: 'COPD', status: 'monitoring', lastVisit: '2023-09-28' },
];

export default function ClinicianPatientsPage() {
  return (
    <div className="p-6 lg:p-8 space-y-8 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-semibold tracking-tight">Patient Directory</h2>
          <p className="text-muted-foreground mt-2">Manage and review your patient panel.</p>
        </div>
        <Button className="gap-2"><UserPlus className="h-4 w-4" /> Add Patient</Button>
      </div>

      <Card>
        <CardHeader className="pb-4">
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search patients by name or ID..." className="pl-9" />
            </div>
            <Button variant="outline">Filter</Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <div className="grid grid-cols-5 text-sm font-medium border-b p-4 bg-muted/50">
              <div className="col-span-2">Patient</div>
              <div>Primary Condition</div>
              <div>Status</div>
              <div>Last Visit</div>
            </div>
            <div className="divide-y">
              {patients.map(p => (
                <div key={p.id} className="grid grid-cols-5 items-center p-4 hover:bg-muted/30 transition-colors">
                  <div className="col-span-2 flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs">
                      {p.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="font-medium text-sm">{p.name}</p>
                      <p className="text-xs text-muted-foreground">Age {p.age}</p>
                    </div>
                  </div>
                  <div className="text-sm">{p.condition}</div>
                  <div>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      p.status === 'critical' ? 'bg-destructive/10 text-destructive' :
                      p.status === 'stable' ? 'bg-secondary/10 text-secondary' :
                      'bg-amber-500/10 text-amber-600'
                    }`}>
                      {p.status === 'critical' && <AlertTriangle className="w-3 h-3 mr-1" />}
                      {p.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    {p.lastVisit}
                    <Button variant="ghost" size="sm">View</Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
