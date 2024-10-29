import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';

const BloodDonationHistory = () => {
  const history = [
    { date: "2024-08-10", quantity: "1", bloodType: "O+", hospital: "City Hospital" },
    { date: "2024-06-15", quantity: "1", bloodType: "A-", hospital: "General Hospital" },
    // More history records...
  ];

  const tableRef = useRef(null);

  useEffect(() => {
    gsap.from(tableRef.current, {
      opacity: 0,
      y: -20,
      duration: 0.5,
      ease: "power2.out",
    });
  }, []);

  return (
    <div className="bg-gradient-to-r from-red-100 to-yellow-100 p-6 rounded-lg shadow-lg border border-gray-300">
      <h2 className="text-3xl font-semibold mb-6 text-center text-red-600">Blood Donation History</h2>
      <motion.table
        ref={tableRef}
        className="min-w-full divide-y divide-gray-300"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <thead>
          <tr className="bg-red-600 text-white">
            <th className="py-3 px-4 text-left">Date</th>
            <th className="py-3 px-4 text-left">Quantity</th>
            <th className="py-3 px-4 text-left">Blood Type</th>
            <th className="py-3 px-4 text-left">Hospital</th>
          </tr>
        </thead>
        <tbody>
          {history.map((donation, index) => (
            <motion.tr
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="hover:bg-red-50 transition duration-200"
            >
              <td className="py-3 px-4 border-b border-gray-200">{donation.date}</td>
              <td className="py-3 px-4 border-b border-gray-200">{donation.quantity} L</td>
              <td className="py-3 px-4 border-b border-gray-200">{donation.bloodType}</td>
              <td className="py-3 px-4 border-b border-gray-200">{donation.hospital}</td>
            </motion.tr>
          ))}
        </tbody>
      </motion.table>
    </div>
  );
};

export default BloodDonationHistory;
