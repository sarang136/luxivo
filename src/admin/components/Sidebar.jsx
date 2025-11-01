
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FiHome, FiUser } from "react-icons/fi";
import { RiFileAddLine } from "react-icons/ri";
import { BsListCheck } from "react-icons/bs";
import { TbShoppingBag, TbTruckDelivery, TbPhoto } from "react-icons/tb";
import logo from "/logo2.png";

const menuItems = [
  { name: "Dashboard", path: "/", icon: <FiHome /> },
  { name: "Manage Users", path: "/manage-users", icon: <FiUser /> },
  { name: "Categories & Items", path: "/categories", icon: <TbShoppingBag /> },
  { name: "Transactions", path: "/transactions", icon: <RiFileAddLine /> },
  { name: "Add Product", path: "/add-product", icon: <BsListCheck /> },
  { name: "Orders", path: "/orders", icon: <TbTruckDelivery /> },
  { name: "Coupens", path: "/get-coupens", icon: <TbTruckDelivery /> },
  { name: "Shirt Banners", path: "/shirt-banners", icon: <TbPhoto /> },
  { name: "Sell Banners", path: "/sell-banners", icon: <TbPhoto /> },
];

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();

  const handleNavClick = () => {
    if (window.innerWidth < 768) toggleSidebar();
  };

  return (
    <>
      {/* Sidebar */}
      <div
        className={`fixed md:static top-0 left-0 w-64 bg-white text-black font-poppins shadow-md md:shadow-none z-50 transform transition-transform duration-300 ease-in-out 
        ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        {/* Close Button (Mobile) */}
        <div className="flex justify-end md:hidden p-3">
          <button onClick={toggleSidebar} className="text-2xl font-bold">
            ✖
          </button>
        </div>

        {/* Logo */}
        <div className="flex justify-center mb-4">
          <img src={logo} alt="Logo" className="h-24 w-auto object-contain" />
        </div>

        {/* Navigation Menu */}
        <nav className="space-y-2 px-3">
          {menuItems.map((item, index) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={index}
                to={item.path}
                onClick={handleNavClick}
                className={`flex items-center gap-3 p-2 rounded-xl transition-colors duration-200 ${
                  isActive
                    ? "bg-black text-white"
                    : "hover:bg-gray-200 text-black"
                }`}
              >
                <div
                  className={`p-2 rounded-full ${
                    isActive ? "bg-white text-black" : "bg-blue-100 text-black"
                  }`}
                >
                  {item.icon}
                </div>
                <span className="text-sm font-medium">{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 md:hidden z-40"
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );
};

export default Sidebar;
