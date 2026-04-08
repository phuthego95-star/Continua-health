"use client";

import { useLabsStore } from "@/store/useLabsStore";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FlaskConical, AlertTriangle, TrendingUp, TrendingDown } from "lucide-react";

export default function LabsPage() {
  const { results } = useLabsStore();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-primary">Lab Results</h1>
        <p className="text-muted-foreground mt-1">Review your recent pathology reports and historical trends.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {results.map(lab => (
          <Card key={lab.id} className={lab.status === 'abnormal' ? 'border-amber-200 bg-amber-50/30' : ''}>
            <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-2">
              <div className={`p-2 rounded-full ${lab.status === 'abnormal' ? 'bg-amber-100 text-amber-600' : 'bg-primary/10 text-primary'}`}>
                {lab.status === 'abnormal' ? <AlertTriangle className="h-5 w-5" /> : <FlaskConical className="h-5 w-5" />}
              </div>
              <div className="flex-1">
                <CardTitle className="text-base">{lab.type}</CardTitle>
                <CardDescription className="text-xs">{new Date(lab.date).toLocaleDateString()}</CardDescription>
              </div>
              {lab.status === 'abnormal' && (
                <Badge variant="outline" className="text-amber-600 border-amber-200 bg-amber-50">Abnormal</Badge>
              )}
            </CardHeader>
            <CardContent>
              <div className="mt-4 flex items-baseline gap-2">
                <span className="text-3xl font-bold">{lab.value}</span>
                <span className="text-sm text-muted-foreground font-medium">{lab.unit}</span>
              </div>
              <div className="mt-2 text-xs text-muted-foreground">
                Reference Range: <span className="font-mono bg-muted px-1 py-0.5 rounded">{lab.referenceRange}</span>
              </div>
              <div className="mt-4 pt-4 border-t flex items-center justify-between text-xs">
                 <span className="text-muted-foreground">Historical Trend</span>
                 {lab.status === 'abnormal' ? (
                   <span className="text-amber-600 flex items-center gap-1"><TrendingUp className="h-3 w-3" /> Increasing</span>
                 ) : (
                   <span className="text-green-600 flex items-center gap-1"><TrendingDown className="h-3 w-3" /> Stable</span>
                 )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
