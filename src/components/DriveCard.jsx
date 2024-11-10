import React from "react";
import {
  MapPin,
  Briefcase,
  IndianRupee,
  Eye,
  Edit2,
  Trash2,
} from "lucide-react";

export default function DriveCard({ drive, onEdit, onDelete, onView }) {
  const {
    companyName,
    companyLocation,
    jobType,
    rolesAndSalary,
    eligibleDepartments,
    driveDate,
  } = drive;

  return (
    <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all relative group">
      <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onView(drive);
          }}
          className="p-2 bg-blue-100 rounded-full hover:bg-blue-200 text-blue-600"
          title="View Details"
        >
          <Eye size={16} />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onEdit(drive);
          }}
          className="p-2 bg-yellow-100 rounded-full hover:bg-yellow-200 text-yellow-600"
          title="Edit Drive"
        >
          <Edit2 size={16} />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(drive._id);
          }}
          className="p-2 bg-red-100 rounded-full hover:bg-red-200 text-red-600"
          title="Delete Drive"
        >
          <Trash2 size={16} />
        </button>
      </div>

      <div className="flex items-start space-x-4">
        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
          <span className="text-blue-600 font-bold text-lg">
            {companyName.charAt(0)}
          </span>
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-bold text-gray-800">{companyName}</h3>
              <div className="flex items-center text-gray-600 mt-1">
                <MapPin size={16} className="mr-1 text-purple-500" />
                <span className="text-md font-medium text-gray-800">
                  {companyLocation}
                </span>
              </div>
              <div className="mt-1">
              {jobType && (
                <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-md rounded-md">
                  {jobType}
                </span>
              )}
              </div>
              
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 space-y-3">
        {rolesAndSalary.map((item, index) => (
          <div key={index} className="flex justify-between items-center">
            <div className="flex items-center text-gray-700">
              <Briefcase size={16} className="mr-2" />
              <span>{item.role}</span>
            </div>
            <div className="flex items-center text-gray-700">
              <IndianRupee size={16} className="mr-1" />
              <span>{(item.salary / 100000).toFixed(1)} LPA</span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4">
        <div className="flex flex-wrap gap-2">
          {eligibleDepartments.map((dept) => (
            <span
              key={dept}
              className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full"
            >
              {dept}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
