import React from "react";
import { useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa";

const mockUsers = [
  {
    id: "1",
    name: "John Doe",
    shopName: "Lemon Tree",
    address: "Golden City Center, Chhatrapati Sambhajinagar",
    contact: "8545785478",
    date: "25/05/2025",
    email: "john@gmail.com",
    mobile: "8545785478",
    shop: {
      name: "Lemon Tree",
      email: "john@gmail.com",
      mobile: "654869634",
      address: "Golden City Center",
      area: "Near Prozon",
      city: "Chhatrapati Sambhajinagar",
      pincode: "431001",
    },
    documents: [
      { label: "GST Number", number: "MH-MUM-SEA-2024-123456" },
      { label: "Shop Act License Number", number: "MH-MUM-SEA-2024-123456" },
      { label: "Fruit & Drug License Number ", number: "MH-MUM-SEA-2024-123456" },
      { label: "Clerk’s license Number ", number: "MH-MUM-SEA-2024-123456" },
    ],
  },
];

const Vendor = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen font-josefin  p-6">
      {/* Title and Button */}
      <div className="flex flex-col sm:flex-row justify-end items-start sm:items-center gap-4 mb-4">
        <button className="bg-[#3F9224] rounded-2xl text-white text-base px-6 py-3 hover:bg-[#34781e] transition-all">
          View Requests
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border h-screen bg-white border-gray-200 shadow-sm">
        <table className="min-w-full text-sm md:text-base">
          <thead>
            <tr className="text-center font-normal text-lg border border-b text-black/70">
              <th className="px-6 py-4">Vendor Name</th>
              <th className="px-6 py-4">Shop Name</th>
              <th className="px-6 py-4">Address</th>
              <th className="px-6 py-4">Contact No</th>
              <th className="px-6 py-4">Details</th>
              <th className="px-6 py-4">Register Date</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {mockUsers.map((user, idx) => (
              <tr
                key={idx}
                className="text-center text-base border border-b text-[#B8B8B8] hover:bg-gray-50 transition"
              >
                <td className="px-6 py-4">{user.name}</td>
                <td className="px-6 py-4">{user.shopName}</td>
                <td className="px-6 py-4 break-words">{user.address}</td>
                <td className="px-6 py-4">{user.contact}</td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => navigate(`/vendor-details/${user.id}`, { state: user })}
                    className="text-blue-600 hover:underline"
                  >
                    View
                  </button>
                </td>
                <td className="px-6 py-4">{user.date}</td>
                <td className="px-6 py-4 text-center">
                  <button className="text-red-600 hover:text-red-800">
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
            {mockUsers.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center text-gray-400 py-8">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Vendor;
