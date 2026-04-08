"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Activity, Power, ArrowRight, Save } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function AutomationsPage() {
  const automations = [
    {
      id: "auto-1",
      name: "High HbA1c Alert",
      trigger: "If specific Patient Lab Result (HbA1c) > 7.5%",
      action: "Notify primary Care Coordinator & trigger Pharmacist review.",
      status: "active"
    },
    {
      id: "auto-2",
      name: "Missed Medication Check",
      trigger: "If Adherence drops < 70% over 7 days",
      action: "Send automated SMS nudge to Patient.",
      status: "active"
    },
    {
      id: "auto-3",
      name: "Abnormal Blood Pressure Trigger",
      trigger: "If logged Systolic BP > 160 mmHg",
      action: "Escalate to on-call Clinician dashboard immediately.",
      status: "paused"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-primary">Care Automations (n8n prep)</h1>
          <p className="text-muted-foreground mt-1">Visually design data-driven coordination workflows.</p>
        </div>
        <Button className="gap-2">
          <Activity className="h-4 w-4" /> Create Workflow
        </Button>
      </div>

      <div className="grid gap-6">
        {automations.map((auto) => (
          <Card key={auto.id} className={auto.status === 'paused' ? 'opacity-70' : ''}>
            <CardHeader className="pb-3 border-b">
              <div className="flex justify-between items-center">
                <CardTitle className="text-xl flex items-center gap-2">
                  <Power className={`h-5 w-5 ${auto.status === 'active' ? 'text-green-500' : 'text-muted-foreground'}`} />
                  {auto.name}
                </CardTitle>
                <Badge variant={auto.status === 'active' ? 'default' : 'secondary'} className={auto.status === 'active' ? 'bg-green-100 text-green-800 hover:bg-green-100 border-none' : ''}>
                  {auto.status.toUpperCase()}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-4 w-full">
                <div className="flex-1 bg-muted/50 p-4 rounded-lg border">
                  <div className="text-xs uppercase text-muted-foreground font-bold tracking-wider mb-1">Trigger</div>
                  <div className="font-medium text-sm">{auto.trigger}</div>
                </div>
                
                <div className="hidden md:flex items-center justify-center p-2 rounded-full bg-primary/10 text-primary">
                  <ArrowRight className="h-5 w-5" />
                </div>
                <div className="md:hidden flex ml-4 text-primary">
                  <ArrowRight className="h-5 w-5 rotate-90" />
                </div>

                <div className="flex-1 bg-primary/5 p-4 rounded-lg border border-primary/20">
                  <div className="text-xs uppercase text-primary/70 font-bold tracking-wider mb-1">Action</div>
                  <div className="font-medium text-sm">{auto.action}</div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="bg-muted/30 flex justify-end gap-2 border-t pt-4">
               <Button variant="outline" size="sm">Edit Logic</Button>
               <Button variant={auto.status === 'active' ? 'secondary' : 'default'} size="sm">
                 {auto.status === 'active' ? 'Pause Workflow' : 'Activate Workflow'}
               </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      <div className="border border-dashed border-primary/30 bg-primary/5 p-6 rounded-lg flex flex-col items-center justify-center text-center space-y-3">
         <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center text-primary">
           <Save className="h-6 w-6" />
         </div>
         <div>
           <h3 className="font-bold text-lg">Backend Mapping Ready</h3>
           <p className="text-muted-foreground text-sm max-w-md">
             These configured rules are prepared to inject into the Supabase Webhooks and execute via the n8n container integration.
           </p>
         </div>
      </div>
    </div>
  );
}
