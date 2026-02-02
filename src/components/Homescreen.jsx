import React from "react";
import Hero from "../pages/Home";      // ✅ Works: components/ -> pages/Home.jsx
import Order from "../pages/Ordernow";    // ✅ Use lowercase if file is order.jsx, or "../pages/Order"
import Contact from "../pages/contact";
import Franchise from "../pages/Franchise";
import SignUp from "../pages/SignUp";
import Forgotpassword from "../pages/Forgotpassword";
import Register from "../pages/Register";
import Cart from "../pages/Cart";
import Outlet from "../pages/Outlet";
import Admindashboard from "../pages/Admindashboard";
import Userdashboard from "../pages/Userdashboard";

export default function Homescreen() {
  return (
    <div className="min-h-screen w-full flex flex-col bg-gray-100 pt-[80px]">
      <div className="flex-1 w-full px-4 sm:px-6 md:px-10 lg:px-20">
        {/* NO <Routes> HERE! Just render based on URL or use children */}
        {/* For now, simple home - add Link navigation later */}
        <Hero /> {/* Default to Hero */}
      </div>
    </div>
  );
}