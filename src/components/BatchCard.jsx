import React from "react";
import { Calendar, Users, Wallet } from "lucide-react";

export default function BatchCard({ batch, onClick }) {
  const paymentStatus =
    batch.paidCount === batch.registered ? "Paid" : "Pending";

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-xl shadow-md p-6 cursor-pointer hover:shadow-lg transition-all"
    >
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl font-bold text-gray-800 flex items-center gap-x-0">
            <span>
              <iframe
                src="https://lottie.host/embed/4e26c9e0-c72c-4cb2-9794-d547541f4706/2enf1WX6n2.json"
                className="h-24 w-24"
              ></iframe>
            </span>
            {batch.batch}
          </h3>
        </div>
        <span
          className={`px-3 py-1 text-md font-semibold rounded-md ${
            paymentStatus === "Paid"
              ? "bg-green-100 text-green-800"
              : "bg-yellow-100 text-yellow-800"
          }`}
        >
          {paymentStatus}
        </span>
      </div>
      <div className="flex items-center space-x-2 mt-1 ml-4">
            <span
              className={`px-2 py-1 text-md font-semibold rounded-md ${
                batch.status === "active"
                  ? "bg-green-100 text-green-800"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              {batch.status.charAt(0).toUpperCase() + batch.status.slice(1)}
            </span>
          </div>
      <div className="grid grid-cols-2 gap-2 mb-4 mt-2 ml-4">
        <div className="flex items-center space-x-2">
          <Users className="text-blue-600" size={24} />
          <div>
            <p className="text-md text-black">Students</p>
            <p className="font-bold">
              {batch.registered}/{batch.totalStudents}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-center space-x-2">
          <Calendar className="text-purple-600" size={24} />
          <div>
            <p className="text-md  text-black">Start Date</p>
            <p className="font-semibold">{batch.startDate}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
