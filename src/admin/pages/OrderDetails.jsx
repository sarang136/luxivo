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

  useEffect(() => {
    const tempVar = order.products.find(res => res?.productId?.product_array);
    if (tempVar?.productId?.product_array) {
      setProd(tempVar.productId.product_array);
    }
  }, [order]);

  useEffect(() => {
    if (selectedProduct?.product_images?.length > 0) {
      setActiveImage(selectedProduct.product_images[0]); 
    }
  }, [selectedProduct]);



  return (
    <div className='p-4'>
      <h1 className='text-2xl font-bold mb-4'>Order Details</h1>

      <div className='grid grid-cols-4 gap-6 cursor-pointer'>
        {prod?.map((item, index) => (
          <div key={index} className='border p-4 rounded shadow'>
            <img
              src={item.product_images?.[0]}
              alt={item.product_name}
              className='w-full h-48 object-cover mb-2'
            />
            <h3 className='text-lg font-semibold'>{item.product_name}</h3>
            <p>Type: {item.product_type}</p>
            <p>Price: ₹{item.product_price}</p>
            <p
              className='hover:underline hover:text-blue-700'
              onClick={() => {
                setSelectedProduct(item);
                setModal(true);
              }}
            >
              View Images
            </p>
          </div>
        ))}
      </div>

      {modal && selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex justify-center items-center">
          <div className="bg-white rounded-lg shadow-lg p-8 w-[70vw] h-[70vh] relative overflow-y-auto">
            <button
              onClick={() => {
                setModal(false);
                setSelectedProduct(null);
                setActiveImage('');
              }}
              className="absolute top-2 right-4 text-gray-600 hover:text-white hover:bg-black text-3xl border h-[40px] w-[40px] flex justify-center items-center rounded-full"
            >
              &times;
            </button>

            <div className='flex gap-4 justify-center'>
              {/* Main Image */}
              <div className="w-[500px]">
                <img
                  src={activeImage}
                  alt="Main Product"
                  className="w-full h-[60vh] object-cover rounded shadow"
                />
              </div>

              
              <div className="grid grid-col-3 gap- w-[500px]">
                <div className='flex gap-4 justify-left'>
                  {selectedProduct?.product_images?.map((img, index) => (
                    <img
                      key={index}
                      src={img}
                      onClick={() => setActiveImage(img)} 
                      className={`w-[100px] h-[100px] object-cover rounded cursor-pointer border-2 ${
                        activeImage === img ? 'border-blue-500' : 'border-transparent'
                      }`}
                    />
                  ))}
                </div>

                <div>
                  <p className='font-bold text-2xl'>
                    Product Name : <span className='font-normal italic'>{selectedProduct?.product_name}</span>
                  </p>
                  <p className='font-bold text-2xl'>
                    Price : <span className='font-normal italic'>₹{selectedProduct?.product_price}</span>
                  </p>
                  <p className='font-bold text-2xl'>
                    Type : <span className='font-normal italic'>{selectedProduct?.product_type}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderDetails;
