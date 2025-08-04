import React from "react";

const Engineering = () => {
  // List of subcategories under Engineering
  const subcategories = [
    "Computer Network",
    "Operating System",
    "Software Engineering",
    "Information Technology",
    "Computer Network",
    "Opearting System",
    "Software Engineering",
    "Information Technology",
  ];

  return (
    <div className="p-4 w-full bg-[#74CDFF26] h-[560px] font-poppins">
      {/* Categories container */}
      <div className="rounded-md p-4 flex flex-wrap gap-12 font-poppins">
        {subcategories.map((subcat) => (
          <div
            key={subcat}
            className="bg-white border border-blue-100 shadow-sm rounded-md min-w-[200px] h-[120px] flex items-center justify-center text-blue-900 font-medium cursor-pointer hover:shadow-md transition font-poppins"
          >
            {subcat}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Engineering;
