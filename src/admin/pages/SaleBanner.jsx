// import React, { useState } from "react";
// import { useAddSaleMutation } from "../redux/authApi";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { Tag, X } from "lucide-react";
// import { useGetAllSalesQuery , useDeleteSaleMutation } from "../redux/authApi";

// const SaleBanner = () => {
//   const [addSale, { isLoading }] = useAddSaleMutation();
//   const [selectedFiles, setSelectedFiles] = useState([]);
//   const [previewUrls, setPreviewUrls] = useState([]);
//   const [validateDays, setValidateDays] = useState("");

//   const handleFileChange = (e) => {
//     const files = Array.from(e.target.files);
//     if (files.length > 0) {
//       setSelectedFiles(files);
//       setPreviewUrls(files.map((file) => URL.createObjectURL(file)));
//     } else {
//       setSelectedFiles([]);
//       setPreviewUrls([]);
//     }
//   };

//   const handleRemoveFile = (index) => {
//     const newFiles = selectedFiles.filter((_, i) => i !== index);
//     const newPreviews = previewUrls.filter((_, i) => i !== index);
//     setSelectedFiles(newFiles);
//     setPreviewUrls(newPreviews);
//   };

//   const handleDaysChange = (e) => {
//     const value = e.target.value.replace(/[^0-9]/g, "");
//     setValidateDays(value);
//   };

//   const handleUpload = async () => {
//     if (selectedFiles.length === 0 || !validateDays) {
//       toast.warn("Please select files and enter valid days!");
//       return;
//     }

//     try {
//       const formData = new FormData();
//       selectedFiles.forEach((file) => formData.append("image", file));
//       formData.append("validate_days", validateDays);

//       await addSale(formData).unwrap();

//       toast.success("Sale banners uploaded successfully!");
//       setSelectedFiles([]);
//       setPreviewUrls([]);
//       setValidateDays("");
//       document.getElementById("file-input").value = "";
//     } catch (err) {
//       console.error("Upload failed:", err);
//       toast.error(err?.data?.message || "Upload failed!");
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gradient-to-br  to-black">
//       <div className="bg-gray-950 shadow-2xl rounded-xl p-8 w-full max-w-md border border-gray-800">
//         <h3 className="flex items-center justify-center gap-2 text-2xl font-semibold mb-6 text-white">
//           <Tag className="text-yellow-500" size={26} />
//           Upload Sale Banner
//         </h3>

//         <div className="mb-4">
//           <input
//             id="file-input"
//             type="file"
//             multiple
//             accept="image/*,video/*"
//             onChange={handleFileChange}
//             className="w-full border border-blue-600 rounded-lg px-3 py-2 text-gray-300 bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
//           />
//         </div>

//         <div className="mb-5">
//           <label className="block text-gray-400 text-sm mb-2">
//             Validate Days
//           </label>
//           <input
//             type="text"
//             value={validateDays}
//             onChange={handleDaysChange}
//             placeholder="e.g., 7, 10, 30"
//             className="w-full border border-gray-700 rounded-lg px-3 py-2 bg-gray-800 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>

//         {previewUrls.length > 0 && (
//           <div className="grid grid-cols-2 gap-3 mb-5">
//             {previewUrls.map((url, index) => {
//               const file = selectedFiles[index];
//               const isVideo = file.type.startsWith("video/");
//               return (
//                 <div
//                   key={index}
//                   className="relative group border border-gray-700 rounded-lg overflow-hidden"
//                 >
//                   <button
//                     onClick={() => handleRemoveFile(index)}
//                     className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
//                     title="Remove file"
//                   >
//                     <X size={14} />
//                   </button>

//                   {isVideo ? (
//                     <video
//                       src={url}
//                       controls
//                       className="w-full h-32 object-cover"
//                     />
//                   ) : (
//                     <img
//                       src={url}
//                       alt={`Preview ${index}`}
//                       className="w-full h-32 object-cover"
//                     />
//                   )}
//                   <p className="text-xs text-gray-400 mt-1 truncate px-1 text-center">
//                     {file.name}
//                   </p>
//                 </div>
//               );
//             })}
//           </div>
//         )}

//         <button
//           onClick={handleUpload}
//           disabled={isLoading}
//           className={`w-full py-3 rounded-lg text-white font-semibold transition-all ${
//             isLoading
//               ? "bg-gray-600 cursor-not-allowed"
//               : "bg-blue-600 hover:bg-blue-700 cursor-pointer"
//           }`}
//         >
//           {isLoading ? "Uploading..." : "Upload Sale Banner"}
//         </button>
//       </div>
//     </div>
  
// )}

// export default SaleBanner;


import React, { useState } from "react";
import { Tag, X, Trash2 } from "lucide-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  useAddSaleMutation,
  useGetAllSalesQuery,
  useDeleteSaleMutation,
} from "../redux/authApi";

const SaleBanner = () => {
  const [addSale, { isLoading }] = useAddSaleMutation();
  const [deleteSale] = useDeleteSaleMutation();
  const { data: allSales, refetch, isFetching } = useGetAllSalesQuery();

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const [validateDays, setValidateDays] = useState("");

  // Handle file select
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      setSelectedFiles(files);
      setPreviewUrls(files.map((file) => URL.createObjectURL(file)));
    } else {
      setSelectedFiles([]);
      setPreviewUrls([]);
    }
  };

  // Remove preview file
  const handleRemoveFile = (index) => {
    const newFiles = selectedFiles.filter((_, i) => i !== index);
    const newPreviews = previewUrls.filter((_, i) => i !== index);
    setSelectedFiles(newFiles);
    setPreviewUrls(newPreviews);
  };

  // Handle validate days
  const handleDaysChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    setValidateDays(value);
  };

  // Upload new sale banners
  const handleUpload = async () => {
    if (selectedFiles.length === 0 || !validateDays) {
      toast.warn("Please select files and enter valid days!");
      return;
    }

    try {
      const formData = new FormData();
      selectedFiles.forEach((file) => formData.append("image", file));
      formData.append("validate_days", validateDays);

      await addSale(formData).unwrap();
      toast.success("Sale banners uploaded successfully!");

      setSelectedFiles([]);
      setPreviewUrls([]);
      setValidateDays("");
      document.getElementById("file-input").value = "";

      refetch(); // refresh banner list
    } catch (err) {
      console.error("Upload failed:", err);
      toast.error(err?.data?.message || "Upload failed!");
    }
  };

  // Delete sale banner
  const handleDelete = async (id) => {
    try {
      await deleteSale(id).unwrap();
      toast.success("Banner deleted successfully!");
      refetch();
    } catch (err) {
      console.error("Delete failed:", err);
      toast.error(err?.data?.message || "Failed to delete banner!");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen  p-6">
      {/* Upload Section */}
      <div className="bg-gray-950 shadow-2xl rounded-xl p-8 w-full max-w-md border border-gray-800 mb-8">
        <h3 className="flex items-center justify-center gap-2 text-2xl font-semibold mb-6 text-white">
          <Tag className="text-yellow-500" size={26} />
          Upload Sale Banner
        </h3>

        <div className="mb-4">
          <input
            id="file-input"
            type="file"
            multiple
            accept="image/*,video/*"
            onChange={handleFileChange}
            className="w-full border border-blue-600 rounded-lg px-3 py-2 text-gray-300 bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
          />
        </div>

        <div className="mb-5">
          <label className="block text-gray-400 text-sm mb-2">
            Validate Days
          </label>
          <input
            type="text"
            value={validateDays}
            onChange={handleDaysChange}
            placeholder="e.g., 7, 10, 30"
            className="w-full border border-gray-700 rounded-lg px-3 py-2 bg-gray-800 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {previewUrls.length > 0 && (
          <div className="grid grid-cols-2 gap-3 mb-5">
            {previewUrls.map((url, index) => {
              const file = selectedFiles[index];
              const isVideo = file.type.startsWith("video/");
              return (
                <div
                  key={index}
                  className="relative group border border-gray-700 rounded-lg overflow-hidden"
                >
                  <button
                    onClick={() => handleRemoveFile(index)}
                    className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  >
                    <X size={14} />
                  </button>

                  {isVideo ? (
                    <video src={url} controls className="w-full h-32 object-cover" />
                  ) : (
                    <img src={url} alt={`Preview ${index}`} className="w-full h-32 object-cover" />
                  )}
                  <p className="text-xs text-gray-400 mt-1 truncate px-1 text-center">
                    {file.name}
                  </p>
                </div>
              );
            })}
          </div>
        )}

        <button
          onClick={handleUpload}
          disabled={isLoading}
          className={`w-full py-3 rounded-lg text-white font-semibold transition-all ${
            isLoading
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {isLoading ? "Uploading..." : "Upload Sale Banner"}
        </button>
      </div>

      {/* Display All Banners */}
      <div className="bg-gray-950 shadow-xl rounded-xl p-6 w-full max-w-4xl border border-gray-800">
        <h3 className="text-white text-xl font-semibold mb-4">All Sale Banners</h3>

        {isFetching ? (
          <p className="text-gray-400">Loading banners...</p>
        ) : allSales && allSales.data && allSales.data.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {allSales.data.map((banner) => (
              <div
                key={banner._id}
                className="relative border border-gray-700 rounded-lg overflow-hidden group"
              >
                {banner.image?.endsWith(".mp4") ? (
                  <video
                    src={banner.image}
                    controls
                    className="w-full h-40 object-cover"
                  />
                ) : (
                  <img
                    src={banner.image}
                    alt="Banner"
                    className="w-full h-40 object-cover"
                  />
                )}

                <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 flex justify-center items-center transition-all">
                  <button
                    onClick={() => handleDelete(banner._id)}
                    className="bg-red-600 text-white px-3 py-2 rounded flex items-center gap-1 hover:bg-red-700"
                  >
                    <Trash2 size={16} /> Delete
                  </button>
                </div>

                <p className="text-gray-300 text-center text-xs py-1">
                  Valid: {banner.validate_days} days
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400 text-center">No banners found</p>
        )}
      </div>
    </div>
  );
};

export default SaleBanner;
