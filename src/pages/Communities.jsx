import React from 'react';
import { Users, TrendingUp, MessageCircle, Star } from 'lucide-react';

const Communities = () => {
  const communities = [
    {
      id: 1,
      name: 'React Developers',
      description: 'A community for React.js developers to share knowledge and best practices',
      members: 15432,
      posts: 2341,
      isJoined: false,
      tags: ['react', 'javascript', 'frontend'],
      activity: 'Very Active'
    },
    {
      id: 2,
      name: 'Node.js Enthusiasts',
      description: 'Backend development with Node.js, Express, and related technologies',
      members: 12890,
      posts: 1876,
      isJoined: true,
      tags: ['nodejs', 'backend', 'javascript'],
      activity: 'Active'
    },
    {
      id: 3,
      name: 'Python Programmers',
      description: 'Everything Python - from web development to data science and AI',
      members: 18765,
      posts: 3421,
      isJoined: false,
      tags: ['python', 'django', 'flask', 'data-science'],
      activity: 'Very Active'
    },
    {
      id: 4,
      name: 'Go Developers',
      description: 'Modern backend development with Go programming language',
      members: 8432,
      posts: 1234,
      isJoined: false,
      tags: ['go', 'golang', 'backend', 'microservices'],
      activity: 'Moderate'
    },
    {
      id: 5,
      name: 'DevOps & Cloud',
      description: 'DevOps practices, cloud computing, and infrastructure automation',
      members: 11234,
      posts: 1987,
      isJoined: true,
      tags: ['devops', 'aws', 'docker', 'kubernetes'],
      activity: 'Active'
    },
    {
      id: 6,
      name: 'Mobile Development',
      description: 'iOS, Android, React Native, and Flutter development community',
      members: 9876,
      posts: 1543,
      isJoined: false,
      tags: ['mobile', 'react-native', 'flutter', 'ios', 'android'],
      activity: 'Active'
    }
  ];

  const getActivityColor = (activity) => {
    switch (activity) {
      case 'Very Active':
        return 'text-green-600 bg-green-100';
      case 'Active':
        return 'text-blue-600 bg-blue-100';
      case 'Moderate':
        return 'text-yellow-600 bg-yellow-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Communities</h1>
          <p className="text-gray-600 text-lg">
            Explore different communities and join discussions that interest you
          </p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Users className="text-blue-600" size={24} />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">6</h3>
            <p className="text-gray-600">Active Communities</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="text-green-600" size={24} />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">76K</h3>
            <p className="text-gray-600">Total Members</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="text-purple-600" size={24} />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">12K</h3>
            <p className="text-gray-600">Total Posts</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Star className="text-orange-600" size={24} />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">2</h3>
            <p className="text-gray-600">Joined Communities</p>
          </div>
        </div>

        {/* Communities Grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          {communities.map((community) => (
            <div key={community.id} className="bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{community.name}</h3>
                  <p className="text-gray-600 mb-4">{community.description}</p>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {community.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                
                {/* Activity Badge */}
                <span className={`px-3 py-1 text-xs font-medium rounded-full ${getActivityColor(community.activity)}`}>
                  {community.activity}
                </span>
              </div>
              
              {/* Stats */}
              <div className="flex items-center justify-between mb-4 text-sm text-gray-500">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <Users size={16} />
                    <span>{community.members.toLocaleString()} members</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MessageCircle size={16} />
                    <span>{community.posts.toLocaleString()} posts</span>
                  </div>
                </div>
              </div>
              
              {/* Action Button */}
              <button
                className={`w-full py-2 px-4 rounded-lg font-medium transition-colors duration-200 ${
                  community.isJoined
                    ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                {community.isJoined ? 'Joined' : 'Join Community'}
              </button>
            </div>
          ))}
        </div>

        {/* Create Community CTA */}
        <div className="mt-12 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Don't see a community for your interests?
          </h2>
          <p className="text-gray-600 mb-6">
            Create your own community and bring together developers who share your passion
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200">
            Create Community
          </button>
        </div>
      </div>
    </div>
  );
};

export default Communities;