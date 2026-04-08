"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/store/useAuthStore';
import {
  LayoutDashboard,
  Activity,
  Pill,
  CalendarDays,
  FlaskConical,
  Users,
  Settings,
  LogOut,
  MessageSquare,
  Archive
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const logout = useAuthStore((state) => state.logout);


  const patientNav = [
    { name: 'Dashboard', href: '/patient', icon: LayoutDashboard },
    { name: 'Vitals', href: '/patient/vitals', icon: Activity },
    { name: 'Medications', href: '/patient/medications', icon: Pill },
    { name: 'Labs', href: '/patient/labs', icon: FlaskConical },
    { name: 'Visits', href: '/patient/visits', icon: CalendarDays },
    { name: 'AI Navigator', href: '/patient/navigator', icon: MessageSquare },
  ];

  const clinicianNav = [
    { name: 'Overview', href: '/clinician', icon: LayoutDashboard },
    { name: 'Patients', href: '/clinician/patients', icon: Users },
    { name: 'Tasks', href: '/clinician/tasks', icon: Activity },
    { name: 'Automations', href: '/clinician/automations', icon: Settings },
  ];

  const pharmacistNav = [
    { name: 'Dashboard', href: '/pharmacist', icon: LayoutDashboard },
    { name: 'Prescriptions', href: '/pharmacist/prescriptions', icon: Pill },
    { name: 'Inventory', href: '/pharmacist/inventory', icon: Archive },
    { name: 'Patients', href: '/pharmacist/patients', icon: Users },
  ];

  const adminNav = [
    { name: 'Platform Status', href: '/admin', icon: Activity },
    { name: 'User Directory', href: '/admin/users', icon: Users },
    { name: 'App Settings', href: '/admin/settings', icon: Settings },
  ];

  // Derive active nav from URL — works instantly without waiting for Zustand hydration
  const effectiveRole =
    pathname.startsWith('/clinician') ? 'clinician' :
    pathname.startsWith('/pharmacist') ? 'pharmacist' :
    pathname.startsWith('/admin') ? 'admin' :
    'patient';

  const nav = effectiveRole === 'clinician' ? clinicianNav
    : effectiveRole === 'pharmacist' ? pharmacistNav
    : effectiveRole === 'admin' ? adminNav
    : patientNav;

  // Role label for the portal badge
  const roleLabel =
    effectiveRole === 'clinician' ? 'Clinician Portal' :
    effectiveRole === 'pharmacist' ? 'Pharmacist Portal' :
    effectiveRole === 'admin' ? 'Admin Portal' :
    'Patient Portal';

  return (
    <div className="flex h-full w-64 flex-col border-r bg-card px-4 py-6">
      <div className="flex flex-col gap-1 px-2 mb-8">
        <div className="flex items-center gap-2">
          <Activity className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold tracking-tight text-primary">Continua</span>
        </div>
        <span className="text-[10px] uppercase tracking-widest font-semibold text-muted-foreground pl-8">{roleLabel}</span>
      </div>

      <nav className="flex-1 space-y-1">
        {nav.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto border-t pt-4">
        <Button
          variant="ghost"
          className="w-full justify-start text-muted-foreground hover:text-foreground gap-3"
          onClick={() => { logout(); router.push('/login'); }}
        >
          <LogOut className="h-4 w-4" />
          Sign Out
        </Button>
      </div>
    </div>
  );
}
