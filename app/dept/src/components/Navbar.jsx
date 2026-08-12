import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, LogIn } from "lucide-react";
import Logo from "./Logo";

const navItems = [
  { label: "Home", path: "/" },
  {
    label: "About",
    dropdown: [
      { label: "Vision & Mission", path: "/about#vision" },
      { label: "HoD's Message", path: "/about#hod" },
      { label: "Department History", path: "/about#history" },
      { label: "Accreditations", path: "/about#accreditations" },
    ],
  },
  { label: "Programs", path: "/programs" },
  { label: "Faculty", path: "/faculty" },
  {
    label: "Academics",
    dropdown: [
      { label: "Curriculum & Labs", path: "/curriculum-labs" },
      { label: "Research", path: "/research" },
      { label: "Programming Practice", path: "/practice" },
    ],
  },
  { label: "Placements", path: "/placements" },
  { label: "Events", path: "/events" },
  { label: "Student Corner", path: "/student-corner" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Automatically close the mobile menu only when page route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-slate-900/95 shadow-lg backdrop-blur-md"
          : "bg-slate-900/90 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 border-b border-white/10">
          <Link to="/" className="flex items-center gap-2 group">
            <Logo size="sm" />
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <div key={item.label} className="relative">
                {item.dropdown ? (
                  <>
                    <button
                      onClick={() =>
                        setOpenDropdown(
                          openDropdown === item.label ? null : item.label,
                        )
                      }
                      className={`nav-link flex items-center gap-1 px-3 py-2 rounded-lg ${
                        openDropdown === item.label
                          ? "text-blue-300 bg-white/10"
                          : "text-white/80 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      {item.label}
                      <ChevronDown
                        className={`w-3 h-3 transition-transform ${openDropdown === item.label ? "rotate-180" : ""}`}
                      />
                    </button>
                    <div
                      className={`absolute top-full left-0 mt-1 w-52 bg-slate-900/95 backdrop-blur-md rounded-lg shadow-xl py-2 transition-all duration-200 border border-white/10 ${
                        openDropdown === item.label
                          ? "opacity-100 visible translate-y-0"
                          : "opacity-0 invisible -translate-y-2"
                      }`}
                    >
                      {item.dropdown.map((sub) => (
                        <Link
                          key={sub.label}
                          to={sub.path}
                          onClick={() => setOpenDropdown(null)}
                          className="block px-4 py-2 text-sm text-white/70 hover:text-blue-300 hover:bg-white/5 transition-colors"
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  </>
                ) : (
                  <Link
                    to={item.path}
                    className={`nav-link flex items-center gap-1 px-3 py-2 rounded-lg ${
                      location.pathname === item.path
                        ? "text-blue-300 bg-white/10"
                        : "text-white/80 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Desktop Login Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              to="/login"
              className="text-white/70 hover:text-white text-sm font-medium transition-colors px-3 py-2"
            >
              Sign In
            </Link>
            <Link
              to="/login"
              className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-5 py-2 rounded-lg font-medium transition-colors"
            >
              Portal Login
            </Link>
          </div>

          {/* Mobile Action Controls (Login Icon + Hamburger Menu) */}
          <div className="flex items-center gap-1 lg:hidden">
            <Link
              to="/login"
              className="p-2 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
              title="Portal Login"
              aria-label="Portal Login"
            >
              <LogIn className="w-5 h-5 text-blue-400" />
            </Link>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-white/70 hover:bg-white/10 transition-colors"
              aria-label="Toggle Navigation"
            >
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Drawer */}
      {isOpen && (
        <div className="lg:hidden bg-slate-900/95 backdrop-blur-md border-t border-white/10 animate-slide-up">
          <div className="px-4 py-4 space-y-1 max-h-[80vh] overflow-y-auto">
            {navItems.map((item) => (
              <div key={item.label}>
                {item.dropdown ? (
                  <>
                    <button
                      onClick={() =>
                        setOpenDropdown(
                          openDropdown === item.label ? null : item.label,
                        )
                      }
                      className={`w-full text-left flex items-center justify-between px-4 py-3 rounded-lg text-white/80 hover:text-white hover:bg-white/5 font-medium ${
                        openDropdown === item.label
                          ? "text-blue-300 bg-white/10"
                          : ""
                      }`}
                    >
                      {item.label}
                      <ChevronDown
                        className={`w-4 h-4 transition-transform ${openDropdown === item.label ? "rotate-180" : ""}`}
                      />
                    </button>
                    {openDropdown === item.label && (
                      <div className="ml-4 mt-1 space-y-1 border-l border-white/10 pl-2">
                        {item.dropdown.map((sub) => (
                          <Link
                            key={sub.label}
                            to={sub.path}
                            onClick={() => {
                              setOpenDropdown(null);
                              setIsOpen(false);
                            }}
                            className="block px-4 py-2 text-sm text-white/60 hover:text-blue-300"
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`block px-4 py-3 rounded-lg text-white/80 hover:text-white hover:bg-white/5 font-medium ${
                      location.pathname === item.path
                        ? "text-blue-300 bg-white/10"
                        : ""
                    }`}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
            <div className="pt-4 border-t border-white/10 flex gap-3">
              <Link
                to="/login"
                className="flex-1 bg-blue-500 hover:bg-blue-600 text-white text-center text-sm py-2 rounded-lg font-medium"
              >
                Portal Login
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
