import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { User, LogOut } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();
  
  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-50 border-b border-gray-200">
      <div className="max-w-full px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors">
            StackIT
          </Link>
          
          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:text-blue-600 transition-colors">
              <User size={20} />
              <span>Login</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:text-red-600 transition-colors">
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;