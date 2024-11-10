import  { useState, useEffect } from 'react';
import axios from 'axios';
import DriveCard from '../components/DriveCard';
import DriveModal from '../components/DriveModal';
import DriveForm from '../components/DriveForm';
import { Plus } from 'lucide-react';


export default function Drives() {
  const [showModal, setShowModal] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [selectedDrive, setSelectedDrive] = useState(null);
  const [drives, setDrives] = useState([]);

  useEffect(() => {
    fetchDrives();
  }, []);

  const fetchDrives = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/drive/get-drive/4a92cdba71784125a786265f332c8ce5");
      setDrives(response.data.data);
    } catch (error) {
      console.error('Error fetching drives:', error);
    }
  };

  const handleDelete = async (driveId) => {
    try {
      await axios.delete(`http://localhost:8080/api/drive/delete-drive/${driveId}`);
      fetchDrives();
    } catch (error) {
      console.error('Error deleting drive:', error);
    }
  };

  const handleEdit = (drive) => {
    setSelectedDrive(drive);
    setShowForm(true);
  };

  const handleView = (drive) => {
    setSelectedDrive(drive);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedDrive(null);
    setShowModal(false);
  };

  const handleCloseForm = () => {
    setSelectedDrive(null);
    setShowForm(false);
  };

  const handleSubmit = async (data) => {
    try {
      if (selectedDrive) {
        await axios.put(`/api/drives/${selectedDrive._id}`, data);
      } else {
        await axios.post('/api/drives', data);
      }
      fetchDrives();
      setShowForm(false);
    } catch (error) {
      console.error('Error saving drive:', error);
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Placement Drives</h1>
          <p className="text-gray-600 mt-2">Manage upcoming and ongoing placement drives</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus size={20} />
          <span>Add Drive</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {drives.map((drive) => (
          <DriveCard
            key={drive._id}
            drive={drive}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onView={handleView}
          />
        ))}
      </div>

      {showModal && (
        <DriveModal
          drive={selectedDrive}
          onClose={handleCloseModal}
        />
      )}

      {showForm && (
        <DriveForm
          initialData={selectedDrive}
          onClose={handleCloseForm}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
}