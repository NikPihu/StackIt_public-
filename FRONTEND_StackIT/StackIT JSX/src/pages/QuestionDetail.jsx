import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import RichTextEditor from '../components/RichTextEditor';
import LoadingSpinner from '../components/LoadingSpinner';
import { questionService } from '../services/questionService';
import { useAsyncOperation } from '../hooks/useApi';
import { ArrowUp, ArrowDown, MessageCircle, Eye, Award, Share2, Bookmark } from 'lucide-react';

const QuestionDetail = () => {
  const { id } = useParams();
  const [question, setQuestion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [answer, setAnswer] = useState('');
  const [userVote, setUserVote] = useState(null);
  const { loading: upvoting, execute: executeUpvote } = useAsyncOperation();

  useEffect(() => {
    fetchQuestion();
  }, [id]);

  const fetchQuestion = async () => {
    try {
      setLoading(true);
      const response = await questionService.getQuestionById(id);
      setQuestion(response);
    } catch (error) {
      setError('Failed to fetch question');
      console.error('Error fetching question:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpvote = async () => {
    try {
      await executeUpvote(() => questionService.upvoteQuestion(id));
      // Refresh question data to get updated vote count
      await fetchQuestion();
    } catch (error) {
      console.error('Error upvoting question:', error);
    }
  };

  const handleAnswerSubmit = () => {
    if (!answer.trim()) return;
    
    // TODO: Implement answer submission
    console.log('Submitting answer:', answer);
    setAnswer('');
  };

  const formatTimestamp = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} days ago`;
  };

  if (loading) {
    return <LoadingSpinner text="Loading question..." />;
  }

  if (error || !question) {
    return (
      <div className="p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
            {error || 'Question not found'}
          </div>
          <Link to="/questions" className="text-blue-600 hover:text-blue-700 mt-4 inline-block">
            ← Back to Questions
          </Link>
        </div>
      </div>
    );
  }

  // Sample answers for now - you'll need to implement answer service
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
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumb */}
        <nav className="mb-6">
          <Link to="/questions" className="text-blue-600 hover:text-blue-700">
            ← Back to Questions
          </Link>
        </nav>

        {/* Question */}
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-8 mb-8">
          <div className="flex gap-6">
            {/* Vote Section */}
            <div className="flex flex-col items-center space-y-2">
              <button
                onClick={handleUpvote}
                disabled={upvoting}
                className={`p-2 rounded-full transition-colors ${
                  upvoting
                    ? 'bg-gray-100 text-gray-400'
                    : userVote === 'up'
                    ? 'bg-green-100 text-green-600'
                    : 'hover:bg-gray-100 text-gray-600'
                }`}
              >
                <ArrowUp size={24} />
              </button>
              <span className="text-2xl font-bold text-gray-900">{question.upvote || 0}</span>
              <button 
                className={`p-2 rounded-full transition-colors ${
                  userVote === 'down'
                    ? 'bg-red-100 text-red-600'
                    : 'hover:bg-gray-100 text-gray-600'
                }`}
              >
                <ArrowDown size={24} />
              </button>
              <button className="p-2 rounded-full hover:bg-gray-100 text-gray-600 transition-colors">
                <Bookmark size={20} />
              </button>
            </div>
            
            {/* Content */}
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {question.title}
              </h1>
              
              <div className="prose max-w-none mb-6">
                <div dangerouslySetInnerHTML={{ __html: question.content }} />
              </div>
              
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {question.tags?.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full font-medium hover:bg-blue-200 cursor-pointer transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              
              {/* Actions */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <button className="flex items-center space-x-1 hover:text-blue-600 transition-colors">
                    <Share2 size={16} />
                    <span>Share</span>
                  </button>
                  <div className="flex items-center space-x-1">
                    <Eye size={16} />
                    <span>{Math.floor(Math.random() * 1000)} views</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MessageCircle size={16} />
                    <span>{sampleAnswers.length} answers</span>
                  </div>
                </div>
                
                <div className="text-sm text-gray-500">
                  Asked {formatTimestamp(question.created_at)} by{' '}
                  <span className="font-medium text-blue-600 hover:text-blue-700 cursor-pointer">
                    {question.user_id}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Answers Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {sampleAnswers.length} {sampleAnswers.length === 1 ? 'Answer' : 'Answers'}
          </h2>
          
          {sampleAnswers.length === 0 ? (
            <div className="text-center py-8 bg-gray-50 rounded-lg">
              <p className="text-gray-500">No answers yet. Be the first to answer!</p>
            </div>
          ) : (
            <div className="space-y-6">
              {sampleAnswers.map((answer) => (
                <div key={answer.id} className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
                  <div className="flex gap-6">
                    {/* Vote Section */}
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
                    
                    {/* Content */}
                    <div className="flex-1">
                      <div className="prose max-w-none mb-4">
                        <p>{answer.content}</p>
                      </div>
                      
                      <div className="flex justify-between items-center text-sm text-gray-500">
                        <div className="flex items-center space-x-4">
                          <button className="hover:text-blue-600 transition-colors">Share</button>
                          <button className="hover:text-blue-600 transition-colors">Edit</button>
                          <button className="hover:text-blue-600 transition-colors">Follow</button>
                        </div>
                        
                        <div className="flex items-center space-x-4">
                          {answer.isAccepted && (
                            <span className="text-green-600 font-medium flex items-center space-x-1">
                              <Award size={16} />
                              <span>Accepted Answer</span>
                            </span>
                          )}
                          <span>
                            Answered {answer.timestamp} by{' '}
                            <span className="font-medium text-blue-600 hover:text-blue-700 cursor-pointer">
                              {answer.author}
                            </span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Answer Form */}
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Your Answer</h3>
          <RichTextEditor
            value={answer}
            onChange={setAnswer}
            placeholder="Share your knowledge and help the community..."
            height="300px"
          />
          <div className="mt-6 flex justify-between items-center">
            <p className="text-sm text-gray-500">
              Please be sure to answer the question. Provide details and share your research!
            </p>
            <button 
              onClick={handleAnswerSubmit}
              disabled={!answer.trim()}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200"
            >
              Post Your Answer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionDetail;