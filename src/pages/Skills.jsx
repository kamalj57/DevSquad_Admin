import  { useState } from "react";
import { ChevronDown, Users,BookOpen,GraduationCap } from "lucide-react";
import CustomPieChart from "../components/CustomPieChart";
import batchData from '../data/batchData.json';

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

const calculatePercentage = (value, total) => {
  return ((value / total) * 100).toFixed(1);
};

export default function Skills() {
  const batchOptions = Object.keys(batchData);
  const [selectedBatch, setSelectedBatch] = useState(batchOptions[0] || "");
  const skillOptions = batchData[selectedBatch] ? Object.keys(batchData[selectedBatch]) : [];
  const [selectedSkill, setSelectedSkill] = useState(skillOptions[0] || "");
  const [selectedDepartment, setSelectedDepartment] = useState("CSE");

  const preparePieData = (skillData) => {
    return [
      { name: "Beginner", value: skillData.levels.beginner },
      { name: "Intermediate", value: skillData.levels.intermediate },
      { name: "Advanced", value: skillData.levels.advanced },
    ];
  };

  const currentSkillData = batchData[selectedBatch][selectedSkill];
  const departmentData = currentSkillData.topDepartments.find(
    (dept) => dept.name === selectedDepartment
  );
  const levelData = departmentData ? departmentData.levels : { beginner: 0, intermediate: 0, advanced: 0 };
  const totalForPercentage = departmentData ? departmentData.count : 1;

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Skills Analysis</h1>
        <p className="text-gray-600 mt-2">
          Distribution of student skills and proficiency levels
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 w-[40%]">
        <Dropdown
          label="Select Batch"
          value={selectedBatch}
          options={Object.keys(batchData)}
          onChange={(value) => {
            setSelectedBatch(value)
            const newSkillOptions = Object.keys(batchData[value] || {});
            setSelectedSkill(newSkillOptions[0] || "");
          }}
        />
        <Dropdown
          label="Select Skill"
          value={selectedSkill}
          options={Object.keys(batchData[selectedBatch])}
          onChange={setSelectedSkill}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
      <div className="bg-white rounded-md shadow-sm p-4 flex gap-3 items-center text-center space-x-3">
            <Users className="text-blue-600" size={42} />
            <div>
              <p className="text-sm text-gray-600">Total Students</p>
              <p className="text-2xl font-bold">{currentSkillData.total}</p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4 flex items-center gap-3 text-center space-x-3">
            <BookOpen className="text-green-600" size={42} />
            <div>
              <p className="text-sm text-gray-600">Top Department</p>
              <p className="text-2xl font-bold">{currentSkillData.topDepartments[0].name}</p>
            </div>
          </div>
        {Object.entries(currentSkillData.levels).map(([level, count]) => (
          <div key={level} className="bg-white p-6 rounded-xl shadow-sm text-center">
            <h3 className={`text-lg font-bold text-center p-1 uppercase rounded-md ${
              level === "beginner" ? "bg-green-100 text-green-800" : 
              level === "advanced" ? "bg-orange-100 text-orange-500" : "bg-yellow-100 text-yellow-600"
            }`}>
              {level}
            </h3>
            <p className="text-2xl font-bold text-gray-900 mt-2 flex items-center m-1 p-1 gap-5">
            <GraduationCap
      className={`${
        level === "beginner"
          ? "text-green-600"
          : level === "intermediate"
          ? "text-yellow-500"
          : "text-orange-500"
      }`}
      size={32}
    />
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
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
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
                      {((dept.count / currentSkillData.total) * 100).toFixed(1)}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm mt-3 w-[50%]">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Proficiency Distribution
        </h3>
        <div className="w-48">
        <Dropdown
          label="Select Department"
          value={selectedDepartment}
          options={currentSkillData.topDepartments.map((dept) => dept.name)}
          onChange={setSelectedDepartment}
        />
</div>
        <div className="space-y-6 mt-6">
          {/* Beginner Level */}
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Beginner</span>
              <span className="text-sm font-medium text-gray-700">
                {levelData.beginner} (
                {calculatePercentage(levelData.beginner, totalForPercentage)}%)
              </span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-green-500 rounded-full transition-all duration-500"
                style={{
                  width: `${calculatePercentage(
                    levelData.beginner,
                    totalForPercentage
                  )}%`,
                }}
              />
            </div>
          </div>

          {/* Intermediate Level */}
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Intermediate</span>
              <span className="text-sm font-medium text-gray-700">
                {levelData.intermediate} (
                {calculatePercentage(levelData.intermediate, totalForPercentage)}%)
              </span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-yellow-500 rounded-full transition-all duration-500"
                style={{
                  width: `${calculatePercentage(
                    levelData.intermediate,
                    totalForPercentage
                  )}%`,
                }}
              />
            </div>
          </div>

          {/* Advanced Level */}
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Advanced</span>
              <span className="text-sm font-medium text-gray-700">
                {levelData.advanced} (
                {calculatePercentage(levelData.advanced, totalForPercentage)}%)
              </span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-orange-500 rounded-full transition-all duration-500"
                style={{
                  width: `${calculatePercentage(
                    levelData.advanced,
                    totalForPercentage
                  )}%`,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
