// import React, { useState } from 'react';
// import toast from 'react-hot-toast';
// import {
//   useGetAllCoupensQuery,
//   useAddCoupenMutation,
//   useEditCoupenMutation,
//   useDeleteCoupenMutation,
// } from '../redux/coupensApi';

// const Coupens = () => {
//   const { data = [], isLoading, refetch } = useGetAllCoupensQuery();
//   const [addCoupen, { isLoading: isAdding }] = useAddCoupenMutation();
//   const [editCoupen, { isLoading: isEditing }] = useEditCoupenMutation();
//   const [deleteCoupen, { isLoading: isDeleting }] = useDeleteCoupenMutation();

//   const [modalOpen, setModalOpen] = useState(false);
//   const [editMode, setEditMode] = useState(false);
//   const [formData, setFormData] = useState({
//     coupens_name: '',
//     coupens_code: '',
//     coupens_discount: '',
//     coupens_minimum_purchase: '',
//     coupens_start_date: '',
//     coupens_end_date: '',
//   });
//   const [editId, setEditId] = useState(null);

//   const handleInput = (e) =>
//     setFormData({ ...formData, [e.target.name]: e.target.value });

//   const openModal = (coupen = null) => {
//     if (coupen) {
//       setEditMode(true);
//       setEditId(coupen._id);
//       setFormData({ ...coupen });
//     } else {
//       setEditMode(false);
//       setFormData({
//         coupens_name: '',
//         coupens_code: '',
//         coupens_discount: '',
//         coupens_minimum_purchase: '',
//         coupens_start_date: '',
//         coupens_end_date: '',
//       });
//     }
//     setModalOpen(true);
//   };

//   const handleSubmit = async () => {
//     try {
//       if (editMode) {
//         await editCoupen({ id: editId, ...formData }).unwrap();
//         toast.success('Coupen updated successfully!');
//       } else {
//         await addCoupen(formData).unwrap();
//         toast.success('Coupen added successfully!');
//       }
//       refetch();
//       setModalOpen(false);
//     } catch (err) {
//       toast.error('Something went wrong!');
//       console.error(err);
//     }
//   };

//   const handleDelete = async (id) => {
//     if (confirm('Are you sure to delete this coupen?')) {
//       try {
//         await deleteCoupen(id).unwrap();
//         toast.success('Coupen deleted!');
//         refetch();
//       } catch (err) {
//         toast.error('Failed to delete!');
//       }
//     }
//   };

//   if (isLoading) return <div className="text-white">Loading...</div>;

//   return (
//     <div className="min-h-screen bg-black text-white p-6">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-bold">Coupens</h1>
//         <button
//           className="bg-white text-black px-4 py-2 rounded disabled:opacity-60"
//           onClick={() => openModal()}
//           disabled={isAdding || isEditing}
//         >
//           + Add Coupen
//         </button>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//         {data.map((coupen) => (
//           <div
//             key={coupen._id}
//             className="bg-gray-900 rounded-lg p-4 border border-white"
//           >
//             <h2 className="text-xl font-semibold">{coupen.coupens_name}</h2>
//             <p className="text-gray-400">Code: {coupen.coupens_code}</p>
//             <p>Discount: {coupen.coupens_discount}%</p>
//             <p>Min Purchase: ₹{coupen.coupens_minimum_purchase}</p>
//             <p>Start: {coupen.coupens_start_date.slice(0, 10)}</p>
//             <p>End: {coupen.coupens_end_date.slice(0, 10)}</p>

//             <div className="flex justify-end gap-2 mt-4">
//               <button
//                 onClick={() => openModal(coupen)}
//                 className="text-yellow-400 hover:underline"
//                 disabled={isAdding || isEditing}
//               >
//                 Edit
//               </button>
//               <button
//                 onClick={() => handleDelete(coupen._id)}
//                 className="text-red-400 hover:underline"
//                 disabled={isDeleting}
//               >
//                 {isDeleting ? 'Deleting...' : 'Delete'}
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Modal */}
//       {modalOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
//           <div className="bg-white text-black p-6 rounded-lg w-full max-w-md">
//             <h2 className="text-xl font-semibold mb-4">
//               {editMode ? 'Edit Coupen' : 'Add Coupen'}
//             </h2>
//             {[ 
//               { label: 'Name', name: 'coupens_name' },
//               { label: 'Code', name: 'coupens_code' },
//               { label: 'Discount %', name: 'coupens_discount', type: 'number' },
//               {
//                 label: 'Minimum Purchase',
//                 name: 'coupens_minimum_purchase',
//                 type: 'number',
//               },
//               { label: 'Start Date', name: 'coupens_start_date', type: 'date' },
//               { label: 'End Date', name: 'coupens_end_date', type: 'date' },
//             ].map(({ label, name, type = 'text' }) => (
//               <div key={name} className="mb-3">
//                 <label className="block font-semibold">{label}</label>
//                 <input
//                   type={type}
//                   name={name}
//                   value={formData[name]}
//                   onChange={handleInput}
//                   className="w-full border border-black rounded px-3 py-1"
//                 />
//               </div>
//             ))}
//             <div className="flex justify-end gap-2 mt-4">
//               <button
//                 onClick={() => setModalOpen(false)}
//                 className="text-gray-600"
//                 disabled={isAdding || isEditing}
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleSubmit}
//                 className="bg-black text-white px-4 py-2 rounded disabled:opacity-60"
//                 disabled={isAdding || isEditing}
//               >
//                 {editMode
//                   ? isEditing
//                     ? 'Updating...'
//                     : 'Update'
//                   : isAdding
//                   ? 'Adding...'
//                   : 'Add'}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Coupens;






import React, { useState } from 'react';
import {
  useGetAllCoupensQuery,
  useAddCoupenMutation,
  useEditCoupenMutation,
  useDeleteCoupenMutation,
} from '../redux/coupensApi';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';

const Coupens = () => {
  const { data = [], isLoading, refetch } = useGetAllCoupensQuery();
  const [addCoupen, { isLoading: isAdding }] = useAddCoupenMutation();
  const [editCoupen, { isLoading: isEditing }] = useEditCoupenMutation();
  const [deleteCoupen] = useDeleteCoupenMutation();

  const [modalOpen, setModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const [formData, setFormData] = useState({
    coupens_name: '',
    coupens_code: '',
    coupens_discount: '',
    coupens_minimum_purchase: '',
    coupens_start_date: '',
    coupens_end_date: '',
  });

  const handleInput = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const openModal = (coupen = null) => {
    if (coupen) {
      setEditMode(true);
      setEditId(coupen._id);
      setFormData({ ...coupen });
    } else {
      setEditMode(false);
      setFormData({
        coupens_name: '',
        coupens_code: '',
        coupens_discount: '',
        coupens_minimum_purchase: '',
        coupens_start_date: '',
        coupens_end_date: '',
      });
    }
    setModalOpen(true);
  };

  const handleSubmit = async () => {
    try {
      if (editMode) {
        await editCoupen({ id: editId, ...formData }).unwrap();
        toast.success('Coupen updated successfully!');
      } else {
        await addCoupen(formData).unwrap();
        toast.success('Coupen added successfully!');
      }
      refetch();
      setModalOpen(false);
    } catch (err) {
      toast.error('Something went wrong!');
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure to delete this coupen?')) {
      try {
        setDeletingId(id);
        await deleteCoupen(id).unwrap();
        toast.success('Coupen deleted!');
        refetch();
      } catch (err) {
        toast.error('Failed to delete!');
      } finally {
        setDeletingId(null);
      }
    }
  };

  if (isLoading) return <div className="text-black p-6"><Loader/></div>;

  return (
    <div className="min-h-screen text-white p-6">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-bold text-black tracking-wide">🎟️ Coupens</h1>
        <button
          className="bg-white text-black font-medium px-5 py-2 rounded shadow hover:scale-105 transition-all disabled:opacity-50"
          onClick={() => openModal()}
          disabled={isAdding || isEditing}
        >
          + Add Coupen
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((coupen) => (
          <div
            key={coupen._id}
            className="bg-black bg-opacity- backdrop-blur border border-white/20 rounded-2xl p-5 shadow-lg transition-all hover:scale-[1.01]"
          >
            <h2 className="text-xl font-semibold mb-2">
              {coupen.coupens_name}
            </h2>
            <p className="text-gray-400 text-sm mb-1">
              Code: <span className="text-white">{coupen.coupens_code}</span>
            </p>
            <p>Discount: {coupen.coupens_discount}%</p>
            <p>Min Purchase: ₹{coupen.coupens_minimum_purchase}</p>
            <p className="text-sm text-gray-400 mt-1">
              {coupen.coupens_start_date.slice(0, 10)} →{' '}
              {coupen.coupens_end_date.slice(0, 10)}
            </p>

            <div className="flex justify-end gap-4 mt-4">
              <button
                onClick={() => openModal(coupen)}
                className="text-yellow-300 hover:underline text-sm"
                disabled={isAdding || isEditing}
              >
                ✏️ Edit
              </button>
              <button
                onClick={() => handleDelete(coupen._id)}
                className="text-red-400 hover:underline text-sm"
                disabled={deletingId === coupen._id}
              >
                {deletingId === coupen._id ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 px-4">
          <div className="bg-white text-black p-6 rounded-xl w-full max-w-md shadow-2xl">
            <h2 className="text-xl font-semibold mb-4">
              {editMode ? 'Edit Coupen' : 'Add Coupen'}
            </h2>
            {[
              { label: 'Name', name: 'coupens_name' },
              { label: 'Code', name: 'coupens_code' },
              { label: 'Discount %', name: 'coupens_discount', type: 'number' },
              {
                label: 'Minimum Purchase',
                name: 'coupens_minimum_purchase',
                type: 'number',
              },
              { label: 'Start Date', name: 'coupens_start_date', type: 'date' },
              { label: 'End Date', name: 'coupens_end_date', type: 'date' },
            ].map(({ label, name, type = 'text' }) => (
              <div key={name} className="mb-3">
                <label className="block font-medium mb-1">{label}</label>
                <input
                  type={type}
                  name={name}
                  value={formData[name]}
                  onChange={handleInput}
                  className="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:ring-2 focus:ring-black"
                />
              </div>
            ))}
            <div className="flex justify-end gap-3 mt-5">
              <button
                onClick={() => setModalOpen(false)}
                className="text-gray-600 hover:underline"
                disabled={isAdding || isEditing}
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="bg-black text-white px-4 py-2 rounded disabled:opacity-50"
                disabled={isAdding || isEditing}
              >
                {editMode
                  ? isEditing
                    ? 'Updating...'
                    : 'Update'
                  : isAdding
                  ? 'Adding...'
                  : 'Add'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Coupens;


