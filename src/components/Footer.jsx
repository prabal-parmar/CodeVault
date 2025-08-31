import { useNavigate } from "react-router-dom";

export default function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="bg-gradient-to-r from-gray-950 via-gray-900 to-gray-950 text-gray-400 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between">
          <div className="flex items-center space-x-2">
            <img
              src="logo.png"
              alt="logo"
              className="h-25 w-auto mt-1 cursor-pointer"
              onClick={() => navigate("/", { replace: true })}
            />
          </div>

          <div className="flex space-x-6 mt-4 sm:mt-0">
            <a href="/" className="hover:text-white transition">
              Home
            </a>
            <a href="/generate" className="hover:text-white transition">
              Generate
            </a>
            <a href="#" className="hover:text-white transition">
              Dashboard
            </a>
            <a href="/allcodes" className="hover:text-white transition">
              Your Codes
            </a>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-6 pt-6 flex flex-col sm:flex-row items-center justify-between text-sm text-gray-500">
          <p>© {new Date().getFullYear()} CodeVault</p>
          <div className="flex space-x-4 mt-2 sm:mt-0">
            <a href="#" className="hover:text-white transition">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
