"use client";

import { useAdminStore } from "@/store/useAdminStore";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Server, Database, Activity, AlertTriangle } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

export default function AdminDashboard() {
  const { metrics, activeUsers, pendingInvites } = useAdminStore();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-primary">Platform Administration</h1>
        <p className="text-muted-foreground mt-1">Global oversight of the Continua Health network.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Active Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeUsers}</div>
            <p className="text-xs text-muted-foreground">+18% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Invites</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingInvites}</div>
            <p className="text-xs text-muted-foreground">Clinicians pending approval</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>System Health</CardTitle>
            <CardDescription>Live metrics of cloud infrastructure and database states.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {metrics.map((metric) => (
              <div key={metric.name} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {metric.name.includes('CPU') && <Server className="h-4 w-4 text-muted-foreground" />}
                    {metric.name.includes('Database') && <Database className="h-4 w-4 text-muted-foreground" />}
                    <span className="font-medium text-sm">{metric.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold">{metric.value}{metric.unit}</span>
                    {metric.status === 'critical' && <Badge variant="destructive">Critical</Badge>}
                    {metric.status === 'warning' && <Badge variant="secondary" className="bg-amber-100 text-amber-800">Warning</Badge>}
                  </div>
                </div>
                <Progress 
                  value={metric.value} 
                  className={`h-2 ${
                    metric.status === 'critical' ? '[&>div]:bg-destructive' 
                    : metric.status === 'warning' ? '[&>div]:bg-amber-500' 
                    : '[&>div]:bg-primary'
                  }`} 
                />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Recent Alerts</CardTitle>
            <CardDescription>System-generated anomaly flags.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex gap-3 p-3 border rounded-md bg-destructive/10 border-destructive/20 text-destructive">
                <AlertTriangle className="h-5 w-5 shrink-0" />
                <div className="text-sm">
                  <span className="font-bold block">Storage Capacity Critical</span>
                  Database volume /dev/sda1 is at 92%. Please provision more storage immediately to prevent read-only lock.
                </div>
              </div>
              <div className="flex gap-3 p-3 border rounded-md bg-amber-50 border-amber-200 text-amber-800">
                <AlertTriangle className="h-5 w-5 shrink-0" />
                <div className="text-sm">
                  <span className="font-bold block">Spike in Login Failures</span>
                  Automated mitigation: IP rate-limiting engaged on 3 subnets.
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
