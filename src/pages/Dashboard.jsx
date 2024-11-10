import { useState } from 'react';
import BatchCard from '../components/BatchCard';
import BatchModal from '../components/BatchModal';

export default function Dashboard() {
  const [selectedBatch, setSelectedBatch] = useState(null);

  const batches = [
    {
      batch: "2024 Batch",
      registered: 450,
      status: 'active',
      totalStudents: 500,
      startDate: "2023-08-01",
      endDate: "2024-05-30",
      paidCount: 380,
      deptCounts: [
        { dept: "CSE", count: 150 },
        { dept: "IT", count: 120 },
        { dept: "ECE", count: 80 },
        { dept: "EEE", count: 60 },
        { dept: "MECH", count: 40 }
      ]
    },
    {
      batch: "2023 Batch",
      registered: 480,
      status: 'completed',
      totalStudents: 480,
      startDate: "2022-08-01",
      endDate: "2023-05-30",
      paidCount: 480,
      deptCounts: [
        { dept: "CSE", count: 160 },
        { dept: "IT", count: 140 },
        { dept: "ECE", count: 90 },
        { dept: "EEE", count: 50 },
        { dept: "MECH", count: 40 }
      ]
    },
    {
      batch: "2025 Batch",
      registered: 320,
      status: 'active',
      totalStudents: 520,
      startDate: "2024-08-01",
      endDate: "2025-05-30",
      paidCount: 280,
      deptCounts: [
        { dept: "CSE", count: 120 },
        { dept: "IT", count: 80 },
        { dept: "ECE", count: 60 },
        { dept: "EEE", count: 40 },
        { dept: "MECH", count: 20 }
      ]
    },
    {
      batch: "2026 Batch",
      registered: 180,
      status: 'active',
      totalStudents: 540,
      startDate: "2025-08-01",
      endDate: "2026-05-30",
      paidCount: 150,
      deptCounts: [
        { dept: "CSE", count: 60 },
        { dept: "IT", count: 50 },
        { dept: "ECE", count: 30 },
        { dept: "EEE", count: 25 },
        { dept: "MECH", count: 15 }
      ]
    }
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Overview of placement batches and their status</p>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Batches</h2>
        <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-10">
          {batches.map((batch) => (
            <BatchCard 
              key={batch.batch} 
              batch={batch}
              onClick={() => setSelectedBatch(batch)}
            />
          ))}
        </div>
      </div>

      {selectedBatch && (
        <BatchModal 
          batch={selectedBatch} 
          onClose={() => setSelectedBatch(null)}
        />
      )}
    </div>
  );
}