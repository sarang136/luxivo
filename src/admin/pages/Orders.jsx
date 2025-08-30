// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useGetAllOrdersQuery } from '../redux/ordersApi';
// import { BiLoader, BiLoaderAlt } from 'react-icons/bi';
// import Loader from '../components/Loader';

// const Orders = () => {
//   const [prod, setProd] = useState();
//   const { data, isLoading, error } = useGetAllOrdersQuery();
//   const navigate = useNavigate();

//   const handleViewClick = (order) => {
//     navigate('/orders/product-details', { state: { order } });
//   };


//   const getFirstProductImage = (order) => {
//     for (let prod of order.products || []) {
//       const productArray = prod?.productId?.product_array || [];
//       for (let item of productArray) {
//         if (item?.product_images?.[0]) return item.product_images[0];
//       }
//     }
//     return null;
//   };

//   if (!data) {
//     return <div><Loader /></div>;
//   }
  
//   if (Array.isArray(data.data) && data.data.length === 0) {
//     return <div className="text-center mt-10 text-gray-600 text-xl">No Orders Found</div>;
//   }


//   return (
//     <div className="p-4">
//       <div className="overflow-x-auto max-h-[80vh] rounded-xl shadow border bg-gray-50">
//         <table className="min-w-full text-sm text-left border cursor-pointer">
//           <thead className="bg-[#e0e0e0] text-gray-900 text-lg">
//             <tr>
//               <th className="px-4 py-4 border rounded-tl-xl">#</th>
//               <th className="px-4 py-4 border">Email</th>
//               <th className="px-4 py-4 border">Status</th>
//               <th className="px-4 py-4 border">Product</th>
//               <th className="px-4 py-4 border rounded-tr-xl">Action</th>
//             </tr>
//           </thead>
//           <tbody className="text-base">
//             {isLoading ? (
//               <tr>
//                 <td colSpan="5" className="text-center py-6 text-gray-500">
//                   Loading Orders...
//                 </td>
//               </tr>
//             ) : (
//               data?.data?.map((order, index) => (
//                 <tr key={order._id} className="hover:bg-gray-100 transition">
//                   <td className="px-4 py-3 border">{index + 1}</td>
//                   <td className="px-4 py-3 border">{order?.userId?.email}</td>
//                   <td className="px-4 py-3 border capitalize">{order.status}</td>

//                   <td className="px-4 py-3 border">
//                     {
//                       order?.products.map((product) => (
//                         <div>
//                           {product?.productId ? <img src={product?.productId?.product_catagory_image}  alt='' /> : "NA"}
//                         </div>
//                       ))
//                     }
//                   </td>

//                   <td className="px-4 py-3 border">
//                     <button
//                       onClick={() => handleViewClick(order)}
//                       className="text-blue-700 underline"
//                     >
//                       View
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default Orders;




// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useGetAllOrdersQuery } from "../redux/ordersApi";
// import Loader from "../components/Loader";

// const Orders = () => {
//   const { data, isLoading, error } = useGetAllOrdersQuery();
//   const navigate = useNavigate();
//   const [currentPage, setCurrentPage] = useState(1);
//   const ordersPerPage = 10;

//   const handleViewClick = (order) => {
//     navigate("/orders/product-details", { state: { order } });
//   };

//   if (isLoading) {
//     return (
//       <div>
//         <Loader />
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="text-center mt-10 text-red-500">Failed to load orders</div>
//     );
//   }

//   if (Array.isArray(data?.data) && data.data.length === 0) {
//     return (
//       <div className="text-center mt-10 text-gray-600 text-xl">
//         No Orders Found
//       </div>
//     );
//   }

//   const reversedOrders = data?.data?.slice().reverse() || [];
//   const totalPages = Math.ceil(reversedOrders.length / ordersPerPage);

//   const indexOfLastOrder = currentPage * ordersPerPage;
//   const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
//   const currentOrders = reversedOrders.slice(
//     indexOfFirstOrder,
//     indexOfLastOrder
//   );


//   return (
//     <div className="p-4">
//       <div className="overflow-x-auto max-h-[70vh] rounded-xl shadow border bg-gray-50">
//         <table className="min-w-full text-sm text-left border cursor-pointer">
//           <thead className="bg-[#e0e0e0] text-gray-900 text-lg">
//             <tr>
//               <th className="px-4 py-4 border rounded-tl-xl">#</th>
//               <th className="px-4 py-4 border">Email</th>
//               <th className="px-4 py-4 border">Status</th>
//               <th className="px-4 py-4 border">Product</th>
//               <th className="px-4 py-4 border rounded-tr-xl">Action</th>
//             </tr>
//           </thead>
//           <tbody className="text-base">
//             {currentOrders.map((order, index) => (
//               <tr
//                 key={order._id || index}
//                 className="hover:bg-gray-100 transition"
//               >
//                 {/* Index (global index across pages) */}
//                 <td className="px-4 py-3 border">
//                   {indexOfFirstOrder + index + 1}
//                 </td>

//                 {/* Email fallback */}
//                 <td className="px-4 py-3 border">
//                   {order?.userId?.email || "N/A"}
//                 </td>

//                 {/* Status fallback */}
//                 <td className="px-4 py-3 border capitalize">
//                   {order?.status || "Pending"}
//                 </td>

//                 {/* Product fallback */}
//                 <td className="px-4 py-3 border space-y-2">
//                   {order?.products?.length > 0 ? (
//                     order.products.map((product, i) => (
//                       <div key={i} className="flex items-center gap-2">
//                         {product?.productId?.product_catagory_image ? (
//                           <img
//                             src={product.productId.product_catagory_image}
//                             alt="Product"
//                             className="w-10 h-10 rounded border"
//                           />
//                         ) : (
//                           <span className="text-gray-400 italic">No Image</span>
//                         )}
//                       </div>
//                     ))
//                   ) : (
//                     <span className="text-gray-400 italic">No Products</span>
//                   )}
//                 </td>

//                 {/* Action */}
//                 <td className="px-4 py-3 border">
//                   <button
//                     onClick={() => handleViewClick(order)}
//                     className="text-blue-700 underline"
//                   >
//                     View
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Pagination Controls */}
//       <div className="flex justify-center items-center gap-2 mt-4">
//         <button
//           disabled={currentPage === 1}
//           onClick={() => setCurrentPage((prev) => prev - 1)}
//           className={`px-3 py-1 rounded border ${
//             currentPage === 1
//               ? "text-gray-400 border-gray-300 cursor-not-allowed"
//               : "text-blue-600 border-blue-400 hover:bg-blue-50"
//           }`}
//         >
//           Prev
//         </button>

//         {/* Page numbers */}
//         {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
//           <button
//             key={page}
//             onClick={() => setCurrentPage(page)}
//             className={`px-3 py-1 rounded border ${
//               currentPage === page
//                 ? "bg-blue-600 text-white border-blue-600"
//                 : "text-blue-600 border-blue-400 hover:bg-blue-50"
//             }`}
//           >
//             {page}
//           </button>
//         ))}

//         <button
//           disabled={currentPage === totalPages}
//           onClick={() => setCurrentPage((prev) => prev + 1)}
//           className={`px-3 py-1 rounded border ${
//             currentPage === totalPages
//               ? "text-gray-400 border-gray-300 cursor-not-allowed"
//               : "text-blue-600 border-blue-400 hover:bg-blue-50"
//           }`}
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Orders;



import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetAllOrdersQuery } from "../redux/ordersApi";
import Loader from "../components/Loader";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaFilter } from "react-icons/fa";

const Orders = () => {
  const { data, isLoading, error } = useGetAllOrdersQuery();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedDate, setSelectedDate] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);

  const ordersPerPage = 10;

  const handleViewClick = (order) => {
    navigate("/orders/product-details", { state: { order } });
  };

  if (isLoading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center mt-10 text-red-500">Failed to load orders</div>
    );
  }

  if (Array.isArray(data?.data) && data.data.length === 0) {
    return (
      <div className="text-center mt-10 text-gray-600 text-xl">
        No Orders Found
      </div>
    );
  }

  // Reverse orders for latest first
  let reversedOrders = data?.data?.slice().reverse() || [];

  // ✅ Apply Date Filter if selected
  if (selectedDate) {
    reversedOrders = reversedOrders.filter((order) => {
      const orderDate = new Date(order.createdAt).toDateString();
      const selected = new Date(selectedDate).toDateString();
      return orderDate === selected;
    });
  }

  const totalPages = Math.ceil(reversedOrders.length / ordersPerPage);
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = reversedOrders.slice(
    indexOfFirstOrder,
    indexOfLastOrder
  );

  return (
    <div className="p-4">
      {/* 🔹 Filter Bar */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Orders</h2>
        <div className="flex items-center gap-3">
          {/* Filter Button */}
          <button
            onClick={() => setShowCalendar(true)}
            className="flex items-center gap-2 px-3 py-2 rounded-lg border bg-white shadow hover:bg-gray-100"
          >
            <FaFilter className="text-gray-600" />
            <span>Filter by Date</span>
          </button>

          {/* ✅ Remove All Filters */}
          {selectedDate && (
            <button
              onClick={() => {
                setSelectedDate(null);
                setCurrentPage(1); // reset pagination
              }}
              className="px-3 py-2 rounded-lg border bg-red-50 text-red-600 shadow hover:bg-red-100"
            >
              Remove All Filters
            </button>
          )}
        </div>
      </div>

      {/* 🔹 Calendar Modal */}
      {showCalendar && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-lg font-semibold mb-3">Select Date</h3>
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              dateFormat="dd/MM/yyyy"
              inline
            />
            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={() => setShowCalendar(false)}
                className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setShowCalendar(false);
                  setCurrentPage(1); // reset pagination on apply
                }}
                className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Orders Table */}
      <div className="overflow-x-auto max-h-[70vh] rounded-xl shadow border bg-gray-50">
        <table className="min-w-full text-sm text-left border cursor-pointer">
          <thead className="bg-[#e0e0e0] text-gray-900 text-lg">
            <tr>
              <th className="px-4 py-4 border rounded-tl-xl">#</th>
              <th className="px-4 py-4 border">Email</th>
              <th className="px-4 py-4 border">Status</th>
              <th className="px-4 py-4 border">Product</th>
              <th className="px-4 py-4 border">Date</th>
              <th className="px-4 py-4 border rounded-tr-xl">Action</th>
            </tr>
          </thead>
          <tbody className="text-base">
            {currentOrders.map((order, index) => (
              <tr
                key={order._id || index}
                className="hover:bg-gray-100 transition"
              >
                <td className="px-4 py-3 border">
                  {indexOfFirstOrder + index + 1}
                </td>
                <td className="px-4 py-3 border">
                  {order?.userId?.email || "N/A"}
                </td>
                <td className="px-4 py-3 border capitalize">
                  {order?.status || "Pending"}
                </td>
                <td className="px-4 py-3 border space-y-2">
                  {order?.products?.length > 0 ? (
                    order.products.map((product, i) => (
                      <div key={i} className="flex items-center gap-2">
                        {product?.productId?.product_catagory_image ? (
                          <img
                            src={product.productId.product_catagory_image}
                            alt="Product"
                            className="w-10 h-10 rounded border"
                          />
                        ) : (
                          <span className="text-gray-400 italic">No Image</span>
                        )}
                      </div>
                    ))
                  ) : (
                    <span className="text-gray-400 italic">No Products</span>
                  )}
                </td>

                {/* ✅ Show Order Date */}
                <td className="px-4 py-3 border">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>

                <td className="px-4 py-3 border">
                  <button
                    onClick={() => handleViewClick(order)}
                    className="text-blue-700 underline"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-2 mt-4">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
          className={`px-3 py-1 rounded border ${
            currentPage === 1
              ? "text-gray-400 border-gray-300 cursor-not-allowed"
              : "text-blue-600 border-blue-400 hover:bg-blue-50"
          }`}
        >
          Prev
        </button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`px-3 py-1 rounded border ${
              currentPage === page
                ? "bg-blue-600 text-white border-blue-600"
                : "text-blue-600 border-blue-400 hover:bg-blue-50"
            }`}
          >
            {page}
          </button>
        ))}

        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
          className={`px-3 py-1 rounded border ${
            currentPage === totalPages
              ? "text-gray-400 border-gray-300 cursor-not-allowed"
              : "text-blue-600 border-blue-400 hover:bg-blue-50"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Orders;






