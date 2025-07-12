import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import RichTextEditor from '../components/RichTextEditor';
import { ArrowUp, ArrowDown, MessageCircle, Eye, Award } from 'lucide-react';

const QuestionDetail = () => {
  const { id } = useParams();
  const [answer, setAnswer] = useState('');
  const [votes, setVotes] = useState({ up: 15, down: 2 });
  const [userVote, setUserVote] = useState(null);

  const handleVote = (type) => {
    if (userVote === type) {
      setUserVote(null);
      setVotes(prev => ({ ...prev, [type]: prev[type] - 1 }));
    } else {
      if (userVote) {
        setVotes(prev => ({ ...prev, [userVote]: prev[userVote] - 1 }));
      }
      setUserVote(type);
      setVotes(prev => ({ ...prev, [type]: prev[type] + 1 }));
    }
  };

  const sampleAnswers = [
    {
      id: 1,
      content: "For React authentication, I recommend using a combination of JWT tokens and React Context. Here's a comprehensive approach that I've used successfully in production applications...",
      author: "react_expert",
      votes: 12,
      timestamp: "1 hour ago",
      isAccepted: true
    },
    {
      id: 2,
      content: "Another approach is to use Firebase Auth which provides a complete authentication solution with social login providers...",
      author: "firebase_dev",
      votes: 8,
      timestamp: "3 hours ago",
      isAccepted: false
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Sidebar />
      
      <main className="ml-64 pt-20 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-8 mb-8">
            <div className="flex gap-6">
              <div className="flex flex-col items-center space-y-2">
                <button
                  onClick={() => handleVote('up')}
                  className={`p-2 rounded-full transition-colors ${
                    userVote === 'up'
                      ? 'bg-green-100 text-green-600'
                      : 'hover:bg-gray-100 text-gray-600'
                  }`}
                >
                  <ArrowUp size={24} />
                </button>
                <span className="text-xl font-bold text-gray-900">{votes.up - votes.down}</span>
                <button
                  onClick={() => handleVote('down')}
                  className={`p-2 rounded-full transition-colors ${
                    userVote === 'down'
                      ? 'bg-red-100 text-red-600'
                      : 'hover:bg-gray-100 text-gray-600'
                  }`}
                >
                  <ArrowDown size={24} />
                </button>
              </div>
              
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-gray-900 mb-4">
                  How to implement authentication in React?
                </h1>
                <div className="text-gray-700 mb-6">
                  <p>I'm building a React application and need to implement user authentication. What are the best practices for handling login, logout, and protecting routes?</p>
                  <p className="mt-4">I've looked into several options but I'm not sure which approach would be most suitable for a medium-sized application. Security is a primary concern, and I want to ensure that the solution is scalable and maintainable.</p>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {['react', 'authentication', 'javascript'].map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded-full font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Eye size={16} />
                      <span>342 views</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MessageCircle size={16} />
                      <span>8 answers</span>
                    </div>
                  </div>
                  <span>Asked 2 hours ago by <span className="font-medium text-blue-600">johndoe</span></span>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Your Answer</h2>
            <RichTextEditor
              value={answer}
              onChange={setAnswer}
              placeholder="Share your knowledge and help the community..."
              height="300px"
            />
            <div className="mt-4">
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200">
                Post Answer
              </button>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-xl font-bold text-gray-900">{sampleAnswers.length} Answers</h2>
            
            {sampleAnswers.map((answer) => (
              <div key={answer.id} className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
                <div className="flex gap-6">
                  <div className="flex flex-col items-center space-y-2">
                    <button className="p-2 rounded-full hover:bg-gray-100 text-gray-600 transition-colors">
                      <ArrowUp size={20} />
                    </button>
                    <span className="text-lg font-bold text-gray-900">{answer.votes}</span>
                    <button className="p-2 rounded-full hover:bg-gray-100 text-gray-600 transition-colors">
                      <ArrowDown size={20} />
                    </button>
                    {answer.isAccepted && (
                      <div className="p-2 rounded-full bg-green-100 text-green-600">
                        <Award size={20} />
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <div className="text-gray-700 mb-4">
                      <p>{answer.content}</p>
                    </div>
                    
                    <div className="flex justify-between items-center text-sm text-gray-500">
                      <span>Answered {answer.timestamp} by <span className="font-medium text-blue-600">{answer.author}</span></span>
                      {answer.isAccepted && (
                        <span className="text-green-600 font-medium">✓ Accepted Answer</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default QuestionDetail;