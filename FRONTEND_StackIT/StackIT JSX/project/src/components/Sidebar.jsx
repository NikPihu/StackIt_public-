import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Users, FileText, HelpCircle } from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();
  
  const menuItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/communities', label: 'Communities', icon: Users },
    { path: '/articles', label: 'Articles', icon: FileText },
    { path: '/questions', label: 'Questions', icon: HelpCircle },
  ];
  
  return (
    <aside className="fixed left-0 top-20 bottom-0 w-64 bg-white shadow-lg border-r border-gray-200 z-40">
      <div className="p-6">
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'
                }`}
              >
                <Icon size={20} />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;