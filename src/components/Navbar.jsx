import { useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-gray-900 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        <Link to="/" className="text-2xl font-bold tracking-wide hover:text-blue-400">
          SaaSKit
        </Link>

        <div className="hidden md:flex space-x-8">
          <Link to="/" className="hover:text-blue-400 transition">Home</Link>
          <Link to="/tools" className="hover:text-blue-400 transition">Tools</Link>
        </div>

        <div className="md:hidden">
          <button
            onClick={() => setOpen(!open)}
            className="focus:outline-none"
            aria-label="Toggle Menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Animated Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobileMenu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden bg-gray-900 px-4 pt-2 pb-4 space-y-1 overflow-hidden"
          >
            <Link
              to="/"
              className="block py-2 px-3 rounded hover:bg-gray-700"
              onClick={() => setOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/tools"
              className="block py-2 px-3 rounded hover:bg-gray-700"
              onClick={() => setOpen(false)}
            >
              Tools
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
