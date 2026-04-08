import { create } from 'zustand';

export interface LabResult {
  id: string;
  type: string;
  value: number;
  unit: string;
  date: string;
  status: 'normal' | 'abnormal' | 'critical';
  referenceRange: string;
}

interface LabsState {
  results: LabResult[];
  addLabResult: (result: Omit<LabResult, 'id' | 'date'>) => void;
}

export const useLabsStore = create<LabsState>((set) => ({
  results: [
    {
      id: 'lab-1',
      type: 'HbA1c',
      value: 6.8,
      unit: '%',
      date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
      status: 'abnormal',
      referenceRange: '< 5.7%',
    },
    {
      id: 'lab-2',
      type: 'LDL Cholesterol',
      value: 145,
      unit: 'mg/dL',
      date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'abnormal',
      referenceRange: '< 100 mg/dL',
    },
    {
      id: 'lab-3',
      type: 'eGFR',
      value: 92,
      unit: 'mL/min/1.73m2',
      date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'normal',
      referenceRange: '> 90',
    },
  ],
  addLabResult: (result) =>
    set((state) => ({
      results: [
        { ...result, id: Math.random().toString(), date: new Date().toISOString() },
        ...state.results,
      ],
    })),
}));
