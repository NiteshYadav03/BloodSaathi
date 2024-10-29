import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Navbar from '../shared/Navbar';
import Footer from '../shared/Footer';
import BloodDonationForm from './BloodDonationForm';
import BloodRequestForm from './BloodRequestForm';
import NotificationSystem from './NotificationSystem';
import BloodDonationHistory from './BloodDonationHistory';
import HealthProfile from './HealthProfile';
import Statistics from './Statistics';
import Profile from './Profile';
import { FaUpload } from 'react-icons/fa'; // Import an icon for better UI

const UserDashboard = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [currentSection, setCurrentSection] = useState('donation');
  const [image, setImage] = useState(null);

  const renderSection = () => {
    switch (currentSection) {
      case 'donation':
        return <BloodDonationForm />;
      case 'request':
        return <BloodRequestForm />;
      case 'notifications':
        return <NotificationSystem />;
      case 'history':
        return <BloodDonationHistory />;
      case 'profile':
        return <HealthProfile />;
      case 'userprofile':
        return <Profile />;
      case 'statistics':
        return <Statistics />;
      default:
        return <BloodDonationForm />;
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageRemove = () => {
    setImage(null);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex flex-grow bg-gray-100">
        {isSidebarOpen && (
          <Sidebar currentSection={currentSection} setCurrentSection={setCurrentSection} />
        )}
        <div className={`flex-grow p-6 ${isSidebarOpen ? 'ml-64' : ''}`}>
          <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">Blood Bank Dashboard</h1>

          {/* Image Upload Section */}
          <div className="flex flex-col items-center mb-8 p-4 bg-white rounded-lg shadow-md">
            <div className="w-32 h-32 rounded-full border-4 border-blue-500 flex items-center justify-center overflow-hidden">
              {image ? (
                <img src={image} alt="Uploaded" className="w-full h-full object-cover" />
              ) : (
                <span className="text-gray-400">No Image</span>
              )}
            </div>
            <label htmlFor="imageUpload" className="mt-4">
              <input
                id="imageUpload"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <button
                onClick={() => document.getElementById('imageUpload').click()}
                className="flex items-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
              >
                <FaUpload className="mr-2" />
                {image ? 'Change Profile Picture' : 'Upload Image'}
              </button>
            </label>
            {image && (
              <button
                onClick={handleImageRemove}
                className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300"
              >
                Remove Profile Picture
              </button>
            )}
          </div>

          {/* Render the current section */}
          <div className="bg-white p-6 rounded-lg shadow-md">{renderSection()}</div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
