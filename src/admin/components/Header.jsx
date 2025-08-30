// import { useState } from "react";
// import { FaBars, FaUser } from "react-icons/fa";
// import { useDispatch, useSelector } from "react-redux";
// import { useLocation, useNavigate } from "react-router-dom";
// import { logoutReporter } from "../redux/slice";
// import { toast } from "react-toastify";

// const Header = ({ toggleSidebar }) => {
//   const dispatch = useDispatch();
//   const location = useLocation();
//   const navigate = useNavigate();
//   // const selector = useSelector((state) => state.auth);
//   // console.log(selector)

//   const titles = {
//     "/": "Dashboard",
//     "/manage-users": "Manage Users",
//     "/categories": "Categories & Items ",
//     "/transactions": "Transactions",
//     "/add-product": "Add Product",
//     "/add-banner": "Add Banner",
//     "/orders": "Orders",
//     "/total-users": "Total Users",
//     "/total-products": "Total Products",
//   };

//   const path = location.pathname;
//   let pageTitle = titles[path] || "";

//   if (path.startsWith("/vendor-details")) {
//     pageTitle = "Vendor Details";
//   }


//   const handleLogout = () => {
//     dispatch(logoutReporter());
//     localStorage.removeItem("token");
//     toast.success("Logout Successful");
//     navigate("/LoginPage");
//   };

//   return (
//     <>
//       {/* Top Navbar */}
//       <header className="h-16 w-full z-50 fixed flex items-center justify-between font-poppins text-black px-4 shadow-md bg-white">
//         <button onClick={toggleSidebar} className="text-2xl md:hidden">
//           <FaBars />
//         </button>

//         <div className="flex justify-between w-[80vw] p-4">
//           <div className="text-xl font-semibold">{pageTitle}</div>

//           <div className="flex gap-4">
//             <button
//               className="bg-white text-[#0D285C] w-9 h-9 rounded-full flex items-center justify-center underline hover:text-red-800"
//               onClick={() => handleLogout()}
//             >
//               Logout
//             </button>
//           </div>
//         </div>
//       </header>
  
     
//     </>
//   );
// };

// export default Header;


import { useState, useRef, useEffect } from "react";
import { FaBars, FaUser, FaSignOutAlt } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { logoutReporter } from "../redux/slice";
import { toast } from "react-toastify";

const Header = ({ toggleSidebar }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const titles = {
    "/": "Dashboard",
    "/manage-users": "Manage Users",
    "/categories": "Categories & Items ",
    "/transactions": "Transactions",
    "/add-product": "Add Product",
    "/add-banner": "Add Banner",
    "/orders": "Orders",
    "/total-users": "Total Users",
    "/total-products": "Total Products",
  };

  const path = location.pathname;
  let pageTitle = titles[path] || "";

  if (path.startsWith("/vendor-details")) {
    pageTitle = "Vendor Details";
  }

  const handleLogout = () => {
    dispatch(logoutReporter());
    localStorage.removeItem("token");
    toast.success("Logout Successful");
    navigate("/LoginPage");
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      {/* Top Navbar */}
      <header className="h-16 w-full z-50 fixed flex items-center justify-between font-poppins text-black px-4 shadow-md bg-white">
        <button onClick={toggleSidebar} className="text-2xl md:hidden">
          <FaBars />
        </button>

        <div className="flex justify-between w-[80vw] p-4 relative">
          <div className="text-xl font-semibold">{pageTitle}</div>

          <div className="flex gap-4 items-center relative" ref={dropdownRef}>
            {/* Profile Icon */}
            <button
              className="bg-white text-[#0D285C] w-9 h-9 rounded-full flex items-center justify-center hover:text-red-800"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <FaUser size={20} />
            </button>

            {/* Dropdown Menu */}
            <div
              className={`absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md p-2 transform transition-all duration-200 ${
                isDropdownOpen
                  ? "opacity-100 scale-100 translate-y-0"
                  : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
              }`}
            >
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 w-full px-3 py-2 text-red-600 hover:bg-red-100 rounded-md"
              >
                <FaSignOutAlt />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;