import React, { useEffect, useState } from "react";
import Loader from "../components/Loader";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaFilter } from "react-icons/fa";
import axios from "axios";

const Orders = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedDate, setSelectedDate] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const ordersPerPage = 10;

  useEffect(() => {
    const getTransactions = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/payment/getTransaction`
        );

        const txData = Array.isArray(response.data)
          ? response.data
          : Array.isArray(response.data?.data)
          ? response.data.data
          : [];

        // 🔹 Flatten products — one entry per product
        const flattened = txData.flatMap((order) =>
          order.products?.map((product) => ({
            ...order,
            singleProduct: product,
          })) || []
        );

        setTransactions(flattened);
      } catch (err) {
        console.error(err);
        setTransactions([]);
      } finally {
        setLoading(false);
      }
    };

    getTransactions();
  }, []);

  // 🔹 Filter by selected date
  let filteredOrders = transactions?.slice()?.reverse() || [];

  if (selectedDate) {
    filteredOrders = filteredOrders.filter((order) => {
      const orderDate = new Date(order?.createdAt)?.toDateString();
      const selected = new Date(selectedDate)?.toDateString();
      return orderDate === selected;
    });
  }

  const totalPages = Math.ceil((filteredOrders?.length || 0) / ordersPerPage);
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(
    indexOfFirstOrder,
    indexOfLastOrder
  );

  const handleViewClick = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  if (loading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  if (!Array.isArray(transactions) || transactions.length === 0) {
    return (
      <div className="text-center mt-10 text-gray-600 text-xl">
        No Orders Found
      </div>
    );
  }

  return (
    <div className="p-4">
      {/* Filter Bar */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Orders</h2>
        <div className="flex items-center gap-3">
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
                setCurrentPage(1);
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
                  setCurrentPage(1);
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
              <th className="px-4 py-4 border">Name</th>
              <th className="px-4 py-4 border">Status</th>
              <th className="px-4 py-4 border">Product</th>
              <th className="px-4 py-4 border">Date</th>
              <th className="px-4 py-4 border">Action</th>
              <th className="px-4 py-4 border rounded-tr-xl">
                Delivery Location
              </th>
            </tr>
          </thead>
          <tbody className="text-base">
            {currentOrders.map((order, index) => (
              <tr
                key={order?._id + index}
                className="hover:bg-gray-100 transition"
              >
                <td className="px-4 py-3 border">
                  {indexOfFirstOrder + index + 1}
                </td>
                <td className="px-4 py-3 border">
                  {order?.userId?.email || "N/A"}
                </td>
                <td className="px-4 py-3 border">
                  {order?.userId?.name || "N/A"}
                </td>
                <td className="px-4 py-3 border capitalize">
                  {order?.state || "Pending"}
                </td>
                <td className="px-4 py-3 border space-y-2">
                  {order?.singleProduct?.productData?.product_images?.[0] ? (
                    <img
                      src={order.singleProduct.productData.product_images[0]}
                      alt={
                        order.singleProduct.productData.product_name || "Product"
                      }
                      className="w-10 h-10 rounded border"
                    />
                  ) : (
                    <span className="text-gray-400 italic">No Image</span>
                  )}
                </td>
                <td className="px-4 py-3 border">
                  {order?.createdAt
                    ? new Date(order.createdAt).toLocaleDateString()
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
                <td className="px-4 py-3 border">
                  {order?.order?.Address?.homeOrFlat +
                    ", " +
                    order?.order?.Address?.areaOrLocality || "N/A"}
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

      {/* 🔹 Modal (Single Product Details) */}
      {isModalOpen && selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[400px] flex flex-col">
            <h2 className="text-xl font-semibold mb-4">Product Details</h2>

            {selectedProduct?.singleProduct ? (
              <div className="flex items-start gap-4">
                {selectedProduct.singleProduct?.productData?.product_images?.[0] ? (
                  <img
                    src={
                      selectedProduct.singleProduct.productData.product_images[0]
                    }
                    alt={
                      selectedProduct.singleProduct.productData.product_name ||
                      "Product"
                    }
                    className="w-20 h-20 object-cover rounded border"
                  />
                ) : (
                  <div className="w-20 h-20 flex items-center justify-center bg-gray-100 rounded border text-gray-400 italic">
                    No Image
                  </div>
                )}
                <div>
                  <h3 className="font-medium text-base">
                    {selectedProduct.singleProduct?.productData?.product_name ||
                      "Unnamed"}
                  </h3>
                  <p className="text-sm text-gray-600">
                    Size: {selectedProduct.singleProduct?.Size || "N/A"}
                  </p>
                  <p className="text-sm text-gray-600">
                    Qty: {selectedProduct.singleProduct?.quantity || 0}
                  </p>
                  <p className="text-sm font-semibold mt-1">
                    Rs.
                    {selectedProduct.singleProduct?.productData?.product_price ||
                      0}
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-gray-400 italic">No product details</div>
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
