import React from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import QuestionCard from '../components/QuestionCard';
import CommunityInfo from '../components/CommunityInfo';

const Questions = () => {
  const sampleQuestions = [
    {
      id: 1,
      title: "How to implement authentication in React?",
      content: "I'm building a React application and need to implement user authentication. What are the best practices for handling login, logout, and protecting routes?",
      author: "johndoe",
      votes: 15,
      answers: 8,
      views: 342,
      tags: ["react", "authentication", "javascript"],
      timestamp: "2 hours ago"
    },
    {
      id: 2,
      title: "Best practices for state management in large applications",
      content: "What are the recommended approaches for managing state in large-scale React applications? Should I use Redux, Context API, or something else?",
      author: "developer123",
      votes: 23,
      answers: 12,
      views: 567,
      tags: ["react", "state-management", "redux"],
      timestamp: "4 hours ago"
    },
    {
      id: 3,
      title: "How to optimize React performance for large lists?",
      content: "I have a component that renders thousands of items and it's getting slow. What are the best techniques to optimize performance?",
      author: "codemaster",
      votes: 31,
      answers: 15,
      views: 789,
      tags: ["react", "performance", "optimization"],
      timestamp: "6 hours ago"
    },
    {
      id: 4,
      title: "TypeScript vs JavaScript: When to use which?",
      content: "I'm deciding whether to use TypeScript or stick with JavaScript for my next project. What are the pros and cons of each?",
      author: "webdev_pro",
      votes: 42,
      answers: 20,
      views: 1234,
      tags: ["typescript", "javascript", "development"],
      timestamp: "1 day ago"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Sidebar />
      
      <main className="ml-64 pt-20 p-8">
        <div className="flex gap-8">
          <div className="flex-1">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Popular Questions</h1>
              <p className="text-gray-600">Browse through the most asked and trending questions</p>
            </div>
            
            <div className="space-y-6">
              {sampleQuestions.map((question) => (
                <QuestionCard key={question.id} {...question} />
              ))}
            </div>
          </div>
          
          <aside className="w-80">
            <CommunityInfo
              communityName="React Developers"
              followers={15432}
              moderators={12}
              isJoined={false}
            />
          </aside>
        </div>
      </main>
    </div>
  );
};

export default Questions;