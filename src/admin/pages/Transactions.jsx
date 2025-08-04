import React from 'react';
import { FaTrashAlt } from 'react-icons/fa';

const transactions = [
  {
    owner: 'Sarangi',
    shop: 'Kunal Bhal',
    date: '12/02/2025',
    amount: '+200',
    method: 'UPI',
  },
  {
    owner: 'Sarangi',
    shop: 'Kunal Bhal',
    date: '12/02/2025',
    amount: '+200',
    method: 'UPI',
  },
  {
    owner: 'Sarangi',
    shop: 'Kunal Bhal',
    date: '12/02/2025',
    amount: '+200',
    method: 'UPI',
  },
];

const Transactions = () => {
  return (
    <div className="min-h-screen  p-4">
      {/* Total Revenue */}
      <div className="bg-white p-8 rounded-xl shadow-md mb-6 flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Total Revenue</h2>
        <span className="text-3xl font-bold text-gray-800">₹32,135</span>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="grid grid-cols-6 font-semibold text-lg border-b px-6 py-4 bg-gray-50">
          <div>Owner Name</div>
          <div>Shop Name</div>
          <div>Transaction Date</div>
          <div>Amount</div>
          <div>Payment Method</div>
          <div>Action</div>
        </div>
        {transactions.map((tx, idx) => (
          <div
            key={idx}
            className="grid grid-cols-6 px-6 py-4 text-gray-700 border-b items-center text-base"
          >
            <div>{tx.owner}</div>
            <div>{tx.shop}</div>
            <div className="text-gray-500">{tx.date}</div>
            <div className="text-green-600 font-medium">{tx.amount}</div>
            <div className="text-gray-500">{tx.method}</div>
            <div>
              <button className="text-red-500 hover:text-red-700">
                <FaTrashAlt />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Transactions;
