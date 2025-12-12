// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { Menu, X } from "lucide-react";
// import log from "../assets/logo (1).svg";

// function Header() {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const navigate = useNavigate();

//   const handleAboutSelect = (e) => {
//     const path = e.target.value;
//     if (path) navigate(path);
//   };

//   return (
//     <header className="bg-white w-full fixed top-0 left-0 right-0 py-4 px-6 shadow-md z-50">
//       <div className="container mx-auto flex justify-between items-center">
//         {/* Logo */}
//         <Link to="/">
//           <img src={log} alt="Logo" className="h-10" />
//         </Link>

//         {/* Desktop Nav */}
//         <ul className="hidden md:flex items-center gap-6 text-gray-800 font-medium">
//           <Link to="/ordernow">
//             <li className="hover:text-red-500 transition">Order Now</li>
//           </Link>

//           {/* About Dropdown */}
//           <li className="flex items-center hover:text-red-500 transition">
//             <span>About</span>
//             <select
//               defaultValue=""
//               onChange={handleAboutSelect}
//               className="border-none outline-none bg-transparent text-gray-700 hover:text-red-500 cursor-pointer -ml-[2px]"
//               style={{ paddingLeft: 0 }}
//             >
//               <option value="" disabled hidden></option>
//               <option value="/about/qehs">Q.E.H.S</option>
//               <option value="/about/boardofdirectors">Board Of Directors</option>
//               <option value="/about/managementprofile">Management Profile</option>
//               <option value="/about/media">Media</option>
//             </select>
//           </li>

//           <Link to="/franchise">
//             <li className="hover:text-red-500 transition">Franchise</li>
//           </Link>
//           <Link to="/outlet">
//             <li className="hover:text-red-500 transition">Outlet</li>
//           </Link>
//           <Link to="/contact">
//             <li className="hover:text-red-500 transition">Contact</li>
//           </Link>
//           <Link to="/cart">
//             <li className="hover:text-red-500 transition">Cart</li>
//           </Link>
//         </ul>

//         {/* Sign In Button */}
//         <Link to="/signup" className="hidden md:block">
//           <button className="bg-red-500 px-6 py-2 rounded-[10px] text-white hover:bg-red-600 transition w-40">
//             Sign Up
//           </button>
//         </Link>

//         {/* Mobile Menu Toggle */}
//         <button
//           className="md:hidden text-gray-800"
//           onClick={() => setMenuOpen(!menuOpen)}
//         >
//           {menuOpen ? <X size={28} /> : <Menu size={28} />}
//         </button>
//       </div>

//       {/* Mobile Menu */}
//       {menuOpen && (
//         <div className="md:hidden bg-white shadow-md border-t mt-3 p-4 rounded-lg">
//           <ul className="flex flex-col gap-4 text-gray-800 font-medium">
//             <Link to="/ordernow" onClick={() => setMenuOpen(false)}>
//               <li className="hover:text-red-500 transition">Order Now</li>
//             </Link>

//             {/* About Dropdown for Mobile */}
//             <li className="hover:text-red-500 transition flex items-center">
//               About
//               <select
//                 defaultValue=""
//                 onChange={(e) => {
//                   const path = e.target.value;
//                   if (path) {
//                     navigate(path);
//                     setMenuOpen(false);
//                   }
//                 }}
//                 className="border-none outline-none bg-transparent text-gray-700 hover:text-red-500 cursor-pointer -ml-[2px]"
//               >
//                 <option value="" disabled hidden></option>
//                 <option value="/about/qehs">Q.E.H.S</option>
//                 <option value="/about/boardofdirectors">Board Of Directors</option>
//                 <option value="/about/managementprofile">Management Profile</option>
//                 <option value="/about/media">Media</option>
//               </select>
//             </li>

//             <Link to="/franchise" onClick={() => setMenuOpen(false)}>
//               <li className="hover:text-red-500 transition">Franchise</li>
//             </Link>
//             <Link to="/outlet" onClick={() => setMenuOpen(false)}>
//               <li className="hover:text-red-500 transition">Outlet</li>
//             </Link>
//             <Link to="/contact" onClick={() => setMenuOpen(false)}>
//               <li className="hover:text-red-500 transition">Contact</li>
//             </Link>
//             <Link to="/cart" onClick={() => setMenuOpen(false)}>
//               <li className="hover:text-red-500 transition">Cart</li>
//             </Link>
//             <Link to="/signup" onClick={() => setMenuOpen(false)}>
//               <button className="bg-red-500 px-6 py-2 rounded-[10px] text-white hover:bg-red-600 transition w-full">
//                 Sign Up
//               </button>
//             </Link>
//           </ul>
//         </div>
//       )}
//     </header>
//   );
// }

// export default Header;








import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import Log from "../assets/logo(1).jpg";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleAboutSelect = (path) => {
    if (path) {
      navigate(path);
      setMenuOpen(false); // Close mobile menu on selection
    }
  };

  const navItems = [
    { label: "Order Now", to: "/ordernow" },
    { label: "Franchise", to: "/franchise" },
    { label: "Outlet", to: "/outlet" },
    { label: "Contact", to: "/contact" },
    { label: "Cart", to: "/cart" },
  ];

  // const aboutItems = [
  //   { label: "Q.E.H.S", value: "/about/qehs" },
  //   { label: "Board Of Directors", value: "/about/boardofdirectors" },
  //   { label: "Management Profile", value: "/about/managementprofile" },
  //   { label: "Media", value: "/about/media" },
  // ];

  return (
    <header className="bg-white w-full fixed top-0 left-0 right-0 shadow-lg z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <img src={Log} alt="Company Logo" className="h-10 lg:h-12 w-auto" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <ul className="flex items-center space-x-8 text-gray-700 font-medium text-base">
              {navItems.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="hover:text-red-600 transition-colors duration-200 relative group"
                  >
                    {item.label}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-600 transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                </li>
              ))}

              {/* About Dropdown
              <li className="relative group">
                <span className="cursor-default flex items-center hover:text-red-600 transition-colors duration-200">
                  About
                  <svg
                    className="w-4 h-4 ml-1 transition-transform group-hover:rotate-180"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </span> */}

                {/* Desktop Dropdown */}
                {/* <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 border border-gray-100">
                  <ul className="py-3">
                    {aboutItems.map((item) => (
                      <li key={item.value}>
                        <Link
                          to={item.value}
                          className="block px-5 py-2.5 text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors"
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </li> */}
            </ul>

            {/* Sign Up Button */}
            <Link to="/signup">
              <button className="bg-red-600 text-white px-6 py-2.5 rounded-full font-medium hover:bg-red-700 hover:shadow-lg transform hover:scale-105 transition-all duration-200 ml-8">
                Sign Up
              </button>
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden text-gray-700 hover:text-red-600 transition-colors p-2"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden fixed inset-x-0 top-16 bg-white shadow-2xl border-t border-gray-100 transition-all duration-300 ease-in-out ${
          menuOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0 pointer-events-none"
        }`}
      >
        <div className="px-6 py-6 space-y-5 max-w-7xl mx-auto">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setMenuOpen(false)}
              className="block text-lg font-medium text-gray-700 hover:text-red-600 transition-colors"
            >
              {item.label}
            </Link>
          ))}

          {/* Mobile About Section */}
          {/* <div className="pt-4 border-t border-gray-200">
            <p className="text-lg font-semibold text-gray-800 mb-3">About</p>
            <div className="space-y-3 pl-4">
              {aboutItems.map((item) => (
                <Link
                  key={item.value}
                  to={item.value}
                  onClick={() => setMenuOpen(false)}
                  className="block text-gray-600 hover:text-red-600 transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div> */}

          <div className="pt-6 border-t border-gray-200">
            <Link to="/signup" onClick={() => setMenuOpen(false)}>
              <button className="w-full bg-red-600 text-white py-3.5 rounded-full font-semibold hover:bg-red-700 transition-all duration-200 shadow-md">
                Sign Up
              </button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;