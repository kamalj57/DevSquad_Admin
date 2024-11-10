import { useState } from "react";
import { X, Plus, MapPin } from "lucide-react";
import axios from 'axios';
import {Toaster,toast} from "react-hot-toast";

export default function DriveForm({ onClose, onSubmit, initialData }) {
  const [departments, setDepartments] = useState(
    initialData?.eligibleDepartments || []
  );
  const [newDept, setNewDept] = useState("");
  const [rolesAndSalaries, setRolesAndSalaries] = useState(
    initialData?.rolesAndSalary || []
  );
  const [newRole, setNewRole] = useState({ role: "", salary: "" });
  const [roundDetails, setRoundDetails] = useState(
    initialData?.roundDetails || []
  );
  const [newRound, setNewRound] = useState({
    roundNumber: "",
    description: "",
    venue: "",
  });
  const [driveDate, setDriveDate] = useState(initialData?.driveDate || "");
  const [isDateTBA, setIsDateTBA] = useState(!initialData?.driveDate);
  const [jobType, setJobType] = useState();
  const [isTechStackRequired, setIsTechStackRequired] = useState(
    initialData?.techStackEligibility?.isTechStackRequired || false
  );
  const [requiredSkills, setRequiredSkills] = useState(
    initialData?.techStackEligibility?.requiredSkills || []
  );
  const [newSkill, setNewSkill] = useState("");
  const handleSubmit = async(e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      companyName: formData.get("companyName"),
      driveDate: isDateTBA ? "Yet to be Announced" : driveDate,
      rolesAndSalary: rolesAndSalaries,
      roundDetails: roundDetails,
      companyLocation: formData.get("companyLocation"),
      jobType: formData.get("jobType"),
      eligibleBatch: formData
        .get("eligibleBatch")
        .split(",")
        .map((batch) => parseInt(batch.trim())),
      eligibleDepartments: departments,
      eligibilityCriteria: {
        minTenthMarks: parseInt(formData.get("minTenthMarks")),
        minTwelfthMarks: parseInt(formData.get("minTwelfthMarks")),
        minCGPA: parseInt(formData.get("minCGPA")),
        noHistoryOfArrears: parseInt(formData.get("noHistoryOfArrears")),
        maxArrears: parseInt(formData.get("maxArrears")),
      },
      techStackEligibility: {
        isTechStackRequired: formData.get('isTechStackRequired') === 'on',
        requiredSkills:requiredSkills
      }
    };
    console.log(data);
    try {
      toast.promise(
        axios.post("http://localhost:8080/api/drive/create-drive/4a92cdba71784125a786265f332c8ce5", data),
        {
          loading: 'Creating Drive...',
          success: <b>Drive Created!</b>,
          error: <b>Error occurred!</b>,
        }
      );
    } catch (err) {
      console.error(err);
    }
  }    

  const addRole = (e) => {
    e.preventDefault();
    if (newRole.role && newRole.salary) {
      setRolesAndSalaries([...rolesAndSalaries, newRole]);
      setNewRole({ role: "", salary: "" });
    }
  };

  const removeRole = (role) => {
    setRolesAndSalaries(rolesAndSalaries.filter((r) => r.role !== role));
  };

  const addRound = (e) => {
    e.preventDefault();
    if (newRound.roundNumber && newRound.description && newRound.venue) {
      setRoundDetails([...roundDetails, newRound]);
      setNewRound({ roundNumber: "", description: "", venue: "" });
    }
  };

  const removeRound = (roundNumber) => {
    setRoundDetails(
      roundDetails.filter((round) => round.roundNumber !== roundNumber)
    );
  };

  const addDepartment = (e) => {
    e.preventDefault();
    if (newDept && !departments.includes(newDept)) {
      setDepartments([...departments, newDept]);
      setNewDept("");
    }
  };

  const removeDepartment = (dept) => {
    setDepartments(departments.filter((d) => d !== dept));
  };

  const handleAddSkill = (e) => {
    e.preventDefault();
    if (newSkill) {
      setRequiredSkills([...requiredSkills, newSkill]);
      setNewSkill("");
    }
  };

  const handleRemoveSkill = (skill) => {
    setRequiredSkills(requiredSkills.filter((s) => s !== skill));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center p-4 z-5">
      <Toaster position="top-center"/>
      <div className="bg-white rounded-xl p-6 overflow-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">
            {initialData ? "Edit Drive" : "Add New Drive"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-10">
            <div>
              <div>
                {/* Company Information */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Company Details
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      name="companyName"
                      placeholder="CompanyName"
                      defaultValue={initialData?.companyName}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-blue-500 outline-none"
                    />
                    <div className="flex items-center gap-1 border rounded-md">
                      <MapPin className="text-purple-500" size={28} />
                      <input
                        type="text"
                        name="companyLocation"
                        placeholder="Location"
                        defaultValue={initialData?.companyLocation}
                        required
                        className="w-full px-3 py-2  border border-gray-50 rounded-md focus:border-blue-500 outline-none"
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 mt-2">
                    Drive Date
                  </label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="date"
                      value={isDateTBA ? "" : driveDate}
                      onChange={(e) => setDriveDate(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-md focus:border-blue-500 outline-none"
                    />
                    <input
                      type="checkbox"
                      checked={isDateTBA}
                      onChange={() => setIsDateTBA(!isDateTBA)}
                      className="ml-2"
                    />
                    <label>Yet to be Announced</label>
                  </div>
                </div>
              </div>
              <div>
                <label
                  htmlFor="jobType"
                  className="block text-sm font-medium text-gray-700 mt-2"
                >
                  Job Type
                </label>
                <select
                  id="jobType"
                  name="jobType"
                  value={jobType}
                  onChange={(e) => setJobType(e.target.value)}
                  className="mt-1 block  pl-3 pr-10 py-2 text-base bg-white border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                >
                  <option value="Internship cum Full Time">
                    Internship cum Full Time
                  </option>
                  <option value="Internship">Internship</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="jobDescription"
                  className="block text-sm font-medium text-gray-700 mt-2"
                >
                  Description
                </label>
                <textarea
                  type="textarea"
                  name="jobDescription"
                  id="jobDescription"
                  className="flex-1 w-full  h-20 text px-3 py-2 border border-gray-300 rounded-md focus:border-blue-500 outline-none scrollbar-thin"
                  placeholder="Job Description"
                />
              </div>
            </div>
            <div className="space-y-6 flex flex-col w-[90%]">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Eligibility Criteria
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="number"
                    name="minTenthMarks"
                    defaultValue={
                      initialData?.eligibilityCriteria.minTenthMarks
                    }
                    placeholder="10th Marks (%)"
                    className="px-3 py-2 border border-gray-300 rounded-md focus:border-blue-500 outline-none"
                  />
                  <input
                    type="number"
                    name="minTwelfthMarks"
                    defaultValue={
                      initialData?.eligibilityCriteria.minTwelfthMarks
                    }
                    placeholder="12th Marks (%)"
                    className="px-3 py-2 border border-gray-300 rounded-md focus:border-blue-500 outline-none"
                  />
                  <input
                    type="number"
                    name="minCGPA"
                    defaultValue={initialData?.eligibilityCriteria.minCGPA}
                    placeholder="CGPA"
                    className="px-3 py-2 border border-gray-300 rounded-md focus:border-blue-500 outline-none"
                  />
                  <input
                    type="number"
                    name="noHistoryOfArrears"
                    defaultValue={
                      initialData?.eligibilityCriteria.noHistoryOfArrears
                    }
                    placeholder="No History of Arrears"
                    className="px-3 py-2 border border-gray-300 rounded-md focus:border-blue-500 outline-none"
                  />
                  <input
                    type="number"
                    name="maxArrears"
                    defaultValue={initialData?.eligibilityCriteria.maxArrears}
                    placeholder="Max Arrears"
                    className="px-3 py-2 border border-gray-300 rounded-md focus:border-blue-500 outline-none"
                  />
                </div>
              </div>
              <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tech Stack Eligibility
            </label>
            <div className="flex items-center">
              <input
                type="checkbox"
                name="isTechStackRequired"
                checked={isTechStackRequired}
                onChange={() => setIsTechStackRequired(!isTechStackRequired)}
                className="mr-2"
              />
              <span>Is Tech Stack Required?</span>
            </div>
          </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">
                Required Skills
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={newSkill}
                  disabled={!isTechStackRequired}
                  onChange={(e) => setNewSkill(e.target.value)}
                  placeholder="Add a skill"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-blue-500 outline-none"
                />
                <button
                  onClick={handleAddSkill}
                  className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  <Plus size={20} />
                </button>
              </div>
              <div className="flex flex-wrap mt-2 gap-2">
                {requiredSkills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-200 rounded-full flex items-center gap-2"
                  >
                    {skill}
                    <button onClick={() => handleRemoveSkill(skill)}>
                      <X size={16} className="text-gray-500 hover:text-gray-700" />
                    </button>
                  </span>
                ))}
              </div>
            </div>
            </div>
          </div>
          <div>
            {/* Eligible Departments */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 mt-2">
                Eligible Departments
              </label>
              <div className="flex w-[50%] gap-2">
                <input
                  type="text"
                  name="eligibleBatch"
                  defaultValue={initialData?.eligibleBatch}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:border-blue-500 outline-none"
                  placeholder="Eligible Batches"
                />
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={newDept}
                    onChange={(e) => setNewDept(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:border-blue-500 outline-none"
                    placeholder="Add department"
                  />
                  <button
                    onClick={addDepartment}
                    className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    <Plus size={20} />
                  </button>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mt-1">
                {departments.map((dept) => (
                  <div
                    key={dept}
                    className={`${
                      departments.length > 0 ? "p-2" : ""
                    } bg-blue-100 text-blue-800 font-semibold rounded-md w-fit`}
                  >
                    <div className="flex items-center gap-1">
                      <span>{dept}</span>
                      <button
                        type="button"
                        onClick={() => removeDepartment(dept)}
                        className="text-red-500"
                      >
                        <X size={24} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* Role and Salary */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Roles and Salary
            </label>
            <div className="flex flex-wrap gap-3">
              {rolesAndSalaries.map(({ role, salary }) => (
                <div
                  key={role}
                  className={`${
                    rolesAndSalaries.length > 0 ? "space-y-2 p-2" : ""
                  } bg-blue-100 text-blue-800 font-semibold rounded-md w-fit`}
                >
                  <div className="flex items-center gap-2">
                    <span>
                      {role}: Rs.{salary}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeRole(role)}
                      className="text-red-500"
                    >
                      <X size={24} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div>
              <div className="flex space-x-2 mt-2 w-[50%]">
                <input
                  type="text"
                  placeholder="Role"
                  value={newRole.role}
                  onChange={(e) =>
                    setNewRole({ ...newRole, role: e.target.value })
                  }
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md  focus:border-blue-500 outline-none"
                />
                <input
                  type="text"
                  placeholder="Salary"
                  value={newRole.salary}
                  onChange={(e) =>
                    setNewRole({ ...newRole, salary: e.target.value })
                  }
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md  focus:border-blue-500 outline-none"
                />
                <button
                  onClick={addRole}
                  className="px-3 py-2 bg-green-600 text-white rounded-lg "
                >
                  <Plus size={20} />
                </button>
              </div>
            </div>
          </div>

          {/* Round Details */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Round Details
            </label>
            <div className="flex flex-wrap gap-2">
              {roundDetails.map(({ roundNumber, description, venue }) => (
                <div
                  key={roundNumber}
                  className={`${
                    roundNumber.length > 0 ? "p-2" : ""
                  } bg-blue-100 text-blue-800 font-semibold rounded-md w-fit`}
                >
                  <div className="flex items-center gap-1">
                    <span>
                      Round {roundNumber}: {description} at {venue}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeRound(roundNumber)}
                      className="text-red-500"
                    >
                      <X size={24} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className=" mt-2 space-x-2">
              <input
                type="text"
                placeholder="Round Number"
                value={newRound.roundNumber}
                onChange={(e) =>
                  setNewRound({ ...newRound, roundNumber: e.target.value })
                }
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md  focus:border-blue-500 outline-none"
              />
              <input
                type="text"
                placeholder="Description"
                value={newRound.description}
                onChange={(e) =>
                  setNewRound({ ...newRound, description: e.target.value })
                }
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md  focus:border-blue-500 outline-none"
              />
              <input
                type="text"
                placeholder="Venue"
                value={newRound.venue}
                onChange={(e) =>
                  setNewRound({ ...newRound, venue: e.target.value })
                }
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md  focus:border-blue-500 outline-none"
              />
              <button
                onClick={addRound}
                className="px-3 py-2 bg-green-600 text-white rounded-lg"
              >
                <Plus size={20} />
              </button>
            </div>
          </div>
          {/* Submit Button */}
          <button
            type="submit"
            className="p-2 bg-blue-600 text-white font-semibold rounded-md"
          >
            {initialData ? "Update Drive" : "Create Drive"}
          </button>
        </form>
      </div>
    </div>
  );
}
