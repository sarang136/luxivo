import React from "react";

const QuestionDetail = () => {
  return (
    <div className="bg-blue-50 p-6 flex flex-col space-y-6 overflow-y-hidden font-poppins">
      {/* Breadcrumb */}
      <nav className="text-blue-600 text-sm mb-2">
        Engineering &gt;&gt; Computer Engineering &gt;&gt; Computer Networks
      </nav>

      {/* Question Box */}
      <div className="bg-white rounded-xl p-6 shadow-md border border-blue-200">
        <h2 className="text-xl font-medium mb-4">What is a network ?</h2>
        <div className="space-y-3">
          {/* Option A */}
          <div className="flex items-center space-x-2 border border-blue-100 p-3 rounded-lg hover:bg-blue-50 cursor-pointer">
            <span className="w-8 h-8 flex items-center justify-center border border-blue-300 rounded-full text-blue-600 font-medium">A</span>
            <span>A group of unrelated computers placed in different rooms</span>
          </div>
          {/* Option B */}
          <div className="flex items-center space-x-2 border border-blue-100 p-3 rounded-lg hover:bg-blue-50 cursor-pointer">
            <span className="w-8 h-8 flex items-center justify-center border border-blue-300 rounded-full text-blue-600 font-medium">B</span>
            <span>A single computer used for all tasks</span>
          </div>
          {/* Option C - Correct Answer */}
          <div className="flex items-center space-x-2 border border-blue-100 p-3 rounded-lg bg-[#169000;] text-white cursor-pointer">
            <span className="w-8 h-8 flex items-center justify-center border border-white rounded-full font-medium">C</span>
            <span>A collection of interconnected computers and devices that can share resources and data</span>
          </div>
          {/* Option D */}
          <div className="flex items-center space-x-2 border border-blue-100 p-3 rounded-lg hover:bg-blue-50 cursor-pointer">
            <span className="w-8 h-8 flex items-center justify-center border border-blue-300 rounded-full text-blue-600 font-medium">D</span>
            <span>A software program used for editing images</span>
          </div>
        </div>
      </div>

      {/* Correct Answer Section */}
      <div className="bg-blue-50 border border-blue-200 p-4 rounded-xl">
        <h3 className="font-semibold mb-2 text-blue-900">Correct Answer : Option C.</h3>
        <p className="text-sm text-blue-800 leading-relaxed">
          A network in computer networks refers to two or more computers/devices connected together, usually via cables or wireless
          systems, so they can share information, files, resources (like printers or internet), and services. This enables
          communication and coordination between systems in homes, offices, or across the globe (like the internet).
        </p>
      </div>
    </div>
  );
};

export default QuestionDetail;
