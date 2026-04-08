"use client";

import { usePharmacyStore } from "@/store/usePharmacyStore";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, CheckCircle2, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function PharmacistDashboard() {
  const { prescriptions, fulfillPrescription } = usePharmacyStore();

  const pending = prescriptions.filter(p => p.status === 'pending');
  const flagged = prescriptions.filter(p => p.status === 'flagged');
  const fulfilled = prescriptions.filter(p => p.status === 'fulfilled');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-primary">Pharmacist Hub</h1>
        <p className="text-muted-foreground mt-1">Manage incoming prescriptions and verify clinical safety.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pending.length}</div>
          </CardContent>
        </Card>
        <Card className="border-destructive/50 bg-destructive/5">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-destructive">Flagged Interactions</CardTitle>
            <AlertCircle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{flagged.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Fulfilled Today</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{fulfilled.length}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Action Required</CardTitle>
            <CardDescription>Prescriptions pending verification or fulfillment.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[...flagged, ...pending].map((rx) => (
                <div key={rx.id} className="flex flex-col gap-2 p-4 border rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="font-semibold">{rx.medication} - {rx.dosage}</div>
                    <Badge variant={rx.status === 'flagged' ? 'destructive' : 'secondary'}>
                      {rx.status.toUpperCase()}
                    </Badge>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Patient: <span className="text-foreground">{rx.patientName}</span> • Prescriber: {rx.prescribedBy}
                  </div>
                  <div className="text-sm text-muted-foreground">Freq: {rx.frequency}</div>
                  
                  {rx.status === 'flagged' && rx.interactions && (
                    <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-md mt-2">
                      <div className="font-medium flex items-center gap-1 mb-1">
                        <AlertCircle className="h-4 w-4" /> Warning
                      </div>
                      <ul>
                        {rx.interactions.map((issue, idx) => (
                          <li key={idx}>- {issue}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="flex gap-2 mt-2">
                    {rx.status === 'pending' && (
                      <Button onClick={() => fulfillPrescription(rx.id)} className="w-full sm:w-auto" size="sm">Fulfill</Button>
                    )}
                    {rx.status === 'flagged' && (
                      <>
                        <Button variant="outline" className="w-full sm:w-auto" size="sm">Review Clinical Data</Button>
                        <Button variant="destructive" className="w-full sm:w-auto" size="sm">Override & Fulfill</Button>
                      </>
                    )}
                  </div>
                </div>
              ))}
              {pending.length === 0 && flagged.length === 0 && (
                 <div className="text-center p-8 text-muted-foreground border border-dashed rounded-lg">
                   No prescriptions require action at this time.
                 </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Recently fulfilled prescriptions.</CardDescription>
          </CardHeader>
          <CardContent>
             <div className="space-y-4">
               {fulfilled.map(rx => (
                 <div key={rx.id} className="flex items-center justify-between p-3 border-b last:border-0">
                    <div>
                      <div className="font-medium">{rx.medication} ({rx.dosage})</div>
                      <div className="text-xs text-muted-foreground">Patient: {rx.patientName} • {new Date(rx.date).toLocaleDateString()}</div>
                    </div>
                    <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">Fulfilled</Badge>
                 </div>
               ))}
               {fulfilled.length === 0 && (
                 <div className="text-sm text-muted-foreground text-center py-4">No recent activity.</div>
               )}
             </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
