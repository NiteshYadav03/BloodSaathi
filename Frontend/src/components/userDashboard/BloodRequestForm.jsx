import React, { useState } from 'react';

const BloodRequestForm = () => {
  const [request, setRequest] = useState({
    bloodType: '',
    quantity: '',
    hospitalName: '',
    reason: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRequest({ ...request, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle blood request submission
    console.log(request); // You can replace this with actual submission logic
  };

  return (
    <div className="bg-gradient-to-r from-blue-100 to-white p-8 rounded-lg shadow-lg border border-gray-300 max-w-md mx-auto mt-10">
      <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">Request Blood</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Blood Type:
          </label>
          <select
            name="bloodType"
            onChange={handleChange}
            className="block w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-500 transition duration-200 ease-in-out"
            required
          >
            <option value="">Select Blood Type</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Quantity (in units):
          </label>
          <input
            type="number"
            name="quantity"
            onChange={handleChange}
            className="block w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-500 transition duration-200 ease-in-out"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Hospital Name:
          </label>
          <input
            type="text"
            name="hospitalName"
            onChange={handleChange}
            className="block w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-500 transition duration-200 ease-in-out"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Reason for Request:
          </label>
          <textarea
            name="reason"
            onChange={handleChange}
            className="block w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-500 transition duration-200 ease-in-out"
            rows="4"
            placeholder="Please provide details..."
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition duration-200"
        >
          Request Blood
        </button>
      </form>
    </div>
  );
};

export default BloodRequestForm;
