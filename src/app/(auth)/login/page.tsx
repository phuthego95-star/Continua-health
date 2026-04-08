"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Activity, User, Stethoscope, FlaskConical, ShieldCheck } from "lucide-react";
import Link from "next/link";

type Role = 'patient' | 'clinician' | 'pharmacist' | 'admin';

const ROLES: { id: Role; label: string; icon: React.ElementType; name: string; email: string }[] = [
  { id: 'patient',    label: 'Patient',       icon: User,          name: 'John Doe',           email: 'john@example.com' },
  { id: 'clinician',  label: 'Clinician',     icon: Stethoscope,   name: 'Dr. Sarah Smith',    email: 'dr.smith@clinic.com' },
  { id: 'pharmacist', label: 'Pharmacist',    icon: FlaskConical,  name: 'Pharm. Alex Green',  email: 'alex.green@pharmacy.com' },
  { id: 'admin',      label: 'System Admin',  icon: ShieldCheck,   name: 'SysAdmin Operations',email: 'admin@continua.health' },
];

export default function LoginPage() {
  const login = useAuthStore((state) => state.login);
  const router = useRouter();
  const [role, setRole] = useState<Role>('patient');

  const selected = ROLES.find(r => r.id === role)!;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login(role, selected.name);
    const routes: Record<Role, string> = {
      patient: '/patient',
      clinician: '/clinician',
      pharmacist: '/pharmacist',
      admin: '/admin',
    };
    router.push(routes[role]);
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
          <CardDescription>Global Chronic Disease Management Platform</CardDescription>
        </CardHeader>

        <CardContent className="bg-white px-8 pb-4">
          <form onSubmit={handleLogin} className="space-y-5">
            {/* Role selector */}
            <div className="space-y-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Select Your Portal</span>
              <div className="grid grid-cols-2 gap-2 mt-1">
                {ROLES.map((r) => {
                  const Icon = r.icon;
                  const isSelected = role === r.id;
                  return (
                    <button
                      key={r.id}
                      type="button"
                      onClick={() => setRole(r.id)}
                      className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border-2 text-sm font-medium transition-all ${
                        isSelected
                          ? 'border-sky-500 bg-sky-50 text-sky-700 shadow-sm'
                          : 'border-slate-200 bg-white text-slate-500 hover:border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      <Icon className="h-4 w-4 shrink-0" />
                      {r.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Auto-filled credentials display */}
            <div className="rounded-xl bg-slate-50 border border-slate-100 p-4 space-y-1">
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Email</span>
                <span className="font-mono text-slate-600 text-xs">{selected.email}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Password</span>
                <span className="font-mono text-slate-600 text-xs">••••••••••</span>
              </div>
            </div>

            <Button type="submit" className="w-full h-11 rounded-xl text-base font-semibold gap-2 shadow-md">
              <selected.icon className="h-4 w-4" />
              Enter as {selected.label}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="bg-white flex flex-col border-t py-4 px-8 text-center text-sm">
          <p className="text-slate-400">
            {"Don't have an account? "}
            <Link href="/register" className="text-sky-600 hover:underline font-medium">Apply for access</Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
