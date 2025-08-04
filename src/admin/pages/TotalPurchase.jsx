import React from "react";
import { useParams } from "react-router-dom";
import { FaPhoneAlt, FaTrash, FaUserCircle, FaCalendarAlt, FaShoppingCart, FaTruck } from "react-icons/fa";

const mockUsers = [
  {
    name: "John Doe",
    contact: "8888445555",
    date: "12/02/2025",
    purchases: 3,
    orders: 1,
  },
  {
    name: "Jane Smith",
    contact: "7776665555",
    date: "10/01/2025",
    purchases: 5,
    orders: 0,
  },
];

const CustomerCard = () => {
  const { id } = useParams();
  const user = mockUsers[id];

  if (!user) return <p className="p-10">User not found</p>;

  return (
    <div className="bg-[#f1f1f1] min-h-screen p-4 font-josefin">
      <div className="bg-white rounded-xl p-4 flex flex-col sm:flex-row justify-between items-center shadow-md">
        <div className="flex items-center gap-2">
          <FaUserCircle className="text-4xl text-orange-500" />
          <span className="text-lg font-semibold">{user.name}</span>
        </div>

        <div className="flex items-center gap-2 mt-2 sm:mt-0">
          <FaPhoneAlt className="text-gray-700" />
          <span className="text-sm">{user.contact}</span>
        </div>

        <button className="text-red-500 hover:text-red-700 mt-2 sm:mt-0">
          <FaTrash />
        </button>
      </div>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-4 shadow-md">
          <h3 className="text-sm font-medium">Account Creation</h3>
          <div className="flex items-center gap-2 mt-2 text-gray-500">
            <FaCalendarAlt className="text-orange-500" />
            <span>{user.date}</span>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-md">
          <h3 className="text-sm font-medium">Total Purchases</h3>
          <div className="flex items-center gap-2 mt-2">
            <FaShoppingCart className="text-orange-500" />
            <span className="text-xl font-semibold text-black">
              {user.purchases}
            </span>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-md">
          <h3 className="text-sm font-medium">Ongoing Orders</h3>
          <div className="flex items-center gap-2 mt-2">
            <FaTruck className="text-orange-500" />
            <span className="text-xl font-semibold text-black">
              {user.orders}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerCard;
