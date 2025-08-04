import React from "react";
import { Link } from "react-router-dom"; // ✅ import Link

const QuestionsTable = () => {
  const questions = [
    { id: 1, question: "What is network ?", operator: "John Doe" },
    { id: 2, question: "What is network ?", operator: "John Doe" },
    { id: 3, question: "What is network ?", operator: "John Doe" },
    { id: 4, question: "What is network ?", operator: "John Doe" },
  ];

  return (
    <div className="p-4 bg-white text-gray-800 font-poppins">
      {/* Breadcrumb */}
      <nav className="text-sm text-blue-600 mb-4">
        Engineering &gt;&gt; Computer Engineering &gt;&gt; Computer Networks
      </nav>

      {/* Table */}
      <div className="overflow-x-auto border border-blue-500 rounded-2xl shadow-sm">
        <table className="min-w-full border-collapse">
          <thead className="bg-blue-100 border-b border-blue-500">
            <tr className="text-left text-sm font-semibold">
              <th className="py-3 px-4">Sr.</th>
              <th className="py-3 px-4">Question</th>
              <th className="py-3 px-4">Answer & Explanation</th>
              <th className="py-3 px-4">Operator Name</th>
            </tr>
          </thead>
          <tbody>
            {questions.map((item) => (
              <tr key={item.id} className="hover:bg-blue-50 border-b border-blue-100 text-sm">
                <td className="py-3 px-4">{item.id}.</td>
                <td className="py-3 px-4">{item.question}</td>
                <td className="py-3 px-4 text-blue-600 underline cursor-pointer">
                  <Link to="/question-details">View</Link> {/* ✅ Link to question-details */}
                </td>
                <td className="py-3 px-4">{item.operator}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default QuestionsTable;
