import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FiHome, FiUser } from "react-icons/fi";
import { RiFileAddLine } from "react-icons/ri";
import { BsListCheck } from "react-icons/bs";
import logo from "/logo2.png"; // your logo image
import { TbShoppingBag, TbTruckDelivery } from "react-icons/tb";
const menuItems = [
  { name: "Dashboard", path: "/", icon: <FiHome /> },
  { name: "Manage Users", path: "/manage-users", icon: <FiUser /> },
  { name: "Categories & Items", path: "/categories", icon: <TbShoppingBag /> },
  { name: "Transactions", path: "/transactions", icon: <RiFileAddLine /> },
  { name: "Add Product", path: "/add-product", icon: <BsListCheck /> },
  { name: "Orders", path: "/orders", icon: <TbTruckDelivery /> },
  { name: "Coupens", path: "/get-coupens", icon: <TbTruckDelivery /> },
];

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();

  const handleNavClick = () => {
    if (window.innerWidth < 768) {
      toggleSidebar();
    }
  };

  return (
    <>
      <div
        className={`fixed md:relative  font-poppins inset-y-0 left-0 bg-white text-black h-screen transition-transform duration-300  z-100 p-4 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 w-64`}
      >
        {/* Mobile close */}
        <button onClick={toggleSidebar} className="text-2xl mb-4 md:hidden">
          ✖
        </button>

        {/* Logo */}
        <div className="flex justify-center mb- font-poppins">
          <img src={logo} alt="Logo" className="h-28" />
        </div>

       

        {/* Menu */}
        <nav className="space-y-2 mt-6">
          {menuItems.map((item, index) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={index}
                to={item.path}
                onClick={handleNavClick}
                className={`flex items-center gap-3 p-2 rounded-xl text-black transition-colors ${
                  isActive ? "bg-black text-white" : "hover:bg-gray-300"
                }`}
              >
                <div
                  className={`p-2 rounded-full ${
                    isActive ? "bg-white text-black" : "bg-blue-100 text-black"
                  }`}
                >
                  {item.icon}
                </div>
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-black opacity-50 md:hidden" onClick={toggleSidebar}></div>
      )}
    </>
  );
};

export default Sidebar;
