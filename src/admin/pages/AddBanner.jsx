import React from 'react';
import { FaTrashAlt } from 'react-icons/fa';

const banners = [
  {
    id: 1,
    image: 'https://i.pinimg.com/736x/44/1b/1d/441b1de41f5673dcb5f8b306b45b527c.jpg',
  },
  {
    id: 2,
    image: 'https://i.pinimg.com/736x/91/88/1f/91881fdf32bc02f56540575ab629a0b8.jpg',
  },
];

const AddBanner = () => {
  return (
    <div className="min-h-screen  p-4 relative">
      {/* Add Button */}
      <div className="flex justify-end mb-4">
        <button className="bg-green-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-green-700 transition">
          +Add Banner
        </button>
      </div>

      {/* Banner Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8  p-8 rounded-xl">
        {banners.map((banner) => (
          <div key={banner.id} className="relative flex flex-col items-center">
            <img
              src={banner.image}
              alt={`Banner ${banner.id}`}
              className="w-full h-48 object-cover rounded-lg"
            />
            <div className='w-full'> 
              <button className="py-4 text-red-500 hover:text-red-700 transition text-xl">
              <FaTrashAlt />
            </button>
            </div>
          </div>
        ))}
      </div>
      
      
    </div>
  );
};

export default AddBanner;
