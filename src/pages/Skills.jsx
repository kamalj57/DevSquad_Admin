import React, { useState } from "react";
import { ChevronDown, Users } from "lucide-react";
import CustomPieChart from "../components/CustomPieChart";

const batchData = {
  "2024 Batch": {
    "React.js": {
      total: 320,
      levels: {
        beginner: 150,
        intermediate: 120,
        advanced: 50,
      },
      topDepartments: [
        { name: "CSE", count: 180 },
        { name: "IT", count: 100 },
        { name: "ECE", count: 40 },
      ],
    },
    Python: {
      total: 450,
      levels: {
        beginner: 200,
        intermediate: 180,
        advanced: 70,
      },
      topDepartments: [
        { name: "CSE", count: 220 },
        { name: "IT", count: 150 },
        { name: "ECE", count: 80 },
      ],
    },
    Java: {
      total: 380,
      levels: {
        beginner: 180,
        intermediate: 150,
        advanced: 50,
      },
      topDepartments: [
        { name: "CSE", count: 200 },
        { name: "IT", count: 130 },
        { name: "ECE", count: 50 },
      ],
    },
  },
  "2025 Batch": {
    "React.js": {
      total: 280,
      levels: {
        beginner: 140,
        intermediate: 100,
        advanced: 40,
      },
      topDepartments: [
        { name: "CSE", count: 150 },
        { name: "IT", count: 90 },
        { name: "ECE", count: 40 },
      ],
    },
    Python: {
      total: 350,
      levels: {
        beginner: 180,
        intermediate: 120,
        advanced: 50,
      },
      topDepartments: [
        { name: "CSE", count: 180 },
        { name: "IT", count: 120 },
        { name: "ECE", count: 50 },
      ],
    },
    Java: {
      total: 300,
      levels: {
        beginner: 150,
        intermediate: 100,
        advanced: 50,
      },
      topDepartments: [
        { name: "CSE", count: 160 },
        { name: "IT", count: 100 },
        { name: "ECE", count: 40 },
      ],
    },
  },
};

const Dropdown = ({ value, options, onChange, label }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50"
      >
        <span className="text-gray-700">{value}</span>
        <ChevronDown
          size={20}
          className={`text-gray-500 transition-transform ${
            isOpen ? "transform rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg">
          {options.map((option) => (
            <button
              key={option}
              onClick={() => {
                onChange(option);
                setIsOpen(false);
              }}
              className="w-full px-4 py-2 text-left hover:bg-gray-100 first:rounded-t-lg last:rounded-b-lg"
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default function Skills() {
  const [selectedBatch, setSelectedBatch] = useState("2024 Batch");
  const [selectedSkill, setSelectedSkill] = useState("React.js");

  const preparePieData = (skillData) => {
    return [
      { name: "Beginner", value: skillData.levels.beginner },
      { name: "Intermediate", value: skillData.levels.intermediate },
      { name: "Advanced", value: skillData.levels.advanced },
    ];
  };

  const currentSkillData = batchData[selectedBatch][selectedSkill];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Skills Analysis</h1>
        <p className="text-gray-600 mt-2">
          Distribution of student skills and proficiency levels
        </p>
      </div>

      <div className="grid grid-cols-1  md:grid-cols-2 gap-6 mb-8 w-96">
        <Dropdown
          label="Select Batch"
          value={selectedBatch}
          options={Object.keys(batchData)}
          onChange={setSelectedBatch}
        />
        <Dropdown
          label="Select Skill"
          value={selectedSkill}
          options={Object.keys(batchData[selectedBatch])}
          onChange={setSelectedSkill}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {Object.entries(currentSkillData.levels).map(([level, count]) => (
          <div key={level} className="bg-white p-6 rounded-xl shadow-sm">
            <h3
              className={`text-lg font-bold text-gray-500 text-center p-1  uppercase rounded-md
             ${
               level === "beginner"
                 ? "bg-green-100 text-green-800 w-28"
                 : level === "advanced"
                 ? "bg-orange-100 text-orange-500 w-28"
                 : "bg-yellow-100 text-yellow-600 w-min"
             }
            `}
            >
              {level}
            </h3>
            <p className="text-2xl font-bold text-gray-900 mt-2 flex items-center m-1 p-1 gap-1">
              <Users className="text-purple-600" size={24} />
              {count}
            </p>
            <p className="text-sm text-gray-600 mt-1">
              {((count / currentSkillData.total) * 100).toFixed(1)}% of students
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Skill Level Distribution
          </h3>
          <div className="h-[400px]">
            <CustomPieChart data={preparePieData(currentSkillData)} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Department-wise Distribution
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-500 uppercase tracking-wider">
                    Department
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-500 uppercase tracking-wider">
                    Students
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-500 uppercase tracking-wider">
                    Percentage
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentSkillData.topDepartments.map((dept) => (
                  <tr key={dept.name}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {dept.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {dept.count}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {((dept.count / currentSkillData.total) * 100).toFixed(1)}
                      %
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
