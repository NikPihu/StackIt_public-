import React from 'react';
import { Link } from 'react-router-dom';
import { HelpCircle, Users, Award, TrendingUp, Plus, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { user } = useAuth();

  const stats = [
    { label: 'Questions', value: '1,234', icon: HelpCircle, color: 'text-blue-600' },
    { label: 'Users', value: '890', icon: Users, color: 'text-green-600' },
    { label: 'Answers', value: '5,678', icon: Award, color: 'text-purple-600' },
    { label: 'Daily Active', value: '234', icon: TrendingUp, color: 'text-orange-600' },
  ];

  const recentQuestions = [
    {
      id: 1,
      title: "How to implement authentication in React?",
      author: "johndoe",
      votes: 15,
      answers: 8,
      timestamp: "2 hours ago"
    },
    {
      id: 2,
      title: "Best practices for state management in large applications",
      author: "developer123",
      votes: 23,
      answers: 12,
      timestamp: "4 hours ago"
    },
    {
      id: 3,
      title: "How to optimize React performance for large lists?",
      author: "codemaster",
      votes: 31,
      answers: 15,
      timestamp: "6 hours ago"
    }
  ];

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center py-16 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome back, {user?.name || 'Developer'}! 👋
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Your go-to platform for questions, answers, and knowledge sharing in the developer community
          </p>
          <div className="flex justify-center space-x-4">
            <Link
              to="/ask"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200 flex items-center space-x-2"
            >
              <Plus size={20} />
              <span>Ask a Question</span>
            </Link>
            <Link
              to="/questions"
              className="bg-white hover:bg-gray-50 text-gray-700 font-semibold py-3 px-8 rounded-lg border border-gray-300 transition-colors duration-200 flex items-center space-x-2"
            >
              <span>Browse Questions</span>
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4 ${stat.color.replace('text-', 'bg-').replace('-600', '-100')}`}>
                  <Icon className={`${stat.color} text-2xl`} size={24} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            );
          })}
        </div>

        {/* Recent Questions */}
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Recent Questions</h2>
              <Link
                to="/questions"
                className="text-blue-600 hover:text-blue-700 font-medium flex items-center space-x-1"
              >
                <span>View all</span>
                <ArrowRight size={16} />
              </Link>
            </div>
            
            <div className="space-y-4">
              {recentQuestions.map((question) => (
                <div key={question.id} className="bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow">
                  <Link to={`/question/${question.id}`} className="block group">
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mb-2">
                      {question.title}
                    </h3>
                  </Link>
                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <span>
                      Asked by <span className="font-medium text-blue-600">{question.author}</span>
                    </span>
                    <div className="flex items-center space-x-4">
                      <span>{question.votes} votes</span>
                      <span>{question.answers} answers</span>
                      <span>{question.timestamp}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Link
                  to="/ask"
                  className="block w-full text-left px-4 py-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors"
                >
                  Ask a Question
                </Link>
                <Link
                  to="/questions"
                  className="block w-full text-left px-4 py-3 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  Browse Questions
                </Link>
                <Link
                  to="/communities"
                  className="block w-full text-left px-4 py-3 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  Join Communities
                </Link>
              </div>
            </div>

            {/* Popular Tags */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Popular Tags</h3>
              <div className="flex flex-wrap gap-2">
                {['react', 'javascript', 'node.js', 'python', 'go', 'typescript', 'css', 'html'].map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full font-medium hover:bg-blue-200 cursor-pointer transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Community Stats */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Community</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Questions today</span>
                  <span className="font-medium">42</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Answers today</span>
                  <span className="font-medium">128</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">New users</span>
                  <span className="font-medium">15</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Active now</span>
                  <span className="font-medium text-green-600">234</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;