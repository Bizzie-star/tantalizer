import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Hero from "../pages/Home";
import Order from "../pages/order";
import Contact from "../pages/contact";
import Franchise from "../pages/Franchise";

import SignUp from "../pages/SignUp";
import Forgotpassword from "../pages/Forgotpassword";
import Register from "../pages/Register";

import Cart from "../pages/cart";
import Outlet from "../pages/Outlet";

export default function Homescreen() {
  return (
    <div className="min-h-screen w-full flex flex-col bg-gray-100 pt-[80px]">
      <div className="flex-1 w-full px-4 sm:px-6 md:px-10 lg:px-20">
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/ordernow" element={<Order />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/franchise" element={<Franchise />} />
          <Route path="/about">
            
          </Route>
          <Route path="/cart" element={<Cart />} />
          <Route path="/outlet" element={<Outlet />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/Forgotpassword" element={<Forgotpassword />} />
          <Route path="/Register " element={<Register  />} />
          <Route path="/" element={<Hero />} />
        </Routes>
      </div>
    </div>
  );
}
