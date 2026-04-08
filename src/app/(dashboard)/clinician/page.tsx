"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Activity, Calendar, Search, Filter, ArrowUpRight, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function ClinicianDashboard() {
  const [patients, setPatients] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  
  const supabase = createClient();

  useEffect(() => {
    async function fetchPatients() {
      const { data } = await supabase
        .from('profiles')
        .select('*')
        .eq('role', 'patient')
        .order('created_at', { ascending: false });
      
      if (data) setPatients(data);
      setLoading(false);
    }
    fetchPatients();
  }, []);

  const filteredPatients = patients.filter(p => 
    `${p.first_name} ${p.last_name}`.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <div className="h-full flex items-center justify-center pt-20"><Loader2 className="h-8 w-8 animate-spin text-primary opacity-20" /></div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-primary">Clinician Overview</h1>
          <p className="text-muted-foreground mt-1">Global patient management and care coordination.</p>
        </div>
        <Button className="gap-2">
          <Calendar className="h-4 w-4" /> Schedule Visit
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="bg-primary/5 border-primary/10">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Patients</CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{patients.length}</div>
            <p className="text-xs text-muted-foreground">+2 since yesterday</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Critical Alerts</CardTitle>
            <Badge variant="destructive">0</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-600">Stable</div>
            <p className="text-xs text-muted-foreground">All metrics in range</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Patient Directory</CardTitle>
              <CardDescription>Direct access to clinical records and timelines.</CardDescription>
            </div>
            <div className="relative w-64">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search patient..." 
                className="pl-10" 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="border rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-muted/50 border-b">
                <tr>
                  <th className="text-left p-4 font-bold">Patient</th>
                  <th className="text-left p-4 font-bold">Role</th>
                  <th className="text-left p-4 font-bold">Joined</th>
                  <th className="text-right p-4 font-bold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredPatients.map((p) => (
                  <tr key={p.id} className="hover:bg-muted/30 transition-colors group">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                          {p.first_name[0]}{p.last_name[0]}
                        </div>
                        <span className="font-medium">{p.first_name} {p.last_name}</span>
                      </div>
                    </td>
                    <td className="p-4"><Badge variant="outline" className="capitalize">{p.role}</Badge></td>
                    <td className="p-4 text-muted-foreground">{new Date(p.created_at).toLocaleDateString()}</td>
                    <td className="p-4 text-right">
                      <Button variant="ghost" size="sm" className="gap-2 group-hover:text-primary">
                        View Records <ArrowUpRight className="h-3 w-3" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
