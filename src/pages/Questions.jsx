import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import QuestionCard from '../components/QuestionCard';
import CommunityInfo from '../components/CommunityInfo';
import { questionService } from '../services/questionService';

const Questions = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    fetchQuestions();
  }, [page]);

  const fetchQuestions = async () => {
    try {
      setLoading(true);
      const response = await questionService.getQuestions(page, 10);
      
      if (response.question_items) {
        setQuestions(response.question_items);
        setTotalCount(response.total_count || 0);
      }
    } catch (error) {
      setError('Failed to fetch questions');
      console.error('Error fetching questions:', error);
    } finally {
      setLoading(false);
    }
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

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          <Sidebar />
          
          <div className="flex-1">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Popular Questions</h1>
              <p className="text-gray-600">
                Browse through the most asked and trending questions ({totalCount} total)
              </p>
            </div>
            
            {loading ? (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              </div>
            ) : error ? (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
                {error}
              </div>
            ) : questions.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No questions found.</p>
              </div>
            ) : (
              <div className="space-y-6">
                {questions.map((question) => (
                  <QuestionCard 
                    key={question.question_id} 
                    id={question.question_id}
                    title={question.title}
                    content={question.content}
                    author={question.user_id}
                    votes={question.upvote}
                    answers={0}
                    views={Math.floor(Math.random() * 1000)}
                    tags={question.tags || []}
                    timestamp={formatTimestamp(question.created_at)}
                  />
                ))}
              </div>
            )}
          </div>
          
          <aside className="w-80">
            <CommunityInfo />
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Questions;