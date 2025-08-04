// import React, { useState } from 'react';
// import { useGetProductsQuery } from '../redux/productsApi';
// import { MdAdd, MdDelete, MdEdit } from 'react-icons/md';

// const TotalProducts = () => {
//   const { data } = useGetProductsQuery();
//   console.log(data)
//   const [selectedGender, setSelectedGender] = useState('Men');

//   if (!data || !data.data) return <div>Loading...</div>;


//   const menData = data.data.find(item => item.gender === 'Men');
//   const womenData = data.data.find(item => item.gender === 'Women');

//   console.log("Men Data:", menData);
//   console.log("Women Data:", womenData);

//   const genderFilteredData = selectedGender === 'Men' ? menData : womenData;
//   const products = genderFilteredData?.product_array || [];

//   return (
//     <div className="p-5 bg-gray-100 min-h-screen">

//       <div className="flex gap-4 mb-4">
//         <button
//           className={`px-6 py-2 rounded-lg font-semibold ${selectedGender === 'Men' ? 'bg-white text-black shadow' : 'text-gray-500 bg-gray-200'}`}
//           onClick={() => setSelectedGender('Men')}
//         >
//           Men
//         </button>
//         <button
//           className={`px-6 py-2 rounded-lg font-semibold ${selectedGender === 'Women' ? 'bg-white text-black shadow' : 'text-gray-500 bg-gray-200'}`}
//           onClick={() => setSelectedGender('Women')}
//         >
//           Women
//         </button>
//       </div>

//       <div className="overflow-x-auto">
//         <table className="min-w-full border-collapse border">
//           <thead>
//             <tr className="bg-black text-white">
//               <th className="p-3 text-left">Image</th>
//               <th className="p-3 text-left">Product Name</th>
//               <th className="p-3 text-left">Product Type</th>
//               <th className="p-3 text-left">Photos</th>
//               <th className="p-3 text-left">Price</th>
//               <th className="p-3 text-left">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {products.map((prod, i) => (
//               <tr key={prod._id} className="border-b">
//                 <td className="p-3">
//                   <img src={prod.product_images?.[0]} alt="product" className="h-14 w-14 object-cover" />
//                 </td>
//                 <td className="p-3">{prod.product_name}</td>
//                 <td className="p-3">{prod.product_type || '-'}</td>
//                 <td className="p-3">Rs.{prod.product_price}</td>
//                 {/* <td className="p-3">10</td> */}
//                 {/* <td className="p-3">In Stock</td> */}
//                 <td className="p-3 text-blue-500 cursor-pointer">View</td>
//                 <td className="p-3 ">
//                   <button className="text-green-600 text-lg "><MdAdd/></button>
//                   <button className="text-red-600 text-lg"><MdDelete/></button>
//                   <button className="text-black text-lg"><MdEdit/></button>
//                 </td>
//               </tr>
//             ))}

//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default TotalProducts;







// import React from 'react'
// import { useGetProductsQuery } from '../redux/productsApi'

// const TotalProducts = () => {
//   const { data } = useGetProductsQuery();
//   console.log(data);

//   // data.


//   return (
//     <div className="overflow-x-auto">
//       <table className="min-w-full border border-gray-300 text-left">
//         <thead>
//           <tr className="bg-gray-100">
//             <th className="border px-4 py-2">Product Name</th>
//             <th className="border px-4 py-2">Category</th>
//             <th className="border px-4 py-2">Price</th>
//             <th className="border px-4 py-2">Quantity</th>
//             <th className="border px-4 py-2">Status</th>
//           </tr>
//         </thead>
//         <tbody>
//           <tr>
//             <td className="border px-4 py-2">Hammer</td>
//             <td className="border px-4 py-2">Tools</td>
//             <td className="border px-4 py-2">₹150</td>
//             <td className="border px-4 py-2">20</td>
//             <td className="border px-4 py-2">In Stock</td>
//           </tr>
//           <tr>
//             <td className="border px-4 py-2">Cement Bag</td>
//             <td className="border px-4 py-2">Building Material</td>
//             <td className="border px-4 py-2">₹350</td>
//             <td className="border px-4 py-2">50</td>
//             <td className="border px-4 py-2">Low Stock</td>
//           </tr>
//         </tbody>
//       </table>
//     </div>

//   )
// }

// export default TotalProducts



// rendering All Products

// import React from 'react';
// import { useGetProductsQuery } from '../redux/productsApi';
// import { FaTrash, FaPen } from "react-icons/fa";

// const sizes = ["XS", "S", "M"]; // Sample sizes

// const TotalProducts = () => {
//   const { data } = useGetProductsQuery(); // ✅ Ensure function is called

//   return (
//     <div className="p-6 bg-gray-100 min-h-screen">
//       <div className="rounded-xl overflow-hidden">
//         <table className="w-full text-left rounded-xl">
//           <thead className="bg-black text-white rounded-xl">
//             <tr className="text-sm">
//               <th className="p-3 font-semibold">Product Name</th>
//               <th className="p-3 font-semibold">Size</th>
//               <th className="p-3 font-semibold">Price</th>
//               <th className="p-3 font-semibold">Quantity</th>
//               <th className="p-3 font-semibold">Status</th>
//               <th className="p-3 font-semibold">Gender</th>
//               <th className="p-3 font-semibold">Description</th>
//             </tr>
//           </thead>

//           <tbody className="bg-white text-black">
//             {data?.data?.map((category) =>
//               category.product_array.map((product) =>
//                 sizes.map((size, idx) => (
//                   <tr key={`${product._id}-${size}-${idx}`} className="border-t">
//                     <td className="p-3 flex items-center gap-2">
//                       <img
//                         src={product.product_images?.[0] || "https://via.placeholder.com/40"}
//                         alt={product.product_name}
//                         className="w-10 h-10 object-cover rounded"
//                       />
//                       {product.product_name}
//                     </td>
//                     <td className="p-3">{size}</td>
//                     <td className="p-3">₹{product.product_price}</td>
//                     <td className="p-3">10</td>
//                     <td className="p-3">{size === "M" ? "Out Stock" : "In Stock"}</td>
//                     <td className="p-3">{category.gender || "N/A"}</td>
//                     <td className="p-3 flex gap-3 items-center">
//                       <span className="text-blue-600 cursor-pointer">View</span>
//                       <span className="text-green-600 cursor-pointer">+ Add More</span>
//                       <FaTrash className="text-red-600 cursor-pointer" />
//                       <FaPen className="text-black cursor-pointer" />
//                     </td>
//                   </tr>
//                 ))
//               )
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default TotalProducts;




// With Some filters Sidebar


import React, { useEffect, useState } from 'react';
import { useGetProductsQuery } from '../redux/productsApi';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';

const ProductPage = () => {
  const { data, isLoading } = useGetProductsQuery();
  const [selectedGender, setSelectedGender] = useState("Men");
  const [selectedType, setSelectedType] = useState(null);
  const navigate = useNavigate();

  // Auto-select first product type for selected gender
  useEffect(() => {
    if (data && selectedGender && !selectedType) {
      const filtered = data.data.filter(cat => cat.gender === selectedGender);
      const allTypes = [
        ...new Set(
          filtered.flatMap(cat =>
            cat.product_array.map(product => product.product_type)
          )
        )
      ];
      if (allTypes.length > 0) {
        setSelectedType(allTypes[0]);
      }
    }
  }, [data, selectedGender, selectedType]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl font-medium"><Loader /></div>
      </div>
    );
  }

  const genders = [...new Set(data?.data.map(item => item.gender))];
  const filteredCategories = data?.data.filter(cat => cat.gender === selectedGender);

  const productTypes = [
    ...new Set(
      filteredCategories?.flatMap(cat =>
        cat.product_array.map(product => product.product_type)
      )
    )
  ];

  const selectedProducts = filteredCategories?.flatMap(cat =>
    cat.product_array
      .filter(product => product.product_type === selectedType)
      .map(product => ({
        ...product,
        category: cat.product_catagory,
        catImage: cat.product_catagory_image
      }))
  );

  return (
    <div className="flex flex-col p-4 md:p-6 h-full">
      {/* Gender Tabs */}
      <div className="flex flex-wrap gap-2 md:gap-4 mb-4 justify-center md:justify-start">
        {genders.map(gender => (
          <button
            key={gender}
            onClick={() => {
              setSelectedGender(gender);
              setSelectedType(null); // Reset type to auto-select again via useEffect
            }}
            className={`px-4 py-2 rounded-full font-medium border transition ${
              selectedGender === gender
                ? 'bg-black text-white'
                : 'bg-gray-100 text-black hover:bg-gray-200'
            }`}
          >
            {gender}
          </button>
        ))}
      </div>

      <div className="flex flex-col lg:flex-row gap-4">
        {/* Sidebar for Product Types */}
        {selectedGender && (
          <div className="lg:w-1/5 w-full border-r lg:border-r-2 border-gray-300 pr-4">
            <h2 className="font-semibold mb-3 text-lg text-center lg:text-left">Product Types</h2>
            <div className="flex lg:flex-col flex-wrap gap-2 justify-center">
              {productTypes.map(type => (
                <div
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`cursor-pointer px-3 py-2 text-sm rounded-lg transition text-center w-full lg:w-auto ${
                    selectedType === type
                      ? 'bg-black text-white'
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  {type}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Product Display */}
        <div className="lg:w-4/5 w-full overflow-auto max-h-[70vh]">
          {selectedProducts?.length ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {selectedProducts.map((product, index) => (
                <div
                  key={product._id + index}
                  className="bg-white border border-gray-200 p-4 rounded-xl shadow-sm hover:shadow-md transition"
                >
                  <img
                    src={product.catImage}
                    alt="Product"
                    className="w-full h-40 object-cover rounded-lg"
                  />
                  <h3 className="font-semibold mt-3 text-base">{product.product_name}</h3>
                  <p className="text-sm text-gray-500">{product.category}</p>
                  <p className="text-lg font-bold text-blue-600 mt-1">₹{product.product_price}</p>
                  <button
                    className="mt-3 w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                    onClick={() =>
                      navigate(`/product/${product._id}`, { state: { product } })
                    }
                  >
                    View
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500 mt-10">No products to display.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;




