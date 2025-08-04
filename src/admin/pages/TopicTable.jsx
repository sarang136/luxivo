import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const TopicTable = () => {
  const topics = [
    {
      topic: "Operating System",
      category: "Engineering",
      subCategory: "Computer Engineering",
      subTopic: "Linux",
    },
    {
      topic: "Operating System",
      category: "Engineering",
      subCategory: "Computer Engineering",
      subTopic: "-",
    },
    {
      topic: "Operating System",
      category: "Engineering",
      subCategory: "Computer Engineering",
      subTopic: "-",
    },
  ];

  return (
    <div className="p-6 bg-white text-black">
      <div className="bg-white border border-blue-100 rounded-lg overflow-hidden shadow-sm">
        {/* Header */}
        <div className="bg-blue-50 grid grid-cols-5 p-4 font-medium text-center text-sm border-b border-blue-100">
          <div>Topic Name</div>
          <div>Category</div>
          <div>Sub Category</div>
          <div>Sub Topic</div>
          <div>Action</div>
        </div>

        {/* Rows */}
        {topics.map((row, index) => (
          <div
            key={index}
            className={`grid grid-cols-5 p-4 items-center text-black text-center text-sm border-b border-blue-50 ${
              index === 0 ? "border border-blue-500 rounded-lg mt-2 mb-2" : ""
            }`}
          >
            <div>{row.topic}</div>
            <div>{row.category}</div>
            <div>{row.subCategory}</div>
            <div>{row.subTopic}</div>
            <div className="flex items-center justify-center gap-2">
              {/* Edit */}
              <button className="text-blue-700 hover:text-blue-900">
                <FaEdit />
              </button>
              {/* Delete */}
              <button className="text-red-600 hover:text-red-800">
                <FaTrash />
              </button>
              {/* Add SubTopic */}
              <button className="bg-green-600 text-white text-xs px-2 py-1 rounded hover:bg-green-700">
                + Add SubTopic
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopicTable;
