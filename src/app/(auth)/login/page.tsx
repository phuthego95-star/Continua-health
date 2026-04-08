"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Activity, Mail, Lock, Loader2, User, Stethoscope, FlaskConical, ShieldCheck } from "lucide-react";
import Link from "next/link";

type Role = 'patient' | 'clinician' | 'pharmacist' | 'admin';

const ROLES: { id: Role; label: string; icon: React.ElementType; email: string }[] = [
  { id: 'patient',    label: 'Patient',       icon: User,          email: 'john@example.com' },
  { id: 'clinician',  label: 'Clinician',     icon: Stethoscope,   email: 'dr.smith@clinic.com' },
  { id: 'pharmacist', label: 'Pharmacist',    icon: FlaskConical,  email: 'alex.green@pharmacy.com' },
  { id: 'admin',      label: 'System Admin',  icon: ShieldCheck,   email: 'admin@continua.health' },
];

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [roleSelection, setRoleSelection] = useState<Role>('patient');

  const router = useRouter();
  const supabase = createClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { data, error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      setError(signInError.message);
      setLoading(false);
      return;
    }

    // Redirect based on the user's role in their profile
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', data.user.id)
      .single();

    const role = profile?.role || 'patient';
    router.push(`/${role}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background: 'linear-gradient(135deg, #e0f2fe 0%, #f0fdf4 100%)' }}>
      <Card className="w-full max-w-md shadow-xl border-0 rounded-2xl overflow-hidden">
        <CardHeader className="space-y-3 text-center pb-6 pt-8 bg-white">
          <div className="flex justify-center">
            <div className="bg-sky-100 p-4 rounded-2xl text-sky-600 shadow-inner">
              <Activity className="h-9 w-9" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight">Continua Health</CardTitle>
          <CardDescription>Secure Gateway to Global Care</CardDescription>
        </CardHeader>

        <CardContent className="bg-white px-8 pb-4">
          <form onSubmit={handleLogin} className="space-y-4">
            {error && (
              <div className="p-3 text-xs bg-destructive/10 text-destructive rounded-lg border border-destructive/20 text-center">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-400 uppercase ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <Input 
                  type="email" 
                  placeholder="name@example.com" 
                  className="pl-10 h-11 rounded-xl"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required 
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="text-xs font-semibold text-slate-400 uppercase">Password</label>
                <Link href="#" className="text-[10px] text-sky-600 hover:underline">Forgot password?</Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <Input 
                  type="password" 
                  placeholder="••••••••" 
                  className="pl-10 h-11 rounded-xl"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required 
                />
              </div>
            </div>

            <Button type="submit" className="w-full h-11 rounded-xl text-base font-semibold mt-4 shadow-md bg-sky-600 hover:bg-sky-700" disabled={loading}>
              {loading ? <Loader2 className="h-5 w-5 animate-spin mx-auto" /> : "Sign In to Portal"}
            </Button>
          </form>

          <div className="mt-8 pt-4 border-t border-slate-100">
             <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-3 text-center">Demo Access Points</span>
             <div className="grid grid-cols-2 gap-2">
               {ROLES.map((r) => (
                 <button 
                  key={r.id} 
                  onClick={() => { setEmail(r.email); setPassword('password123'); }}
                  className="text-[10px] flex items-center gap-2 p-2 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors text-slate-500"
                 >
                   <r.icon className="h-3 w-3" />
                   {r.label}
                 </button>
               ))}
             </div>
          </div>
        </CardContent>

        <CardFooter className="bg-white flex flex-col border-t py-4 px-8 text-center text-sm">
          <p className="text-slate-400">
            {"Access required? "}
            <Link href="/register" className="text-sky-600 hover:underline font-medium">Create health profile</Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
