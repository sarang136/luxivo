import React from "react";
import { FaPhoneAlt, FaTrashAlt, FaShoppingCart } from "react-icons/fa";
import { BsCart4 } from "react-icons/bs";

const VendorCard = () => {
  return (
    <div className="bg-gray-100 rounded-lg p-4 shadow-md flex flex-col md:flex-row justify-between items-center gap-4">
      {/* Left: Vendor Info */}
      <div className="flex items-center gap-3">
        <div className="bg-yellow-400 rounded-full w-10 h-10 flex items-center justify-center text-white text-lg font-bold">
          {/* Icon can be replaced with profile image */}
          <span className="text-white">👤</span>
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gray-800">Lemon Tree</h2>
        </div>
      </div>

      {/* Contact and Delete */}
      <div className="flex items-center gap-3">
        <FaPhoneAlt className="text-black" />
        <span className="text-sm text-black">8888445555</span>
        <FaTrashAlt className="text-red-500 cursor-pointer" />
      </div>

      {/* Stats Section */}
      <div className="flex flex-wrap justify-center gap-4">
        {/* Total Orders */}
        <div className="bg-white px-6 py-2 rounded-md shadow-sm text-center">
          <p className="text-sm text-gray-600">Total Orders</p>
          <div className="flex items-center justify-center gap-2 mt-1">
            <BsCart4 className="text-orange-400" />
            <span className="font-semibold text-lg">35</span>
          </div>
        </div>

        {/* Total Food Items */}
        <div className="bg-white px-6 py-2 rounded-md shadow-sm text-center">
          <p className="text-sm text-gray-600">Total Food Item</p>
          <div className="flex items-center justify-center gap-2 mt-1">
            <FaShoppingCart className="text-orange-400" />
            <span className="font-semibold text-lg">35</span>
          </div>
        </div>

        {/* Total Revenue */}
        <div className="bg-white border border-yellow-400 px-6 py-2 rounded-md shadow-sm text-center">
          <p className="text-sm text-gray-600">Total Revenue</p>
          <span className="font-semibold text-xl text-black">₹32,135</span>
        </div>
      </div>
    </div>
  );
};

export default VendorCard;
