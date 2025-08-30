// import React, { useEffect, useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';

// const OrderDetails = () => {
//   const [prod, setProd] = useState([]);
//   const [modal, setModal] = useState(false);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [activeImage, setActiveImage] = useState('');
//   const { state } = useLocation();
//   const navigate = useNavigate();
//   const { order } = state;

//   useEffect(() => {
//     const tempVar = order.products.find(res => res?.productId?.product_array);
//     if (tempVar?.productId?.product_array) {
//       setProd(tempVar.productId.product_array);
//     }
//   }, [order]);

//   useEffect(() => {
//     if (selectedProduct?.product_images?.length > 0) {
//       setActiveImage(selectedProduct.product_images[0]); 
//     }
//   }, [selectedProduct]);



//   return (
//     <div className='p-4'>
//       <h1 className='text-2xl font-bold mb-4'>Order Details</h1>

//       <div className='grid grid-cols-4 gap-6 cursor-pointer'>
//         {prod?.map((item, index) => (
//           <div key={index} className='border p-4 rounded shadow'>
//             <img
//               src={item.product_images?.[0]}
//               alt={item.product_name}
//               className='w-full h-48 object-cover mb-2'
//             />
//             <h3 className='text-lg font-semibold'>{item.product_name}</h3>
//             <p>Type: {item.product_type}</p>
//             <p>Price: ₹{item.product_price}</p>
//             <p
//               className='hover:underline hover:text-blue-700'
//               onClick={() => {
//                 setSelectedProduct(item);
//                 setModal(true);
//               }}
//             >
//               View Images
//             </p>
//           </div>
//         ))}
//       </div>

// {/*  */}
//       {modal && selectedProduct && (
//         <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex justify-center items-center">
//           <div className="bg-white rounded-lg shadow-lg p-8 w-[70vw] h-[70vh] relative overflow-y-auto">
//             <button
//               onClick={() => {
//                 setModal(false);
//                 setSelectedProduct(null);
//                 setActiveImage('');
//               }}
//               className="absolute top-2 right-4 text-gray-600 hover:text-white hover:bg-black text-3xl border h-[40px] w-[40px] flex justify-center items-center rounded-full"
//             >
//               &times;
//             </button>

//             <div className='flex gap-4 justify-center'>
//               {/* Main Image */}
//               <div className="w-[500px]">
//                 <img
//                   src={activeImage}
//                   alt="Main Product"
//                   className="w-full h-[60vh] object-cover rounded shadow"
//                 />
//               </div>

              
//               <div className="grid grid-col-3 gap- w-[500px]">
//                 <div className='flex gap-4 justify-left'>
//                   {selectedProduct?.product_images?.map((img, index) => (
//                     <img
//                       key={index}
//                       src={img}
//                       onClick={() => setActiveImage(img)} 
//                       className={`w-[100px] h-[100px] object-cover rounded cursor-pointer border-2 ${
//                         activeImage === img ? 'border-blue-500' : 'border-transparent'
//                       }`}
//                     />
//                   ))}
//                 </div>

//                 <div>
//                   <p className='font-bold text-2xl'>
//                     Product Name : <span className='font-normal italic'>{selectedProduct?.product_name}</span>
//                   </p>
//                   <p className='font-bold text-2xl'>
//                     Price : <span className='font-normal italic'>₹{selectedProduct?.product_price}</span>
//                   </p>
//                   <p className='font-bold text-2xl'>
//                     Type : <span className='font-normal italic'>{selectedProduct?.product_type}</span>
//                   </p>
//                   <p className='font-bold text-2xl'>
//                     Description : <span className='font-normal italic'>{selectedProduct?.product_description}</span>
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default OrderDetails;




import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const OrderDetails = () => {
  const [prod, setProd] = useState([]);
  const [modal, setModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [activeImage, setActiveImage] = useState('');
  const { state } = useLocation();
  const navigate = useNavigate();
  const { order } = state;
  console.log(order);

  // Open modal and set default active image
  const openModal = (product) => {
    setSelectedProduct(product);
    setActiveImage(product?.product_images?.[0] || '');
    setModal(true);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Order Details</h1>

      <div className="grid grid-cols-4 gap-6 cursor-pointer">
        {order?.products?.map((item, index) => (
          <div key={index} className="border p-4 rounded shadow hover:shadow-lg transition">
            <img
              src={item?.productData?.product_images?.[0]}
              alt={item?.product_name}
              className="w-full h-48 object-cover mb-2 rounded"
            />
            <h3 className="text-lg font-semibold">{item?.product_name}</h3>
            <p>Type: {item?.productData?.product_catagory}</p>
            <p>Price: ₹{item?.productData?.product_price || 0}</p>
            <p
              className="text-blue-600 hover:underline mt-2 cursor-pointer"
              onClick={() => openModal(item?.productData)}
            >
              View Images
            </p>
          </div>
        ))}
      </div>

      {/* Modal */}
      {modal && selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
          <div className="bg-white rounded-lg shadow-lg w-[80vw] h-[80vh] relative flex overflow-hidden">
            {/* Close button */}
            <button
              onClick={() => {
                setModal(false);
                setSelectedProduct(null);
                setActiveImage('');
              }}
              className="absolute top-4 right-4 text-gray-600 hover:text-white hover:bg-red-500 text-3xl border h-[40px] w-[40px] flex justify-center items-center rounded-full transition"
            >
              &times;
            </button>

            {/* Left: Images */}
            <div className="flex gap-4 w-2/3 p-6">
              {/* Thumbnails */}
              <div className="flex flex-col gap-3 overflow-y-auto max-h-[65vh] pr-2">
                {selectedProduct?.product_images?.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    onClick={() => setActiveImage(img)}
                    alt="thumb"
                    className={`w-[80px] h-[80px] object-cover rounded cursor-pointer border-2 ${
                      activeImage === img ? 'border-blue-500' : 'border-gray-300'
                    }`}
                  />
                ))}
              </div>

              {/* Main Image */}
              <div className="flex-1 flex items-center justify-center">
                <img
                  src={activeImage}
                  alt="Main Product"
                  className="max-h-[65vh] max-w-full object-contain rounded shadow"
                />
              </div>
            </div>

            {/* Right: Product Details */}
            <div className="w-1/3 border-l p-6 overflow-y-auto">
              <h2 className="text-xl font-bold mb-4">Product Details</h2>
              <p className="font-bold text-lg mb-2">
                Name: <span className="font-normal italic">{selectedProduct?.product_name}</span>
              </p>
              <p className="font-bold text-lg mb-2">
                Price: <span className="font-normal italic">₹{selectedProduct?.product_price}</span>
              </p>
              <p className="font-bold text-lg mb-2">
                Type: <span className="font-normal italic">{selectedProduct?.product_type}</span>
              </p>
              <p className="font-bold text-lg">
                Description:{' '}
                <span className="font-normal italic">
                  {selectedProduct?.product_description || 'No description available.'}
                </span>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderDetails;


