import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-6 mt-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0 text-center md:text-left">
          <h2 className="text-white font-bold text-xl">SaaSKit</h2>
         <p className="text-sm text-gray-400 text-center">
  &copy; {new Date().getFullYear()} SaaSKit. All rights reserved. Made with ❤️ by{" "}
  <a
    href="https://davidolarinde.vercel.app/"
    className="text-blue-400 hover:underline"
    target="_blank"
    rel="noopener noreferrer"
  >
    David Olarinde
  </a>
</p>  </div>

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
          
          <a href="https://x.com/DavidOlarinde2?t=sygxBvtoIQgTnOUXepSvWA&s=09" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
            Twitter
          </a>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
            GitHub
          </a>
          <a href="https://www.linkedin.com/in/david-olanrewaju-b98270370?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}
