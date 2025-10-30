
import React, { useEffect, useState } from 'react';
import { MdPayments, MdPerson, MdShoppingBag } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { useGetProductsQuery, useGetAllUsersQuery } from '../redux/productsApi.js';
import Loader from '../components/Loader';
import axios from 'axios';
import CountUp from 'react-countup';

const Dashboard = () => {
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState([]);
  const [loadingTransactions, setLoadingTransactions] = useState(true);

  useEffect(() => {
    const getTransactions = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/payment/getTransaction`
        );

        const txData = Array.isArray(response.data?.data)
          ? response.data.data
          : [];

        setTransactions(txData);
      } catch (error) {
        console.error('Error fetching transactions:', error);
        setTransactions([]);
      } finally {
        setLoadingTransactions(false);
      }
    };

    getTransactions();
  }, []);

  console.log("transactions", transactions)

  // Defensive reduce – works even if transactions is empty or malformed
  const totalRevenue = Array.isArray(transactions)
    ? transactions.reduce((acc, tx) => acc + (tx?.amount || 0), 0)
    : 0;

  const {
    data: productData,
    isLoading: loadingProducts,
  } = useGetProductsQuery();
  const {
    data: userData,
    isLoading: loadingUsers,
  } = useGetAllUsersQuery();

  const totalProductsCount = Array.isArray(productData?.data)
    ? productData.data.reduce(
      (total, cat) => total + (cat?.product_array?.length || 0),
      0
    )
    : 0;

  const totalUsersCount = Array.isArray(userData?.data)
    ? userData.data.length
    : 0;

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
              {loadingUsers ? 'Loading...' : totalUsersCount}
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
            <p className="text-2xl font-bold">
              {loadingTransactions ? (
                'Loading...'
              ) : (
                <>
                  Rs.
                  <CountUp
                    end={totalRevenue}
                    duration={2}
                    separator=","
                  />
                </>
              )}
            </p>
            <h2 className="text-sm text-gray-600">Transaction</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
