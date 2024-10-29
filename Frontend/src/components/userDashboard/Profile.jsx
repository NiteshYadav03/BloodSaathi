import React, { useState } from 'react';

const Profile = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [country, setCountry] = useState('');
  const [state, setState] = useState('');
  const [district, setDistrict] = useState('');
  const [pincode, setPincode] = useState('');
  const [dob, setDob] = useState(''); // Date of birth format

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    const updatedProfile = {
      name,
      email,
      phoneNumber,
      address,
      country,
      state,
      district,
      pincode,
      dob
    };

    try {
      const response = await fetch('/api/user/update', {
        method: 'PUT', // Use POST if your API expects it
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedProfile),
      });

      const result = await response.json();
      if (response.ok) {
        console.log('Profile updated successfully', result);
        alert('Profile updated successfully');
      } else {
        console.error('Error updating profile', result);
        alert('Failed to update profile');
      }
    } catch (error) {
      console.error('Error occurred while updating profile', error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-8 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg shadow-lg border border-gray-200">
      <h2 className="text-3xl font-bold text-center text-blue-800 mb-8">Profile Information</h2>
      <form onSubmit={handleUpdateProfile} className="space-y-6">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border border-gray-300 rounded-lg w-full py-2 px-4"
          placeholder="Enter your name"
          required
        />
        {/* Additional input fields for email, phoneNumber, address, country, state, district, pincode, and dob */}
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-gray-300 rounded-lg w-full py-2 px-4"
          placeholder="Enter your email"
          required
        />
        <input
          type="text"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className="border border-gray-300 rounded-lg w-full py-2 px-4"
          placeholder="Enter your phone number"
          required
        />
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="border border-gray-300 rounded-lg w-full py-2 px-4"
          placeholder="Enter your address"
          required
        />
        <input
          type="text"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          className="border border-gray-300 rounded-lg w-full py-2 px-4"
          placeholder="Enter your country"
          required
        />
        <input
          type="text"
          value={state}
          onChange={(e) => setState(e.target.value)}
          className="border border-gray-300 rounded-lg w-full py-2 px-4"
          placeholder="Enter your state"
          required
        />
        <input
          type="text"
          value={district}
          onChange={(e) => setDistrict(e.target.value)}
          className="border border-gray-300 rounded-lg w-full py-2 px-4"
          placeholder="Enter your district"
          required
        />
        <input
          type="text"
          value={pincode}
          onChange={(e) => setPincode(e.target.value)}
          className="border border-gray-300 rounded-lg w-full py-2 px-4"
          placeholder="Enter your pincode"
          required
        />
        <input
          type="date"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          className="border border-gray-300 rounded-lg w-full py-2 px-4"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default Profile;
