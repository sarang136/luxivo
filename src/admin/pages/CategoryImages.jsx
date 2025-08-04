import React from 'react';
import { useLocation } from 'react-router-dom';

const CategoryImages = () => {
  const location = useLocation();
  const images = location.state?.images;

  return (
    <div className='p-4'>
      <h2 className='text-xl font-bold mb-4'>All Product Images</h2>

      <div className='grid grid-cols-2 gap-4'>
        {images?.map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt={`product-${idx}`}
            className='h-48 w-auto rounded shadow'
          />
        ))}
      </div>
    </div>
  );
};

export default CategoryImages;
