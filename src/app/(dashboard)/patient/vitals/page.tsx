"use client";

import React, { useState } from 'react';
import { useDataStore } from '@/store/useDataStore';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function VitalsPage() {
  const { patientData, addVital } = useDataStore();
  const [type, setType] = useState('Weight');
  const [value, setValue] = useState('');
  const [unit, setUnit] = useState('kg');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!value) return;
    addVital({ type, value: Number(value), unit });
    setValue('');
  };

  return (
    <div className="p-6 lg:p-8 space-y-8 max-w-4xl mx-auto">
      <div>
        <h2 className="text-3xl font-semibold tracking-tight">Vitals & Symptoms</h2>
        <p className="text-muted-foreground mt-2">Log and track your health metrics over time.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Log New Vital</CardTitle>
          <CardDescription>Enter your latest reading to keep your care team informed.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAdd} className="flex flex-col sm:flex-row gap-4 items-end">
            <div className="space-y-2 flex-1">
              <label className="text-sm font-medium">Measurement Type</label>
              <select 
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                value={type} onChange={(e) => {
                  setType(e.target.value);
                  setUnit(e.target.value === 'Weight' ? 'kg' : e.target.value === 'Glucose' ? 'mg/dL' : 'bpm');
                }}
              >
                <option value="Weight">Weight</option>
                <option value="Glucose">Blood Glucose</option>
                <option value="Heart Rate">Heart Rate</option>
              </select>
            </div>
            <div className="space-y-2 flex-1">
              <label className="text-sm font-medium">Value ({unit})</label>
              <Input type="number" placeholder="0" value={value} onChange={e => setValue(e.target.value)} required />
            </div>
            <Button type="submit" className="w-full sm:w-auto">Log Vital</Button>
          </form>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold">History</h3>
        <div className="grid gap-4">
          {patientData.vitals.map(v => (
            <Card key={v.id}>
              <CardContent className="flex items-center justify-between p-4">
                <div>
                  <p className="font-semibold">{v.type}</p>
                  <p className="text-sm text-muted-foreground">{new Date(v.date).toLocaleString()}</p>
                </div>
                <div className="text-2xl font-bold text-primary">
                  {v.value} <span className="text-sm font-normal text-muted-foreground">{v.unit}</span>
                </div>
              </CardContent>
            </Card>
          ))}
          {patientData.vitals.length === 0 && (
            <p className="text-muted-foreground text-sm">No vitals logged yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
