// import React, { useEffect, useState } from 'react';
// import { useGetProductsQuery } from '../redux/productsApi';
// import { useNavigate } from 'react-router-dom';
// import Loader from '../components/Loader';

// const Categories = () => {
//   const { data, isLoading } = useGetProductsQuery();
//   const [selectedGender, setSelectedGender] = useState("Men");
//   const [selectedType, setSelectedType] = useState(null);
//   const navigate = useNavigate();


//   useEffect(() => {
//     if (data && selectedGender && !selectedType) {
//       const filtered = data.data.filter(cat => cat.gender === selectedGender);
//       const allTypes = [
//         ...new Set(
//           filtered.flatMap(cat =>
//             cat.product_array.map(product => product.product_type)
//           )
//         )
//       ];
//       if (allTypes.length > 0) {
//         setSelectedType(allTypes[0]);
//       }
//     }
//   }, [data, selectedGender, selectedType]);

//   if (isLoading) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <div className="text-xl font-medium"><Loader /></div>
//       </div>
//     );
//   }

//   const genders = [...new Set(data?.data.map(item => item.gender))];
//   const filteredCategories = data?.data.filter(cat => cat.gender === selectedGender);

//   const productTypes = [
//     ...new Set(
//       filteredCategories?.flatMap(cat =>
//         cat.product_array.map(product => product.product_type)
//       )
//     )
//   ];

//   const selectedProducts = filteredCategories?.flatMap(cat =>
//     cat.product_array
//       .filter(product => product.product_type === selectedType)
//       .map(product => ({
//         ...product,
//         category: cat.product_catagory,
//         catImage: cat.product_catagory_image
//       }))
//   );

//   return (
//     <div className="flex flex-col p-4 md:p-6 h-full">
//       {/* Gender Tabs */}
//       <div className="flex flex-wrap gap-2 md:gap-4 mb-4 justify-center md:justify-start">
//         {genders.map(gender => (
//           <button
//             key={gender}
//             onClick={() => {
//               setSelectedGender(gender);
//               setSelectedType(null); 
//             }}
//             className={`px-4 py-2 rounded-full font-medium border transition ${
//               selectedGender === gender
//                 ? 'bg-black text-white'
//                 : 'bg-gray-100 text-black hover:bg-gray-200'
//             }`}
//           >
//             {gender}
//           </button>
//         ))}
//       </div>

//       <div className="flex flex-col lg:flex-row gap-4">
//         {/* Sidebar for Product Types */}
//         {selectedGender && (
//           <div className="lg:w-1/5 w-full border-r lg:border-r-2 border-gray-300 pr-4">
//             <h2 className="font-semibold mb-3 text-lg text-center lg:text-left">Product Types</h2>
//             <div className="flex lg:flex-col flex-wrap gap-2 justify-center">
//               {productTypes.map(type => (
//                 <div
//                   key={type}
//                   onClick={() => setSelectedType(type)}
//                   className={`cursor-pointer px-3 py-2 text-sm rounded-lg transition text-center w-full lg:w-auto ${
//                     selectedType === type
//                       ? 'bg-black text-white'
//                       : 'bg-gray-100 hover:bg-gray-200'
//                   }`}
//                 >
//                   {type}
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* Product Display */}
//         <div className="lg:w-4/5 w-full overflow-auto max-h-[70vh]">
//           {selectedProducts?.length ? (
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//               {selectedProducts.map((product, index) => (
//                 <div
//                   key={product._id + index}
//                   className="bg-white border border-gray-200 p-4 rounded-xl shadow-sm hover:shadow-md transition"
//                 >
//                   <img
//                     src={product.catImage}
//                     alt="Product"
//                     className="w-full h-40 object-cover rounded-lg"
//                   />
//                   <h3 className="font-semibold mt-3 text-base">{product.product_name}</h3>
//                   <p className="text-sm text-gray-500">{product.category}</p>
//                   <p className="text-lg font-bold text-blue-600 mt-1">₹{product.product_price}</p>
//                   <button
//                     className="mt-3 w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
//                     onClick={() =>
//                       navigate(`/product/${product._id}`, { state: { product } })
//                     }
//                   >
//                     View
//                   </button>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <div className="text-center text-gray-500 mt-10">No products to display.</div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Categories;




import React, { useEffect, useState } from 'react';
import { useGetProductsQuery, useUpdateProductMutation, useDeleteProductMutation } from '../redux/productsApi';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';
import { MdDelete, MdEdit } from 'react-icons/md';
import { toast } from 'react-toastify';

const Categories = () => {
  const { data, isLoading, refetch } = useGetProductsQuery();
  const [updateProduct, {isLoading: loadingForEdit}] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

  const [selectedType, setSelectedType] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  const navigate = useNavigate();

  const allCategories = data?.data || [];

  useEffect(() => {
    if (allCategories.length && !selectedType) {
      const allTypes = [
        ...new Set(
          allCategories.flatMap(cat =>
            cat.product_array.map(product => product.product_type)
          )
        )
      ];
      if (allTypes.length > 0) {
        setSelectedType(allTypes[0]);
      }
    }
  }, [allCategories, selectedType]);

  const productTypes = [
    ...new Set(
      allCategories.flatMap(cat =>
        cat.product_array.map(product => product.product_type)
      )
    )
  ];

  const selectedProducts = allCategories.flatMap(cat =>
    cat.product_array
      .filter(product => product.product_type === selectedType)
      .map(product => ({
        ...product,
        category: cat.product_catagory,
        catImage: cat.product_catagory_image,
        gender: cat.gender,
        categoryId: cat._id,
        fullCategory: cat,
      }))
  );

  const handleDelete = async (categoryId, productId) => {
    let a = confirm("Do you want to delete this product?");
    if (a) {
      try {
        await deleteProduct({ categoryId, productId }).unwrap();
        toast.success("Product Deleted Successfully!")
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
          }
        : p
    );

    const formData = new FormData();
    formData.append('product_catagory', editData.category);
    formData.append('gender', editData.gender);
    formData.append('product_array', JSON.stringify(updatedArray));
    formData.append('product_description', editData.product_description);

    try {
      await updateProduct({
        productId: editData.categoryId,
        formData,
      }).unwrap();
      toast.success("Edited Successfully!")

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
    return <div className="text-center mt-10 text-gray-600 text-xl">No Products Found</div>;
  }

  return (
    <div className="flex flex-col p-4 md:p-6 h-full">
      <div className="mb-4">
        {/* <h2 className="font-semibold mb-2 text-lg text-center">Product Types</h2> */}
        <div className="flex flex-wrap gap-2 justify-left">
          {productTypes.map(type => (
            <div
              key={type}
              onClick={() => setSelectedType(type)}
              className={`cursor-pointer px-4 py-2 text-sm rounded-full transition ${selectedType === type
                ? 'bg-black text-white'
                : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              {type}
            </div>
          ))}
        </div>
      </div>

      <div className="w-full overflow-auto max-h-[70vh]">
        {selectedProducts?.length ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {selectedProducts.map((product, index) => (
              <div
                key={product._id + index}
                className="bg-white border border-gray-200 p-4 rounded-xl shadow-sm hover:shadow-md transition relative"
              >
                <img
                  src={product.catImage}
                  alt="Product"
                  className="w-full h-40 object-cover rounded-lg"
                />
                <h3 className="font-semibold mt-3 text-base">{product.product_name}</h3>
                <p className="text-sm text-gray-500">{product.category}</p>
                <p className="text-lg font-bold text-blue-600 mt-1">₹{product.product_price}</p>
                <div className="flex gap-2 mt-3">
                  <button
                    className="flex-1 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-700 transition"
                    onClick={() =>
                      navigate(`/product/${product._id}`, { state: { product } })
                    }
                  >
                    View
                  </button>
                  <button
                    className="px-3 text-sm text-yellow-500 hover:text-yellow-600"
                    onClick={() => handleEditClick(product)}
                  >
                    <MdEdit size={24} className='text-gray-600 hover:text-black' />
                  </button>
                  <button
                    className="px-3 text-sm text-red-500 hover:text-red-600"
                    onClick={() => handleDelete(product.categoryId, product._id)}
                  >
                    <MdDelete size={24} className='text-gray-600 hover:text-black' />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 mt-10">No products to display.</div>
        )}
      </div>

      {/* Edit Modal logic remains the same */}
      {editModalOpen && editData && (
        // Modal JSX (unchanged)
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



