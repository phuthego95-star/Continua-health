import { create } from 'zustand';

interface VitalsLog {
  id: string;
  type: string;
  value: number;
  unit: string;
  date: string;
}

interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  status: 'active' | 'paused' | 'discontinued';
}

export interface PatientData {
  vitals: VitalsLog[];
  medications: Medication[];
}

interface DataState {
  patientData: PatientData;
  addVital: (vital: Omit<VitalsLog, 'id' | 'date'>) => void;
  addMedication: (med: Omit<Medication, 'id'>) => void;
}

export const useDataStore = create<DataState>((set) => ({
  patientData: {
    vitals: [
      { id: '1', type: 'Blood Pressure', value: 120, unit: 'mmHg', date: new Date().toISOString() },
      { id: '2', type: 'Glucose', value: 105, unit: 'mg/dL', date: new Date().toISOString() },
    ],
    medications: [
      { id: '1', name: 'Metformin', dosage: '500mg', frequency: 'Twice daily', status: 'active' },
      { id: '2', name: 'Lisinopril', dosage: '10mg', frequency: 'Once daily', status: 'active' },
    ],
  },
  addVital: (vital) => set((state) => ({
    patientData: {
      ...state.patientData,
      vitals: [
        { ...vital, id: Math.random().toString(), date: new Date().toISOString() },
        ...state.patientData.vitals,
      ]
    }
  })),
  addMedication: (med) => set((state) => ({
    patientData: {
      ...state.patientData,
      medications: [
        { ...med, id: Math.random().toString() },
        ...state.patientData.medications,
      ]
    }
  })),
}));
