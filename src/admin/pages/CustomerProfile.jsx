import React, { useState } from "react";
import { FaTrash, FaCalendarAlt, FaShoppingCart, FaTruck } from "react-icons/fa";
import { FiPhone } from "react-icons/fi";

import VendorDetails from "./VendorDetails";
// import NoteForm from "./NoteForm";
// import BlockUserForm from "./BlockUserForm";

const CustomerProfile = () => {
  const [selectedOption, setSelectedOption] = useState("none");

  const customer = {
    name: "John Doe",
    phone: "8888445555",
    createdAt: "12/02/2025",
    totalOrders: 3,
    ongoingOrders: 1,
  };

  return (
    <div className="min p-4 font-sans">
      {/* Header */}
      <div className="flex justify-between items-center bg-white p-4 rounded-t-xl shadow-sm">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-yellow-500 flex items-center justify-center text-white font-bold text-xl">
            {customer.name.charAt(0)}
          </div>
          <h2 className="font-semibold text-lg">{customer.name}</h2>
        </div>
        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center space-x-2 text-gray-700">
            <FiPhone className="text-lg" />
            <span>{customer.phone}</span>
          </div>
          <button className="text-red-600 hover:text-red-800">
            <FaTrash />
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mt-4">
        <div className="bg-white rounded-xl p-4 text-center">
          <div className="flex justify-center items-center space-x-2 mb-1 text-sm text-gray-600">
            <FaCalendarAlt />
            <span>Account Creation</span>
          </div>
          <div className="text-gray-600 text-sm">{customer.createdAt}</div>
        </div>
        <div className="bg-white rounded-xl p-4 text-center border border-yellow-400">
          <div className="flex justify-center items-center space-x-2 mb-1 text-sm text-gray-600">
            <FaShoppingCart />
            <span>Total Orders</span>
          </div>
          <div className="text-2xl font-semibold text-black">{customer.totalOrders}</div>
        </div>
        <div className="bg-white rounded-xl p-4 text-center">
          <div className="flex justify-center items-center space-x-2 mb-1 text-sm text-gray-600">
            <FaTruck />
            <span>Ongoing Orders</span>
          </div>
          <div className="text-2xl font-semibold text-black">{customer.ongoingOrders}</div>
        </div>
      </div>

      {/* Option Buttons */}
      <div className="mt-6 flex space-x-4">
        <button
          className={`px-4 py-2 rounded ${
            selectedOption === "option1" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
          onClick={() => setSelectedOption("option1")}
        >
          View Orders
        </button>
        <button
          className={`px-4 py-2 rounded ${
            selectedOption === "option2" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
          onClick={() => setSelectedOption("option2")}
        >
          Add Note
        </button>
        <button
          className={`px-4 py-2 rounded ${
            selectedOption === "option3" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
          onClick={() => setSelectedOption("option3")}
        >
          Block User
        </button>
      </div>

      {/* Conditional Form Rendering */}
      <div className="mt-4 bg-white p-4 rounded-xl shadow-sm">
        {selectedOption === "option1" && <VendorDetails />}
        {/* {selectedOption === "option2" && <NoteForm />}
        {selectedOption === "option3" && <BlockUserForm />} */}
      </div>
    </div>
  );
};

export default CustomerProfile;