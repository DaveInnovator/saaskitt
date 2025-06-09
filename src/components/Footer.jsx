import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-6 mt-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0 text-center md:text-left">
          <h2 className="text-white font-bold text-xl">SaaSKit</h2>
          <p className="text-sm">&copy; {new Date().getFullYear()} SaaS Bundle. All rights reserved.</p>
        </div>

        <div className="flex space-x-6 mb-4 md:mb-0">
          <Link to="/" className="hover:text-white transition">
            Home
          </Link>
          <Link to="/tools" className="hover:text-white transition">
            Tools
          </Link>
          {/* <Link to="/pricing" className="hover:text-white transition">
            Pricing
          </Link> */}
        </div>

        <div className="flex space-x-6">
          {/* Replace with real icons if you want */}
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
            Twitter
          </a>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
            GitHub
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}
