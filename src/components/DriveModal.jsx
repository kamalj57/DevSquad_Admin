import React from 'react';
import { X, Calendar, Users, Building2, MapPin, Download, IndianRupee, Briefcase } from 'lucide-react';
import { format } from 'date-fns';

export default function DriveModal({ drive, onClose }) {
  if (!drive) return null;

  const getStudentCounts = () => {
    const totalEligible = drive.eligibleStudentsId?.length || 0;
    const optedIn = drive.optedStudents?.length || 0;
    const optedOut = drive.optedOutStudents?.length || 0;
    const yetToRespond = totalEligible - (optedIn + optedOut);

    return { totalEligible, optedIn, optedOut, yetToRespond };
  };

  const downloadStudentsList = () => {
    // Implement Excel download functionality
    console.log('Downloading students list...');
  };

  const { totalEligible, optedIn, optedOut, yetToRespond } = getStudentCounts();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-4xl w-full p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <span className="text-blue-600 font-bold text-lg">
                {drive.companyName.charAt(0)}
              </span>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{drive.companyName}</h2>
              <div className="flex items-center text-gray-600 mt-1">
                <MapPin size={16} className="mr-1 text-purple-500" />
                <span>{drive.companyLocation}</span>
              </div>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-medium text-gray-900 mb-3">Drive Details</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Calendar size={16} className="text-blue-600" />
                <span>{format(new Date(drive.driveDate), 'dd MMM yyyy')}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Briefcase size={16} className="text-blue-500" />
                <span>{drive.jobType}</span>
              </div>
              {drive.rolesAndSalary.map((item, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <IndianRupee size={16} className="text-green-600" />
                  <span>{(item.salary / 100000).toFixed(1)} LPA - {item.role}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-medium text-gray-900 mb-3">Student Statistics</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Total Eligible</p>
                <p className="text-xl font-bold">{totalEligible}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Opted In</p>
                <p className="text-xl font-bold text-green-600">{optedIn}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Opted Out</p>
                <p className="text-xl font-bold text-red-600">{optedOut}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Yet to Respond</p>
                <p className="text-xl font-bold text-yellow-600">{yetToRespond}</p>
              </div>
            </div>
          </div>
        </div>

        {drive.eligibilityCriteria && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Eligibility Criteria</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-2 text-center">
              <div className='w-38 bg-gray-50 rounded-lg p-4 '>
                <p className="text-sm text-gray-600">10th Marks</p>
                <p className="font-medium">{drive.eligibilityCriteria.minTenthMarks}%</p>
              </div>
              <div className='w-38 bg-gray-50 rounded-lg p-4 '>
                <p className="text-sm text-gray-600">12th Marks</p>
                <p className="font-medium">{drive.eligibilityCriteria.minTwelfthMarks}%</p>
              </div>
              <div className='w-38 bg-gray-50 rounded-lg p-4 '>
                <p className="text-sm text-gray-600">Minimum CGPA</p>
                <p className="font-medium">{drive.eligibilityCriteria.minCGPA}</p>
              </div>
              <div className='w-38 bg-gray-50 rounded-lg p-4 '>
                <p className="text-sm text-gray-600">History of Arrears</p>
                <p className="font-medium">{drive.eligibilityCriteria.noHistoryOfArrears}</p>
              </div>
              <div className='w-38 bg-gray-50 rounded-lg p-4 '>
                <p className="text-sm text-gray-600">Max Arrears</p>
                <p className="font-medium">{drive.eligibilityCriteria.maxArrears}</p>
              </div>
            </div>
          </div>
        )}

        {drive.techStackEligibility?.requiredSkills && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3 ">Required Skills</h3>
            <div className="flex flex-wrap gap-2">
              {drive.techStackEligibility.requiredSkills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm text-center"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {drive.roundDetails && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Round Details</h3>
            <div className="flex gap-2">
              {drive.roundDetails.map((round) => (
                <div key={round._id} className="bg-gray-50 rounded-lg p-4 w-52">
                  <h4 className="font-medium">Round {round.roundNumber}</h4>
                  <p className="text-gray-600">{round.description}</p>
                  <p className="text-sm text-gray-500 mt-1 flex items-center gap-1"><span><MapPin size={14} className='text-blue-500'/></span> Venue: {round.venue}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex justify-end">
          <button
            onClick={downloadStudentsList}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Download size={20} />
            <span>Download Students List</span>
          </button>
        </div>
      </div>
    </div>
  );
}