import React from "react";
import { useLocation } from "react-router-dom";
import { FaPhoneAlt, FaTrashAlt, FaShoppingCart, FaUser } from "react-icons/fa";
import { BsCart4 } from "react-icons/bs";

const VendorDetails = () => {
  const { state } = useLocation();

  if (!state)
    return (
      <div className="p-6 text-red-500 font-semibold">
        No vendor data found.
      </div>
    );

  const { name, email, mobile, address, shop, documents } = state;

  return (
    <div className="mt-20 px-4">
      {/* Header Card */}
      <div className=" rounded-lg p-4 -md flex flex-col md:flex-row justify-between items-center gap-4">
        {/* Vendor Info */}
        <div className="flex items-center gap-4">
          <div className="bg-[#FF9F03] rounded-full w-10 h-10 flex items-center justify-center text-white text-lg font-bold">
    <FaUser/>
          </div>
          <h2 className="text-2xl font-normal text-gray-800">
            {shop?.name || "Lemon Tree"}
          </h2>
        </div>

        {/* Contact + Delete */}
        <div className="flex items-center gap-6">
          <FaPhoneAlt className="text-black text-lg" />
          <span className="text-lg text-black ">{shop?.mobile || mobile}</span>
          <FaTrashAlt className="text-red-500 cursor-pointer" />
        </div>
      </div>

      {/* Stats */}
      <div className="flex flex-wrap text-black justify-cen  gap-7 mt-">
        <div className="bg-white w-80 h-24 px-6 hover:border-yellow-400 border py-2 rounded-md shadow-sm text-cen">
          <p className="text-xl font-medium">Total Orders</p>
          <div className="flex items-center text-xl gap-2 mt-1">
            <BsCart4 className="text-orange-400 text-4xl" />
            <span className="font-semibold text-3xl">35</span>
          </div>
        </div>

        <div className="bg-white w-80 h-24 px-6 hover:border-yellow-400 border py-2 rounded-md shadow-sm text-cent">
          <p className="text-xl font-medium">Total Food Item</p>
          <div className="flex items-center justify-nter gap-2 mt-1">
            <FaShoppingCart className="text-orange-400 text-4xl" />
            <span className="font-semibold text-3xl">35</span>
          </div>
        </div>

        <div className="bg-white border w-80 h-24 hover:border-yellow-400 px-6 py-2 rounded-md shadow-sm text-ceer">
          <p className="text-xl font-medium">Total Revenue</p>
          <span className="font-semibold text-3xl text-black">₹32,135</span>
        </div>
      </div>

      {/* Vendor Info */}
      <div className="p-6 bg-[#D9D9D94D] mt-10 rounded-lg space-y-10">
        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-1 text-sm font-medium">Vendor Name</label>
              <input disabled value={name} className="w-full border p-3 rounded-lg bg-white" />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium">Email</label>
              <input disabled value={email} className="w-full border p-3 rounded-lg bg-white" />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium">Mobile No</label>
              <input disabled value={mobile} className="w-full border p-3 rounded-lg bg-white" />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium">Address</label>
              <input disabled value={address} className="w-full border p-3 rounded-lg bg-white" />
            </div>
          </div>
        </section>

        {/* Shop Info */}
        <section>
          <h2 className="text-xl font-semibold mb-4 bg-white p-3 rounded-lg">Shop Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              ["Shop Name", shop?.name],
              ["Email", shop?.email],
              ["Mobile No", shop?.mobile],
              ["Address", shop?.address],
              ["Area", shop?.area],
              ["City", shop?.city],
              ["Pin code", shop?.pincode],
            ].map(([label, value], i) => (
              <div key={i}>
                <label className="block mb-1 text-sm font-medium">{label}</label>
                <input disabled value={value} className="w-full border p-3 rounded-lg bg-white" />
              </div>
            ))}
          </div>
        </section>

        {/* Document Details */}
        {documents?.length > 0 && (
          <section>
            <h2 className="text-xl font-semibold mb-4">Document Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {documents.map((doc, idx) => (
                <div
                  key={idx}
                  className="border p-3 rounded-lg bg-white flex justify-between items-center"
                >
                  <div>
                    <label className="block text-sm font-medium">{doc.label}</label>
                    <div className="text-sm">{doc.number}</div>
                  </div>
                  <a href="#" className="text-blue-600 underline text-sm hover:text-blue-800">
                    View
                  </a>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default VendorDetails;
