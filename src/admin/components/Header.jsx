import { useState } from "react";
import { FaBars, FaUser } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { logoutReporter } from "../redux/slice";
import { toast } from "react-toastify";

const Header = ({ toggleSidebar }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const selector = useSelector((state) => state.auth);
  console.log(selector)

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

  return (
    <>
      {/* Top Navbar */}
      <header className="h-16 w-full z-50 fixed flex items-center justify-between font-poppins text-black px-4 shadow-md bg-white">
        <button onClick={toggleSidebar} className="text-2xl md:hidden">
          <FaBars />
        </button>

        <div className="flex justify-between w-[80vw] p-4">
          <div className="text-xl font-semibold">{pageTitle}</div>

          <div className="flex gap-4">
            <button
              className="bg-white text-[#0D285C] w-9 h-9 rounded-full flex items-center justify-center underline hover:text-red-800"
              onClick={() => handleLogout()}
            >
              Logout
            </button>
          </div>
        </div>
      </header>
  
     
    </>
  );
};

export default Header;
