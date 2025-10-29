import axios from "axios";
import React, { useEffect, useState } from "react";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

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
      } catch (err) {
        console.error("Error fetching transactions:", err);
        setTransactions([]);
      } finally {
        setLoading(false);
      }
    };

    getTransactions();
  }, []);

  const totalRevenue = Array.isArray(transactions)
    ? transactions.reduce((acc, tx) => acc + (tx?.amount || 0), 0)
    : 0;

  return (
    <div className="min-h-screen p-4">
      <div className="bg-white p-8 rounded-xl shadow-md mb-6 flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Total Revenue</h2>
        <span className="text-3xl font-bold text-gray-800">
          Rs.{loading ? "Loading..." : totalRevenue}
        </span>
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-hidden max-h-[80vh] overflow-scroll">
        <div className="grid grid-cols-7 font-semibold text-lg border-b px-6 py-4 bg-gray-50">
          <div>Owner Name</div>
          <div>Email</div>
          <div>Number</div>
          <div>Transaction Date</div>
          <div>Amount</div>
          <div>Status</div>
          <div>Payment Method</div>
        </div>

        {loading ? (
          <div className="px-6 py-4 text-gray-500">Loading transactions...</div>
        ) : transactions.length > 0 ? (
          transactions.map((tx, idx) => (
            <div
              key={idx}
              className="grid grid-cols-7 px-6 py-4 text-gray-700 border-b items-center text-base"
            >
              <div>{tx?.userId?.name || "N/A"}</div>
              <div className="max-w-32 truncate">
                {tx?.userId?.email || "N/A"}
              </div>
              <div className="text-gray-500">{tx?.userId?.contact || "N/A"}</div>
              <div className="text-gray-500">
                {tx?.createdAt
                  ? new Date(tx.createdAt).toLocaleDateString()
                  : ""}
              </div>
              <div className="text-green-600 font-medium">{tx?.amount}</div>
              <div className="text-gray-500">{tx?.state || "N/A"}</div>
              <div className="text-gray-500">{tx?.paymentMode || "N/A"}</div>
            </div>
          ))
        ) : (
          <div className="px-6 py-4 text-gray-500">No transactions found.</div>
        )}
      </div>
    </div>
  );
};

export default Transactions;
