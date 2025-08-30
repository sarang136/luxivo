




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
import { useGetAllOrdersQuery } from "../redux/ordersApi";
import Loader from "../components/Loader";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaFilter } from "react-icons/fa";

const Orders = () => {
  const { data, isLoading, error } = useGetAllOrdersQuery();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedDate, setSelectedDate] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);

  // 🔹 Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null); // store clicked order

  const ordersPerPage = 10;

  const handleViewClick = (order) => {
    setSelectedOrder(order); // save clicked order
    setIsModalOpen(true); // open modal
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

  if (Array.isArray(data?.data) && data?.data?.length === 0) {
    return (
      <div className="text-center mt-10 text-gray-600 text-xl">
        No Orders Found
      </div>
    );
  }

  let reversedOrders = data?.data?.slice()?.reverse() || [];

  if (selectedDate) {
    reversedOrders = reversedOrders?.filter((order) => {
      const orderDate = new Date(order?.createdAt)?.toDateString();
      const selected = new Date(selectedDate)?.toDateString();
      return orderDate === selected;
    });
  }

  const totalPages = Math.ceil((reversedOrders?.length || 0) / ordersPerPage);
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = reversedOrders?.slice(
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

      {/* Calendar Popup */}
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
              <th className="px-4 py-4 border">Address</th>
              <th className="px-4 py-4 border">Status</th>
              <th className="px-4 py-4 border">Product</th>
              <th className="px-4 py-4 border">Date</th>
              <th className="px-4 py-4 border rounded-tr-xl">Action</th>
            </tr>
          </thead>
          <tbody className="text-base">
            {currentOrders?.map((order, index) => (
              <tr
                key={order?._id || index}
                className="hover:bg-gray-100 transition"
              >
                <td className="px-4 py-3 border">
                  {indexOfFirstOrder + index + 1}
                </td>
                <td className="px-4 py-3 border">
                  {order?.userId?.email || "N/A"}
                </td>
                <td className="px-4 py-3 border">
                  {order?.Address?.areaOrLocality || "N/A"}
                </td>
                <td className="px-4 py-3 border capitalize">
                  {order?.status || "Pending"}
                </td>
                <td className="px-4 py-3 border space-y-2">
                  {order?.products?.length > 0 ? (
                    order?.products?.map((product, i) => (
                      <div key={i} className="flex items-center gap-2">
                        {product?.productId?.product_catagory_image ? (
                          <img
                            src={product?.productId?.product_catagory_image}
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
                  {order?.createdAt
                    ? new Date(order?.createdAt)?.toLocaleDateString()
                    : "N/A"}
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

        {Array.from({ length: totalPages }, (_, i) => i + 1)?.map((page) => (
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

      {/* 🔹 Modal */}
      {isModalOpen && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[400px]">
            <h2 className="text-xl font-semibold mb-4">Order Details</h2>

            {/* 🔹 Total Items */}
            <div className="flex justify-between items-center border-b pb-2 mb-4">
              <span className="font-medium">Total Items</span>
              <span>{selectedOrder?.products?.length || 0}</span>
            </div>

            {/* 🔹 First Product */}
            {selectedOrder?.products?.length > 0 && (
              <div className="flex items-start gap-4 mb-4">
                <img
                  src={
                    selectedOrder?.products?.[0]?.productData?.product_images?.[0]
                  }
                  alt={selectedOrder?.products?.[0]?.productData?.product_name || "Product"}
                  className="w-20 h-20 object-cover rounded border"
                />

                <div className="flex-1">
                  <h3 className="font-medium text-base">
                    {selectedOrder?.products?.[0]?.productData?.product_name || "Unnamed"}
                  </h3>
                  <p className="text-sm text-gray-600">
                    Size: {selectedOrder?.products?.[0]?.Size || "N/A"}
                  </p>
                  <p className="text-sm text-gray-600">
                    Qty: {selectedOrder?.products?.[0]?.quantity || 0}
                  </p>
                  <p className="text-sm font-semibold mt-1">
                    Rs.{selectedOrder?.products?.[0]?.productData?.product_price || 0}
                  </p>
                </div>
              </div>
            )}

            {/* Close Button */}
            <div className="flex justify-end mt-6">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;







