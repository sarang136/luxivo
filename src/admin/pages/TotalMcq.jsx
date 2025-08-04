import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const TotalMcqs = () => {
  const navigate = useNavigate();
  const [activeMainTab, setActiveMainTab] = useState("Engineering");
  const [activeSidebarTab, setActiveSidebarTab] = useState("Computer Engineering");

  const mainTabs = ["Engineering", "Commerce", "SSC", "HSC"];
  const sidebarItems = [
    "Computer Engineering",
    "Mechanical Engineering",
    "Automobile Engineering",
    "Information Technology",
    "Civil Engineering",
  ];
  const subjects = [
    "Computer Networks",
    "Software Engineering",
    "Hardware",
    "Database Management System",
    "C Programming",
    "Operating System",
    "Python Programming",
    "Java Programming",
    "Data Structure & Algorithms",
    "Digital Electronics",
    "MicroProcessor",
    "Machine Learning",
    "Artificial Intelligence",
  ];

  return (
    <div className="w-full h-[450px] font-poppins">
      {/* Top Tabs */}
      <div className="border-b border-gray-200 px-2 pt-2">
        <div className="flex flex-wrap space-x-4 text-sm font-medium text-gray-600">
          {mainTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveMainTab(tab)}
              className={`pb-2 border-b-2 ${
                activeMainTab === tab
                  ? "border-blue-600 text-blue-600"
                  : "hover:text-blue-500"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Main Layout */}
      <div className="flex flex-col lg:flex-row mt-4 gap-4 px-4 h-[calc(100%-48px)]">
        {/* Sidebar */}
        <aside className="lg:w-64 w-full bg-blue-900 text-white p-4 rounded-lg shadow-sm overflow-y-auto">
          <nav className="space-y-2">
            {sidebarItems.map((item) => (
              <button
                key={item}
                onClick={() => setActiveSidebarTab(item)}
                className={`w-full text-left py-2 px-3 rounded ${
                  activeSidebarTab === item
                    ? "bg-orange-500"
                    : "hover:bg-blue-800"
                }`}
              >
                {item}
              </button>
            ))}
          </nav>
        </aside>

        {/* Subject Grid with scroll */}
        <main className="flex-1 overflow-y-auto pr-2">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            {activeSidebarTab}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {subjects.map((subject) => (
              <button
                key={subject}
                onClick={() => {
                  if (
                    activeSidebarTab === "Computer Engineering" &&
                    subject === "Computer Networks"
                  ) {
                    navigate("/question-table");
                  }
                }}
                className="bg-white border border-blue-200 p-4 text-center rounded-lg shadow hover:shadow-md transition"
              >
                {subject}
              </button>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default TotalMcqs;
