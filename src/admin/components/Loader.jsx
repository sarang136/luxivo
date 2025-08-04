import React from 'react';

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-[50vh]">
      <div className="animate-spin rounded-full h-14 w-14 border-t-4 border-b-4 border-blue-500"></div>
    </div>
  );
};

export default Loader;
