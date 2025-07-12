import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { questionService } from '../services/questionService';
import { User, MapPin, Calendar, Award, HelpCircle, MessageCircle, TrendingUp, Edit } from 'lucide-react';

const Profile = () => {
  const { user } = useAuth();
  const [userQuestions, setUserQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('questions');

  useEffect(() => {
    if (user?.user_id) {
      fetchUserQuestions();
    }
  }, [user]);

  const fetchUserQuestions = async () => {
    try {
      setLoading(true);
      const response = await questionService.getQuestionsByUser(user.user_id);
      setUserQuestions(response.questions || []);
    } catch (error) {
      console.error('Error fetching user questions:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatTimestamp = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) return 'Today';
    if (diffInDays === 1) return 'Yesterday';
    return `${diffInDays} days ago`;
  };

  const stats = [
    { label: 'Questions', value: userQuestions.length, icon: HelpCircle, color: 'text-blue-600' },
    { label: 'Answers', value: 0, icon: MessageCircle, color: 'text-green-600' },
    { label: 'Reputation', value: 125, icon: Award, color: 'text-purple-600' },
    { label: 'Views', value: 1234, icon: TrendingUp, color: 'text-orange-600' },
  ];

  return (
    <div className="p-8">
      <div className="max-w-6xl mx-auto">
        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-8 mb-8">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-6">
              <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="w-12 h-12 text-blue-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{user?.name}</h1>
                <p className="text-gray-600 mb-4">{user?.email}</p>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Calendar size={16} />
                    <span>Joined {formatTimestamp(user?.created_at)}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MapPin size={16} />
                    <span>Location not set</span>
                  </div>
                </div>
              </div>
            </div>
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Edit size={16} />
              <span>Edit Profile</span>
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-white rounded-lg shadow-md p-6 text-center">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4 ${stat.color.replace('text-', 'bg-').replace('-600', '-100')}`}>
                  <Icon className={`${stat.color}`} size={24} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            );
          })}
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-md border border-gray-200">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: 'questions', label: 'Questions', count: userQuestions.length },
                { id: 'answers', label: 'Answers', count: 0 },
                { id: 'activity', label: 'Activity', count: null },
                { id: 'settings', label: 'Settings', count: null }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.label}
                  {tab.count !== null && (
                    <span className="ml-2 bg-gray-100 text-gray-600 py-1 px-2 rounded-full text-xs">
                      {tab.count}
                    </span>
                  )}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'questions' && (
              <div>
                {loading ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-2 text-gray-500">Loading questions...</p>
                  </div>
                ) : userQuestions.length === 0 ? (
                  <div className="text-center py-12">
                    <HelpCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No questions yet</h3>
                    <p className="text-gray-500 mb-4">You haven't asked any questions yet.</p>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors">
                      Ask Your First Question
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {userQuestions.map((question) => (
                      <div key={question.question_id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-blue-600 cursor-pointer">
                          {question.title}
                        </h3>
                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <div className="flex items-center space-x-4">
                            <span>{question.upvote || 0} votes</span>
                            <span>0 answers</span>
                            <span>{Math.floor(Math.random() * 100)} views</span>
                          </div>
                          <span>Asked {formatTimestamp(question.created_at)}</span>
                        </div>
                        {question.tags && (
                          <div className="flex flex-wrap gap-2 mt-3">
                            {question.tags.map((tag) => (
                              <span
                                key={tag}
                                className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-md"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'answers' && (
              <div className="text-center py-12">
                <MessageCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No answers yet</h3>
                <p className="text-gray-500">You haven't answered any questions yet.</p>
              </div>
            )}

            {activeTab === 'activity' && (
              <div className="text-center py-12">
                <TrendingUp className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Activity Timeline</h3>
                <p className="text-gray-500">Your recent activity will appear here.</p>
              </div>
            )}

            {activeTab === 'settings' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Account Settings</h3>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Display Name
                    </label>
                    <input
                      type="text"
                      defaultValue={user?.name}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      defaultValue={user?.email}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Bio
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Tell us about yourself..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Location
                    </label>
                    <input
                      type="text"
                      placeholder="Where are you based?"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors">
                    Save Changes
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;