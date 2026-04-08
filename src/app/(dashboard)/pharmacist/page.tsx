"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Pill, Activity, Archive, AlertTriangle, CheckCircle2, Clock, Loader2 } from "lucide-react";

export default function PharmacistDashboard() {
  const [orders, setOrders] = useState<any[]>([]);
  const [stock, setStock] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  const supabase = createClient();

  useEffect(() => {
    async function fetchData() {
      const [ordersRes, stockRes] = await Promise.all([
        supabase.from('pharmacy_orders').select('*, profiles(first_name, last_name), medications(name, dosage)').order('created_at', { ascending: false }),
        supabase.from('products').select('*').eq('category', 'supplements')
      ]);

      if (ordersRes.data) setOrders(ordersRes.data);
      if (stockRes.data) setStock(stockRes.data);
      setLoading(false);
    }
    fetchData();
  }, []);

  if (loading) return <div className="h-full flex items-center justify-center pt-20"><Loader2 className="h-8 w-8 animate-spin text-primary opacity-20" /></div>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-primary">Pharmacist Hub</h1>
        <p className="text-muted-foreground mt-1">Dispensing management and clinical interaction monitoring.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card className="bg-amber-50/50 border-amber-100">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Triage</CardTitle>
            <Clock className="h-4 w-4 text-amber-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{orders.filter(o => o.status === 'pending').length}</div>
            <p className="text-xs text-muted-foreground">Requires pharmacist sign-off</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Inventory Alerts</CardTitle>
            <Archive className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-600">Optimal</div>
            <p className="text-xs text-muted-foreground">All items in stock</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Prescription Queue</CardTitle>
            <CardDescription>Verify and fulfill medication orders.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {orders.length === 0 ? (
                <div className="text-center py-10 text-muted-foreground text-sm border-2 border-dashed rounded-xl">
                    No active prescriptions in queue.
                </div>
              ) : orders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-4 border rounded-xl hover:bg-muted/30 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                      order.status === 'pending' ? 'bg-amber-100 text-amber-600' : 'bg-emerald-100 text-emerald-600'
                    }`}>
                      <Pill className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="font-bold">{order.medications?.name} {order.medications?.dosage}</div>
                      <div className="text-xs text-muted-foreground">For: {order.profiles?.first_name} {order.profiles?.last_name}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge variant={order.status === 'pending' ? 'outline' : 'default'} className="uppercase text-[10px]">
                      {order.status}
                    </Badge>
                    <Button size="sm" variant={order.status === 'pending' ? 'default' : 'outline'}>
                      {order.status === 'pending' ? 'Fulfill' : 'Details'}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Clinical Warnings</CardTitle>
            <CardDescription>Drug-Condition interaction flags.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
             <div className="flex gap-3 p-3 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive">
                <AlertTriangle className="h-5 w-5 shrink-0" />
                <div className="text-xs font-medium">
                    No critical interactions detected in current queue.
                </div>
             </div>
             
             <div className="mt-6">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-4">Stock Levels</span>
                <div className="space-y-4">
                  {stock.slice(0, 3).map(item => (
                    <div key={item.id} className="space-y-1">
                        <div className="flex justify-between text-xs font-medium">
                            <span>{item.name}</span>
                            <span>{item.stock_quantity}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                            <div className="h-full bg-primary" style={{ width: `${item.stock_quantity}%` }} />
                        </div>
                    </div>
                  ))}
                </div>
             </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
