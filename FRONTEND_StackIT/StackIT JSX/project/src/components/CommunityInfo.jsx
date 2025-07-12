import React from 'react';
import { Users, Shield, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';


const CommunityInfo = ({
  
  communityName,
  followers,
  moderators,
  isJoined
}) => {

  const navigate = useNavigate();
  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
      <div className="mb-6">
        <button onClick={() => navigate('/ask')} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2">
          <Plus size={20} />
          <span 
>Ask Question</span>
        </button>
      </div>
      
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Community</h3>
          <p className="text-gray-700 font-medium">{communityName}</p>
        </div>
        
        <button
          className={`w-full py-2 px-4 rounded-lg font-medium transition-colors duration-200 ${
            isJoined
              ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              : 'bg-teal-600 hover:bg-teal-700 text-white'
          }`}
        >
          {isJoined ? 'Joined' : 'Join Community'}
        </button>
        
        <div className="pt-4 border-t border-gray-200">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2 text-gray-600">
              <Users size={18} />
              <span className="text-sm">Followers</span>
            </div>
            <span className="font-semibold text-gray-900">{followers.toLocaleString()}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-gray-600">
              <Shield size={18} />
              <span className="text-sm">Moderators</span>
            </div>
            <span className="font-semibold text-gray-900">{moderators}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityInfo;