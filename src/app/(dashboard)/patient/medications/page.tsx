"use client";

import React from 'react';
import { useDataStore } from '@/store/useDataStore';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Pill, CheckCircle2 } from 'lucide-react';

export default function MedicationsPage() {
  const { patientData } = useDataStore();

  return (
    <div className="p-6 lg:p-8 space-y-8 max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-semibold tracking-tight">Medications</h2>
          <p className="text-muted-foreground mt-2">Manage your active prescriptions and adherence.</p>
        </div>
        <Button variant="outline">Request Refill</Button>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Current Prescriptions</h3>
        <div className="grid gap-4">
          {patientData.medications.filter(m => m.status === 'active').map(med => (
            <Card key={med.id} className="overflow-hidden">
              <div className="flex border-l-4 border-l-secondary">
                <CardContent className="flex-1 flex items-center justify-between p-6">
                  <div className="flex items-center gap-4">
                    <div className="bg-secondary/10 p-3 rounded-full text-secondary">
                      <Pill className="h-6 w-6" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{med.name}</CardTitle>
                      <CardDescription>{med.dosage} - {med.frequency}</CardDescription>
                    </div>
                  </div>
                  <Button variant="ghost" className="text-primary gap-2">
                    <CheckCircle2 className="h-4 w-4" />
                    Mark Taken
                  </Button>
                </CardContent>
              </div>
            </Card>
          ))}
          {patientData.medications.length === 0 && (
            <p className="text-muted-foreground text-sm">No active medications.</p>
          )}
        </div>
      </div>
    </div>
  );
}
