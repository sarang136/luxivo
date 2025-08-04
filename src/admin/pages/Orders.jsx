import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetAllOrdersQuery } from '../redux/ordersApi';
import { BiLoader, BiLoaderAlt } from 'react-icons/bi';
import Loader from '../components/Loader';

const Orders = () => {
  const [prod, setProd] = useState();
  const { data, isLoading, error } = useGetAllOrdersQuery();
  const navigate = useNavigate();

  const handleViewClick = (order) => {
    navigate('/orders/product-details', { state: { order } });
  };


  const getFirstProductImage = (order) => {
    for (let prod of order.products || []) {
      const productArray = prod?.productId?.product_array || [];
      for (let item of productArray) {
        if (item?.product_images?.[0]) return item.product_images[0];
      }
    }
    return null;
  };

  if (!data) {
    return <div><Loader /></div>;
  }
  
  if (Array.isArray(data.data) && data.data.length === 0) {
    return <div className="text-center mt-10 text-gray-600 text-xl">No Orders Found</div>;
  }


  return (
    <div className="p-4">
      <div className="overflow-x-auto rounded-xl shadow border bg-gray-50">
        <table className="min-w-full text-sm text-left border cursor-pointer">
          <thead className="bg-[#e0e0e0] text-gray-900 text-lg">
            <tr>
              <th className="px-4 py-4 border rounded-tl-xl">#</th>
              <th className="px-4 py-4 border">Email</th>
              <th className="px-4 py-4 border">Status</th>
              <th className="px-4 py-4 border">Product</th>
              <th className="px-4 py-4 border rounded-tr-xl">Action</th>
            </tr>
          </thead>
          <tbody className="text-base">
            {isLoading ? (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-500">
                  Loading Orders...
                </td>
              </tr>
            ) : (
              data?.data?.map((order, index) => (
                <tr key={order._id} className="hover:bg-gray-100 transition">
                  <td className="px-4 py-3 border">{index + 1}</td>
                  <td className="px-4 py-3 border">{order?.userId?.email}</td>
                  <td className="px-4 py-3 border capitalize">{order.status}</td>

                  <td className="px-4 py-3 border">
                    {(() => {
                      const img = getFirstProductImage(order);
                      return img ? (
                        <img
                          src={img}
                          alt="Product"
                          className="h-12 w-12 rounded object-cover"
                        />
                      ) : (
                        <span>No Image</span>
                      );
                    })()}
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
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
