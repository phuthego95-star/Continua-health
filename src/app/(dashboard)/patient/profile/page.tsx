"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User, Phone, LifeBuoy, Droplets, ShieldAlert, Heart, Cigarette, Wine, Loader2, CheckCircle2 } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";

export default function ProfilePage() {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const supabase = createClient();
  const { user: authUser } = useAuthStore();

  useEffect(() => {
    async function fetchProfile() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();
        if (data) setProfile(data);
      }
      setLoading(false);
    }
    fetchProfile();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSuccess(false);

    const { error } = await supabase
      .from('profiles')
      .update({
        blood_type: profile.blood_type,
        emergency_contact_name: profile.emergency_contact_name,
        emergency_contact_phone: profile.emergency_contact_phone,
        smoking_status: profile.smoking_status,
        alcohol_consumption: profile.alcohol_consumption,
        demographics_json: profile.demographics_json
      })
      .eq('id', profile.id);

    if (!error) {
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    }
    setSaving(false);
  };

  if (loading) return <div className="h-full flex items-center justify-center"><Loader2 className="animate-spin h-8 w-8 text-primary" /></div>;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-primary">Health Profile</h1>
        <p className="text-muted-foreground mt-1">Manage your medical identity and emergency information.</p>
      </div>

      <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <User className="h-5 w-5 text-primary" /> Basic Information
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase">First Name</label>
                <Input value={profile.first_name} disabled />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase">Last Name</label>
                <Input value={profile.last_name} disabled />
              </div>
              <div className="col-span-2 space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase">Role</label>
                <Input value={profile.role} disabled className="capitalize" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <ShieldAlert className="h-5 w-5 text-destructive" /> Emergency Contacts
              </CardTitle>
              <CardDescription>Who should we reach out to in a medical event?</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase">Contact Name</label>
                <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                    <Input 
                        placeholder="e.g. Jane Doe" 
                        className="pl-10"
                        value={profile.emergency_contact_name || ''}
                        onChange={(e) => setProfile({...profile, emergency_contact_name: e.target.value})}
                    />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase">Contact Phone</label>
                <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                    <Input 
                        placeholder="+1 (555) 000-0000" 
                        className="pl-10"
                        value={profile.emergency_contact_phone || ''}
                        onChange={(e) => setProfile({...profile, emergency_contact_phone: e.target.value})}
                    />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="bg-primary/5 border-primary/10">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Heart className="h-5 w-5 text-primary" /> Vitals Meta
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase flex items-center gap-2">
                    <Droplets className="h-3 w-3" /> Blood Type
                </label>
                <select 
                    className="w-full bg-background border rounded-md p-2 text-sm"
                    value={profile.blood_type || ''}
                    onChange={(e) => setProfile({...profile, blood_type: e.target.value})}
                >
                  <option value="">Select...</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase flex items-center gap-2">
                    <Cigarette className="h-3 w-3" /> Smoking Status
                </label>
                <select 
                    className="w-full bg-background border rounded-md p-2 text-sm"
                    value={profile.smoking_status || ''}
                    onChange={(e) => setProfile({...profile, smoking_status: e.target.value})}
                >
                  <option value="">Select...</option>
                  <option value="Never">Never</option>
                  <option value="Former">Former</option>
                  <option value="Occasional">Occasional</option>
                  <option value="Regular">Regular</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase flex items-center gap-2">
                    <Wine className="h-3 w-3" /> Alcohol Consumption
                </label>
                <select 
                    className="w-full bg-background border rounded-md p-2 text-sm"
                    value={profile.alcohol_consumption || ''}
                    onChange={(e) => setProfile({...profile, alcohol_consumption: e.target.value})}
                >
                  <option value="">Select...</option>
                  <option value="Abstinent">Abstinent</option>
                  <option value="Light">Light</option>
                  <option value="Moderate">Moderate</option>
                  <option value="Heavy">Heavy</option>
                </select>
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full gap-2 rounded-xl" disabled={saving}>
                {saving ? <Loader2 className="animate-spin h-4 w-4" /> : success ? <CheckCircle2 className="h-4 w-4" /> : "Update Profile"}
                {success ? "Saved!" : saving ? "Saving..." : ""}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </form>
    </div>
  );
}
