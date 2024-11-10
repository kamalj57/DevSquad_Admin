import React from "react";
import {
  X,
  Calendar,
  Users,
  Wallet,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

export default function BatchModal({ batch, onClose }) {
  if (!batch) return null;

  const paymentStatus =
    batch.paidCount === batch.registered ? "Paid" : "Pending";

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-3xl w-full p-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{batch.batch}</h2>
            <div className="flex items-center space-x-2 mt-2">
              <span
                className={`px-3 py-1 text-md font-semibold rounded-md ${
                  batch.status === "active"
                    ? "bg-green-100 text-green-800"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {batch.status.charAt(0).toUpperCase() + batch.status.slice(1)}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Users className="text-blue-600 mt-1" size={24} />
              <div>
                <h3 className="font-medium text-gray-900">
                  Student Registration
                </h3>
                <p className="text-2xl font-bold mt-1">
                  {batch.registered}/{batch.totalStudents}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Wallet className="text-green-600 mt-1" size={24} />
              <div>
                <h3 className="font-medium  text-black">Payment Status</h3>
                <div className="flex items-center space-x-2 mt-1">
                  {paymentStatus === "Paid" ? (
                    <CheckCircle className="text-green-500" size={24} />
                  ) : (
                    <AlertCircle className="text-yellow-500" size={24} />
                  )}
                  <span className="text-2xl font-bold">{paymentStatus}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Calendar className="text-purple-600 mt-1" size={24} />
              <div>
                <h3 className="font-medium text-gray-900">Duration</h3>
                <div className="flex gap-10 ">
                  <div>
                    <p className="text-md text-gray-900 mt-1">Start Date</p>
                    <p className="font-semibold">{batch.startDate}</p>
                  </div>
                  <div>
                    <p className="text-md text-gray-900 mt-1">End Date</p>
                    <p className="font-semibold">{batch.endDate}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Department Distribution
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {batch.deptCounts.map(({ dept, count }) => (
              <div key={dept} className="bg-gray-50 rounded-lg p-4 text-center">
                <h4 className="text-sm font-medium text-gray-600">{dept}</h4>
                <p className="text-2xl font-bold text-gray-900 mt-1">{count}</p>
                <p className="text-xs text-gray-500 mt-1">Students</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
