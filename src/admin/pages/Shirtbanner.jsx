import React, { useState } from "react";
import { IoShirt } from "react-icons/io5";
import { X, Trash2 } from "lucide-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  useAddShirtBannerMutation,
  useGetShirtBannerQuery,
  useDeleteBannerMutation,
} from "../redux/authApi.js";

const Shirtbanner = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);

  // 🔹 RTK Query Hooks
  const [addBanner, { isLoading: uploading }] = useAddShirtBannerMutation();
  const { data, isLoading: fetching, refetch } = useGetShirtBannerQuery();
  const [deleteBanner, { isLoading: deleting }] = useDeleteBannerMutation();

  // 🔹 Handle multiple file selection
  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    if (files.length > 0) {
      setSelectedFiles(files);
      setPreviewUrls(files.map((file) => URL.createObjectURL(file)));
    } else {
      setSelectedFiles([]);
      setPreviewUrls([]);
    }
  };

  // 🔹 Remove specific file (before upload)
  const handleRemoveFile = (index) => {
    const newFiles = selectedFiles.filter((_, i) => i !== index);
    const newPreviews = previewUrls.filter((_, i) => i !== index);
    setSelectedFiles(newFiles);
    setPreviewUrls(newPreviews);
  };

  // 🔹 Handle upload
  const handleUpload = async () => {
    if (selectedFiles.length === 0) {
      toast.error("Please select files!");
      return;
    }

    try {
      const formData = new FormData();
      selectedFiles.forEach((file) => formData.append("files", file));

      await addBanner(formData).unwrap();
      toast.success("Files uploaded successfully!");
      setSelectedFiles([]);
      setPreviewUrls([]);
      refetch();
    } catch (err) {
      console.error("Error uploading files: ", err);
      toast.error(err?.data?.message || "Upload failed!");
    }
  };

  // 🔹 Handle delete banner
  const handleDelete = async (id) => {
    try {
      await deleteBanner(id).unwrap();
      toast.success("Banner deleted successfully!");
      refetch();
    } catch (err) {
      console.error("Error deleting banner: ", err);
      toast.error(err?.data?.message || "Delete failed!");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-950 text-white">
      {/* Upload Section */}
      <div className="bg-black shadow-lg rounded-xl p-6 w-full max-w-md border border-gray-700 mb-10">
        <h3 className="flex items-center justify-center gap-2 text-2xl font-semibold mb-6 text-white">
          <IoShirt className="text-yellow-500 text-3xl" />
          Add New Shirt Banner
        </h3>

        {/* File Input */}
        <div className="mb-4">
          <input
            type="file"
            multiple
            accept="image/*,video/*"
            onChange={handleFileChange}
            className="w-full border border-green-600 rounded-lg px-3 py-2 text-gray-300 cursor-pointer bg-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Preview Section */}
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
                    title="Remove file"
                  >
                    <X size={14} />
                  </button>

                  {isVideo ? (
                    <video
                      src={url}
                      controls
                      className="w-full h-32 object-cover"
                    />
                  ) : (
                    <img
                      src={url}
                      alt={`Preview ${index}`}
                      className="w-full h-32 object-cover"
                    />
                  )}
                  <p className="text-xs text-gray-400 mt-1 truncate px-1">
                    {file.name}
                  </p>
                </div>
              );
            })}
          </div>
        )}

        {/* Upload Button */}
        <button
          onClick={handleUpload}
          disabled={selectedFiles.length === 0 || uploading}
          className={`w-full py-3 rounded-lg text-white font-semibold transition-all ${
            uploading
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 cursor-pointer"
          }`}
        >
          {uploading ? "Uploading..." : "Upload Files"}
        </button>
      </div>

      {/* Existing Banners */}
      <div className="w-full max-w-5xl bg-gray-900 rounded-xl p-6 shadow-lg border border-gray-700">
        <h2 className="text-xl font-semibold mb-4">All Shirt Banners</h2>

        {fetching ? (
          <p className="text-gray-400">Loading banners...</p>
        ) : data?.data?.length === 0 ? (
          <p className="text-gray-400">No banners found.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {data?.data?.map((banner) => (
              <div
                key={banner._id}
                className="relative border border-gray-700 rounded-lg overflow-hidden group"
              >
                {banner.type === "video" ? (
                  <video
                    src={banner.fileUrl}
                    controls
                    className="w-full h-40 object-cover"
                  />
                ) : (
                  <img
                    src={banner.fileUrl}
                    alt="banner"
                    className="w-full h-40 object-cover"
                  />
                )}
                <button
                  onClick={() => handleDelete(banner._id)}
                  disabled={deleting}
                  className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Shirtbanner;
