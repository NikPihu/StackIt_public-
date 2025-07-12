import React, { useState, useEffect } from 'react';
import QuestionCard from '../components/QuestionCard';
import CommunityInfo from '../components/CommunityInfo';
import LoadingSpinner from '../components/LoadingSpinner';
import { questionService } from '../services/questionService';
import { Filter, SortAsc, Search } from 'lucide-react';

const Questions = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [filterTag, setFilterTag] = useState('');

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

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    // Implement search functionality
  };

  const handleSort = (sortType) => {
    setSortBy(sortType);
    // Implement sorting functionality
  };

  const filteredQuestions = questions.filter(question => {
    const matchesSearch = question.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         question.content?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag = !filterTag || question.tags?.includes(filterTag);
    return matchesSearch && matchesTag;
  });

  if (loading && questions.length === 0) {
    return <LoadingSpinner text="Loading questions..." />;
  }

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex gap-8">
          <div className="flex-1">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">All Questions</h1>
              <p className="text-gray-600">
                {totalCount.toLocaleString()} questions in our community
              </p>
            </div>

            {/* Filters and Search */}
            <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 mb-6">
              <div className="flex flex-col md:flex-row gap-4">
                {/* Search */}
                <div className="flex-1">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Search className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      placeholder="Search questions..."
                      value={searchTerm}
                      onChange={handleSearch}
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Sort */}
                <div className="flex items-center space-x-2">
                  <SortAsc className="h-5 w-5 text-gray-400" />
                  <select
                    value={sortBy}
                    onChange={(e) => handleSort(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="newest">Newest</option>
                    <option value="oldest">Oldest</option>
                    <option value="votes">Most Votes</option>
                    <option value="answers">Most Answers</option>
                  </select>
                </div>

                {/* Filter */}
                <div className="flex items-center space-x-2">
                  <Filter className="h-5 w-5 text-gray-400" />
                  <select
                    value={filterTag}
                    onChange={(e) => setFilterTag(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">All Tags</option>
                    <option value="react">React</option>
                    <option value="javascript">JavaScript</option>
                    <option value="node.js">Node.js</option>
                    <option value="python">Python</option>
                    <option value="go">Go</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Error State */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md mb-6">
                {error}
              </div>
            )}

            {/* Questions List */}
            {filteredQuestions.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">
                  {searchTerm || filterTag ? 'No questions match your filters.' : 'No questions found.'}
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {filteredQuestions.map((question) => (
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

            {/* Pagination */}
            {totalCount > 10 && (
              <div className="flex justify-center mt-8">
                <div className="flex space-x-2">
                  <button
                    onClick={() => setPage(Math.max(1, page - 1))}
                    disabled={page === 1}
                    className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                  >
                    Previous
                  </button>
                  <span className="px-4 py-2 bg-blue-600 text-white rounded-lg">
                    {page}
                  </span>
                  <button
                    onClick={() => setPage(page + 1)}
                    disabled={page * 10 >= totalCount}
                    className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
          
          {/* Sidebar */}
          <aside className="w-80">
            <CommunityInfo />
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Questions;