import { create } from 'zustand';

export interface SystemMetric {
  name: string;
  value: number;
  unit: string;
  status: 'healthy' | 'warning' | 'critical';
}

interface AdminState {
  metrics: SystemMetric[];
  activeUsers: number;
  pendingInvites: number;
}

export const useAdminStore = create<AdminState>(() => ({
  metrics: [
    { name: 'Server CPU', value: 34, unit: '%', status: 'healthy' },
    { name: 'Database Connections', value: 85, unit: '%', status: 'warning' },
    { name: 'API Latency', value: 45, unit: 'ms', status: 'healthy' },
    { name: 'Storage Capacity', value: 92, unit: '%', status: 'critical' },
  ],
  activeUsers: 1450,
  pendingInvites: 12,
}));
