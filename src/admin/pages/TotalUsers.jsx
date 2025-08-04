import React from 'react';
import { useGetAllUsersQuery } from '../redux/productsApi'; 
import Loader from '../components/Loader';

const TotalUsers = () => {
  const { data, isLoading, isError } = useGetAllUsersQuery();

  if (isLoading) return <Loader />;
  if (isError) return <div className="text-red-500">Something went wrong!</div>;

  return (
    <div className="p-4">
      <div className="overflow-x-auto rounded-xl  shadow">
        <table className="min-w-full text-sm text-left border cursor-pointer">
          <thead className="bg-gray-400 text-white text-xl ">
            <tr className=''>
              <th className="px-4 py-4 border rounded-tl-xl">#</th>
              <th className="px-4 py-4 border">Name</th>
              <th className="px-4 py-4 border">Email</th>
              <th className="px-4 py-4 border">Contact</th>
              <th className="px-4 py-4 border">Status</th>
              <th className="px-4 py-4 border rounded-tr-xl">Created At</th>
            </tr>
          </thead>
          <tbody className='text-xl'>
            {data?.data?.map((user, index) => (
              <tr key={user._id} className="hover:bg-gray-50 transition ">
                <td className="px-4 py-4 border">{index + 1}</td>
                <td className="px-4 py-4 border">{user.name}</td>
                <td className="px-4 py-4 border">{user.email}</td>
                <td className="px-4 py-4 border">{user.contact}</td>
                <td className="px-4 py-4 border capitalize">{user.status}</td>
                <td className="px-4 py-4 border">{new Date(user.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TotalUsers;
