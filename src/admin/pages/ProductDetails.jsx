import React, { useState } from "react";
import { MdClose } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";

const ProductDetails = () => {
  const [imageModal, setImageModal] = useState(null);
  const { state } = useLocation();
  const product = state?.product;
  const navigate = useNavigate();

  if (!product) return <div className="p-4 text-center text-gray-500">No product data found</div>;

  const handleModalClose = () => {
    setImageModal(null);
  };

  return (
    <div className=" max-w-5xl">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-6 inline-flex items-center gap-2 px-4 py-2 border border-gray-300 bg-white hover:bg-gray-50 transition text-black rounded-lg shadow"
      >
        ← Back to Products
      </button>

      {/* Product Card */}
      <div className="rounded-2xl overflow-hidden shadow-lg border bg-white">
        {/* Header Section */}
        <div className="bg-black p-6 text-white">
          <h2 className="text-3xl font-bold mb-2">{product.product_name}</h2>
          <div className="flex items-center gap-4">
            <span className="bg-blue-200 text-blue-800 px-3 py-1 text-sm font-semibold rounded-full">
              {product.category}
            </span>
            <span className="text-2xl font-bold">₹{product.product_price}</span>
          </div>
        </div>

        {/* Body Section */}
        <div className="p-6">
          {/* Product Images */}
          <h3 className="text-xl font-semibold text-gray-700 mb-4 border-l-4 border-blue-500 pl-3">
            Product Images
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {product.product_images?.length > 0 ? (
              product.product_images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Product ${index + 1}`}
                  className="w-full h-40 object-cover rounded-xl border cursor-pointer shadow hover:scale-105 transition-transform"
                  onClick={() => setImageModal(img)}
                />
              ))
            ) : (
              <p className="text-gray-500">No images found</p>
            )}
          </div>

          {/* Description */}
          <div className="mt-6">
            <h4 className="text-lg font-semibold mb-2">Description</h4>
            <p className="text-gray-700 leading-relaxed">
              {product.product_description}
            </p>
          </div>
        </div>
      </div>

      {/* Image Modal */}
      {imageModal && (
        <div
          onClick={handleModalClose}
          className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50"
        >
          <div
            className="relative"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={imageModal}
              alt="Enlarged"
              className="max-w-[90vw] max-h-[80vh] rounded-lg shadow-2xl object-contain"
            />
            <button
              onClick={handleModalClose}
              className="absolute top-2 right-2 text-white text-3xl w-10 h-10 bg-black bg-opacity-60 rounded-full flex items-center justify-center hover:bg-opacity-90 transition"
            >
              <MdClose />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
