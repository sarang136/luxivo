// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import { FaTrashAlt } from 'react-icons/fa';



// const Transactions = () => {
//   const [transactions, setTransactions] = useState([]);
//   useEffect(() => {
//     const getTranctions = async () => {
//       const response = await axios.get('https://shirt-backend-f43b.onrender.com/api/transaction/getTransaction');
//       console.log(response)
//       setTransactions(response.data);
//       // return transactions;
//     }
//     getTranctions();
//   }, []);
//   console.log(transactions);

//     const totalRevenue = transactions.reduce((acc, tx) => acc + tx.amount, 0);
//     console.log(totalRevenue);

//   return (
//     <div className="min-h-screen  p-4">
//       {/* Total Revenue */}
//       <div className="bg-white p-8 rounded-xl shadow-md mb-6 flex justify-between items-center">
//         <h2 className="text-2xl font-semibold">Total Revenue</h2>
//         <span className="text-3xl font-bold text-gray-800">Rs.{totalRevenue}</span>
//       </div>

//       {/* Table */}
//       <div className="bg-white rounded-xl shadow-md overflow-hidden">
//         <div className="grid grid-cols-7 font-semibold text-lg border-b px-6 py-4 bg-gray-50">
//           <div>Owner Name</div>
//           <div>Email</div>
//           <div>Number</div>
//           <div>Transaction Date</div>
//           <div>Amount</div>
//           <div>Status</div>
//           <div>Product Category</div>
//         </div>
//         {transactions.map((tx, idx) => (
//           <div
//             key={idx}
//             className="grid grid-cols-7 px-6 py-4 text-gray-700 border-b items-center text-base"
//           >
//             <div>{tx?.userId?.name}</div>
//             <div className='max-w-32 truncate'>{tx?.userId?.email}</div>
//             <div className="text-gray-500">{tx?.userId?.contact}</div>
//             <div className="text-gray-500">{tx?.createdAt ? new Date(tx.createdAt).toLocaleDateString() : ""}</div>
//             <div className="text-green-600 font-medium">{tx.amount}</div>
//             <div className="text-gray-500">{tx.state}</div>
//             <div className="text-gray-500">{tx?.productId?.product_catagory}</div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Transactions;



import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getTransactions = async () => {
      try {
        const response = await axios.get(
          'https://shirt-backend-f43b.onrender.com/api/transaction/getTransaction'
        );
        console.log('Transactions API response:', response.data);

        // Ensure it's always an array
        const txData = Array.isArray(response.data)
          ? response.data
          : Array.isArray(response.data?.data)
          ? response.data.data
          : [];

        setTransactions(txData);
      } catch (err) {
        console.error('Error fetching transactions:', err);
        setTransactions([]);
      } finally {
        setLoading(false);
      }
    };

    getTransactions();
  }, []);

  // Defensive reduce
  const totalRevenue = Array.isArray(transactions)
    ? transactions.reduce((acc, tx) => acc + (tx?.amount || 0), 0)
    : 0;

  return (
    <div className="min-h-screen p-4">
      {/* Total Revenue */}
      <div className="bg-white p-8 rounded-xl shadow-md mb-6 flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Total Revenue</h2>
        <span className="text-3xl font-bold text-gray-800">
          Rs.{loading ? 'Loading...' : totalRevenue}
        </span>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="grid grid-cols-7 font-semibold text-lg border-b px-6 py-4 bg-gray-50">
          <div>Owner Name</div>
          <div>Email</div>
          <div>Number</div>
          <div>Transaction Date</div>
          <div>Amount</div>
          <div>Status</div>
          <div>Product Category</div>
        </div>
        {loading ? (
          <div className="px-6 py-4 text-gray-500">Loading transactions...</div>
        ) : transactions.length > 0 ? (
          transactions.map((tx, idx) => (
            <div
              key={idx}
              className="grid grid-cols-7 px-6 py-4 text-gray-700 border-b items-center text-base"
            >
              <div>{tx?.userId?.name}</div>
              <div className="max-w-32 truncate">{tx?.userId?.email}</div>
              <div className="text-gray-500">{tx?.userId?.contact}</div>
              <div className="text-gray-500">
                {tx?.createdAt ? new Date(tx.createdAt).toLocaleDateString() : ''}
              </div>
              <div className="text-green-600 font-medium">{tx?.amount}</div>
              <div className="text-gray-500">{tx?.state}</div>
              <div className="text-gray-500">{tx?.products.map((pro) => pro?.productData?.product_catagory)}</div>
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
