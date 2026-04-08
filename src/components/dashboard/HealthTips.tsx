"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Lightbulb, Bookmark, CheckCircle, ArrowRight, Save } from "lucide-react";

export function HealthTips() {
  const [tips, setTips] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    async function fetchTips() {
      // 1. Get user profile to check health status in real use case
      // For now, fetch all library tips to demonstrate variety
      const { data: tipsData } = await supabase.from('health_tips').select('*');
      
      if (tipsData) {
        setTips(tipsData.map(tip => ({ ...tip, saved: false, read: false })));
      }
      setLoading(false);
    }
    fetchTips();
  }, []);

  const toggleSave = (id: string) => {
    setTips(prev => prev.map(tip => 
      tip.id === id ? { ...tip, saved: !tip.saved } : tip
    ));
  };

  const markRead = (id: string) => {
    setTips(prev => prev.map(tip => 
      tip.id === id ? { ...tip, read: true } : tip
    ));
  };

  if (loading) return <div className="h-32 bg-muted/20 animate-pulse rounded-xl" />;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-amber-500" /> Personalized Health Tips
        </h3>
        <Button variant="ghost" size="sm" className="text-xs text-muted-foreground">View All</Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {tips.filter(t => !t.read).slice(0, 3).map((tip) => (
          <Card key={tip.id} className="relative overflow-hidden group border-none shadow-sm bg-muted/30 hover:bg-muted/50 transition-colors">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <Badge variant="outline" className="bg-white/50 border-none text-[10px] uppercase font-bold tracking-wider">
                  {tip.category}
                </Badge>
                <Button 
                    variant="ghost" 
                    size="icon" 
                    className={`h-8 w-8 rounded-full ${tip.saved ? 'bg-amber-100 text-amber-600' : 'text-muted-foreground'}`}
                    onClick={() => toggleSave(tip.id)}
                >
                  <Bookmark className={`h-4 w-4 ${tip.saved ? 'fill-current' : ''}`} />
                </Button>
              </div>
              <CardTitle className="text-sm font-bold mt-2">
                {tip.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="pb-4">
              <p className="text-xs text-muted-foreground leading-relaxed">
                {tip.content}
              </p>
              <div className="mt-4 flex gap-2">
                <Button size="sm" variant="secondary" className="h-8 text-[10px] w-full gap-1" onClick={() => markRead(tip.id)}>
                   <CheckCircle className="h-3 w-3" /> Dismiss
                </Button>
                <Button size="sm" className="h-8 text-[10px] w-full gap-1">
                   Details <ArrowRight className="h-3 w-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
