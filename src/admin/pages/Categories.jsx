
import React, { useEffect, useState } from 'react';
import { useGetProductsQuery, useUpdateProductMutation, useDeleteProductMutation } from '../redux/productsApi';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';
import { MdDelete, MdEdit } from 'react-icons/md';
import { toast } from 'react-toastify';
import axios from 'axios';

const Categories = () => {
  const { data, isLoading, refetch } = useGetProductsQuery();
  const [updateProduct, { isLoading: loadingForEdit }] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();
  const [loading, setLoading] = useState(false);
  const [available, setAvailable] = useState(null);


  const [selectedCategory, setSelectedCategory] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  const navigate = useNavigate();

  const allCategories = data?.data || [];

  useEffect(() => {
    if (allCategories.length && !selectedCategory) {
      setSelectedCategory(allCategories[0]);
    }
  }, [allCategories, selectedCategory]);

  const selectedProducts = selectedCategory?.product_array || [];

  const handleDelete = async (categoryId, productId) => {
    let a = confirm("Do you want to delete this product?");
    if (a) {
      try {
        await deleteProduct({ categoryId, productId }).unwrap();
        toast.success("Product Deleted Successfully!");
        refetch();
      } catch (error) {
        console.error('Failed to delete product:', error);
      }
    }
  };

  const handleEditClick = (product) => {
    setEditData({
      ...product,
      product_images: (product.product_images || []).map((url) => ({
        preview: url,
        file: null,
      })),
      fullCategory: selectedCategory,
      category: selectedCategory.product_catagory,
      categoryId: selectedCategory._id,
      gender: selectedCategory.gender,
    });
    setEditModalOpen(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({ ...prev, [name]: value }));
  };

  const handleEditSubmit = async () => {
    if (!editData) return;

    const updatedArray = editData.fullCategory.product_array.map(p =>
      p._id === editData._id
        ? {
          ...p,
          product_name: editData.product_name,
          product_price: Number(editData.product_price),
          product_type: editData.product_type,
          product_images: (editData.product_images || []).map(img => img.preview),
          product_description: editData.product_description,
          product_fabric: editData.product_fabric || '',
        }
        : p
    );

    const formData = new FormData();
    formData.append('product_catagory', editData.category);
    formData.append('gender', editData.gender);
    formData.append('product_array', JSON.stringify(updatedArray));

    try {
      await updateProduct({
        productId: editData.categoryId,
        formData,
      }).unwrap();
      toast.success("Edited Successfully!");
      setEditModalOpen(false);
      setEditData(null);
      refetch();
    } catch (err) {
      console.error('Update failed:', err);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl font-medium"><Loader /></div>
      </div>
    );
  }

  if (!allCategories.length) {
    return <div className="text-center mt-10 text-gray-600 text-xl">No Categories Found</div>;
  }

  const handleAvailability = async (productId) => {
    try {
      setLoading(true);
      console.log("Making available...");
      const res = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/v1/update/avalibilty/product/${productId}`,
        { available: true },
        { withCredentials: true }
      );
      setAvailable(true);
      console.log("Response:", res.data);
     await refetch();
    } catch (error) {
      console.error("Error updating availability:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUnAvailability = async (productId) => {
    try {
      setLoading(true);
      console.log("Making unavailable...");
      const res = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/v1/update/avalibilty/product/${productId}`,
        { available: false },
        { withCredentials: true }
      );
      setAvailable(false);
      console.log("Response:", res.data);
      await refetch();
    } catch (error) {
      console.error("Error updating availability:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-full">
      {loading && ( 
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="w-16 h-16 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      <div className="w-1/4 border-r border-gray-200 p-4 overflow-y-auto max-h-[80vh]">
        <h2 className="font-bold text-lg mb-3">Categories</h2>
        <div className="flex flex-col gap-2">
          {allCategories.map((cat) => (
            <div
              key={cat._id}
              onClick={() => setSelectedCategory(cat)}
              className={`cursor-pointer px-4 py-2 rounded-md transition 
                ${selectedCategory?._id === cat._id ? 'bg-black text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
            >
              {cat.product_catagory}
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 p-4 overflow-auto max-h-[90vh]">
        {selectedProducts.length ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {selectedProducts.map((product, index) => (
              <div
                key={product._id + index}
                className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-all flex flex-col justify-between p-5"
              >
                {/* Product Image */}
                <img
                  src={product.product_images[0]}
                  alt={product.product_name}
                  className="w-full h-44 object-cover rounded-lg mb-4"
                />

                {/* Product Info */}
                <div className="flex flex-col gap-1">
                  <h3 className="font-semibold text-base text-gray-800 truncate">
                    {product.product_name}
                  </h3>
                  <p className="text-sm text-gray-500">{selectedCategory.product_catagory}</p>
                  <p className="text-lg font-bold text-blue-600">₹{product.product_price}</p>
                  <p className="text-sm text-gray-600">Fabric: {product.product_fabric}</p>
                </div>

                {/* Buttons */}
                <div className="flex items-center gap-2 mt-4">
                  <button
                    className="flex-1 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium"
                    onClick={() =>
                      navigate(`/product/${product._id}`, { state: { product } })
                    }
                  >
                    View
                  </button>
                  <button
                    className="p-2 rounded-lg hover:bg-gray-100 transition"
                    onClick={() => handleEditClick(product)}
                  >
                    <MdEdit size={22} className="text-gray-600 hover:text-black" />
                  </button>
                  <button
                    className="p-2 rounded-lg hover:bg-gray-100 transition"
                    onClick={() => handleDelete(selectedCategory._id, product._id)}
                  >
                    <MdDelete size={22} className="text-gray-600 hover:text-black" />
                  </button>
                </div>

                {/* Availability */}
                <div className="mt-4 border-t pt-3 flex flex-col gap-2">
                  <p
                    className={`text-sm font-medium ${product.product_availability ? "text-green-500" : "text-red-500"
                      }`}
                  >
                    Availability: {product.product_availability ? "Yes" : "No"}
                  </p>

                  <div className="flex items-center gap-5">
                    <label className="flex items-center gap-2 cursor-pointer text-yellow-600 text-sm">
                      <input
                        type="radio"
                        name={`availability-${product._id}`}
                        checked={product.product_availability === true}
                        onChange={() => handleAvailability(product._id)}
                        className="accent-yellow-500 cursor-pointer"
                      />
                      Mark Available
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer text-yellow-600 text-sm">
                      <input
                        type="radio"
                        name={`availability-${product._id}`}
                        checked={product.product_availability === false}
                        onChange={() => handleUnAvailability(product._id)}
                        className="accent-yellow-500 cursor-pointer"
                      />
                      Mark Unavailable
                    </label>
                  </div>
                </div>
              </div>

            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 mt-10">No products in this category.</div>
        )}
      </div>

      {editModalOpen && editData && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-md max-h-[90vh] overflow-auto">
            <h2 className="text-xl font-bold mb-4">Edit Product</h2>

            <label className="block text-sm mb-1">Product Name</label>
            <input
              type="text"
              name="product_name"
              value={editData.product_name}
              onChange={handleEditChange}
              className="w-full mb-3 p-2 border rounded"
            />

            <label className="block text-sm mb-1">Price</label>
            <input
              type="number"
              name="product_price"
              value={editData.product_price}
              onChange={handleEditChange}
              className="w-full mb-3 p-2 border rounded"
            />

            <label className="block text-sm mb-1">Gender</label>
            <select
              name="gender"
              value={editData.gender}
              onChange={handleEditChange}
              className="w-full mb-3 p-2 border rounded"
            >
              <option>Men</option>
              <option>Women</option>
            </select>

            <label className="block text-sm mb-1">Product Type</label>
            <input
              type="text"
              name="product_type"
              value={editData.product_type}
              onChange={handleEditChange}
              className="w-full mb-4 p-2 border rounded"
            />

            <label className="block text-sm mb-1">Product Fabric</label>
            <input
              type="text"
              name="product_fabric"
              value={editData.product_fabric || ''}
              onChange={handleEditChange}
              className="w-full mb-4 p-2 border rounded"
            />

            <label className="block text-sm mb-1">Product Description</label>
            <input
              type="text"
              name="product_description"
              value={editData.product_description}
              onChange={handleEditChange}
              className="w-full mb-4 p-2 border rounded"
            />

            <label className="block text-sm font-medium mb-1">Product Images</label>
            <div className="flex flex-col gap-3 mb-4">
              {(editData.product_images || []).map((imgObj, idx) => (
                <div key={idx} className="relative w-full flex items-center gap-3">
                  <img
                    src={imgObj.preview}
                    alt={`product-${idx}`}
                    className="w-24 h-24 object-cover rounded border"
                  />
                  <button
                    onClick={() => {
                      const updated = editData.product_images.filter((_, i) => i !== idx);
                      setEditData((prev) => ({ ...prev, product_images: updated }));
                    }}
                    className="absolute -top-2 -right-2 bg-white border rounded-full text-red-600 hover:text-red-800 shadow p-1"
                    title="Remove image"
                  >
                    ❌
                  </button>
                </div>
              ))}
              <label className="cursor-pointer text-blue-600 text-sm hover:underline w-fit">
                + Add Image
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      const preview = URL.createObjectURL(file);
                      setEditData((prev) => ({
                        ...prev,
                        product_images: [...(prev.product_images || []), { file, preview }],
                      }));
                    }
                  }}
                />
              </label>
            </div>

            <div className="flex justify-between">
              <button
                onClick={() => setEditModalOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleEditSubmit}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                {loadingForEdit ? "Editing..." : "Edit"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Categories;

