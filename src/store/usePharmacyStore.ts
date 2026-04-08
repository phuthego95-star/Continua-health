import { create } from 'zustand';

export interface Prescription {
  id: string;
  patientName: string;
  medication: string;
  dosage: string;
  frequency: string;
  status: 'pending' | 'fulfilled' | 'flagged';
  prescribedBy: string;
  date: string;
  interactions?: string[];
}

export interface InventoryItem {
  id: string;
  name: string;
  stock: number;
  threshold: number;
}

interface PharmacyState {
  prescriptions: Prescription[];
  inventory: InventoryItem[];
  fulfillPrescription: (id: string) => void;
  flagPrescription: (id: string, reason: string) => void;
}

export const usePharmacyStore = create<PharmacyState>((set) => ({
  prescriptions: [
    {
      id: 'rx-1',
      patientName: 'John Doe',
      medication: 'Lisinopril',
      dosage: '10mg',
      frequency: 'Once daily',
      status: 'pending',
      prescribedBy: 'Dr. Smith',
      date: new Date().toISOString(),
      interactions: [],
    },
    {
      id: 'rx-2',
      patientName: 'Jane Smith',
      medication: 'Metformin',
      dosage: '500mg',
      frequency: 'Twice daily',
      status: 'flagged',
      prescribedBy: 'Dr. Adams',
      date: new Date().toISOString(),
      interactions: ['Potential interaction with current kidney function levels.'],
    },
  ],
  inventory: [
    { id: 'inv-1', name: 'Lisinopril', stock: 120, threshold: 50 },
    { id: 'inv-2', name: 'Metformin', stock: 35, threshold: 100 },
    { id: 'inv-3', name: 'Atorvastatin', stock: 200, threshold: 50 },
  ],
  fulfillPrescription: (id) =>
    set((state) => ({
      prescriptions: state.prescriptions.map((rx) =>
        rx.id === id ? { ...rx, status: 'fulfilled' } : rx
      ),
    })),
  flagPrescription: (id, reason) =>
    set((state) => ({
      prescriptions: state.prescriptions.map((rx) =>
        rx.id === id ? { ...rx, status: 'flagged', interactions: [...(rx.interactions || []), reason] } : rx
      ),
    })),
}));
