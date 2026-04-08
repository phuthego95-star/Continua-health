"use client";

import { usePharmacyStore } from "@/store/usePharmacyStore";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

export default function PharmacistInventory() {
  const { inventory } = usePharmacyStore();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-primary">Inventory Management</h1>
        <p className="text-muted-foreground mt-1">Monitor medication stock levels.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Current Stock</CardTitle>
          <CardDescription>Live tracking of on-hand medications vs required thresholds.</CardDescription>
        </CardHeader>
        <CardContent>
           <div className="space-y-6">
             {inventory.map(item => {
               const percentage = Math.min(100, Math.round((item.stock / (item.threshold * 2)) * 100));
               const isLowInfo = item.stock <= item.threshold;
               
               return (
                 <div key={item.id} className="space-y-2 border p-4 rounded-lg">
                   <div className="flex justify-between items-center">
                     <span className="font-semibold text-lg">{item.name}</span>
                     {isLowInfo ? (
                        <Badge variant="destructive">Low Stock</Badge>
                     ) : (
                        <Badge variant="secondary" className="bg-green-100 text-green-800 hover:bg-green-100">Healthy</Badge>
                     )}
                   </div>
                   <div className="flex justify-between text-sm text-muted-foreground mb-1">
                     <span>Current: {item.stock} units</span>
                     <span>Threshold: {item.threshold} units</span>
                   </div>
                   <Progress value={percentage} className={`h-2 ${isLowInfo ? '[&>div]:bg-destructive' : '[&>div]:bg-green-500'}`} />
                 </div>
               )
             })}
           </div>
        </CardContent>
      </Card>
    </div>
  );
}
