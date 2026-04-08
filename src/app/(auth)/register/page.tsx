"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Activity, Mail, Lock, User, Loader2 } from "lucide-react";
import Link from "next/link";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const router = useRouter();
  const supabase = createClient();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
          role: 'patient'
        }
      }
    });

    if (signUpError) {
      setError(signUpError.message);
      setLoading(false);
      return;
    }

    // Success! Redirect to login (assuming email confirmation is off for now)
    router.push("/login?message=Check your email to confirm registration");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background: 'linear-gradient(135deg, #f0fdf4 0%, #e0f2fe 100%)' }}>
      <Card className="w-full max-w-md shadow-xl border-0 rounded-2xl overflow-hidden">
        <CardHeader className="space-y-3 text-center pb-6 pt-8 bg-white">
          <div className="flex justify-center">
            <div className="bg-emerald-100 p-4 rounded-2xl text-emerald-600 shadow-inner">
              <Activity className="h-9 w-9" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight">Join Continua</CardTitle>
          <CardDescription>Start your journey to better health today.</CardDescription>
        </CardHeader>

        <CardContent className="bg-white px-8 pb-4">
          <form onSubmit={handleRegister} className="space-y-4">
            {error && (
              <div className="p-3 text-xs bg-destructive/10 text-destructive rounded-lg font-medium border border-destructive/20 text-center">
                {error}
              </div>
            )}
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-400 uppercase ml-1">First Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <Input 
                    placeholder="John" 
                    className="pl-10 h-11 rounded-xl"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required 
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-400 uppercase ml-1">Last Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <Input 
                    placeholder="Doe" 
                    className="pl-10 h-11 rounded-xl"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required 
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-400 uppercase ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <Input 
                  type="email" 
                  placeholder="john@example.com" 
                  className="pl-10 h-11 rounded-xl"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required 
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-400 uppercase ml-1">Security Password</label>
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

            <Button type="submit" className="w-full h-11 rounded-xl text-base font-semibold mt-4 shadow-md bg-emerald-600 hover:bg-emerald-700" disabled={loading}>
              {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Create Free Account"}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="bg-white flex flex-col border-t py-4 px-8 text-center text-sm">
          <p className="text-slate-400">
            {"Already registered? "}
            <Link href="/login" className="text-emerald-600 hover:underline font-medium">Log in to your portal</Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
