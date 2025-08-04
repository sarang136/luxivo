import React from 'react';
import { MdPayments, MdPerson, MdShoppingBag } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { useGetProductsQuery } from '../redux/productsApi.js';
import { useGetAllUsersQuery } from '../redux/productsApi.js';
import Loader from '../components/Loader';

const Dashboard = () => {
  const navigate = useNavigate();
  const { data: productData, isLoading: loadingProducts } = useGetProductsQuery();
  console.log(productData)
  const { data: userData, isLoading: loadingUsers } = useGetAllUsersQuery();
  console.log(userData)

  const totalProductsCount = productData?.data?.reduce((total, cat) => {
    return total + (cat?.product_array?.length || 0);
  }, 0);

  const totalUsersCount = userData?.data?.length || 0;

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Total Users */}
        <div
          className="flex items-center gap-4 border border-gray-200 p-6 rounded-xl shadow-sm bg-white cursor-pointer hover:shadow-md transition"
          onClick={() => navigate('/manage-users')}
        >
          <div className="p-4 rounded-full bg-black text-white">
            <MdPerson size={28} />
          </div>
          <div>
            <div className="text-2xl font-bold">
              {loadingUsers ? 'Loading...': totalUsersCount}
            </div>
            <h2 className="text-sm text-gray-600">Total Users</h2>
          </div>
        </div>

        {/* Total Products */}
        <div
          className="flex items-center gap-4 border border-gray-200 p-6 rounded-xl shadow-sm bg-white cursor-pointer hover:shadow-md transition"
          onClick={() => navigate('/categories')}
        >
          <div className="p-4 rounded-full bg-black text-white">
            <MdShoppingBag size={28} />
          </div>
          <div>
            <p className="text-2xl font-bold">
              {loadingProducts ? 'Loading...' : totalProductsCount}
            </p>
            <h2 className="text-sm text-gray-600">Total Products</h2>
          </div>
        </div>

        {/* Total Transactions */}
        <div
          className="flex items-center gap-4 border border-gray-200 p-6 rounded-xl shadow-sm bg-white cursor-pointer hover:shadow-md transition"
          onClick={() => navigate('/transactions')}
        >
          <div className="p-4 rounded-full bg-black text-white">
            <MdPayments size={28} />
          </div>
          <div>
            <p className="text-2xl font-bold">Rs.10,000</p>
            <h2 className="text-sm text-gray-600">Transaction</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
